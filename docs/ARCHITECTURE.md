# 项目架构文档

## 1. 技术架构

### 1.1 前端架构

```
┌─────────────────────────────────────────────────────┐
│                   用户界面层                         │
│  ┌──────────┬──────────┬──────────┬──────────┐    │
│  │ 教材学习  │ 备课中心  │ 实践模拟  │ 测验中心  │    │
│  └──────────┴──────────┴──────────┴──────────┘    │
├─────────────────────────────────────────────────────┤
│                  组件层 (React)                      │
│  ┌──────────────────────────────────────────────┐  │
│  │ Layout / Common / Course / Simulator / Quiz  │  │
│  └──────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│                 状态管理层 (Zustand)                  │
│  ┌──────────────────────────────────────────────┐  │
│  │     UserStore / ProgressStore / QuizStore    │  │
│  └──────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│                  数据层 (Local JSON)                 │
│  ┌──────────────────────────────────────────────┐  │
│  │     Curriculum / Quiz / Simulator Config     │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### 1.2 技术选型理由

| 技术 | 选型理由 |
|------|----------|
| Next.js | SSR支持、静态导出、性能优化、SEO友好 |
| React 18 | 组件化开发、生态成熟、性能优秀 |
| TypeScript | 类型安全、代码可维护、IDE支持好 |
| Tailwind CSS | 原子化CSS、开发效率高、体积可控 |
| Zustand | 轻量级状态管理、API简洁、适合中小项目 |
| 本地JSON | 无需后端、部署简单、适合静态场景 |

## 2. 目录结构详解

```
iot-teaching-platform/
│
├── src/                          # 源代码目录
│   │
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # 根布局（导航、侧边栏）
│   │   ├── page.tsx             # 首页
│   │   ├── globals.css          # 全局样式、Tailwind指令
│   │   │
│   │   ├── course/              # 教材学习模块
│   │   │   ├── page.tsx         # /course - 课程目录
│   │   │   └── [lessonId]/      # 动态路由
│   │   │       └── page.tsx     # /course/L01 - 课程详情
│   │   │
│   │   ├── teaching/            # 备课中心模块
│   │   │   └── page.tsx         # /teaching
│   │   │
│   │   ├── simulator/           # 实践模拟器模块
│   │   │   ├── page.tsx         # /simulator - 模拟器列表
│   │   │   └── [simulatorId]/   # 动态路由
│   │   │       └── page.tsx     # /simulator/sim-sensor
│   │   │
│   │   ├── quiz/                # 测验中心模块
│   │   │   └── page.tsx         # /quiz
│   │   │
│   │   └── teacher/             # 教师后台模块
│   │       └── page.tsx         # /teacher
│   │
│   ├── components/              # 组件目录
│   │   ├── layout/             # 布局组件
│   │   │   └── MainLayout.tsx  # 主布局（Header + Sidebar + Main）
│   │   ├── common/             # 通用组件
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Badge.tsx
│   │   ├── course/             # 课程组件
│   │   │   ├── UnitCard.tsx
│   │   │   ├── LessonCard.tsx
│   │   │   └── KnowledgePoint.tsx
│   │   ├── simulator/          # 模拟器组件
│   │   │   ├── SensorSimulator.tsx
│   │   │   ├── MQTTSimulator.tsx
│   │   │   └── DeviceConfig.tsx
│   │   ├── quiz/               # 测验组件
│   │   │   ├── QuizCard.tsx
│   │   │   └── QuizResult.tsx
│   │   └── teacher/            # 教师端组件
│   │       ├── StudentTable.tsx
│   │       └── DataChart.tsx
│   │
│   ├── data/                    # 本地数据（JSON格式）
│   │   ├── curriculum/         # 教材内容
│   │   │   └── index.ts        # 6单元30课数据
│   │   ├── quiz/               # 测验题库
│   │   │   └── index.ts        # 题目数据
│   │   └── simulator/          # 模拟器配置
│   │       └── index.ts        # 模拟器定义
│   │
│   ├── lib/                     # 工具函数
│   │   ├── utils.ts            # 通用工具
│   │   ├── storage.ts          # 本地存储封装
│   │   └── markdown.ts         # Markdown处理
│   │
│   ├── store/                   # Zustand状态管理
│   │   ├── userStore.ts        # 用户状态
│   │   ├── progressStore.ts    # 学习进度状态
│   │   └── quizStore.ts        # 测验状态
│   │
│   └── types/                   # TypeScript类型定义
│       └── index.ts            # 全局类型
│
├── public/                      # 静态资源
│   ├── images/                 # 图片
│   │   ├── logo.png
│   │   └── icons/
│   └── favicon.ico
│
├── next.config.js              # Next.js配置
├── tailwind.config.ts          # Tailwind配置
├── tsconfig.json               # TypeScript配置
├── postcss.config.js           # PostCSS配置
├── package.json                # 项目依赖
└── README.md                   # 项目文档
```

## 3. 页面路由映射

| 路由路径 | 文件位置 | 页面说明 | 功能点 |
|----------|----------|----------|--------|
| `/` | `src/app/page.tsx` | 首页 | 课程入口、最近学习、快速实践、学习统计 |
| `/course` | `src/app/course/page.tsx` | 教材目录 | 6单元30课树形导航、课程卡片 |
| `/course/[lessonId]` | `src/app/course/[lessonId]/page.tsx` | 课程详情 | 知识点讲解、Markdown渲染、测验入口、模拟器入口 |
| `/teaching` | `src/app/teaching/page.tsx` | 备课中心 | 教案模板选择、一键生成、板书设计、导出 |
| `/simulator` | `src/app/simulator/page.tsx` | 模拟器列表 | 7种模拟器分类展示 |
| `/simulator/[simulatorId]` | `src/app/simulator/[simulatorId]/page.tsx` | 模拟器详情 | 设备配置、仿真展示、数据记录、实验指导 |
| `/quiz` | `src/app/quiz/page.tsx` | 测验中心 | 章节测验、综合测验、错题本、成绩统计 |
| `/teacher` | `src/app/teacher/page.tsx` | 教师后台 | 作业管理、学生数据、课堂投屏、数据统计 |

## 4. 核心组件设计

### 4.1 MainLayout 主布局

```
┌─────────────────────────────────────────────────┐
│  Header（Logo | 导航 | 角色切换 | 用户）          │
├─────────┬───────────────────────────────────────┤
│         │                                       │
│ Sidebar │            Main Content               │
│         │                                       │
│ - 首页   │                                       │
│ - 教材   │                                       │
│ - 备课   │                                       │
│ - 模拟   │                                       │
│ - 测验   │                                       │
│ - 后台   │                                       │
│         │                                       │
├─────────┴───────────────────────────────────────┤
│  Footer（版本 | 技术支持）                        │
└─────────────────────────────────────────────────┘
```

### 4.2 课程详情页布局

```
┌─────────────────────────────────────────────────┐
│  面包屑导航                                       │
├─────────────────────────────────────────────────┤
│  课程头部（单元、课次、标题、时长）                  │
├─────────────────────────────────────────────────┤
│                    │                            │
│  主内容区           │      侧边栏                 │
│  ┌──────────────┐ │  ┌──────────────┐         │
│  │ 教学目标      │ │  │ 随堂测验      │         │
│  ├──────────────┤ │  ├──────────────┤         │
│  │ 重点难点      │ │  │ 实践模拟      │         │
│  ├──────────────┤ │  ├──────────────┤         │
│  │ 课程内容      │ │  │ 学习进度      │         │
│  │ (Markdown)   │ │  ├──────────────┤         │
│  └──────────────┘ │  │ 相关课程      │         │
│                    │  └──────────────┘         │
├─────────────────────────────────────────────────┤
│  上一课 | 下一课 导航                              │
└─────────────────────────────────────────────────┘
```

### 4.3 模拟器页面布局

```
┌─────────────────────────────────────────────────┐
│  模拟器头部（图标、名称、描述、操作按钮）            │
├─────────────────┬───────────────────────────────┤
│                 │                               │
│  设备配置面板     │       仿真展示区               │
│  ┌───────────┐ │  ┌─────────────────────────┐ │
│  │ 设备列表   │ │  │                         │ │
│  ├───────────┤ │  │   可视化仿真区域         │ │
│  │ 参数设置   │ │  │   （实时数据、图表）     │ │
│  └───────────┘ │  │                         │ │
│                 │  └─────────────────────────┘ │
│  实验步骤指引     │                               │
│                 │  实时数据面板                   │
├─────────────────┴───────────────────────────────┤
│  [运行] [暂停] [重置] [导出] [保存报告]            │
└─────────────────────────────────────────────────┘
```

## 5. 数据流向

### 5.1 静态数据流向

```
JSON数据文件 → TypeScript导入 → 组件使用 → 页面渲染
```

### 5.2 用户数据流向

```
用户操作 → Zustand Store → LocalStorage → 页面更新
```

### 5.3 模拟器数据流向

```
设备配置 → 参数计算 → 仿真引擎 → 实时数据 → 图表渲染
                                   ↓
                              数据记录 → 导出CSV
