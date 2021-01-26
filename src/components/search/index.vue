<style lang="scss" scoped>
@import '~scss';
@import '../css/base.css';
    .searchs{
        @include bpadkJ;
        border-radius: 0.106667rem;
        width:6.4rem;
        background-color:#f3f4f7;
        padding:0.2rem 0.266667rem;
        color:#333;
        input{   
            background-color:transparent;
            color:#333;
            @include flex;
            margin:0 0.266667rem;
            width:1.333333rem;
        }
        .search-empty{
          @include bpadkJ(center);
          width:0.4rem;
          height:0.4rem;
          border-radius:50%;
          background-color:#c7c9d0;
          color:#fff;
          font-size: 0.213333rem;
        }
        .close{
           width:0.533333rem;
           height:0.533333rem;
           border-radius:50%;
           background-color:#b6b9c2;
           color:#fff;
           text-align:center;
           line-height:0.533333rem;
        }
    }
    .color1{
      color:#999;
    }
.search-ico{
  font-size: 0.4rem;
}
.search-input{
  font-size: 0.346667rem ;
}
</style>    
<template>
    <div class="searchs" >
       <i class="search-ico components">&#xe65a;</i>
       <input :placeholder="searchTitle" v-model="searchValue" class="search-input" >
       <i class="search-empty components" @click="searchEmpty">&#xe652;</i>
    </div>
</template>
<script>
 import { mapActions,mapState } from 'vuex'
    export default {
      data(){
        return{
           searchValue:''
        }
    },
    watch:{
      searchValue(newData,oldData){
        this.$emit('input', newData);
      },
    },
    methods:{
      searchEmpty(){
        this.searchValue = '';
      }
    },
    computed: mapState({collectionIf: state => state.user.collectionIf,moreValues:function(){return this.moreValue.split(',')}}),
        props: {
          searchTitle:{
            type:String,
            default:'搜索资讯、视频'
          },
          value:{
            type:String,
            default:''
          }
        }
    }
</script>