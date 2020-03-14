<template>
<div id="app">
<div v-if= "!$store.state.iscoupled">
<hr>초대코드 생성</hr>
<hr>
<label for="invitee"><b>Invited ID  </b></label>
<input type="text" v-model="invitee"  placeholder="Enter Invite Email"  maxlength="100" required="">
<br>
<button type="submit" id="submit" v-on:click="create_invite">Create Invite Code</button>

<hr>초대코드 입력</hr>
<br>
<label for="invite_code"><b>Invite Code  </b></label>
<input type="text" v-model="invite_code"  placeholder="Enter Code">
<br>
<button type="submit" id="submit" v-on:click="check_invite">Confirm Invite Code</button>
</div>
</div>
</template>


<script>
export default {
    data() {
      return {
        invite_code:'',
        invitee:''
      };
  },
  created() {
    
  },
  methods: {
    create_invite: function(){
      console.log(this.invitee)
      if(this.invitee){
        this.$http.post('/auth/invite',{invitee: this.invitee})
        .then(response => {
          if(response.data.success == true){
            alert(response.data.token);
          }
            }).catch((ex) => {
            console.warn("ERROR!!!!! : ",ex)
            })
          }
      },
      check_invite: function(){
        if(this.invite_code){
        this.$http.post('/auth/matching',{token: this.invite_code})
        .then(response => {
          if(response.data.success == true){
            console.log(response.data.message);
          }
            }).catch((ex) => {
            console.warn("ERROR!!!!! : ",ex)
            })
          }
      }
  },
}

</script>
