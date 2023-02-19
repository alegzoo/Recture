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
            dark: {
                colors: {
                    background: '#C6BDBD',
                    surface: '#000000',
                    primary: '#000000',
                    'primary-darken-1': '#000000',
                    secondary: '#000000',
                    'secondary-darken-1': '#000000',
                    error: '#EF5350',
                    info: '#42A5F5',
                    success: '#66BB6A',
                    warning: '#FFA726'
                }
            }
        },
        defaultTheme: "dark"
    }
})
