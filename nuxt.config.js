export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        script: [
            {src: 'https://polyfill.io/v3/polyfill.min.js?features=Intl%2Cblissfuljs%2Cdefault%2Ces2015%2Ces2016%2Ces2017%2Ces5%2Ces6%2Ces7%2CArray.prototype.forEach', body: true},
        ],
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [
        {src: 'assets/app.scss', lang: 'scss'},
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        // custom components
        '~/plugins/btn',
        '~/plugins/axios.js',
    ],
    /*
    ** Nuxt.js dev-modules
    */
    devModules: [],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/axios',
    ],

    styleResources: {
        scss: [
            'assets/vars.scss',
            'assets/mixins.scss'
        ]
    },

    axios: {
        baseURL: 'https://api.chucknorris.io/',
    },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    }
}
