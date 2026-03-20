# CSS 变量快速参考

> 所有变量定义在 `css/variables.css`，这是唯一真相源。本文档仅作快速查阅。

## 品牌色 (Brand Colors)

```css
--forest-green: #20A565;
--forest-green-50: #ECFDF3;
--forest-green-100: #D1FADF;
--forest-green-200: #A6F4C5;
--forest-green-500: #20A565;
--forest-green-600: #16a34a;
--forest-green-700: #15803d;

--accent-orange: #F7AF1D;
--accent-orange-50: #FFFCF0;
--accent-orange-100: #FEF3C7;

--info-blue: #409EFF;
```

## 分类色 (Classification Colors)

```css
--cls-database: #20A565;   --cls-database-bg: #ECFDF3;
--cls-api: #4F6EF7;        --cls-api-bg: #EEF2FF;
--cls-doc: #E5940A;        --cls-doc-bg: #FFFCF0;
--cls-service: #8B5CF6;    --cls-service-bg: #F5F3FF;
```

## 文字颜色 (Typography)

```css
--text-primary: #111827;
--text-secondary: #4B5563;
--text-tertiary: #9CA3AF;
--text-placeholder: #9CA3AF;
--text-disabled: #D1D5DB;
```

## 背景与表面 (Backgrounds)

```css
--bg-main: #FFFFFF;
--bg-section: #FAFBFC;
--bg-card: #FFFFFF;

--surface-primary: #FFFFFF;
--surface-secondary: #FAFBFC;
--surface-elevated: #FFFFFF;
```

## 语义色 (Semantic)

```css
--color-success: #20A565;
--color-warning: #F7AF1D;
--color-error: #EF4444;
```

## 边框 (Borders)

```css
--border-default: #E5E7EB;
--border-divider: #F3F4F6;
--border-subtle: #E5E7EB;
--border-emphasis: #D1D5DB;
```

## 阴影 (Shadows)

```css
--shadow-xs:  0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm:  0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-md:  0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
--shadow-lg:  0 10px 24px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.04);
--shadow-xl:  0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.04);
--shadow-nav: 0 1px 3px rgba(0, 0, 0, 0.06);
--shadow-glow: 0 4px 16px rgba(32, 165, 101, 0.2);
--shadow-green-glow: 0 4px 16px rgba(32, 165, 101, 0.2);
```

## 圆角 (Radius)

```css
--radius-sm: 2px;
--radius-md: 3px;
--radius-lg: 4px;
--radius-xl: 4px;
--radius-2xl: 4px;
```

## 过渡 (Transitions)

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

## 公共 CSS 文件结构

| 文件 | 内容 |
|------|------|
| `css/variables.css` | 所有 CSS 变量定义 |
| `css/base.css` | 全局重置、body、a 标签 |
| `css/components.css` | 按钮、标签、页头、面包屑、分页等可复用组件 |

## 使用方式

每个 HTML 页面头部引入：

```html
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
```

页面特有的样式写在 `<style>` 标签中。

---

*最后更新：2026-03-11*
