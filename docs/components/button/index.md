---
category: common
---

# Button

## 快速使用

:::demo button/demo-1
:::

## 不同大小

:::demo button/sizes
:::

## 禁用

通过设置`disabled`与否, 可以设置按钮的禁用态

:::demo button/disabled
:::

## 事件

你可以使用所有的原生事件

:::demo button/event
:::

## 插槽

你可以使用`suffix`与`prefix`插槽来为按钮文本前后增加你所需要的东西

:::demo button/suffix
:::

## 圆角大小

:::demo button/radius
:::

## IconOnly

你可以通过设置`icon-only`属性来标识，当前按钮是否是icon按钮。当为`true`时，按钮将会强制为矩形

:::demo button/iconOnly
:::

## Props

:::props button
:::

## Types

```typescript
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'default' | 'primary' | 'warning' | 'danger' | 'success';
export type ButtonShape = 'solid' | 'outline';
export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
```