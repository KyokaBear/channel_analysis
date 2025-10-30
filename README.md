# 全渠道漏斗分析系统 - 安装指南

## 环境要求
- Node.js 18.x 或更高版本
- npm 或 yarn 包管理器

## 安装步骤

### 1. 安装Node.js
如果还没有安装Node.js，请访问 https://nodejs.org/ 下载并安装LTS版本。

### 2. 安装项目依赖
在项目根目录下运行：
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 访问应用
打开浏览器访问 http://localhost:3000

## 项目结构
```
channel_analysis/
├── src/
│   ├── channel_analysis.jsx  # 主组件文件
│   └── main.jsx             # 入口文件
├── index.html               # HTML模板
├── package.json             # 项目配置
├── vite.config.js          # Vite配置
└── README.md               # 说明文档
```

## 功能特性
- 📊 全渠道数据可视化
- 📈 漏斗转化分析
- 💰 成本效益分析
- 📱 响应式设计
- 🎨 现代化UI界面

## 技术栈
- React 18
- Recharts (图表库)
- Lucide React (图标库)
- Tailwind CSS (样式框架)
- Vite (构建工具)
