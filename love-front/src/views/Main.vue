<template>
<div id="app">
<h1>이건 나중에........</h1>
</div>
</template>


<script>
export default {
    data() {
    return {
      authenticated: 0,
    };
  },
  created(){
    this.$http.get('/auth/logined')
    .then((response) => {
        if(response.data.success == true){
            console.log(response.data.message)
            authenticated = true;

        }
    });
}
}
</script>