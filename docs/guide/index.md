# 快速开始

## 安装

### 安装主题

```bash
npm install @miraiui-org/theme --save
```

### 安装(不推荐)

```bash
npm install @miraiui-org/vue-components --save
```

## 使用

使用前请确保安装了`tailwindcss`, `@miraiui-org/theme`与`@miraiui-org/vue-components`. 

### 配置主题

假设你已经完成了tailwincss的安装. 如果没有，可以参考[tailwind 官方指南](https://tailwindcss.com/docs/guides/vite#vue)

```javascript{8,15}
// tailwind.config.js
const {miraiUiPlugin} = require('@miraiui-org/theme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './node_modules/@miraiui-org/**/*.{js,ts,tsx,vue,md}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    miraiUiPlugin()
  ],
}
```

### 全量导入 (不推荐)

您可以直接安装`@miraiui-org/vue-components`来安装所有的组件与hook

```bash
npm install @miraiui-org/vue-components --save-dev # 如果没有安装
```

```css
/* style.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import MiraiUi from '@miraiui-org/vue-components';

createApp(App)
.use(MiraiUi)
.mount('#app')

```

```vue
<!--App.vue-->
<template>
  <div class="p-4">
    <m-button @click="onClick">
      hello world
    </m-button>
  </div>
</template>

<script lang="ts" setup>
import {Button as MButton, useMessage} from '@miraiui-org/vue-components';
const onClick = () => {
  useMessage({
    type: 'info',
    content: 'Hi!'
  })
}
</script>
```

`mirai-ui` 由`typescript` 编写, 您无需在 `tsconfig.json` 显式指定 `types`

### 按需导入

假设你已经完成了主题的安装

```bash
npm install @miraiui-org/vue-button @miraiui-org/vue-message --save
```

```css
/* style.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App)
.mount('#app')

```

```vue
<template>
  <div class="p-4">
    <m-button @click="onClick">
      hello world
    </m-button>
  </div>
</template>

<script lang="ts" setup>
import {Button as MButton} from '@miraiui-org/vue-button';
import {useMessage} from '@miraiui-org/vue-message';
const onClick = () => {
  useMessage({
    type: 'info',
    content: 'Hi!'
  })
}
</script>
```