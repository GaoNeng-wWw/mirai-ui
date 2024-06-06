# Popper

Popper 是 `floating-ui` 的高阶封装, 不存在太多的自定义样式. 当你需要悬浮一个元素，且不想要其他样式的时候, `Popper`是一个很不错的选择.

## 基本用法

:::demo popper/basic-usage
:::

## 响应式

popper的所有参数都是响应式的

:::demo popper/offset
:::

## 虚拟触发

:::demo popper/virtual-trigger
:::

<!-- 
## 不同的触发方式

:::demo popper/trigger
:::

## 偏移量

:::demo popper/offset
:::

## AutoPlacement

:::demo popper/auto-placement
:::

## 反转

:::demo popper/flip
:::

## 安全区域

:::demo popper/safe-polygon
:::

## 反转和AutoPlacement有什么区别

`flip`与`auto-placement`最本质的区别就是, `auto-placement`并不一定是反方向的，但`flip`一般会在空间不足时反转到另一侧。

## Props

:::props popper
:::

## Event

// TODO

## Types

```typescript
export type PopperTrigger = 'click' | 'hover' | 'contextmenu' | 'focus'
export type PopperPlacement = Placement;
export type PopperFlipOptions = FlipOptions;
export type PopperShiftOptions = ShiftOptions;
export type PopperMiddlewares = Middleware[]
``` -->