import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        islogined: false,
        iscoupled: false,
    },
    getters:{
        get_logined:(state, getters) => {
            return state.islogined
        },
        get_coupled:(state, getters) => {
            return state.iscoupled
        }
    },
    mutations: {
        set_logined: function(state, payload){
            state.islogined = payload
        },
        set_coupled: function(state, payload){
            state.iscoupled = payload
        },
        loginCheck: function () {
            axios.get('/auth/logined')
                .then((response) => {
                    if (response.data.success == true) {
                        console.log(response.data.message)
                        this.state.islogined = true
                    }
                    else{
                        console.log("로그인 정보가 없습니당..!")
                        this.state.islogined = false
                    }
                });
        },
        logout: function () {
            this.state.islogined = false
        },
    },
    actions:{
        act_login: function (context) {
            return context.commit('loginCheck');
          }

    }
});
