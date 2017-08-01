import Vue from 'vue'
import Index from './index'
import Hello from './hello'
import Second from './second'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

var router = new VueRouter({
	routes: [
		{	
		name:"hello",
		path: '/Hello',
		component: Hello,
		},
		{	
		 name:"second",
		 path: '/Second',
		 component: Second,
		 }
	]
});

var vue=  new Vue({
    	el: '#app',
  	router: router,
  	render: h => h(Index)
})
router.push("/hello");
