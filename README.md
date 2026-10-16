# Vesper

Vesper is a framework built on Vue.js and Nuxt for rapid model-driven development.

This might be a collection of composables and types designed to assist with model-driven development.

## Vesper Vue

Vesper Vue is built for Vue.js.

``` bash
pnpm i @vesperjs/vue
```

## Vesper Nuxt Layer

Vesper Nuxt Layer is built for Nuxt.

``` bash
pnpm i @vesperjs/nuxt
```

``` nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ...
  extends: ['@vesperjs/nuxt'],
  ...
})
```

## App that use Vesper

Vesper Vue

<https://github.com/asip/easel-legacy>

Vesper Nuxt Layer

<https://github.com/asip/easel-front>

## Composables

### useConfig (vue only)

### useCookie (vue only)

### useEntity

### useFlash

### useLocale

### useDatetime

### useTimeZone

### useI18nGlobal (vue only)

### useNanoRoute (vue only)

### useMorePage

### useRecordStore

### useAnyRecordStore (vue only)

### usePersistentStore (vue only)

### usePersistentObjectStore (vue only)

### [backend]

#### useApi

#### useApiError

#### useFormAction

### [backend/api]

#### useQueryApi

#### useMutationApi

#### useOFetch
ofetchのラッパー

#### createFetch (nuxt only)

#### createRequestFetch (nuxt  only)

### [backend/error]

#### useExternalErrors

### [util]

#### useDateUtil

### [ui]

#### useElement (vue only)

