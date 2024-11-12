import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from './resources'

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
