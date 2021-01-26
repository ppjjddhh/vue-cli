<template>
  <section class="escort-video">
    <video :src="detailData.videosUrl"  controls="controls">
      您的浏览器不支持 video 标签。
    </video>
    <main>
      <p>
        {{detailData.famousContent}}
      </p>
    </main>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "escort-video",
  data() {
    return {
      allData:'',
      detailData:''
    }
  },
  computed: {
    ...mapGetters([])
  },
  created() {
    this.getDetailData();
  },
  methods: {
    /* 获取详情 */
    getDetailData(){
      this.allData = JSON.parse(this.$route.query.data);
      this.$store.dispatch('getEscortList',{
        id:this.allData.id
      }).then( res =>{
        console.log(res);
        this.detailData = res.data.data;
      })
    },
  },
}
</script>

<style scoped lang="scss">
.escort-video {
  video{
    width: 100%;
    height: 3.4rem;
  }
  &>main{
    padding: .5rem .3rem;
    &>p{
      font-size: .34rem;
      &:nth-of-type(1){
        margin-bottom: .3rem;
      }
      &:nth-of-type(2),&:nth-of-type(3){
        font-size: .28rem;
        color: #7D7D7D;
      }
    }
  }
}
</style>
