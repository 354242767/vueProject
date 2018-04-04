import Vue from 'vue';
import Router from 'vue-router';
//页面父路由
import indexPage from '../pages/index';
import detailPage from '../pages/detail';
import orderListPage from '../pages/orderListPage';
//detail子路由
import detailAnaPage from '../components/detail/analysis';
import detailCouPage from '../components/detail/count';
import detailForPage from '../components/detail/forecast';
import detailPubPage from '../components/detail/publish';


Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: indexPage
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: orderListPage
    },
    {
      path: '/detail',
      name: 'detail',
      redirect:'/detail/analysis',
      component: detailPage,
      children:[
        {
          path: 'analysis',
          component: detailAnaPage
        },
        {
          path: 'count',
          component: detailCouPage
        },
        {
          path: 'forecast',
          component: detailForPage
        },
        {
          path: 'publish',
          component: detailPubPage
        }
      ]
    }
  ]
})

