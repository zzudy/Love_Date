<template>
    <div class = "container">
        <h4>Title</h4>
        <div id="title">
            <p></p>
            {{this.$store.state.data.title}}
        </div>
        <p></p>
        <p></p>
        <h4>Contents</h4>
        <p></p>
       <div id="contents">
           {{this.$store.state.data.contents}}
        </div>
        
    </div>
</template>
<script>
export default {
  name: 'D',
  props: ['myindex'],
  data(){
    return {
    }
  },
  methods: {
  },
}
</script>


<style scoped>
.container{
  color: black;
}
#title{ 
    width: 80%;
    height: 40px;
    display: block;
  margin-left: auto;
  margin-right: auto;
    border: 1px solid black;
    box-sizing: border-box;
    border-radius: 4px;
}
#contents{ 
    width: 80%;
    height: 60%;
    display: block;
  margin-left: auto;
  margin-right: auto;
    border: 1px solid black;
    box-sizing: border-box;
    border-radius: 4px;
}
</style>