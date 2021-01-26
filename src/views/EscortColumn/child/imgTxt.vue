<template>
  <section class="imgTxt">
    <article v-for="item in allData"  @click="goDetail(item)">
      <img :src="item.titleLogo" alt="医生图像">
      <div>
        <p>{{item.title}}</p>
        <p>
          <span>{{item.doctorName}}</span>
          <span>{{item.professionalTitle}}</span>
        </p>
      </div>
    </article>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "imgTxt",
  props:{
    allData:Array
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([])
  },
  created() {
    console.log(this.allData)
  },
  methods: {
    goDetail(item){
      this.$router.push({path:'/EscortColumn/escort-detail',query:{data:JSON.stringify(Object.assign(item,{from:1}))}})
    }
  },
}
</script>

<style scoped lang="scss">
.imgTxt {
  padding: .28rem .2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &>article{
    width: 49%;
    border-radius: .08rem;
    overflow: hidden;
    background-color: #ffffff;
    margin-bottom: .22rem;
    &>img{
      width: 100%;
      height: 1.8rem;
    }
    &>div{
      padding: .1rem .2rem;
      font-size: .28rem;
      color: #4C4C4C;
      &>p{
        &:nth-of-type(2){
          display: flex;
          justify-content: space-between;
          &>span{
            &:nth-of-type(1){
              font-size: .26rem;
              color: #333333;
            }
            &:nth-of-type(2){
              font-size: .24rem;
              color: #666666;
            }
          }
        }
      }
    }
  }
}
</style>
