import Vue from 'vue'

// 跳转
Vue.mixin({ 
    methods: {
        // 跳转 
        jump(url) {
            if (this.$router.app.$route.path == url) return 
            this.$router.push({path: url})
        }
    }
})

// ...