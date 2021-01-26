const isLogin = {

	methods: {

		_ifLogin() {
			var user = this.$store.state.user.userInfo

			if (user.id && user.hight) {
				return true
			} else if (!user.id) {
				this.$router.push('/VIPInput/LS/login/1');
				return false
			} else if (!user.hight) {
				this.$router.push('/VIPInput/LS/my/user');
				return false
			}


		},
		_ifLogin2() {
			var user = this.$store.state.user.userInfo
			if (user.id) {
				return true
			} else if (!user.id) {
				this.$router.push('/VIPInput/LS/login/1');
				return false
			}


		},

	},

}
export {
	isLogin
}