```

## 6. 设计规范详解

### 6.1 颜色系统

```css
/* 主色 - 教育蓝 */
--primary-50:  #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6;  /* 主要使用 */
--primary-600: #2563eb;
--primary-700: #1d4ed8;

/* 辅助色 */
--secondary: 灰色系（#f8fafc - #0f172a）
--success: 绿色（#10b981）
--warning: 橙色（#f59e0b）
--danger: 红色（#ef4444）
```

### 6.2 字体系统

```css
/* 字号 */
--text-xs:   12px / 16px
--text-sm:   14px / 20px
--text-base: 16px / 24px  /* 基础 */
--text-lg:   18px / 28px
--text-xl:   20px / 28px
--text-2xl:  24px / 32px  /* H2 */
--text-3xl:  30px / 36px  /* H1 */

/* 字重 */
--font-normal:   400
--font-medium:   500
--font-semibold: 600
--font-bold:     700
```

### 6.3 间距系统

```css
/* 基于4px的间距系统 */
spacing-1:  4px
spacing-2:  8px
spacing-4:  16px  /* 常用 */
spacing-6:  24px
spacing-8:  32px
```

### 6.4 组件尺寸

```css
/* 按钮 */
btn-sm:  height 32px, padding 8px 16px
btn-base: height 40px, padding 12px 24px  /* 默认 */
btn-lg:  height 48px, padding 16px 32px  /* 大按钮 */

