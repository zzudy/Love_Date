<template>
<v-card outlined height="100%" width="100%">
 <nav class="sticky_nav"> 
    <ul class="blog_menu"> 
        <li><router-link v-if= "!$store.state.islogined" to="/auth/login">Login</router-link></span>
        <li><button v-if= "$store.state.islogined" v-on:click = "logout">Logout</button></span>|
        <li><router-link v-if= "!$store.state.islogined" to="/auth/sign-up">Sign Up</router-link></span>
        <li><router-link  v-if= "$store.state.islogined" to="/calender">Calender</router-link></span></li>
        <li><router-link  v-if= "$store.state.islogined" to="/board">Board</router-link></span></li>
    </ul>
</nav>
</v-card>
</template>

<script>
export default {
    data() {
        return{
            authenticated: false,
            drawer : true
        }
    },
  mounted (){
    this.$store.dispatch('act_login')
    this.authenticated = this.$store.state.islogined
  },
  computed: { 
  login_check () { 
    return this.$store.getters.logined
    }
},
methods: {
    logout(){
      this.$http.get('/auth/logout')
      .then((response) => {
        if(response.data.success == true){
          console.log(response.data.message)
          this.$store.commit('logout')
          this.$router.replace({name: 'login'})
      }
    });
    }
},

};
</script>
<style>
/* white theme - nav */ .th_white_theme nav { background-color: #495057; } .th_white_theme nav ul li a { color: #ffffff; border-bottom: 3px solid transparent; } .th_white_theme nav ul li a:hover { color: #ff6b6b; border-bottom: 3px solid #ff6b6b; }
ul { list-style: none; } /* nav */ nav { display: flex; justify-content: center; align-items: center; padding: .25em; height: 55px; } nav ul { flex: 1; display: flex; justify-content: flex-end; align-items: center; margin: 0; } nav ul li { padding: 0; margin: 0; } nav ul li a { padding: 1em; font-size: 0.85em; display: flex; align-items: flex-end; }

</style>