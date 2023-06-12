// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    ssr: false,

    srcDir: 'src/',

    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE,
            urlAssets: process.env.NUXT_PUBLIC_URL_ASSETS || '',
            urlCdn: process.env.NUXT_PUBLIC_URL_CDN || '',
        },
    },

    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
    },

    typescript: {
        shim: false,
        strict: true,
    },

    modules: ['@nuxtjs/tailwindcss'],
})