/* 输入框 */
input:   height 48px, padding 12px 16px

/* 卡片 */
card:    padding 24px, border-radius 12px
```

## 7. 性能优化策略

### 7.1 加载优化

- **代码分割**：Next.js自动按路由分割
- **静态导出**：生成静态HTML，无服务端渲染开销
- **资源压缩**：Tailwind CSS按需生成，体积小
- **图片优化**：使用合适尺寸，避免过大图片

### 7.2 运行优化

- **虚拟滚动**：长列表使用虚拟滚动（如测验列表）
- **防抖节流**：模拟器实时数据使用节流
- **缓存策略**：Service Worker缓存静态资源

### 7.3 体积控制

- **依赖精简**：只引入必要依赖
- **Tree Shaking**：ES Module支持Tree Shaking
- **CSS按需**：Tailwind只生成使用的样式

## 8. 开发规范

### 8.1 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 文件名 | 小写kebab-case | `main-layout.tsx` |
| 组件名 | PascalCase | `MainLayout` |
| 函数名 | camelCase | `handleClick` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| 类型 | PascalCase | `interface User` |

### 8.2 代码规范

- 使用TypeScript严格模式
- 优先使用函数组件和Hooks
- 组件逻辑拆分，单一职责
- 样式优先使用Tailwind，避免自定义CSS

### 8.3 Git规范

```
feat: 新功能
fix: 修复Bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具
```

---

**文档版本**：v1.0  
**更新日期**：2026-04-26
