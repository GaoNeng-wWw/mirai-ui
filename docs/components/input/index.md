# Input


## 基本用法

:::demo input/basic-use
:::

## 错误态

通过设置`error`属性可以设置输入框的错误态. 结合`error-message`可以实现对错误数据的提示

:::demo input/error
:::

## 不同形态

通过设置`variants`属性，可以设置输入框的不同形态

:::demo input/variants
:::

## Label不同位置

通过设置`label-position`属性，可以设置输入框label的不同位置

:::demo input/different-label-position
:::

## 多种颜色

`colors`属性支持`default | primary | danger | warning | success`颜色

:::demo input/different-color
:::

## 不同大小

`sizes`属性支持`sm|md|lg`

:::demo input/different-sizes
:::

## 插槽

:::demo input/slot
:::

## 描述

:::demo input/description
:::

## Props

:::props input
:::

## Types

```typescript
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'fill' | 'border';
export type InputColors = 'default' | 'primary' | 'warning' | 'danger' | 'success';
export type InputLabelPosition = 'top-outside' | 'top-inside' | 'left-outside';
```