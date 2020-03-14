<template>
  <div class="login">
    <div id="join_form">
            <label for="email"><b>User Email</b></label>
            <input type="text" v-model="email" placeholder="Enter email" maxlength="100" required="">
            <br>
            <label for="pw"><b>Password</b></label>
            <input type="password" v-model="pw"  placeholder="Password length must be 6 to 12" required="">
            <br>
            <button type="submit" id="submit" v-on:click="login">Login</button>
        </div>

  </div>
</template>


<script>
export default {
  name: 'login',
  data () {
    return {
      pw: '',
      email: ''
    };
  },
  methods: {
    login: function(){
      if(this.pw && this.email){
          this.$http.post('/auth/login', {pw : this.pw, email: this.email}
                ).then(response => {
                   if(response.data.success == true){
                    console.log("success");
                    console.log(response.data.match)
                    this.$store.commit('set_logined', true)
                    if(response.data.match != 0) {
                      this.$store.commit('set_coupled', response.data.match)
                      this.$router.push({name: 'main'});
                    }
                    else{
                      this.$router.push({name: 'invite'});
                    }
                  } 
                  else{
                    alert("로그인 실패 다시해주세요");
                    this.email ='';
                    this.pw = '';
                  }
                }).catch((ex) => {
                    console.warn("ERROR!!!!! : ",ex)
                })
            }

      }

  },
}
</script>
<style scoped>
*{
    text-align: center;
}
.banner-area {
    background-size: cover;
    width: 100%;
    height: 400px;
    line-height: 100px;
    margin:  0 auto;
  }

input{
      margin: 5px 0px 10px 5px;
      width: 200px;
       border-radius: 8px;
       border: 1px solid burlywood;
  }
</style>
