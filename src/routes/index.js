import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
	// mode: 'history',
	base: '/h5',
	routes: [
		{
			path: '*',
			meta: {
				title: ''
			},
			props: true,
			component: () =>
				import ( /* webpackChunkName: "TJ" */ '../views/submitPage/page.vue')
		},{
			path: '/submitPage',
			meta: {
				title: ''
			},
			props: true,
			component: () =>
				import ( /* webpackChunkName: "TJ" */ '../views/submitPage/page.vue')
		},{
			path: '/registerInfo',
			meta: {
				title: '报名信息'
			},
			props: true,
			component: () =>
				import ( /* webpackChunkName: "TJ" */ '../views/submitPage/registerInfo.vue')
		},
		{
			path: '/sueess',
			meta: {
				title: '报名信息'
			},
			props: true,
			component: () =>
				import ( /* webpackChunkName: "TJ" */ '../views/submitPage/sueess.vue')
		},
		{
			path: '/counsel',
			meta: {
				title: '图文咨询'
			},
			props: true,
			component: () =>
				import ( /* webpackChunkName: "TJ" */ '../views/counsel/index.vue')
		},
		{
			path: '/counsel/success',
			meta: {
				title: '咨询结果'
			},
			props: true,
			component: () =>
				import ( /* webpackChunkName: "TJ" */ '../views/counsel/success.vue')
		},
		{
			path: '/counsel/consult-info/:id',
			meta: {
				title: '咨询详情'
			},
			props: true,
			component: () =>
				import ( /* webpackChunkName: "TJ" */ '../views/counsel/consult-info.vue')
		},
		{
			path: '/counsel/consult-list',
			meta: {
				title: '我的咨询'
			},
			props: true,
			component: () =>
				import ( /* webpackChunkName: "TJ" */ '../views/counsel/consult-list.vue')
		},
		{
			path: '/counsel/entrance',
			meta: {
				title: '咨询'
			},
			props: true,
			component: () =>
				import ( /* webpackChunkName: "TJ" */ '../views/counsel/entrance.vue')
		},
		{
			path: '/evaluation/scale-evaluation',
			meta: {
				title: '量表评估'
			},
			props: true,
			component: () =>
				import ( /* webpackChunkName: "TJ" */ '../views/evaluation/scale-evaluation.vue')
		},
		{
			path: '/datatimePicker/index',
			meta: {
				title: '时间选择'
			},
			props: true,
			component: () =>
				import ( /* webpackChunkName: "TJ" */ '../views/datatimePicker/index.vue')
		},
    {
			path: '/EscortColumn/escort-index',
			meta: {
				title: '名护专栏'
			},
			props: true,
			component: () =>
				import ( /* webpackChunkName: "TJ" */ '../views/EscortColumn/escort-index.vue')
		},
    {
			path: '/EscortColumn/escort-detail',
			meta: {
				title: '名护专栏'
			},
			props: true,
			component: () =>
				import ( /* webpackChunkName: "TJ" */ '../views/EscortColumn/escort-detail.vue')
		},
    {
      path: '/EscortColumn/escort-video-detail',
      meta: {
        title: '名护专栏'
      },
      props: true,
      component: () =>
        import ( /* webpackChunkName: "TJ" */ '../views/EscortColumn/escort-video.vue')
    },
    {
      path: '/EscortColumn/rumor',
      meta: {
        title: '谣言粉碎机'
      },
      props: true,
      component: () =>
        import ( /* webpackChunkName: "TJ" */ '../views/EscortColumn/rumor.vue')
    },
    {
      path: '/EscortColumn/rumor/detail',
      meta: {
        title: '谣言粉碎机'
      },
      props: true,
      component: () =>
        import ( /* webpackChunkName: "TJ" */ '../views/EscortColumn/rumor-detail.vue')
    },
    {
      path: '/EscortColumn/accounting-test',
      meta: {
        title: '核酸检测'
      },
      props: true,
      component: () =>
        import ( /* webpackChunkName: "TJ" */ '../views/EscortColumn/accounting-test.vue')
    },
    {
      path: '/EscortColumn/accounting-detail',
      meta: {
        title: '新冠病毒核酸/抗体检测'
      },
      props: true,
      component: () =>
        import ( /* webpackChunkName: "TJ" */ '../views/EscortColumn/accounting-detail.vue')
	},
	{
		path: '/lottery',
		meta: {
		  title: '抽奖'
		},
		props: true,
		component: () =>
		  import ( /* webpackChunkName: "TJ" */ '../views/lottery/lottery.vue')
	  },
  ]
})
