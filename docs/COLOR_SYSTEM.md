# 颜色系统文档 (Color System)

本项目采用系统化的颜色管理方案，所有颜色变量统一定义在 `src/assets/styles/_variables.scss` 中。

## 📊 颜色系统架构

```
颜色系统
├── 品牌色 (Brand Colors)
├── 中性色 (Neutral Colors)
│   ├── 文本色 (Text Colors)
│   ├── 边框色 (Border Colors)
│   └── 背景色 (Background Colors)
├── 功能色 (Functional Colors)
│   ├── 按钮色 (Button Colors)
│   ├── 表格色 (Table Colors)
│   ├── 表单色 (Form Colors)
│   └── 角色标签色 (Role Badge Colors)
└── 主题色 (Theme Colors)
    └── 侧边栏深色主题 (Sidebar Dark Theme)
```

## 🎨 品牌色 (Brand Colors)

| 变量名           | 颜色值  | 示例                                                 | 用途                   |
| ---------------- | ------- | ---------------------------------------------------- | ---------------------- |
| `$primary-color` | #409eff | ![](https://via.placeholder.com/60x30/409eff/409eff) | 主色调、链接、主要按钮 |
| `$success-color` | #67c23a | ![](https://via.placeholder.com/60x30/67c23a/67c23a) | 成功提示、成功按钮     |
| `$warning-color` | #e6a23c | ![](https://via.placeholder.com/60x30/e6a23c/e6a23c) | 警告提示、警告按钮     |
| `$danger-color`  | #f56c6c | ![](https://via.placeholder.com/60x30/f56c6c/f56c6c) | 错误提示、删除按钮     |
| `$info-color`    | #909399 | ![](https://via.placeholder.com/60x30/909399/909399) | 信息提示               |

### 使用示例

```scss
// SCSS
.button-primary {
  background-color: $primary-color;
  color: $color-white;
}

// CSS (通过 CSS 变量)
.button-primary {
  background-color: var(--primary-color);
}
```

## 📝 文本色 (Text Colors)

| 变量名              | 颜色值  | 示例                                                 | 用途               |
| ------------------- | ------- | ---------------------------------------------------- | ------------------ |
| `$text-primary`     | #303133 | ![](https://via.placeholder.com/60x30/303133/303133) | 标题、重要文本     |
| `$text-regular`     | #606266 | ![](https://via.placeholder.com/60x30/606266/606266) | 正文、常规文本     |
| `$text-secondary`   | #909399 | ![](https://via.placeholder.com/60x30/909399/909399) | 次要信息、辅助文本 |
| `$text-placeholder` | #c0c4cc | ![](https://via.placeholder.com/60x30/c0c4cc/c0c4cc) | 输入框占位符       |

### 文本层级

```scss
// 一级文本 - 标题、重要内容
color: $text-primary;

// 二级文本 - 正文
color: $text-regular;

// 三级文本 - 说明、提示
color: $text-secondary;

// 占位符
color: $text-placeholder;
```

## 🔲 边框色 (Border Colors)

| 变量名                | 颜色值  | 示例                                                 | 用途                    |
| --------------------- | ------- | ---------------------------------------------------- | ----------------------- |
| `$border-base`        | #dcdfe6 | ![](https://via.placeholder.com/60x30/dcdfe6/dcdfe6) | 一级边框 - 输入框、按钮 |
| `$border-light`       | #e4e7ed | ![](https://via.placeholder.com/60x30/e4e7ed/e4e7ed) | 二级边框 - 卡片         |
| `$border-lighter`     | #ebeef5 | ![](https://via.placeholder.com/60x30/ebeef5/ebeef5) | 三级边框 - 表格行       |
| `$border-extra-light` | #f2f6fc | ![](https://via.placeholder.com/60x30/f2f6fc/f2f6fc) | 四级边框 - 分割线       |

## 🎨 背景色 (Background Colors)

| 变量名        | 颜色值  | 示例                                                 | 用途                 |
| ------------- | ------- | ---------------------------------------------------- | -------------------- |
| `$bg-white`   | #ffffff | ![](https://via.placeholder.com/60x30/ffffff/ffffff) | 卡片、表格、弹窗背景 |
| `$bg-page`    | #f5f7fa | ![](https://via.placeholder.com/60x30/f5f7fa/f5f7fa) | 页面底色             |
| `$bg-light`   | #fafafa | ![](https://via.placeholder.com/60x30/fafafa/fafafa) | 表头背景             |
| `$bg-lighter` | #f5f7fa | ![](https://via.placeholder.com/60x30/f5f7fa/f5f7fa) | hover 背景           |

## 🌙 侧边栏深色主题 (Sidebar Dark Theme)

