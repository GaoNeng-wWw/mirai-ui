# Modal

## 基本用法

:::demo modal/basic-usage
:::

## 使用插槽

:::demo modal/slots
:::

## Hook打开

:::demo modal/hooks
:::

## 自定义遮罩类型

:::demo modal/mask-type
:::


## Props

:::props modal
:::

## Types

```ts
export type ModalRounded = 'none' | 'sm' | 'md' | 'lg'
export type MaskTypeItem = 'blur' | 'fill' | 'transparent'
export type MaskType = `${MaskTypeItem}-${MaskTypeItem}` | `${MaskTypeItem} ${MaskTypeItem}` | MaskTypeItem | MaskTypeItem[]
```