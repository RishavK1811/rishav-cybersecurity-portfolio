/// <reference types="vite/client" />

declare const __APP_SITE_URL__: string

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
