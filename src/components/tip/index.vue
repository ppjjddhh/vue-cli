<style lang="scss" scoped>
@import '~scss';

.tip{
	position:fixed;
	top:0;
	left:0;
	z-index:99;
	width:100%;
	height:100%;
}
.tip-content{
	border-radius:0.106667rem;
	background-color: #fff;
	box-shadow:10px 10px 40px #666666;
	position:fixed;
	top:40%;
	left:0;
	right:0;
	margin:auto;
	width:7.6rem;
	padding:0.6rem;
	.btns{
	margin-top:0.533333rem;
	text-align:right;
	.btns_ok{
	color:$navBorderC;
	}
	}

}
.tip-content-title{
	text-align:left;
	margin-top:0.4rem;
	font-size: 0.373333rem;
}
.btns_close{
	margin-right:0.933333rem;
	color:#7e7e7e;
}
</style>
<template>
	<v-bj>
	   <div class="tip-content">
	        <h2 class="fz38">提示</h2>
			<p class="tip-content-title"><span >{{tip_content}}</span></p>
			<div class="btns">
				<button class="fz28 btns_close" @click="btn_close">{{cancel_conter}}</button>
				<button class="fz28 btns_ok" @click="btn_ok">{{ok_conter}}</button>
			</div>
	   </div>
	</v-bj>
</template>
<script>
import { mapActions } from 'vuex';

    export default {

    methods:{
     btn_ok(o){this.$emit('btn_ok');},//点击确认按钮时的操作
     btn_close(o){this.$emit('btn_close');}//点击取消按钮时的操作
    },
        props: {
            tip_content: {//确认操作框提示内容
                type: String,
                default: ''
            },
            ok_conter:{//确认按钮显示文字
                type: String,
                default: '确认'
            },
            cancel_conter:{//取消按钮显示文字
                type: String,
                default: '取消'
            }
        }
    }
</script>
