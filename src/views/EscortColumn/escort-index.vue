<template>
  <section class="escort-index">
    <van-tabs v-model="active" title-active-color="#0166E9" @change="changeTab">
      <van-tab title="图文">
        <img-txt :all-data="listData"></img-txt>
      </van-tab>
      <van-tab title="短视频">
        <video-list :all-data="listData"></video-list>
      </van-tab>
      <van-tab title="直播">
        <live :all-data="listData"></live>
        <wx-open-launch-weapp id="launch-btn"  username="gh_b0b2e8c45166" >
          <script type="text/wxtag-template">
            <style>.btn { padding: 12px }</style>
            <button class="btn">打开小程序</button>
          </script>
        </wx-open-launch-weapp>
      </van-tab>
    </van-tabs>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';
import imgTxt from "./child/imgTxt";
import videoList from "./child/videoList";
import live from "./child/live";
import {Indicator} from 'mint-ui';

export default {
  name: "escort-index",
  data() {
    return {
      active: 0,
      listData: []
    }
  },
  components: {
    imgTxt,
    videoList,
    live
  },
  computed: {
    ...mapGetters([])
  },
  created() {
    this.getEscortList()
  },
  mounted(){
    var btn = document.getElementById('launch-btn');
    btn.addEventListener('launch', function (e) {
      console.log('success');
    });
    btn.addEventListener('error', function (e) {
      console.log('fail', e.detail);
    });
  },
  methods: {
    // 监听error 函数
    handleErrorFn (e) {
      // 跳转失败
      console.log(JSON.stringify(e), '跳转失败')
    },
    // 监听launch 函数
    handleLaunchFn (e) {
      // 跳转成功
      console.log(JSON.stringify(e), '跳转成功')
    },
    /* 获取名护专栏列表内容 */
    getEscortList() {
      Indicator.open();
      this.$store.dispatch('escortList', {
        famousType: this.active + 1,
        page: 1,
        size: 1000
      }).then(res => {
        Indicator.close();
        console.log(res);
        this.listData = res.data.data;
      })
    },
    /* 切换tab */
    changeTab(name) {
      this.getEscortList();
      if (name === 2) {
        this.$store.dispatch('getWxConfig', {
          url: location.href,
          jsapi_ticket: 'sM4AOVdWfPE4DxkXGEs8VF8b_5kUt_VibF34JTk4wCIa2ybA6B3uloe_JMn0uPGUhb7mknDajyeX1Nwk2l2zHg'
        }).then(res =>{
          console.log(res);
          let data = res.data.data;
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
            appId: 'wx74730c6b19c14c09', // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名
            jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData'], // 必填，需要使用的JS接口列表
            openTagList: ['wx-open-launch-weapp'] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
          });
          wx.ready(function () {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
            console.log('ready');
            wx.checkJsApi({
              jsApiList: ['wx-open-launch-weapp'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function (res) {
                console.log('可用')
              },
              fail: (err) => {
                console.log(err, '不可用')
              }
            })
          });
          wx.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
          });
        })

      }
    }
  },
}
</script>

<style scoped lang="scss">
.escort-index {
}
</style>
<style lang="scss">
.escort-index {
  .van-tabs__line {
    background-color: #0166E9;
  }
}
</style>
