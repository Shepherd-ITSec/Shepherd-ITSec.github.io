import { inject, computed, type Ref } from 'vue'

type I18nContext = {
  locale: Ref<string>
  t: (key: string, params?: Record<string, string | number>) => string
  setLocale: (locale: string) => void
}

export function useI18n() {
  const i18n = inject<I18nContext>('i18n')
  if (!i18n) {
    throw new Error('i18n not provided. Make sure boot/i18n.ts is loaded.')
  }
  return {
    locale: computed(() => i18n.locale.value),
    t: i18n.t,
    setLocale: i18n.setLocale
  }
}

