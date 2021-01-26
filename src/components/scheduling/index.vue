<style lang="scss" scoped>
@import '~scss';
.sched{
	position: fixed;
	background-color:rgba(0,0,0,0.5);
	top:0;
	left:0;
	width:100%;
	height:100%;
}
.sched-content{
	background-color:#fff;
    position: absolute;
    bottom:0;
    left:0;
    right:0;
}
.sched-title{
	padding:0.4rem;
	@include bpadkJ;
}
.sched-list{
	@include bpadkJ(flex-start);
	border-bottom:1px solid #eaeaea;
	li{
		border-left:1px solid #eaeaea;
		height:4.0rem;
		&:first-child{
		 border-left:0;
		}
	}
}
.sched-list-tip{
	width:0.666667rem;
	
}
.sched-list-li{
	@include flex;
	border-top:1px solid #eaeaea;
	@include bpadkJ(center);
	text-align: center;
}
.flex{
	@include flex;
}
.sched-tip{
	margin:0.733333rem 0.4rem 0.466667rem;
	font-size: 0.346667rem;
}
.color1{
	color:#7e7e7e;
}
.color2{
	color:#3096fb;
}
.color3{
	color:#999;
}
.margT20{
	margin-top:0.266667rem;
}
.margT10{
	margin-top:0.133333rem;
}
.btn-y{
 

}
.buttns{
	text-align: center;
}
.btns{
    width:9.333333rem;
    height:1.173333rem;
    line-height:1.173333rem;
    text-align: center;
    border-radius:0.106667rem;
    font-size: 0.426667rem;
    border-radius:0.56rem;
    color:#fff;
    background-color:$navBorderC;
}
.btn-n{
	background-color:#eaeaea;
}
div.type1{
	color:$navBorderC;
	background-color:#f1f9ff;
}

</style>    
<template>
	<article class="sched" @click="close">
	  <aside class="sched-content">
		 <div class="sched-title">
			<span class="fz32 block">日期</span>
			<span class="fz28 block color1">{{dateValue}}</span>
		 </div>
		 <ul class="sched-list fz26">
			<li class="clom sched-list-tip ">
				<div class="clom sched-list-li">排班</div>
				<div class="sched-list-li">上</div>
				<div class="sched-list-li">下</div>
			</li>
			<li class="clom flex" v-for="(list,index) in whenLong">
				<div class="clom sched-list-li">
					<span class="block">{{getDate(index)}}</span>
					<span class="block">{{getDay(index)}}</span>
				</div>
				<div class="sched-list-li" :class="content[index][0]&&content[index][0].sche_id?'type1':''"  @click="addTap({pIn:index,index:0})" :style="content[index][0]&&id===content[index][0].sche_id?addStyle:''" >{{content[index][0]&&content[index][0].sche_id?'预约':''}}</div>
				<div class="sched-list-li" :class="content[index][1]&&content[index][1].sche_id?'type1':''"  @click="addTap({pIn:index,index:1})" dataType="2" :style="content[index][1]&&id===content[index][1].sche_id?addStyle:''" >{{(content[index][1]&&content[index][1].sche_id?'预约':'')}}</div>
			</li>
		 </ul>
		 <div class="sched-tip">
			<h3 class="">排班信息</h3>
			 <p class="margT20">
				<span class="color3">坐诊时间：</span>
				<time class="color2">{{value.start_time?(value.start_time+'-'+value.end_time):''}}</time>
			 </p>
			 <p class="margT10">
				<span class="color3">坐诊地址：</span>
				<span class="">{{value.agency_address?(value.agency_address+' '+value.agency_name):''}}</span>
			 </p>
			 <p class="margT10">
				<span class="color3">坐诊科室：</span>
				<span class="">{{value.department_name}}</span>
			 </p>
			 <p class="margT10">
				<span class="color3">挂号费用：</span>
				<span class="">{{value.registration_fee?value.registration_fee+'元':''}}</span>
			 </p>
		 </div>
		 <v-button :buttonIf="!!id" @click="submit" buttons="下一步"></v-button>
		 <!-- <div class="buttns">
		 	<button class="fz32 btns" @click="submit" :class="[id?'btn-y':'btn-n']">下一步</button>
		 </div> -->
		  
	  </aside>
	 
	</article>
</template>
<script>


    export default {
	    data(){
	     return{
	       date:+new Date(),
	       whenLong:7,
	       dateValue:'',
	       value:[],
	       oldE:'',
	       newE:'',
	       addStyle:{
	        color:'#fff',
	        background:'#3096fb'
	       },
	       id:'',
	     }
	    },

    methods:{
	    submit(o){
	    	window.event.stopPropagation()
	    if(!this.id){
			return;
	    }
	     this.$emit('submit',this.id,this.value);

	    },
	    close(){
		    this.id = '';
		    this.value = [];
		    this.$emit('close');
	    },
	    addTap(o){
	    	
	    	 window.event.stopPropagation()
		    var e = window.event.currentTarget;
		    if(this.content[o.pIn][o.index]&&this.content[o.pIn][o.index].sche_id){
		       var time = this.content[o.pIn][o.index];
	           this.value = this.content[o.pIn][o.index];
	           this.id = this.content[o.pIn][o.index].sche_id;
		    }
	    },
	    getDate(o){
		    var time = this.date +24*60*60*1000*(o+1);
			var date = new Date(time);
			var month = date.getMonth()+1;
			var daty = date.getDate();
			month = month>9?month:('0'+month);
			daty = daty>9?daty:('0'+daty);

			return month+'-'+daty;
	    },
	    getDay(o){
		    var time = this.date +24*60*60*1000*(o+1);
			var date = new Date(time);
			var day = date.getDay();
			var data;
			switch(day){
				case 0:
				data = '周日';
				break;
				case 1:
				data = '周一';
				break;
				case 2:
				data = '周二';
				break;
				case 3:
				data = '周三';
				break;
				case 4:
				data = '周四';
				break;
				case 5:
				data = '周五';
				break;
				case 6:
				data = '周六';
				break;
			}
			return data;
	    },
    },
    mounted(){
	    var date = new Date(this.date+24*60*60*1000),date1 = new Date(this.date+24*60*60*1000*7);
	    var month = date.getMonth()+1,month1 = date1.getMonth()+1,daty = date.getDate(),daty1 = date1.getDate();
		month = month>9?month:('0'+month);
		daty = daty>9?daty:('0'+daty);
		month1 = month1>9?month1:('0'+month1);
		daty1 = daty1>9?daty1:('0'+daty1);
		this.dateValue = month+'月'+daty +'日'+' - '+month1+'月'+ daty1 +'日'
    },
        props: { 
            content: {//按钮内容
                type: Array,
                default: []
            }
           
        }
    }
</script>