class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60;
        this.breakTime = 5 * 60;
        this.currentTime = this.workTime;
        this.remainingTime = this.workTime;
        this.isRunning = false;
        this.isPaused = false;
        this.currentMode = 'work';
        this.isSoundEnabled = true;
        this.isDarkModeEnabled = false;
        this.timerId = null;
        
        this.loadSettings();
        this.initElements();
        this.initEventListeners();
        this.applyDarkMode();
        this.updateDisplay();
        this.updateProgressRing();
    }
    
    initElements() {
        this.timeDisplay = document.getElementById('time');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.workTimeInput = document.getElementById('workTime');
        this.breakTimeInput = document.getElementById('breakTime');
        this.soundToggle = document.getElementById('soundToggle');
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.modeBtns = document.querySelectorAll('.mode-btn');
        this.progressRing = document.querySelector('.progress-ring-progress');
        
        const radius = this.progressRing.r.baseVal.value;
        this.circumference = radius * 2 * Math.PI;
        this.progressRing.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.progressRing.style.strokeDashoffset = this.circumference;
        
        // 设置初始开关状态
        this.soundToggle.checked = this.isSoundEnabled;
        this.darkModeToggle.checked = this.isDarkModeEnabled;
    }
    
    initEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        this.modeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchMode(e.target.dataset.mode));
        });
        
        this.workTimeInput.addEventListener('change', (e) => {
            this.workTime = parseInt(e.target.value) * 60;
            if (this.currentMode === 'work' && !this.isRunning) {
                this.reset();
            }
            this.saveSettings();
        });
        
        this.breakTimeInput.addEventListener('change', (e) => {
            this.breakTime = parseInt(e.target.value) * 60;
            if (this.currentMode === 'break' && !this.isRunning) {
                this.reset();
            }
            this.saveSettings();
        });
        
        this.soundToggle.addEventListener('change', (e) => {
            this.isSoundEnabled = e.target.checked;
            this.saveSettings();
        });
        
        this.darkModeToggle.addEventListener('change', (e) => {
            this.isDarkModeEnabled = e.target.checked;
            this.applyDarkMode();
            this.saveSettings();
        });
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.isPaused = false;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.timerId = setInterval(() => this.countdown(), 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.isPaused = true;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            clearInterval(this.timerId);
        }
    }
    
    reset() {
        this.pause();
        this.remainingTime = this.currentMode === 'work' ? this.workTime : this.breakTime;
        this.updateDisplay();
        this.updateProgressRing();
    }
    
    switchMode(mode) {
        if (mode !== this.currentMode) {
            this.pause();
            this.currentMode = mode;
            this.remainingTime = mode === 'work' ? this.workTime : this.breakTime;
            
            this.modeBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
            
            this.updateDisplay();
            this.updateProgressRing();
            this.updateProgressRingColor();
        }
    }
    
    countdown() {
        if (this.remainingTime > 0) {
            this.remainingTime--;
            this.updateDisplay();
            this.updateProgressRing();
        } else {
            this.complete();
        }
    }
    
    complete() {
        this.pause();
        this.playNotification();
        this.switchMode(this.currentMode === 'work' ? 'break' : 'work');
        this.start();
    }
    
    playNotification() {
        if (this.isSoundEnabled) {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
            } catch (error) {
                console.log('音效播放失败:', error);
            }
        }
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateProgressRing() {
        const totalTime = this.currentMode === 'work' ? this.workTime : this.breakTime;
        const percentage = (totalTime - this.remainingTime) / totalTime;
        const offset = this.circumference - (percentage * this.circumference);
        this.progressRing.style.strokeDashoffset = offset;
    }
    
    updateProgressRingColor() {
        this.progressRing.classList.remove('work', 'break');
        this.progressRing.classList.add(this.currentMode);
    }
    
    applyDarkMode() {
        if (this.isDarkModeEnabled) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    
    saveSettings() {
        const settings = {
            workTime: this.workTime / 60,
            breakTime: this.breakTime / 60,
            isSoundEnabled: this.isSoundEnabled,
            isDarkModeEnabled: this.isDarkModeEnabled
        };
        localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    }
    
    loadSettings() {
        const saved = localStorage.getItem('pomodoroSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.workTime = settings.workTime * 60;
            this.breakTime = settings.breakTime * 60;
            this.isSoundEnabled = settings.isSoundEnabled;
            this.isDarkModeEnabled = settings.isDarkModeEnabled;
            
            // 更新输入框值
            if (document.getElementById('workTime')) {
                document.getElementById('workTime').value = settings.workTime;
            }
            if (document.getElementById('breakTime')) {
                document.getElementById('breakTime').value = settings.breakTime;
            }
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});