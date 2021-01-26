<template>
    <div class="lottery">
        敬请期待
    </div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
  data() {
    return {
      //http://47.100.58.107:4001/api/mentalseal/v1/order/getActions?itemId=11&evalId=988&nurseId=6551
      itemId:this.$route.query.itemId,
      evalId:this.$route.query.evalId,
      nurseId:this.$route.query.nurseId,
      evaluationData:[]
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
</style>
