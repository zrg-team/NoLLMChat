import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from 'src/i18n/resources'

i18n.use(initReactI18next).init({
  resources,
  defaultNS: 'chat',
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
