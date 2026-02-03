# 📝 Todo App - Vercel Deploy

一个使用 Next.js + TypeScript + Tailwind CSS 构建的待办事项应用，遵循 Vercel 最佳实践。

## ✨ 特性

- ✅ 添加、标记完成、删除待办事项
- 💾 数据持久化（LocalStorage）
- 🎨 精美渐变 UI 设计
- 📱 响应式设计
- ♿ 完整的可访问性支持
- 🚀 性能优化（memo, useCallback, useMemo）

## 🏗️ 项目结构

```
app/
├── components/              # 组件目录
│   ├── Header.tsx           # 头部组件
│   ├── TodoInput.tsx        # 输入框组件
│   ├── TodoList.tsx         # 列表组件
│   ├── TodoItem.tsx         # 单个项目组件
│   ├── Stats.tsx            # 统计组件
│   ├── EmptyState.tsx       # 空状态组件
│   ├── ClearCompleted.tsx   # 清除已完成按钮
│   ├── Footer.tsx           # 底部组件
│   └── *.module.css         # 组件样式
├── hooks/
│   └── useTodo.ts           # Todo 自定义 Hook
├── lib/
│   └── storage.ts           # 存储工具函数
├── styles/
│   └── globals.css          # 全局样式
├── page.tsx                 # 主页面
├── layout.tsx               # 布局
├── globals.css              # 全局样式入口
└── favicon.ico              # 图标
```

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 部署到 Vercel

```bash
# 登录 Vercel
vercel login

# 部署
vercel --prod
```

或点击下方按钮：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/todo-app-vercel)

## 🛠️ 技术栈

- **Next.js 14+** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **LocalStorage** 数据持久化
- **Lucide React** 图标库

## 📦 性能优化

本项目遵循 Vercel React 最佳实践：

- ✅ `React.memo` 避免不必要的重新渲染
- ✅ `useCallback` 和 `useMemo` 优化回调和计算
- ✅ 组件按功能拆分，提高代码可维护性
- ✅ CSS Modules 避免样式冲突
- ✅ TypeScript 类型安全

## ♿ 可访问性

本项目遵循 Web Interface Guidelines：

- ✅ 所有按钮都有 `aria-label`
- ✅ 复选框有清晰的标签和状态
- ✅ 输入框有 `aria-label`
- ✅ 进度条有完整的 ARIA 属性
- ✅ 支持键盘导航 (Tab, Enter, Space)
- ✅ Focus 状态清晰可见
- ✅ 尊重 `prefers-reduced-motion`
- ✅ 使用语义化 HTML
- ✅ 空状态有提示

## 🎨 设计

采用深色主题和渐变效果，提供现代化的视觉体验。

## 📄 许可证

MIT
