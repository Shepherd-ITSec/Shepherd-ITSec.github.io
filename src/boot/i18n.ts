import { boot } from 'quasar/wrappers'
import { ref } from 'vue'
import enUS from '../i18n/en-US'
import deDE from '../i18n/de-DE'

// Detect browser language or default to English
function getDefaultLocale(): string {
  if (typeof window === 'undefined') return 'en-US'
  const stored = localStorage.getItem('locale')
  if (stored) return stored
  const browserLang = navigator.language || (navigator as any).userLanguage
  return browserLang.startsWith('de') ? 'de-DE' : 'en-US'
}

export default boot(({ app }) => {
  const locale = getDefaultLocale()
  localStorage.setItem('locale', locale)

  // Simple i18n implementation using a reactive ref
  const messages = {
    'en-US': enUS,
    'de-DE': deDE
  }

  const currentLocale = ref(locale)
  const t = (key: string, params?: Record<string, string | number>) => {
    const keys = key.split('.')
    let value: any = messages[currentLocale.value as keyof typeof messages]
    for (const k of keys) {
      value = value?.[k]
    }
    if (typeof value !== 'string') return key
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, p) => String(params[p] ?? `{${p}}`))
    }
    return value
  }

  app.config.globalProperties.$t = t
  app.provide('i18n', { locale: currentLocale, t, setLocale: (l: string) => {
    currentLocale.value = l
    localStorage.setItem('locale', l)
  } })
})

