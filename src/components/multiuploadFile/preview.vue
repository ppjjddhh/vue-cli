<!--图片预览功能-->
<style lang="scss" scoped>
  @import '~scss';

  .img-index {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    img{
      max-width: 100%;
      height: auto;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }

</style>
<template>
  <div class="img-index" @click="closePrew" v-if="showImg">
    <Swipe :show-indicators="false" :defaultIndex="index" :auto="0">
      <SwipeItem v-for="item in imgs" :key="item.id"><img :src="item.src" alt=""></SwipeItem>
    </Swipe>
  </div>
</template>

<script>
    import {Swipe, SwipeItem} from 'mint-ui';

    export default {
        name: "preview",
        props: {
            imgs: {
                type: Array,
                default: []
            },
            index: {
                type: Number,
                default: 0
            }
        },
        components: {
            Swipe,
            SwipeItem
        },
        data() {
            return {
                showImg:false,
            }
        },
        methods: {
            closePrew() {
              this.showImg=false;
            }

        },
        created() {

        }
    }
</script>

