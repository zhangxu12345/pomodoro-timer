# 番茄工作法倒计时器

一个美观、功能完整的番茄工作法倒计时器，支持自定义时间、工作/休息模式切换、开始/暂停/重置功能、音效开关和暗黑模式。

## 功能特性

- ⏱️ **自动模式切换** - 工作时间结束后自动切换到休息模式并开始计时，休息时间结束后自动切换到工作模式并开始计时
- 🎛️ **自定义时间设置** - 可调整工作时间（1-60分钟）和休息时间（1-30分钟）
- ▶️ **完整的控制功能** - 开始、暂停、重置功能
- 🔊 **音效开关** - 可控制倒计时结束时的提示音
- 🌓 **暗黑模式** - 支持浅色/暗黑主题切换，减轻眼睛疲劳
- 💾 **本地存储** - 自动保存用户设置偏好
- 📱 **响应式设计** - 适配不同屏幕尺寸
- 🎨 **现代化UI** - 美观的渐变背景和流畅的动画效果

## 快速开始

### 本地运行

1. 克隆或下载本仓库
2. 直接在浏览器中打开 `index.html` 文件

### 部署到Vercel（推荐）

Vercel是一个免费的静态网站托管服务，支持一键部署，非常适合部署番茄工作法倒计时器。

#### 方法1：从GitHub仓库部署

1. 注册并登录 [Vercel](https://vercel.com/)
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 选择您的 `pomodoro-timer` 仓库
5. Vercel将自动检测到这是一个静态网站，保持默认设置
6. 点击 "Deploy"
7. 等待部署完成，您的网站将获得一个随机的Vercel子域名（如 `your-pomodoro-timer.vercel.app`）

#### 方法2：直接部署本地代码

1. 确保已安装 [Node.js](https://nodejs.org/)
2. 安装 Vercel CLI：
   ```bash
   npm install -g vercel
   ```
3. 在项目目录中运行：
   ```bash
   vercel
   ```
4. 按照提示完成部署流程
5. 等待部署完成，您将获得一个访问链接

#### 方法3：通过Vercel Dashboard上传文件

1. 注册并登录 [Vercel](https://vercel.com/)
2. 点击 "New Project"
3. 选择 "Upload"
4. 拖放项目文件夹（包含 `index.html` 和 `style.css`）到上传区域
5. 点击 "Deploy"
6. 等待部署完成，获得访问链接

### 部署到其他平台

由于本项目是纯静态网站，您也可以部署到其他静态网站托管服务：

#### GitHub Pages

1. 注册并登录 [GitHub](https://github.com/)
2. 创建一个新的仓库（可以命名为 `pomodoro-timer`）
3. 在本地仓库中添加远程仓库：
   ```bash
   git remote add origin https://github.com/您的用户名/pomodoro-timer.git
   ```
4. 推送代码到GitHub：
   ```bash
   git push -u origin master
   ```
5. 在GitHub仓库的设置中，找到 "Pages" 选项
6. 在 "Source" 下拉菜单中选择 "master branch" 或 "main branch"
7. 点击 "Save"，等待几分钟，您的网站将部署到 `https://您的用户名.github.io/pomodoro-timer/`

#### Netlify

1. 注册并登录 [Netlify](https://www.netlify.com/)
2. 点击 "New site from Git"
3. 选择 "GitHub" 并授权
4. 选择您的 `pomodoro-timer` 仓库
5. 在构建设置中，保持默认设置（不需要构建命令，发布目录为空）
6. 点击 "Deploy site"
7. 等待部署完成，您的网站将获得一个随机的Netlify子域名

## 项目结构

```
pomodoro-timer/
├── index.html      # 主HTML文件（包含Vue应用）
├── style.css       # 样式文件
├── .gitignore      # Git忽略文件
├── README.md       # 项目说明
└── package.json    # 项目配置文件（仅包含依赖声明）
```

## 使用说明

1. **选择模式**：点击 "工作模式" 或 "休息模式" 切换
2. **调整时间**：在设置区域输入您想要的工作时间和休息时间
3. **开始计时**：点击 "开始" 按钮开始倒计时
4. **暂停/继续**：点击 "暂停" 按钮暂停计时，再次点击 "开始" 继续
5. **重置计时**：点击 "重置" 按钮重置当前模式的时间
6. **控制音效**：使用 "音效开关" 控制提示音
7. **切换主题**：使用 "暗黑模式" 开关切换主题

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式设计，包括CSS变量、渐变、动画等
- **JavaScript (ES6+)** - 交互逻辑和功能实现
- **LocalStorage API** - 本地存储用户设置

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License

## 作者

番茄工作法倒计时器 - 一个简单易用的时间管理工具