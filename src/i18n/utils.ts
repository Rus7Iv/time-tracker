import type { Language, Messages } from './resources'
import { resources } from './resources'

const localeMap: Record<Language, string> = {
  ar: 'ar',
  de: 'de-DE',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  hi: 'hi-IN',
  id: 'id-ID',
  it: 'it-IT',
  ja: 'ja-JP',
  ko: 'ko-KR',
  'pt-BR': 'pt-BR',
  ru: 'ru-RU',
  tr: 'tr-TR',
  'zh-CN': 'zh-CN',
}

const pluralKeys = new Set(['zero', 'one', 'two', 'few', 'many', 'other'])

const resolveLanguage = (value?: string | null): Language | null => {
  if (!value) {
    return null
  }
  const normalized = value.toLowerCase()
  if (normalized.startsWith('ru')) {
    return 'ru'
  }
  if (normalized.startsWith('en')) {
    return 'en'
  }
  if (normalized.startsWith('es')) {
    return 'es'
  }
  if (normalized.startsWith('pt')) {
    return 'pt-BR'
  }
  if (normalized.startsWith('fr')) {
    return 'fr'
  }
  if (normalized.startsWith('de')) {
    return 'de'
  }
  if (normalized.startsWith('zh')) {
    return 'zh-CN'
  }
  if (normalized.startsWith('ja')) {
    return 'ja'
  }
  if (normalized.startsWith('ko')) {
    return 'ko'
  }
  if (normalized.startsWith('ar')) {
    return 'ar'
  }
  if (normalized.startsWith('hi')) {
    return 'hi'
  }
  if (normalized.startsWith('id')) {
    return 'id'
  }
  if (normalized.startsWith('tr')) {
    return 'tr'
  }
  if (normalized.startsWith('it')) {
    return 'it'
  }
  return null
}

export const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem('app.lang')
      const storedLang = resolveLanguage(stored)
      if (storedLang) {
        return storedLang
      }
    } catch {
      // ignore storage errors
    }
  }
  if (typeof document !== 'undefined') {
    const docLang = resolveLanguage(document.documentElement.lang)
    if (docLang) {
      return docLang
    }
  }
  if (typeof navigator !== 'undefined') {
    const navLang = resolveLanguage(navigator.language)
    if (navLang) {
      return navLang
    }
  }
  return 'en'
}

export const getLocale = (language: Language) => localeMap[language]

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object' && !Array.isArray(value))

const isPluralObject = (value: unknown): value is Record<string, string> => {
  if (!isPlainObject(value)) {
    return false
  }
  const keys = Object.keys(value)
  if (keys.length === 0) {
    return false
  }
  return keys.every((key) => pluralKeys.has(key))
}

const buildLocals = (node: unknown, pluralRules: Intl.PluralRules): unknown => {
  if (typeof node === 'string') {
    return node
  }
  if (isPluralObject(node)) {
    return (count: number) => {
      const pluralForm = pluralRules.select(count)
      const value = node[pluralForm] ?? node.other
      return value ?? ''
    }
  }
  if (!isPlainObject(node)) {
    return ''
  }
  return Object.entries(node).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      acc[key] = buildLocals(value, pluralRules)
      return acc
    },
    {},
  )
}

export const createLocals = (messages: Messages, locale: string) => {
  const pluralRules = new Intl.PluralRules(locale)
  return buildLocals(messages, pluralRules) as Record<string, any>
}

export const getMessages = (language: Language) => resources[language]
