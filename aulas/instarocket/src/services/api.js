import axios from 'axios'

import config from '../config/configBackend.json'

const api = axios.create({
    // usar IP da lan quando via USB
    // baseURL: 'http://192.168.0.16:3333'
    baseURL: config.urlBackend
    // no emulador usar 10.0.3.2:3333, como fosse o localhost
    // no emulador android studio 10.0.2.2:3333, como fosse o localhost
})

export default api