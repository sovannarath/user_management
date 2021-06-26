import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import jQuery from 'jquery'
import axios from 'axios'
import VueAxios from 'vue-axios'


import 'popper.js'
import 'bootstrap';
import './assets/app.scss';
import 'popper.js'

// Fontfaces CSS
import './assets/css/font-face.css'
import './assets/vendor/font-awesome-4.7/css/font-awesome.min.css'
import './assets/vendor/font-awesome-5/css/fontawesome-all.min.css'
import './assets/vendor/mdi-font/css/material-design-iconic-font.min.css'

// Main CSS
import './assets/css/theme.css'

// Images
import './assets/images/icon/logo.png'
import './assets/images/icon/avatar-02.jpg'

// Declare global variable
window.serverHost = 'https://secretary-api-back-office.herokuapp.com'
window.$ = window.jQuery = jQuery

createApp(App).use(router, axios, VueAxios).mount('#app')
