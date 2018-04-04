<template>
<div class="order-wrap">
    <div class="order-list-choose">
        <div class="order-list-option">
            选择产品：
            <v-selection :selections="products" @on-change="changeProduct"></v-selection>
        </div>
        <div class="order-list-option">
            开始日期
            <v-datepicker @on-change="changeStartDate"></v-datepicker>
        </div>
        <div class="order-list-option">
            结束日期：
            <v-datepicker @on-change="changeEndDate"></v-datepicker>
        </div>
        <div class="order-list-option">
            关键词：
            <!-- .lazy修饰符 在光标离开时触发 值才改变 -->
            <input type="text" v-model.lazy="query" class="order-query">
        </div>
    </div>
    <div class="order-list-table">
        <table>
            <tr>
                <th v-for="head in tableHeads" @click="changeSort(head)" :class="{active:head.active}">{{ head.label }}</th>
            </tr>
            <tr v-for="(item,index) in orderList">
               <template v-if="index>=nowIndex*num&&index<(nowIndex+1)*num">
                <td> {{ item.orderId }}</td>
                <td> {{ item.product }} </td>
                <td> {{ item.version }} </td>
                <td> {{ item.period }} </td>
                <td> {{ item.date }} </td>
                <td> {{ item.number }} </td>
                <td> {{ item.amount }} </td>
                </template>
            </tr>
        </table>
        <div class="order-list-table-page">
           
            <ul class="page-item">
                <li class="page-item order-list-table-page-prev" v-if="nowIndex!=0" @click="goPage(prevIndex)">上一页</li>
                <li v-for="i in this.totalPage" class="order-list-table-page-index" @click="goPage(i)" :class="{'active':(i-1)==nowIndex}">{{ i }}</li>
                <li class="page-item order-list-table-page-next" v-if="nowIndex!=totalPage-1" @click="goPage(nextIndex)">下一页</li>
            </ul>
           
        </div>
        
    </div>
</div>
</template>
<script>
import vSelection from '../components/base/selection';
import vDatepicker from '../components/base/datepicker';
export default {

    data(){
        return{
            query:'',
            productId:'',
            startDate:'',
            endDate:'',
            orderList:[],
            totalPage:0,
            num:10,
            nowIndex:0,
            products:[
                {
                    label:"母婴用品",
                    value:0
                },
                {
                    label:"日常百货",
                    value:2
                },
                {
                    label:"电子产品",
                    value:3
                },
                {
                    label:"增值服务",
                    value:4
                }

            ],
            tableHeads:[
                {
                    label:'订单号',
                    key:'orderId',
                    active:false
                },
                {
                    label:'购买产品',
                    key:'product',
                    active:false
                },
                {
                    label:'版本类型',
                    key:'version',
                    active:false
                },
                {
                    label:'有效时间',
                    key:'period',
                    active:false
                },
                {
                    label:'购买日期',
                    key:'date',
                    active:false
                },
                {
                    label:'数量',
                    key:'number',
                    active:false
                },
                {
                    label:'总价',
                    key:'amount',
                    active:false
                }
            ]
        } 
    },
    components:{
        vSelection,
        vDatepicker
    },
    watch:{
        query(){
            this.getOrderList();
        }
    },
    methods:{
        changeProduct(data){
            this.productId=data.value;
            this.getOrderList();
        },
        changeStartDate(date){
            // console.log(date);
            this.startDate=date;
            this.getOrderList();
        },
        changeEndDate(date){
            // console.log(date);
            this.endDate=date;
            this.getOrderList();
        },
        getOrderList(){
            let regParm={
                query:this.query,
                productId:this.productId,
                startDate:this.startDate,
                endDate:this.endDate,
            };
            this.$http.post('/api/getOrderList',regParm).then((data)=>{
                this.orderList=data.data;
                this.totalPage=Math.round(this.orderList.length/this.num);
                console.log(this.totalPage);
            },(err)=>{

            })
        },
        changeSort(headItem){
            //map()遍历
            this.tableHeads.map((item)=>{
                item.active=false;
            })
            if(this.currentOrder=='asc'){
                this.currentOrder='desc';
            }else if(this.currentOrder='desc'){
                this.currentOrder='asc';
            }
            headItem.active=true;
            this.orderList=_.orderBy(this.orderList,headItem.key,this.currentOrder);
        },
        goPage(index){
            this.nowIndex=index-1;
        }
    },
    computed:{
        prevIndex(){
            return this.nowIndex 
        },
        nextIndex(){
            console.log(this.nowIndex);
            return this.nowIndex +2
        }
    },
    mounted(){
        this.getOrderList();
    }

}
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
.order-list-table-page{
    width:100%;
    vertical-align: middle;
    height:30px;
}
.page-item{
    display: inline-block;
    line-height: 30px;
}
ul.page-item{
    margin: 0 10px;
}
.page-item li{
    float: left;
    padding:0 5px;
}
.page-item li.active{
    color: #4fc08d;
    text-decoration:underline;
}
.page-item li,.order-list-table-page-prev,.order-list-table-page-next{
    cursor: pointer;
}
</style>

