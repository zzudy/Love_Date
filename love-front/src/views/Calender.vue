<template>
<div id="main">
    <full-calendar :events="fcEvents" lang="en"></full-calendar>
</div>
</template>
<script>
export default {
  data () {
    return {
      fcEvents : demoEvents
    }
  },
  components : {
    'full-calendar': require('vue-fullcalendar')	
  }
}
</script>
