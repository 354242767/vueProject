<template>
    <div class="index-wrap"> 
        <div class="index-left">
            <div class="index-left-block">
                <h2>全部产品</h2>
                <template v-for="product in productList">
                    <h3>{{ product.title}}</h3>
                    <ul>
                        <li v-for="item in product.list">
                        <a :href="item.url">{{ item.title }}</a>
                        <span v-if="item.hot" class="hot-tag">HOT</span>
                        </li>
                    </ul>
                    <div v-if="!product.last" class="hr"></div>
                </template>
            </div>
            <div class="index-left-block lastest-news">
                <h2>最新消息</h2>
                <ul>
                    <li v-for="item in newsList"><a :href="item.url">{{ item.title }}</a></li>
                </ul>
            </div>
        </div>
        <div class="index-right">
            <slide-show :slides="slides" :inv="slideSpeed" @onchange="doSomeThing"></slide-show>
            <div class="index-board-list">
                <div class="index-board-item" v-for="(item,index) in boardList" :class="[{'line-last':index%2!==0},'index-board-'+item.id]">
                     <div class="index-board-item-inner">
                        <h2>{{item.title}}</h2>
                        <p>{{item.description}}</p>
                        <div class="index-board-button"><router-link :to="{path: item.url}">立即购买</router-link></div>
                     </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import slideShow from '../components/slideShow'
export default {
   name:'layout',
   components:{
       slideShow
   },
   created:function(){
       this.$http.get('api/getNewsList').then((data) => {
           this.newsList=data.data
           console.log(this.newsList)
       },(err) => {
           console.log(err)
       })
   },
   data(){
       return{
           slideSpeed:2000,
           slides:[
               {
                   src:require('../assets/images/pic1.jpg'),
                   title:'xxx1',
                   href:'detail/analysis'
               },
               {
                   src:require('../assets/images/pic2.jpg'),
                   title:'xxx2',
                   href:'detail/analysis'
               },
                {
                   src:require('../assets/images/pic3.jpg'),
                   title:'xxx3',
                   href:'detail/analysis'
               },
                {
                   src:require('../assets/images/pic4.jpg'),
                   title:'xxx4',
                   href:'detail/analysis'
               }
                
           ],
           boardList:[
               {
                   title:'开放产品',
                   description:'开放产品是一款开放的产品',
                   id:'car',
                   url:'/detail/analysis',
                   saleout:false
               }, 
               {
                   title:'开放产品',
                   description:'开放产品是一款开放的产品',
                   id:'earth',
                   url:'/detail/forecast',
                   saleout:false
               }, 
               {
                   title:'开放产品',
                   description:'开放产品是一款开放的产品',
                   id:'hill',
                   url:'/detail/publish',
                   saleout:false
               }, 
               {
                   title:'开放产品',
                   description:'开放产品是一款开放的产品',
                   id:'loud',
                   url:'/detail/count',
                   saleout:false
               },
           ],
           newsList:[],
           productList:{
               pc:{
                   title:'电脑产品',
                   list:[
                       {
                            title:'数据统计',
                            url:''
                       },
                       {
                            title:'数据预测',
                            url:''
                       },
                       {
                            title:'广告发布',
                            url:''
                       },
                       {
                            title:'数据分析',
                            url:'',
                            hot:true
                       }
                   ]

               },
               app:{
                   title:'手机应用类',
                   list:[
                       {
                            title:'智能助手',
                            url:''
                       },
                       {
                            title:'智能地图',
                            url:'',
                            hot:true
                       },
                       {
                            title:'产品语音',
                            url:''
                       },
                       {
                            title:'最新app',
                            url:''
                            
                       }
                   ],
                   last:true
               }
           }
       }
   },
   methods:{
        //子组件可以使用 $emit(event,data) 触发父组件的自定义事件
        doSomeThing(index){
            // console.log('run :'+index)
        }
      
   }
}
</script>

<style scoped>
    .index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr {
  margin-bottom: 20px;
}
.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}
.index-board-list {
  overflow: hidden;
}
.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}
.index-board-car .index-board-item-inner{
  background: url(../assets/images/1.png) no-repeat;
}
.index-board-loud .index-board-item-inner{
  background: url(../assets/images/2.png) no-repeat;
}
.index-board-earth .index-board-item-inner{
  background: url(../assets/images/3.png) no-repeat;
}
.index-board-hill .index-board-item-inner{
  background: url(../assets/images/4.png) no-repeat;
}
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
  background: #4fc08d;
  width:100px;
  height:36px;
  line-height:36px;
  text-align:center;
  color:#fff;
}
.lastest-news {
  min-height: 512px;
}
.hot-tag {
  background: red;
  color: #fff;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>