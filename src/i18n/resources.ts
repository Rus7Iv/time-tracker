import ar from './locales/ar.json'
import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import hi from './locales/hi.json'
import id from './locales/id.json'
import it from './locales/it.json'
import ja from './locales/ja.json'
import ko from './locales/ko.json'
import ptBR from './locales/pt-BR.json'
import ru from './locales/ru.json'
import tr from './locales/tr.json'
import zhCN from './locales/zh-CN.json'

export const resources = {
  ar,
  de,
  en,
  es,
  fr,
  hi,
  id,
  it,
  ja,
  ko,
  'pt-BR': ptBR,
  ru,
  tr,
  'zh-CN': zhCN,
} as const

export type Language = keyof typeof resources
export type Messages = (typeof resources)[Language]
