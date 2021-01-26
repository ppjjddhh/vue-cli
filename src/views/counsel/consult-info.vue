<template>
  <div class="consult-info">
    <div class="ifno-card">
      <img class="issue-img" :src="imgUrl.issue">
      <div class="info-issue">
        {{ allData.adviceContent }}
      </div>
      <div class="img-list">
        <img :src="item" v-for="(item, i) in allData.advicePicArr" class="issue-list-img">
      </div>
    </div>

    <div v-if="allData.adviceStatus === '1'" class="await-doctor">
      <img class="await-doctor-img" :src="imgUrl.await">
      <div class="await-title">请耐心等待，我们将尽快给您答复</div>
    </div>
    <div class="ifno-card doctor-reply" v-if="allData.adviceStatus === '2'">
      <img class="reply-img" :src="imgUrl.reply">
      <div class="reply-attention">咨询回复仅为建议，有疑问请至医院就诊</div>
      <div class="doctor-info">
        <img class="reply-doctor-img" :src="allData.headImg ? allData.headImg : imgUrl.doctor">
        <div class="introduce">
          <span class="name">{{allData.docName}}</span>
          <span class="post">{{allData.professionalTitle}}</span>
          <div>{{allData.hosName}} {{allData.deptName}}</div>
        </div>
      </div>
      <div class="info-suggest">
        {{ allData.tzReplyContent }}
      </div>
    </div>
    <button class="reply-evaluate"  @click="mark" v-if="!allData.version && allData.adviceStatus === '2'">评一下</button>

    <mt-popup
      v-model="data.sheetVisible"
      cancelText=""
      position="bottom"
    >
      <button @click="cancelPopup" class="cancel">取消</button>
      <button @click="submit" class="ok">确定</button>
      <div class="star-title">请对本次咨询进行评价</div>
      <div class="star-list">
        <img class="star-img" v-for="(item, i) of data.starList" @click="() => star(i)" :src="item">
      </div>
      <div v-if="data.grade > -1" class="opinion">{{ opinion[data.grade] }}</div>
    </mt-popup>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';

const originalData = {
  starList: [
    require('../../images/consulting/star2@2x.png'),
    require('../../images/consulting/star2@2x.png'),
    require('../../images/consulting/star2@2x.png'),
    require('../../images/consulting/star2@2x.png'),
    require('../../images/consulting/star2@2x.png'),
  ],
  sheetVisible: false,
  grade: -1,
}


