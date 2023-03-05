/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    background: '#9CBBC4',
                    'on-background': '#000000',
                    surface: '#FFFFFF',
                    'on-surface': '#000000',
                    primary: '#FFFFFF',
                    'on-primary': '#000000',
                    secondary: '#FFFFFF',
                    'on-secondary': '#000000',
                    error: '#EF5350',
                    info: '#42A5F5',
                    success: '#66BB6A',
                    warning: '#FFA726'
                }
            },
            dark: {
                dark: true,
                colors: {
                    background: '#000000',
                    'on-background': '#FFFFFF',
                    surface: '#000000',
                    'on-surface': '#FFFFFF',
                    primary: '#000000',
                    'on-primary': '#FFFFFF',
                    secondary: '#000000',
                    'on-secondary': '#FFFFFF',
                    error: '#EF5350',
                    info: '#42A5F5',
                    success: '#66BB6A',
                    warning: '#FFA726'
                }
            }
        },
        defaultTheme: "light"
    }
})
