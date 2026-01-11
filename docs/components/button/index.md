# Button

基本用法

:::demo button/basic-usage
:::

## 变体

:::demo button/variant
:::

## 加载

通过设置 `loading` 即可设置该按钮是否加载. 加载中的按钮不会响应点击事件

:::demo button/loading
:::

## 大小

:::demo button/sizes
:::

## 圆角

设置 `rounded` 参数可以设置按钮圆角

:::demo button/rounded
:::

## 禁用态

当 `disabled` 为 `true` 时候, 按钮处于禁用态, 不会响应事件

:::demo button/disabled
:::

## Icon

将 `icon` 设置为 `true` 后按钮的比例回是 `1 / 1`

:::demo button/icon
:::

## Full

将 `full` 设置为 `true` 后, 按钮将会填满整个父级容器.

:::demo button/full
:::

## Props

| 属性 | 类型 | 默认值 | 描述 |
|----------|------|---------|-------------|
| `loading` | `boolean` | `false` | 当设置为 `true` 时，显示加载动画。 |
| `htmlType` | `'submit' \| 'reset' \| 'button'` | `'button'` | 原生 HTML 按钮类型属性。 |
| `variant` | `ButtonVariant` | `'solid'` | 按钮的视觉样式变体。可选项：`'solid'`、`'ghost'`、`'flat'`、`'outline'`。 |
| `rounded` | `ButtonRounded` | `'md'` | 按钮圆角大小。可选项：`'none'`、`'xs'`、`'sm'`、`'md'`、`'lg'`、`'xl'`、`'full'`。 |
| `size` | `ButtonSized` | `'md'` | 按钮尺寸。可选项：`'xs'`、`'sm'`、`'md'`、`'lg'`、`'xl'`。 |
| `color` | `ButtonColor` | `'primary'` | 按钮颜色主题。可选项：`'primary'`、`'secondary'`、`'success'`、`'warning'`、`'danger'`。 |
| `icon` | `boolean` | `undefined` | 当设置为 `true` 时，创建适合图标的正方形（1:1）宽高比按钮。 |
| `disabled` | `boolean` | `undefined` | 当设置为 `true` 时，禁用所有事件和动画。 |
| `full` | `boolean` | `undefined` | 将按钮宽度设置为 100%，并忽略 `icon` 属性。 |