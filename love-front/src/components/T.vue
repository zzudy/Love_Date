<template>
  <div>
  <div id="head">
        검색 :
        <select v-model="selected" id="selected">
                <option value="title">제목</option>
                <option value="writer">작성자</option>
        </select> 
        <input type="text" v-model="text_name" placeholder="검색" />
         <span id="write">
    <router-link :to="{name:'register'}"> 
        <input type="button" value="글쓰기">
    </router-link>
  </span>
    </div> 
        
    <div id="text">
        <table id="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th class="col_2">작성시간</th>
                    <th class="col_2">조회수</th>
                 </tr>
            </thead>
                <tbody id="contents">
                    <tr id="only" v-on:click = "view(item.idx)" v-for="item in filtered" v-bind:key="item.idx">
                        <td>{{item.idx}}</td>
                        <td>{{item.title}}</td>
                        <td>{{item.writer}}</td>
                        <td class="col_1">{{item.time}}</td>
                        <td class="col_1">{{item.view}}</td>
                    </tr>
                </tbody>
            </table>
    </div>
    <hr>
            <div class="btn-cover">
            <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
                이전 
            </button>
            <span class="page-count">{{ pageNum + 1 }}/{{ pageCount }} 페이지</span>
            <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
                다음
            </button>
        </div>
  </div>
</template>


<script>
export default {
  name: 'T',
  data () {
    return {
        myindex:1,
        pageNum: 0,
        pageCount:0,
        text_length:0,
        text_name: '',
        array_text: '',
      texts: [],
      selected:"title",
    }
  },
 
}
</script>

<style scoped>
div {
    text-align: center;
    font-size: small;
}
button{
    padding: 5px 5px 5px 5px;
    margin: 5px 15px 15px 15px;
    border: 1px solid grey;
    border-radius: 8px;
}
#text td,
#text th {
    text-align: center;
    border-collapse: collapse;
    border-bottom: 1px solid #ddd;
    color: black;
    padding: 13px;
}
#text tr#only:hover {
    background-color: #f5f5f5;
}
#text thead tr {
    color: black;
}
#text {
    width: 100%;
    float: left;
    padding-left: 10%;
}
#table {
    width: 90%;
}
#write{
    float: right;
}
#head{
    padding-right: 70px;
}
button:hover {
    opacity: 0.8;
    background-color: grey;
    color: white;
}
input[type=text] {
    width: 30%;
    padding: 12px 10px;
    margin: 8px 0px 0px 8px;
    display: inline-block;
}
@media (max-width: 768px) {
    td.col_1{
        display:none;
        width:0;
        height:0;
        opacity:0;
        visibility: collapse;       
    } 
    th.col_2{
        display:none;
        width:0;
        height:0;
        opacity:0;
        visibility: collapse;       
    } 
}
</style>