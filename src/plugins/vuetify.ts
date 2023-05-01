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
                    error: '#FF0000',
                    'on-error': '#000000',
                    info: '#42A5F5',
                    'on-info': '#000000',
                    success: '#66BB6A',
                    'on-success': '#000000',
                    warning: '#FFA726',
                    'on-warning': '#000000',

                    //Custom colors
                    'recture-cadet-blue': '#9CBBC4',
                    'recture-yellow': '#FFD900',
                    'recture-red': '#FF0000',
                    'recture-light-red': '#E24A42',
                    'recture-bright-blue': '#00A6E2',
                    'recture-gray': '#CCCCCC',

                    //Lesson colors
                    'mustard': '#f7bd50',
                    'aqua': '#76c4bf',
                    'steel_blue': '#b8bde1',
                    'red': '#e24a42',
                    'gray': '#acacac',
                    'rose': '#f6d2ed',
                    'melon': '#f4bbb8',
                    'blush': '#ea5782',
                    'crystal_blue': '#4eadb9',
                    'canary': '#f6f996',
                    'orchid': '#ea9bcd',
                    'green': '#9beaca'
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
                    'on-error': '#FFFFFF',
                    info: '#42A5F5',
                    'on-info': '#FFFFFF',
                    success: '#66BB6A',
                    'on-success': '#FFFFFF',
                    warning: '#FFA726',
                    'on-warning': '#FFFFFF',
                    
                    //Custom colors
                    'recture-cadet-blue': '#9CBBC4',
                    'recture-yellow': '#FFD900',
                    'recture-red': '#FF0000',
                    'recture-light-red': '#E24A42',
                    'recture-bright-blue': '#00A6E2',
                    'recture-gray': '#CCCCCC',

                    //Lesson colors
                    'mustard': '#f7bd50',
                    'aqua': '#76c4bf',
                    'steel_blue': '#b8bde1',
                    'red': '#e24a42',
                    'gray': '#acacac',
                    'rose': '#f6d2ed',
                    'melon': '#f4bbb8',
                    'blush': '#ea5782',
                    'crystal_blue': '#4eadb9',
                    'canary': '#f6f996',
                    'orchid': '#ea9bcd',
                    'green': '#9beaca'
                }
            }
        },
        defaultTheme: 'light'
    }
})
