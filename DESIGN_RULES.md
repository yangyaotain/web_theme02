# 龙岗数据聚合服务平台 - 设计规范

## 配色方案

### Brand Colors (品牌色)

品牌色用于核心品牌识别和主要交互元素。

| 颜色名称 | 色值 | 用途 |
|---------|------|------|
| Forest Green | `#20A565` | 主品牌色，主要按钮、强调元素 |
| Accent Orange | `#F7AF1D` | 强调色，警告提示、重要信息 |
| Info Blue | `#409EFF` | 信息提示、链接、辅助交互 |

```css
--forest-green: #20A565;
--accent-orange: #F7AF1D;
--info-blue: #409EFF;
```

### Typography Colors (文字颜色)

文字颜色层级，用于不同重要程度的文本内容。

| 颜色名称 | 色值 | 用途 |
|---------|------|------|
| Primary | `#1F2B28` | 主要文本、标题、重要内容 |
| Secondary | `#5C6863` | 次要文本、描述信息 |
| Placeholder | `#919B96` | 占位文本、提示信息 |
| Disabled | `#BFC7C4` | 禁用状态文本 |

```css
--text-primary: #1F2B28;
--text-secondary: #5C6863;
--text-placeholder: #919B96;
--text-disabled: #BFC7C4;
```

### Backgrounds & Surfaces (背景与表面)

背景色用于页面和组件的层次表现。

| 颜色名称 | 色值 | 用途 |
|---------|------|------|
| Main BG | `#F4F7F6` | 主背景色 |
| Card White | `#FFFFFF` | 卡片、弹窗等组件背景 |
| Dark Nav | `#1A2B25` | 深色导航栏、顶部栏 |
| Hover BG | `#F2F9F1` | 悬停状态背景 |

```css
--bg-main: #F4F7F6;
--bg-card: #FFFFFF;
--bg-dark-nav: #1A2B25;
--bg-hover: #F2F9F1;
```

### Semantic Colors & Borders (语义色与边框)

语义色用于传达状态和反馈信息。

| 颜色名称 | 色值 | 用途 |
|---------|------|------|
| Success | `#20A565` | 成功状态、正向反馈 |
| Warning | `#F7AF1D` | 警告提示、需要注意的信息 |
| Error | `#F56C6C` | 错误状态、失败反馈 |
| Border | `#D1D9D6` | 边框、分割线 |
| Divider | `#EBEEED` | 分隔线、浅色边框 |

```css
--color-success: #20A565;
--color-warning: #F7AF1D;
--color-error: #F56C6C;
--border-default: #D1D9D6;
--border-divider: #EBEEED;
```

## 使用指南

### 品牌色使用原则

1. **Forest Green (#20A565)** 作为主品牌色，用于：
   - 主要操作按钮
   - 导航活跃状态
   - 重要数据可视化元素
   - Logo 和品牌标识

2. **Accent Orange (#F7AF1D)** 作为辅助色，用于：
   - 次要操作按钮
   - 警告提示
   - 需要用户注意的信息
   - 数据统计的强调元素

3. **Info Blue (#409EFF)** 作为信息色，用于：
   - 信息提示
   - 链接文本
   - 辅助交互元素

### 文字颜色使用原则

- **Primary (#1F2B28)**：页面标题、卡片标题、重要数据
- **Secondary (#5C6863)**：正文内容、描述文本、标签
- **Placeholder (#919B96)**：输入框占位符、提示文本
- **Disabled (#BFC7C4)**：禁用状态的文本和图标

### 背景色使用原则

- **Main BG (#F4F7F6)**：页面主背景，营造柔和的视觉环境
- **Card White (#FFFFFF)**：卡片、表格、弹窗等组件，提供清晰的内容区域
- **Dark Nav (#1A2B25)**：顶部导航栏、侧边栏等深色区域
- **Hover BG (#F2F9F1)**：列表项悬停、按钮悬停等交互状态

### 语义色使用原则

- **Success (#20A565)**：操作成功提示、正向状态指示
- **Warning (#F7AF1D)**：需要注意的信息、警告提示
- **Error (#F56C6C)**：错误提示、失败状态、必填项提示
- **Border (#D1D9D6)**：卡片边框、输入框边框
- **Divider (#EBEEED)**：内容分隔线、表格分隔

## 颜色对比度要求

确保文字和背景的对比度符合 WCAG 2.1 标准：
- 正常文本：至少 4.5:1
- 大号文本（18px+）：至少 3:1
- 图形和UI组件：至少 3:1

## 更新记录

- 2026-02-07：初始版本，定义核心配色方案
