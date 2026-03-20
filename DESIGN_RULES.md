# 龙岗数据聚合服务平台 - 设计规范

> 本文档与 `css/variables.css` 保持同步，是唯一权威设计规范。

## 设计哲学

**核心隐喻：** 现代化公共图书馆 — 明亮通透（纯白背景）、清晰分区（色彩分类）、强排版层级、结构化卡片。

**风格关键词：** 明亮(Luminous)、有序(Structured)、丰富(Informative)、可信(Trustworthy)

---

## 配色方案

### Brand Colors (品牌色)

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

### Classification Colors (分类色 — 色彩即信息)

| 分类 | 色值 | 背景色 |
|------|------|--------|
| 数据库类 | `#20A565` 品牌绿 | `#ECFDF3` |
| API 类 | `#4F6EF7` 靛蓝 | `#EEF2FF` |
| 文档类 | `#E5940A` 琥珀 | `#FFFCF0` |
| 服务类 | `#8B5CF6` 紫藤 | `#F5F3FF` |

```css
--cls-database: #20A565;   --cls-database-bg: #ECFDF3;
--cls-api: #4F6EF7;        --cls-api-bg: #EEF2FF;
--cls-doc: #E5940A;        --cls-doc-bg: #FFFCF0;
--cls-service: #8B5CF6;    --cls-service-bg: #F5F3FF;
```

### Typography Colors (文字颜色 — 纯灰阶)

| 层级 | 色值 | 用途 |
|------|------|------|
| Primary | `#111827` | 标题、重要内容 |
| Secondary | `#4B5563` | 正文、描述 |
| Tertiary | `#9CA3AF` | 辅助文字、提示 |
| Disabled | `#D1D5DB` | 禁用状态 |

```css
--text-primary: #111827;
--text-secondary: #4B5563;
--text-tertiary: #9CA3AF;
--text-disabled: #D1D5DB;
```

### Backgrounds & Surfaces (背景 — 纯白主导)

| 名称 | 色值 | 用途 |
|------|------|------|
| Main BG | `#FFFFFF` | 页面主背景（纯白） |
| Section BG | `#FAFBFC` | 区块背景、极浅冷灰 |
| Card BG | `#FFFFFF` | 卡片背景 |

```css
--bg-main: #FFFFFF;
--bg-section: #FAFBFC;
--bg-card: #FFFFFF;
```

### Borders (边框 — 可见实线)

| 名称 | 色值 | 用途 |
|------|------|------|
| Default | `#E5E7EB` | 默认边框 |
| Divider | `#F3F4F6` | 分隔线 |
| Emphasis | `#D1D5DB` | 强调边框 |

```css
--border-default: #E5E7EB;
--border-divider: #F3F4F6;
--border-emphasis: #D1D5DB;
```

### Shadows (阴影 — 适度清晰，无毛玻璃)

```css
--shadow-xs:  0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm:  0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-md:  0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
--shadow-lg:  0 10px 24px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.04);
--shadow-xl:  0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.04);
--shadow-glow: 0 4px 16px rgba(32, 165, 101, 0.2);
```

### Radius (圆角 — 硬朗风格，极小圆角)

| 级别 | 值 | 用途 |
|------|------|------|
| sm | `2px` | 小元素、标签 |
| md | `3px` | 按钮、输入框 |
| lg | `4px` | 卡片、容器 |
| xl/2xl | `4px` | 与 lg 统一 |

```css
--radius-sm: 2px;
--radius-md: 3px;
--radius-lg: 4px;
--radius-xl: 4px;
```

### Transitions (过渡)

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 字体

- 西文：`Inter` (400/500/600/700/800)
- 中文：`Noto Sans SC` (400/500/600/700/900)
- 回退：`-apple-system, BlinkMacSystemFont, sans-serif`

---

## 项目结构

```
web_theme02/
├── css/
│   ├── variables.css    ← 设计令牌（唯一真相源）
│   ├── base.css         ← 全局重置与排版
│   └── components.css   ← 跨页面复用组件
├── js/
│   ├── nav-bar.js       ← 导航栏 Web Component
│   ├── site-footer.js   ← 页脚 Web Component
│   ├── global-dialog.js ← 全局对话框工具
│   └── form-utils.js    ← 表单公共工具集
├── index.html           ← 首页
├── data-resources.html  ← 数据资源列表
├── data-detail.html     ← 数据详情
├── data-space.html      ← 可信数据空间
├── data-dev-platform.html ← 数据开发平台
├── data-dev-system.html ← 系统界面
└── images/              ← 图片资源
```

### 新增页面模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题 - 龙岗数据聚合服务平台</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/components.css">
    <style>
        /* 页面特有样式写在这里（禁止重复定义 components.css 已有的组件） */
    </style>
    <script src="js/nav-bar.js"></script>
    <script src="js/site-footer.js" defer></script>
</head>
<body>
    <nav-bar active="页面标识"></nav-bar>

    <!-- 页面内容 -->

    <site-footer></site-footer>

    <!-- 按需引入公共 JS（放在 body 末尾） -->
    <!-- <script src="js/form-utils.js"></script> -->
    <!-- <script src="js/global-dialog.js"></script> -->
