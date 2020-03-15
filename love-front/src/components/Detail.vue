<template>
    <div class = "container">
        <h4>Title</h4>
        <div id="title">
            <p></p>
            {{this.title}}
        </div>
        <p></p>
        <p></p>
        <h4>Contents</h4>
        <p></p>
       <div id="contents">
           {{this.contents}}
        </div>
        
    </div>
</template>
<script>
export default {
  name: 'D',
  data(){
    return {
      title:'',
      contents:'',
      img:''
    }
  },
  created(){
     this.$http.get(`/board/text/${this.$route.params.idx}`)
     .then((response) => {
       console.log(response);
       this.title = response.data.text.title;
       this.contents = response.data.text.contents;

       });
    //  let idx = this.myindex;
    //  console.log("글 보여줘");
    //  this.$http.get(`/board/text/${idx}`)
    //  .then((response) => {
    //    console.log("rererere"+ response.data.removable);
    //    this.$store.commit('setData', response.data);
    //    console.log("rererere"+ this.$store.state.data.removable);
       
    //                   this.$router.push({name: 'D', params:{idx: t_idx}});
    //    });
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