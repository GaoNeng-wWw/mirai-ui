# Collapse

通过折叠面板收纳内容区域.

## 基本用法

:::demo collapse/basic-usage
:::

## 手风琴模式

开启手风琴模式后, 同一时间只允许展开一个折叠项. 

:::demo collapse/accordion
:::

## 大小

组件提供了不同尺寸的间距表现.

:::demo collapse/sizes
:::

## 禁用态

通过 `disabled` 属性指定禁用的项. 例如: 当一个项被设为禁用时，如果它当前处于展开状态，组件不会自动收起它，开发者需根据业务逻辑自行决定是否移除 `modelValue` 中的对应 ID.

:::demo collapse/disabled
:::

## 受控模式

组件仅拦截交互事件，不负责状态同步，请手动维护数据一致性.

:::demo collapse/controller
:::

## Collapse Props

| 属性 | 类型 | 默认值 | 描述 |
|----------|------|---------|-------------|
| `accordion` | `boolean` | `false` | 是否启用手风琴模式。启用后，同一时间只能展开一个折叠项。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 组件的尺寸大小。可选值为 `'sm'`、`'md'` 或 `'lg'`。 |
| `disabled` | `CollapseKey[]` | `[]` | 禁用的折叠项 ID 数组。组件会根据此数组拦截点击事件，但不会自动清理 modelValue 中的已存在项。 |
| `pure` | `boolean` | `false` | 是否开启纯净模式（禁用内置的装饰性样式）。 |

## CollapseItem Props

| 属性 | 类型 | 默认值 | 描述 |
|----------|------|---------|-------------|
| `id` | `string` | - | 折叠项的唯一标识符，必须与 modelValue 或 disabled 数组中的值对应。 |


## Events

| 事件名 | 说明 | 参数 |
|----------|------|-------------|
| `change` | 展开状态发生变化时触发。 | `(value: CollapseKey[])` |