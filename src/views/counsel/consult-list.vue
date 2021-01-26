<template>
  <div class="consult-list">
    <div class="ifno-card" v-for="(item, i) in consultList" @click="goDetail(item)">
        <div class="list-top">
          <span>{{item.doFlag==='1' ? '咨询助手':item.docName}}</span>
          <span>{{item.professionalTitle}}</span>
          <span v-if="item.doFlag==='1'" class="status assign">未派单</span>
          <span v-else-if="item.adviceStatus==='1'" class="status await">未回复</span>
          <span v-else-if="item.adviceStatus==='2'"  class="status success">已回复</span>
        </div>
        <div>
          <span class="source">{{item.hosName}}</span>
          <span class="office">{{item.deptName}}</span>
        </div>
        <div class="describe">{{item.adviceContent}}</div>
        <div class="line"></div>
        <div class="titme">
          <span>{{item.createTime}}</span>
          <span>{{item.adviceType === '1' ? '图文咨询':item.adviceType === '2' ? '在线咨询':'电话咨询'}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
// 咨询状态
const status = {
    '1': '未回复',
    '2': '已回复',
}

  export default {
    data() {
      return {
        consultList: [],
      }
    },
    created() {
      this.getQueryStr();
    },
    mounted() {
    },
    methods: {
      getStatus (values) {
        return status[`${values}`];
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
        sessionStorage.setItem('phones',args.phone);
        sessionStorage.setItem('productId',args.productId);
        sessionStorage.setItem('pltId',args.pltId);
        this.getGraphicInformationList();
      },
    //  获取图文资讯列表
      getGraphicInformationList(){
        // this.$store.commit("setLoaderIf", true, {
        //   root: true
        // });
        this.$store.dispatch('getGraphicInformationList',{
          phone:sessionStorage.getItem('phones'),
          pltId:sessionStorage.getItem('pltId'),
          productId:sessionStorage.getItem('productId'),
          page:'1',
          size:'1000'
        }).then(res =>{
          console.log(res)
          if(res.data.code === '0'){
            this.consultList = res.data.data;
          }else {
            Toast(res.data.msg);
          }

        }).catch(err =>{
          console.log(err)
        })
      },
    //  跳转详情页面
      goDetail(item){
        this.$router.push({path:'/counsel/consult-info/:'+item.adviceId,query:{id:item.adviceId}})
      }
    }
  }
</script>


<style scoped lang="scss">

.consult-list {
  color: #333333;
  font-size: 0.3rem;
  margin: .3rem;

  .ifno-card {
    background: #fff;
    padding: .4rem;
    border-radius: .25rem;
    margin-bottom: .3rem;

    .list-top {
      margin-bottom: .2rem;

      :first-child {
        font-size: .4rem;
        font-weight: 650;
      }

      .assign {
        background: #A1A8F7;
      }

      .await {
        background: #6AB3FF;
      }

      .success {
        background: #3AD1B4;
      }

      :last-child {
        color: #fff;
        padding: .1rem;
        border-radius: 5px;
        float: right;
      }
    }

    .source {
      color: #3A3A3A;
      margin-top: .2rem;
    }

    .office {
      position: relative;
      padding-left: .1rem;
    }

    .office::before {
      content: '';
      height: 0.3rem;
      display: inline-block;
      background: #ffffff;
      position: absolute;
      width: 1px;
      bottom: 1px;
      left: 0px;
    }

    .describe {
      margin-top: .2rem;
      font-size: .4rem;
      font-weight: 650;
    }

    .line {
      border-bottom: 1px solid #ccc;
      margin-top: .2rem;
    }

    .titme {
      margin-top: .2rem;
      color: #D9D9D9;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