export default {
  data() {
    return {
      consultInfo: {
        imgFileUrl: [
          require('../../images/consulting/sueccess@2x.png'),
          require('../../images/consulting/sueccess@2x.png'),
          require('../../images/consulting/sueccess@2x.png'),
          require('../../images/consulting/sueccess@2x.png')
        ],
        infoSuggest: '您好，你这种情况考虑接触性皮炎，不建议再使用同样的药膏贴了，过敏的地方需要外用药膏治疗，具体情况要根据皮损来定。来医院面诊或附上照片才能给出建议。',
        infoIssue: '2月份得了面瘫，从老中医那拿的面瘫药膏，贴了两个星期后，每周更换一次，第三次的时候，皮肤过敏，等过敏好了后贴药膏，又过敏、持续过敏，痒。',
        reply: false,
      },

      imgUrl: {
        issue: require('../../images/consulting/issue@2x.png'),
        reply: require('../../images/consulting/reply@2x.png'),
        await: require('../../images/hushitouxiang.png'),
        doctor: require('../../images/hushitouxiang.png'),
        star: require('../../images/consulting/star@2x.png'),
        starTwo: require('../../images/consulting/star2@2x.png')
      },
      data: {
        starList: originalData.starList,
        sheetVisible: originalData.sheetVisible,
        grade: originalData.grade,
      },
      opinion: [ // 满意评价
        '非常不满意',
        '不满意',
        '基本满意',
        '满意',
        '非常满意',
      ],
      allData: null,
      nums:null
    }
  },
  created() {
    this.getGraphicInformationDetail()
  },
  mounted() {
  },
  methods: {

    // 打开评分
    mark() {
      this.dataReset([{sheetVisible: true}], true);
    },

    // 关闭弹窗评分
    cancelPopup() {
      this.dataReset([
        'grade',
        'sheetVisible',
        'starList'
      ]);
    },

    // 提交评分
    submit() {
      this.$store.dispatch('evaluate', {
        id: this.$route.query.id,
        sore:this.nums
      }).then(res => {
        if (res.data.code === '0') {
          this.getGraphicInformationDetail();
        } else {
          Toast(res.data.msg);
        }

      }).catch(err => {
        console.log(err)
      })
      this.data.sheetVisible = false;
    },

    // 点击评分
    star(index) {
      this.nums = index+1;
      const {starList} = this.data;
      const {star, starTwo} = this.imgUrl;

      let newArr = starList.concat([]);
      this.dataReset([{grade: index}], true);

      newArr.forEach((item, i) => {
        if (index > i || index === i) {
          this.$set(starList, i, star);
        } else {
          this.$set(starList, i, starTwo);
        }
      });
    },


    /** Params
     * item Array 更新/初始化列表
     * ifUpdate booblean  更新/初始化
     */
    dataReset(item = [], ifUpdate = false) {
      const {starList} = this.data;
      const {starTwo} = this.imgUrl;
      item.forEach((current) => {
        if (ifUpdate) {
          this.data = {...this.data, ...current};
        } else {
          if (current === 'starList') {
            starList.forEach((item, i) => this.$set(starList, i, starTwo))
          } else {
            this.data[`${current}`] = originalData[`${current}`]
          }
        }
      });
    },
    /* 获取咨询详情 */
    getGraphicInformationDetail() {
      this.$store.dispatch('getGraphicInformationDetail', {
        id: this.$route.query.id
      }).then(res => {
        console.log(res)
        if (res.data.code === '0') {
          this.allData = res.data.data;
        } else {
          Toast(res.data.msg);
        }

      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped lang="scss">
#root {
  position: relative;
}

.consult-info {
  color: #333333;
  font-size: 0.3rem;

  .ifno-card {
    margin: .3rem;
    background: #fff;
    border-radius: 0.4rem;

    .issue-img,
    .reply-img {
      height: .6rem;
      margin-left: -.3rem;
      margin-top: .3rem;
    }

    .info-issue {
      padding: .3rem;
    }

    .issue-list-img {
      width: 22.5%;
      margin-right: 3%;
    }

    .issue-list-img:last-child {
      margin-right: 0;
    }
    .img-list{
      padding: .2rem .3rem;
    }
  }

  .doctor-reply {
    margin-top: .5rem;

    .reply-attention {
      color: #ABB1BF;
      font-size: .3rem;
      margin: .3rem;
    }

    .doctor-info {
      display: flex;
      justify-items: center;
      align-items: center;
      padding: .4rem;
      background: #F3F4F9;
      border-radius: 10px;
      margin: 0 .2rem 0 .2rem;

      .reply-doctor-img {
        height: 1.3rem;
      }

      .introduce {
        color: #4C4C4C;

        .name {
          color: #3A3A3A;
          font-weight: 650;
          margin-left: .1rem;
        }

        .post {
          background: #7BD6EF;
          border-radius: 5px;
          color: #fff;
          padding: .1rem;
          margin-left: .1rem;

        }

        div {
          margin-top: .1rem;
          margin-left: .1rem;
          font-size: 0.3rem;
        }
      }

    }

    .info-suggest {
      margin: .5rem .2rem 0 .2rem;
      padding-bottom: 1rem;
    }
  }

  .await-doctor {
    margin-top: 2rem;
    color: #3A3A3A;
    text-align: center;

    .await-doctor-img {
      height: 3rem;
    }

    .await-title {
      color: #3A3A3A;
    }
  }

  .reply-evaluate {
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

.mint-popup {
  width: 100%;
  height: 5rem;
  padding-left: .2rem;
  padding-right: .2rem;

  .star-list {
    position: absolute;
    background: #fff;
    justify-items: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 100%;

    .star-img {
      height: 1rem;
      margin-left: 0.3rem;
    }
  }

  .star-title {
    margin-top: 1rem;
    font-size: .4rem;
    text-align: center;
  }

  button {
    border: 2px solid #D1D1D1;
    padding: .2rem;
    border-radius: 10px;
    margin-top: .4rem;
  }

  .cancel {
    color: #666666;
    float: left;
  }

  .ok {
    color: #18A2FE;
    float: right;
    border: 1px solid #18A2FE;
  }

  .opinion {
    color: #FEB907;
    font-size: .4rem;
    font-weight: 650;
    position: absolute;
    bottom: 1rem;
    display: inline-block;
    width: 100%;
    text-align: center;
  }

}

</style>
