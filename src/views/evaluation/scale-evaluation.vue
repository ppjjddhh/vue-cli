<template>
    <div class="evaluation-container">
        <div class="evaluation-head">评估</div>
        <div>
            <div v-for="(item,index) in evaluationData" :key="index" class="evaluation-content">
                <div v-if="item.questionType == 'single_choice'">
                    <div class="evaluation-title">
                        {{(index+1) + '：' +item.questionContent}}
                    </div>
                    <div v-for="(citem,cindex) in item.singleChoice.answer" :key="cindex" class="evaluation-options">
                        <p>{{ (cindex+1) + ') ' + citem.content}}</p>
                    </div>
                    <div class="evaluation-choice">{{'评估：' + item.singleChoice.choice}}</div>
                </div>
                <div v-if="item.questionType == 'multi_choice'">
                    <div class="evaluation-title">
                        {{(index+1) + '：' +item.questionContent}}
                    </div>
                    <div v-for="(citem,cindex) in item.multiChoice.answer" :key="cindex" class="evaluation-options">
                        <p>{{ (cindex+1) + ') ' + citem.content.toString()}}</p>
                    </div>
                    <div class="evaluation-choice">{{'评估：' + item.multiChoice.choice}}</div>
                </div>
                <div v-if="item.questionType == 'completion'">
                    <div class="evaluation-title">
                        {{(index+1) + '：' + item.questionContent}}
                    </div>
                    <div class="evaluation-choice">
                        {{'评估：' + item.completion.content[0]}}
                        <img class="evaluation-img" :src="item.completion.imgSrc"/>
                    </div>
                </div>
            </div>
        </div>
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
    if(this.itemId && this.evalId && this.nurseId){
      this.$store.dispatch('getUserScaleEvaluation', {
        itemId:this.itemId,
        evalId:this.evalId,
        nurseId:this.nurseId,
      }).then(res => {
        if (res.data.code == '0') {
            let data = res.data.data.answer.answer
            data.forEach(ele => {
                if(ele.questionType == 'completion'){
                    if(ele.questionContent.indexOf('时间')!==-1){
                        ele.completion.content[0] = ele.completion.content[0].replace(/\$\{|\}/g, "")
                        console.log(ele.completion.content)
                    }
                    if(ele.completion.content[0].indexOf('http')!==-1){
                        let content = ele.completion.content[0].replace(/\$\{|\}/g, "")
                        ele.completion.content[0] = content.split('http')[0]
                        ele.completion.imgSrc = 'http'+ content.split('http')[1]
                    }
                }
            })
          this.evaluationData = data;
        } else {
          Toast(res.data.msg);
        }

      }).catch(err => {
        console.log(err)
      })
    }
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
  .evaluation-container{
    color: #666666;
    background: #f7f7f7;
    .evaluation-head{
      color: #111;
      font-size: .5rem;
      padding: 0.4rem .5rem;
    }
    .evaluation-content{
      background: #fff;
      margin-bottom: 0.4rem;
      padding: .5rem;
    }
    .evaluation-title{
      color: #333;
      font-size: .45rem;
      padding-bottom: 0.3rem;
    }
    .evaluation-options{
      color: #666;
      font-size: .4rem;
      padding-bottom: 0.2rem;
    }
    .evaluation-choice{
      color: #333;
      font-size: .4rem;
    }
    .evaluation-img{
        max-width:100%;
    }
  }
</style>
