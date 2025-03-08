// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    ssr:false,
    devtools: {enabled: true},
    modules: ['@primevue/nuxt-module', '@nuxtjs/tailwindcss', '@nuxt/content', '@nuxtjs/supabase', 'motion-v/nuxt', 'shadcn-nuxt', '@nuxt/image'],
    css: [
        '@/assets/styles.scss'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    supabase: {
        redirectOptions: {
            login: '/auth/login',
            callback: '/auth/confirm',
            include: ["/parmegianologo/add"],
            exclude: ['/**']
          }
      },
    primevue: {
        options: {
            ripple: true,
            theme: {
                dark: true,
                options: {
                    darkModeSelector: '.app-dark'
                }
            }
        }
    },
    // plugins: ['~/plugins/primevue.js'],
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Yurio bolokio'
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ['legacy-js-api'],
                },
            }
        }
    },
})