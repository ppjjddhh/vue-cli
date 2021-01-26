<style lang="scss" scoped>
 .a{
  font-size: 1.0rem;
 }
</style>    
<template>
  <ul >
    <slot></slot>
  </ul>

  
</template>
<script>
    export default {
        props: {
            width:{
               type:String
            }
              
        
        }
    }
    
</script>