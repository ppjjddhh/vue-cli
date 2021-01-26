<template>
  <section class="entrance">
      <header>
        <img :src="pic" alt="" @click="goNext(1)">
        <img :src="phone" alt="" @click="goNext(2)">
      </header>
    <van-popup v-model="show" :close-on-click-overlay="false">
      <div class="modals">
        <van-cell-group>
          <van-field v-model="editData.name" label="姓名" />
          <van-field v-model="editData.phone" type="tel" label="手机号"  maxlength="11" />
          <van-field v-model="editData.id" type="tel" label="身份证号" maxlength="18"/>
        </van-cell-group>
        <p>
          <van-button type="primary" size="small" @click="getUserMsg">提交</van-button>
        </p>
      </div>
    </van-popup>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';
import { Toast } from 'vant';
export default {
  name: "entrance",
  data() {
    return {
      pic:require('../../images/twzx_bg.png'),
      phone:require('../../images/dhzx_bg.png'),
      show:false,
      editData:{
        name:'',
        phone:'',
        id:''
      }
    }
  },
  computed: {
    ...mapGetters([])
  },
  created() {
      this.getQueryStr();
  },
  methods: {
    /* 跳转图文或电话 */
    goNext(type){
      if(type === 1){
        this.$router.push({path:'/counsel?type=1'})
      }else {
        this.$router.push({path:'/counsel?type=3'})
      }
    },
    /* 获取URL连接参数 */
    getQueryStr() {
      let search = location.href.indexOf('?');
      let qs = search !== -1 ? location.href.substring((+search + 1)) : "";
      let args = {};
      let items = qs.length ? qs.split('&') : [];
      let item = null, name = null, value = null;
      let len = items.length;
      for (let i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
          args[name] = value;
        }
      }
      sessionStorage.setItem('productId',args.productId);
      sessionStorage.setItem('pltId',args.pltId);
      if(Number(args.rewrite) === 1){
        // this.show = true;
        sessionStorage.setItem('rewrite','true');
      }else {
        sessionStorage.setItem('phones',args.phone);
        sessionStorage.setItem('userNames',args.name);
        sessionStorage.removeItem('rewrite');
      }
    },

    /* 获取用户的信息 */
    getUserMsg(){
      if(this.editData.name === ''){
        Toast('请输入姓名!');
        return false;
      }else if(this.editData.phone === ''){
        Toast('请输入手机号!');
        return false;
      }else {
        this.show = false;
        sessionStorage.setItem('phones',this.editData.phone);
        sessionStorage.setItem('userNames',this.editData.name);
      }
    }
  },
}
</script>

<style scoped lang="scss">
.entrance {
  &>header{
    padding: .3rem;
    &>img{
      width: 100%;
      margin-bottom: .1rem;
    }
  }
  .modals{
    width: 6rem;
    padding: .32rem;
    border-radius: .08rem;
    background-color: #ffffff;
    p{
      padding: .2rem 0;
      text-align: center;
    }
  }
}
</style>
<style lang="scss">
.entrance{
  .van-popup{
    background-color: transparent;
  }
}
</style>