</body>
</html>
```

---

## 公共 CSS 组件清单 (components.css)

所有跨页面复用的 UI 组件统一定义在 `css/components.css`，**新页面必须引入该文件**，禁止在页面内联重复定义。

### 布局组件

| 类名 | 说明 |
|------|------|
| `.g-page-wrapper` | 页面顶层容器（含 padding-top: 72px 避让导航栏） |
| `.g-container` | 内容容器（max-width: 1920px + 左右间距） |
| `.g-container--pb` | 追加底部间距 |
| `.g-card` | 白色卡片容器（圆角 + 边框 + 内边距） |

### 面包屑

| 类名 | 说明 |
|------|------|
| `.g-breadcrumb` | 面包屑导航容器 |
| `.g-breadcrumb a` | 链接项（自动灰色，hover 变绿） |
| `.g-breadcrumb .sep` | 分隔符 `/` |
| `.g-breadcrumb .current` | 当前页（黑色加粗） |

```html
<nav class="g-breadcrumb">
    <a href="index.html">首页</a>
    <span class="sep">/</span>
    <a href="data-resources.html">数据资源</a>
    <span class="sep">/</span>
    <span class="current">当前页面</span>
</nav>
```

### Tab 选项卡

| 类名 | 说明 |
|------|------|
| `.g-tabs` | Tab 容器 |
| `.g-tab` | 单个 Tab 按钮（支持 `.active`） |
| `.g-tab-panel` | Tab 内容面板（支持 `.active`） |

### 表单系统

| 类名 | 说明 |
|------|------|
| `.form-section-title` | 表单区块标题（带下划线） |
| `.form-row` | 水平表单行（label + value） |
| `.form-label` | 表单标签（右对齐 160px） |
| `.form-label .required` | 必填星号 |
| `.form-value` / `.form-value-static` | 表单值容器 |
| `.form-input` | 通用输入框 |
| `.form-select` | 下拉选择框 |
| `.form-textarea` / `.form-textarea-wrap` | 文本域 + 容器 |
| `.char-count` | 文本域字数统计 |
| `.radio-group` / `.radio-item` | 单选按钮组 |
| `.checkbox-item` | 复选框 |
| `.date-range` / `.form-date` / `.date-sep` / `.date-icon` | 日期范围选择 |
| `.form-number` / `.number-wrap` / `.number-unit` | 数字输入 |
| `.tip-icon` | 问号提示图标 |
| `.form-actions` | 按钮行 |
| `.btn-submit` / `.btn-cancel` | 提交/取消按钮 |

### 表格

| 类名 | 说明 |
|------|------|
| `.info-table` | 信息展示表格（label-value 对） |
| `.info-table .label-cell` / `.value-cell` / `.desc-cell` | 单元格类型 |
| `.data-table` | 数据列表表格（表头 + 数据行） |

### 标签 / 徽章

| 类名 | 说明 |
|------|------|
| `.g-tag` | 标签基础类 |
| `.g-tag--green` / `--blue` / `--orange` / `--purple` / `--red` / `--gray` | 颜色变体 |
| `.g-tag--outline` | 描边变体 |

### 其他

| 类名 | 说明 |
|------|------|
| `.empty-state` | 空状态占位（图标 + 文字） |
| `.g-meta` / `.g-meta .val` | 页面元信息行 |
| `.g-section-heading` | 通用区块小标题 |

---

## 公共 JS 工具

### FormUtils (form-utils.js)

| 方法 | 说明 |
|------|------|
| `FormUtils.charCount(textareaId, countId)` | 绑定文本域字符计数 |
| `FormUtils.passwordToggle(container)` | 初始化 .pwd-toggle 密码显隐 |
| `FormUtils.smsCountdown(btnId, seconds)` | 短信验证码倒计时 |
| `FormUtils.modalClose(overlayId, closeBtnId)` | 弹窗关闭（按钮+遮罩） |
| `FormUtils.captcha(canvasId, clickTargetId)` | 图形验证码 |
| `FormUtils.tabs(tabSel, panelSel, mapFn)` | Tab 切换 |

---

## 全局对话框 (GlobalDialog)

所有操作提示框（成功、信息、确认、危险、警告）统一使用 `js/global-dialog.js` + `css/components.css` 中的 `.g-dialog-*` 样式，**禁止使用浏览器原生 `alert / confirm`**。

### 引入方式

```html
<!-- components.css 已在模板中引入，无需额外操作 -->
<script src="js/global-dialog.js"></script>
```

### 五种类型

| 类型 | 方法 | 图标色 | 有按钮 | 典型场景 |
|------|------|--------|--------|----------|
| success | `GlobalDialog.success()` | 绿色 | 否（自动关闭） | 提交成功、保存成功 |
| info | `GlobalDialog.info()` | 蓝色 | 否（自动关闭） | 操作提示、信息通知 |
| confirm | `GlobalDialog.confirm()` | 绿色 | 确认 + 取消 | 确认操作、提交前确认 |
| danger | `GlobalDialog.danger()` | 红色 | 确认(红) + 取消 | 删除、注销等不可逆操作 |
| warning | `GlobalDialog.warning()` | 橙色 | 确认 + 取消 | 风险提醒、警告确认 |

### 调用示例

```javascript
// 无按钮 — 自动消失
GlobalDialog.success({
    title: '申请成功',
    desc: '即将返回详情页…',
    duration: 1600,          // 可选，默认 1600ms
    onClose: function () {}  // 可选，消失后回调
});

// 有按钮 — 用户操作
GlobalDialog.danger({
    title: '确认删除？',
    desc: '删除后数据不可恢复',
    confirmText: '删除',     // 可选，默认"确认"
    cancelText: '取消',      // 可选，默认"取消"
    onConfirm: function () {},
    onCancel: function () {}
});
```

---

## 更新记录

- 2026-03-11：全面提取公共组件（布局/面包屑/Tab/表单/表格/标签/空状态/JS工具）
- 2026-03-11：新增全局对话框组件规范 (GlobalDialog)
- 2026-03-11：统一设计规范，抽取公共 CSS，与实际代码对齐
- 2026-02-07：初始版本
