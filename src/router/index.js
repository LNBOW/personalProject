import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/main/:id',
      name: 'Main',
      component: Main
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
