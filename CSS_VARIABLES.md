# CSS 变量快速参考

本文档提供项目中所有 CSS 变量的快速参考。

## 品牌色 (Brand Colors)

```css
/* 主品牌色 */
--forest-green: #20A565;
--forest-green-50: #f0fdf6;
--forest-green-100: #dcfce9;
--forest-green-200: #bbf7d4;
--forest-green-500: #20A565;
--forest-green-600: #16a34a;
--forest-green-700: #15803d;

/* 强调色 */
--accent-orange: #F7AF1D;
--accent-orange-50: #fffbeb;
--accent-orange-100: #fef3c7;

/* 信息色 */
--info-blue: #409EFF;
```

**使用示例：**
```css
.primary-button {
    background: var(--forest-green);
}

.warning-badge {
    background: var(--accent-orange);
}

.info-link {
    color: var(--info-blue);
}
```

## 文字颜色 (Typography Colors)

```css
--text-primary: #1F2B28;       /* 主要文本 */
--text-secondary: #5C6863;     /* 次要文本 */
--text-tertiary: #919B96;      /* 辅助文本 */
--text-placeholder: #919B96;   /* 占位符 */
--text-disabled: #BFC7C4;      /* 禁用文本 */
```

**使用示例：**
```css
h1 {
    color: var(--text-primary);
}

.description {
    color: var(--text-secondary);
}

input::placeholder {
    color: var(--text-placeholder);
}
```

## 背景与表面 (Backgrounds & Surfaces)

```css
--bg-main: #F4F7F6;            /* 页面主背景 */
--bg-card: #FFFFFF;            /* 卡片背景 */
--bg-dark-nav: #1A2B25;        /* 深色导航栏 */
--bg-hover: #F2F9F1;           /* 悬停背景 */

--surface-primary: #ffffff;
--surface-secondary: #F4F7F6;
--surface-elevated: #ffffff;
```

**使用示例：**
```css
body {
    background: var(--bg-main);
}

.card {
    background: var(--bg-card);
}

.nav-item:hover {
    background: var(--bg-hover);
}
```

## 语义色 (Semantic Colors)

```css
--color-success: #20A565;      /* 成功状态 */
--color-warning: #F7AF1D;      /* 警告状态 */
--color-error: #F56C6C;        /* 错误状态 */
```

**使用示例：**
```css
.alert-success {
    background: var(--color-success);
}

.alert-warning {
    background: var(--color-warning);
}

.alert-error {
    background: var(--color-error);
}
```

## 边框与分隔线 (Borders & Dividers)

```css
--border-default: #D1D9D6;     /* 默认边框 */
--border-divider: #EBEEED;     /* 分隔线 */
--border-subtle: rgba(0, 0, 0, 0.06);
--border-emphasis: rgba(0, 0, 0, 0.12);
```

**使用示例：**
```css
.card {
    border: 1px solid var(--border-default);
}

.divider {
    border-bottom: 1px solid var(--border-divider);
}
```

## 阴影 (Shadows)

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
--shadow-glow: 0 0 0 1px rgba(32, 165, 101, 0.1), 0 4px 16px rgba(32, 165, 101, 0.12);
```

**使用示例：**
```css
.card {
    box-shadow: var(--shadow-md);
}

.button:hover {
    box-shadow: var(--shadow-lg);
}
```

## 圆角 (Border Radius)

```css
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 14px;
--radius-xl: 20px;
--radius-2xl: 28px;
```

**使用示例：**
```css
.button {
    border-radius: var(--radius-md);
}

.card {
    border-radius: var(--radius-lg);
}
```

## 过渡动画 (Transitions)

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

**使用示例：**
```css
.button {
    transition: all var(--transition-base);
}

.nav-item {
    transition: background var(--transition-fast);
}
```

## 最佳实践

### 1. 优先使用新的语义化变量

✅ 推荐：
```css
color: var(--text-primary);
background: var(--bg-card);
border: 1px solid var(--border-default);
```

❌ 避免：
```css
color: #1F2B28;  /* 直接使用颜色值 */
background: white;
```

### 2. 响应式调整

```css
/* 亮色模式 */
.card {
    background: var(--bg-card);
    color: var(--text-primary);
}

/* 未来支持暗色模式时，只需更新 CSS 变量 */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-card: #1A2B25;
        --text-primary: #F4F7F6;
    }
}
```

### 3. 组件级别的变量覆盖

```css
.special-card {
    --card-bg: var(--forest-green);
    --card-text: white;
    
    background: var(--card-bg);
    color: var(--card-text);
}
```

## 相关文档

- 完整设计规范：[DESIGN_RULES.md](./DESIGN_RULES.md)
- 设计稿：查看配色方案截图

## 更新日志

- 2026-02-07：统一所有页面的配色方案，添加新的语义化变量
