# Vesper

Vesper is a model driven framework built on Vue.js and Nuxt for rapid development.

## Vesper Vue

Vesper Vue is built for Vue.js.

``` bash
pnpm i @vesperjs/vue
```

## Vesper Nuxt Layer

Vesper Nuxt Layer is built for Nuxt.

``` nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ...
  extends: ['@vesperjs/nuxt'],
  ...
})
```
