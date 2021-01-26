<template>
  <div>
    <div id="pageSubmit" ref="pageSubmit">
      <div>
          <img @click="next" class="bottom" src="../../images/signUpButton.png" />
      </div>
      <img src="../../images/Registration.png" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "pageSubmit",
    data() {
      return {
        isSign: false,
        signSrc: ''
      }
    },
    created() {},
    mounted() {},
    methods: {
      next(){
        this.$router.push('/registerInfo');
      },

    }
  }
</script>

<style scoped lang="scss">
  #pageSubmit {
    width: 100%;
    img {
      width: 100%;
    }

    .bottom {
      position: fixed;
      bottom: 0;
    }
  }

</style>
