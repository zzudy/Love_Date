<template>
    <div class = "container">
        <label for="title"><h3>Title</h3></label>
        <textarea v-model="title"  required="" id ="title"></textarea>
        <p></p>
        <p></p>
        <label for="contents"><h3>Contents</h3></label>
        <textarea v-model="contents" id ="contents" required=""></textarea>
        <br>
        <br>
        <br>
        <button type="button" v-on:click = "register"><b>글 쓰기</b></button>
        <br>
    </div>
</template>
<script>
export default {
  data(){
    return {
      image : null,
      title:'',
      contents:''
    }
  },
  methods: {
    register : function(){
      this.$http.post(`/board/register`, 
      {title: this.title, contents: this.contents, img:this.image}).then(response => {
                console.warn(response)
                this.result = response.data
                this.no = response.data.no 
                this.$router.replace({name: 'board'});
                    
            }).catch((ex) => {
                console.warn("ERROR!!!!! : ",ex)
            })
    },
    onChange(e) {
      const file = e.target.files[0]
      this.image = file
    }
  },
    
}
</script>


<style scoped>
.container:after{
  content:"";
  position:absolute;
  top: 0;
  left: 0;
  margin: 0px 0px 60px 0px;
  width:100%;
  height: 100%;
  opacity: 0.5;
  z-index: -1;
}
#title{ 
    width: 1000px;
    height: 40px;
}
#contents{ 
    width: 1000px;
    height: 300px;
}
textarea{
  display: block;
  margin-left: auto;
  margin-right: auto;
    border: 2px solid grey;
    box-sizing: border-box;
    border-radius: 4px;
}
button:hover {
    opacity: 0.8;
    background-color: rgb(167, 77, 41);
    color: white;
}
button {
   display: inline-block;
    width: 10%;
    background-color:none;
    color: black;
    padding: 14px 20px;
    margin: 8px 10px;
    border: 2px solid rgb(167, 77, 41);
    border-radius: 8px;
    cursor: pointer;
}
</style>