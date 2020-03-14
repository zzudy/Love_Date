
<template>
  <div id="app">
    <div id="nav">
    <bar/>
    </div>
    <router-view/>
  </div>
</template>
<script>
import bar from "./components/bar"
export default { 
  components:{bar},
  data() {
    return {
    };
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
