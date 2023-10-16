import { createI18n } from 'vue-i18n';
import en from './en';
import vi from './vi';

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: en,
        vi: vi,
    },
});

export default i18n;
