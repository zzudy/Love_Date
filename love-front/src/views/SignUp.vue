<template>
<div id="app">
    <div id="join_form">
            <label for="email"><b>User Email</b></label>
            <input type="text" v-model="email" placeholder="Enter email" maxlength="100" required="">
            <br>
            <label for="pw"><b>Password</b></label>
            <input type="password" v-model="pw"  placeholder="Password length must be 6 to 12" required="">
            <br>
            <button type="submit" id="submit" v-on:click="sign_up_button">Sign Up</button>
        </div>

</div>

</template>


<script>
export default {
  name: 'signup',
  data () {
    return {
      pw: '',
      email: ''
    };
  },
  methods: {
    sign_up_button: function(){
      if(this.pw && this.email){
          this.$http.post('/auth/sign-up', {pw : this.pw, email: this.email}
                ).then(response => {
                   if(response.data.success == true){
                    console.log("success"); 
                    } 
                }).catch((ex) => {
                    console.warn("ERROR!!!!! : ",ex)
                })
            }
            this.$router.push({name: 'login'});

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
