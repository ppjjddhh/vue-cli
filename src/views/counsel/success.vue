<style scoped lang="scss">
 .submit-success {
   height: 100%;
   background: #fff;
   text-align: center;
   position: relative;

   .success-body {
     position: absolute;
     top: 20%;
     right: 50%;
     transform: translateX(50%);

     img {
       height: 3rem;
     }

    .status {
      color: #4C4C4C;
      font-size:  0.426667rem;
      font-weight: 600;

    }

    .stastu-title {
      color: #565656;
      margin-top: .2rem;
      font-size: .32rem;
    }
   }

   .check-info {
      color: #fff;
      font-size: 0.426667rem;
      width: 100%;
      position: absolute;
      bottom: 0;
      text-align: center;
      left: 50%;
      transform: translateX(-50%);
      background: #18A2FE;
      padding: .3rem;
      border: 2px solid #18A2FE;
   }
}
</style>

<template>
  <div class="submit-success">
    <div class="success-body">
      <img :src="signSrc" alt="网络异常">
      <div class="status">提交成功</div>
      <div class="stastu-title">请耐心等候，我们将尽快给您答复</div>
    </div>
    <button class="check-info" @click="gotoInfo">查看详情</button>
    <!-- <button>返回首页</button> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        signSrc: require('../../images/consulting/sueccess@2x.png'),
        id: 2,
      }
    },
    created() {

    },
    mounted() {
    },
    methods: {
      gotoInfo () {
         this.$router.push({path:'/counsel/consult-info/:'+this.$route.query.id,query:{id:this.$route.query.id}})
      }
    }
  }
</script>

