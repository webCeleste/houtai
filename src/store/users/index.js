export default {
    namespaced: true,
    state: {
        uname: localStorage.getItem("uname") || '',
        roleName: localStorage.getItem("roleName") || '',
    },
    getters: {},
    mutations: {
        setUserinfo(state, payload) {
            // console.log(payload)
            // console.log(payload.uname, payload.roleName)
            state.uname = payload.uname
            state.roleName = payload.roleName

            // 数据持久化
            localStorage.setItem("token",  payload.token)
            localStorage.setItem("uname",  payload.uname)
            localStorage.setItem("roleName", payload.roleName)
        }
    },
    actions: {},
}