| 变量名                 | 颜色值  | 示例                                                 | 用途         |
| ---------------------- | ------- | ---------------------------------------------------- | ------------ |
| `$sidebar-bg`          | #304156 | ![](https://via.placeholder.com/60x30/304156/304156) | 侧边栏背景   |
| `$sidebar-text`        | #bfcbd9 | ![](https://via.placeholder.com/60x30/bfcbd9/bfcbd9) | 菜单文本     |
| `$sidebar-active-bg`   | #263445 | ![](https://via.placeholder.com/60x30/263445/263445) | 激活菜单背景 |
| `$sidebar-active-text` | #ffffff | ![](https://via.placeholder.com/60x30/ffffff/ffffff) | 激活菜单文本 |
| `$sidebar-hover-bg`    | #263445 | ![](https://via.placeholder.com/60x30/263445/263445) | 菜单悬停背景 |
| `$sidebar-border`      | #1f2d3d | ![](https://via.placeholder.com/60x30/1f2d3d/1f2d3d) | 侧边栏分割线 |

## 🔘 按钮颜色 (Button Colors)

### Primary 按钮

```scss
background: $btn-primary-bg; // #409eff
color: $btn-primary-text; // #ffffff
hover: $btn-primary-hover; // #66b1ff
active: $btn-primary-active; // #3a8ee6
```

### Danger 按钮

```scss
background: $btn-danger-bg; // #f56c6c
color: $btn-danger-text; // #ffffff
hover: $btn-danger-hover; // #f78989
active: $btn-danger-active; // #dd6161
```

### Default 按钮

```scss
background: $btn-default-bg; // #ffffff
color: $btn-default-text; // #606266
border: $btn-default-border; // #dcdfe6
hover: $btn-default-hover; // #ecf5ff
```

## 📊 表格颜色 (Table Colors)

```scss
$table-header-bg: #fafafa; // 表头背景
$table-header-text: $text-secondary; // 表头文本
$table-border: $border-lighter; // 表格边框
$table-hover-bg: #f5f7fa; // 行悬停背景
```

## 📝 表单颜色 (Form Colors)

```scss
$input-border: $border-base; // 默认边框
$input-hover-border: #c0c4cc; // 悬停边框
$input-focus-border: $primary-color; // 聚焦边框
$input-placeholder: $text-placeholder; // 占位符颜色
$input-disabled-bg: #f5f7fa; // 禁用背景
$input-disabled-text: $text-placeholder; // 禁用文本
```

## 🏷️ 角色标签颜色 (Role Badge Colors)

### Admin 角色

```scss
background: $role-admin-bg; // #fef0f0
color: $role-admin-text; // #f56c6c
```

### User 角色

```scss
background: $role-user-bg; // #ecf5ff
color: $role-user-text; // #409eff
```

### Guest 角色

```scss
background: $role-guest-bg; // #f4f4f5
color: $role-guest-text; // #909399
```

## 📐 设计原则

### 1. 语义化命名

✅ **使用语义化变量名**

```scss
color: $text-primary;
background: $btn-primary-bg;
```

❌ **避免直接使用颜色值**

```scss
color: #303133;
background: #409eff;
```

### 2. 层级关系

按照重要性使用不同的文本色和边框色：

```
primary (主要) → regular (常规) → secondary (次要) → placeholder (占位)
```

### 3. 对比度要求

- **正文文本**: 与背景对比度 ≥ 4.5:1
- **大号文本**: 与背景对比度 ≥ 3:1
- **交互元素**: 确保足够的视觉反馈

### 4. 一致性

- 同一功能使用相同的颜色
- 同一状态使用一致的视觉样式
- 保持整个系统的颜色协调

## 🎯 使用指南

### 在组件中使用

```vue
<style lang="scss" scoped>
.card {
  background: $bg-white;
  border: 1px solid $border-base;
  color: $text-primary;

  &:hover {
    border-color: $primary-color;
  }
}

.title {
  color: $text-primary;
  font-weight: $font-weight-medium;
}

.description {
  color: $text-secondary;
  font-size: $font-size-small;
}
</style>
```

### 使用 CSS 变量

```css
.dynamic-theme {
  color: var(--text-primary);
  background: var(--bg-white);
  border: 1px solid var(--border-base);
}
```

## 🔄 扩展颜色系统

如需添加新颜色，请遵循以下步骤：

1. 在 `_variables.scss` 中定义 SASS 变量
2. 在 `main.scss` 的 `:root` 中添加 CSS 变量映射
3. 更新本文档
4. 在相关组件中应用

### 示例：添加新的语义色

```scss
// _variables.scss
$purple-color: #9b59b6;
$purple-light: #d7aef5;

// main.scss
:root {
  --purple-color: #{$purple-color};
}
```

## 📚 参考资源

- [Element UI 色彩规范](https://element.eleme.io/#/zh-CN/component/color)
- [Ant Design 色彩体系](https://ant.design/docs/spec/colors-cn)
- [WCAG 对比度标准](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

**最后更新**: 2025 年 11 月 4 日
