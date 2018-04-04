<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>流量分析</h2>
        <p>是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  购买数量：
              </div>
              <div class="sales-board-line-right">
                <v-counter :max="countNum.max" :min="countNum.min" @on-change="onParamChange('buyNum',$event)" ></v-counter>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品类型：
              </div>
              <div class="sales-board-line-right">
                  <v-selection :selections="buyTypes" @on-change="onParamChange('buyType',$event)"></v-selection>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                  <v-chooser :selections="periodList" @on-change="onParamChange('avilableTime',$event)"></v-chooser>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品版本：
              </div>
              <div class="sales-board-line-right">
                  <v-mul-chooser
                  :selections="versionList" @on-change="onParamChange('buyVersion',$event)"></v-mul-chooser>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
                  {{ price }} 元
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button" @click="gotoBuyDialog">
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>

        <h3>用户行为指标</h3>
        <ul>
          <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
          <li>用户在网站的停留时间；</li>
          <li>用户来源网站（也叫“引导网站”）；</li>
          <li>用户所使用的搜索引擎及其关键词；</li>
          <li>在不同时段的用户访问量情况等。</li>
        </ul>

        <h3>浏览网站方式</h3>
        <ul>
          <li>用户上网设备类型</li>
          <li>用户浏览器的名称和版本</li>
          <li>访问者电脑分辨率显示模式</li>
          <li>用户所使用的操作系统名称和版本</li>
          <li>用户所在地理区域分布状况等</li>
        </ul>
      </div>
      <my-dialog :is-show="isShowPayDialog" @on-close="hidePayDialog">
        <table class="buy-dialog-table">
          <tr>
            <th>购买数量</th>
            <th>产品类型</th>
            <th>有效时间</th>
            <th>产品版本</th>
            <th>总价</th>
          </tr>
          <tr>
            <td>{{ buyParms['buyNum'] }}</td>
            <td>{{ buyParms['buyType'].label }}</td>
            <td>{{ buyParms['avilableTime'].label  }}</td>
            <td v-if="buyParms['buyVersion'].length>1">
                <span v-for="item in buyParms['buyVersion']">{{ item.label }}</span>
            </td>
            <td v-else>
             {{ buyParms['buyVersion'].label  }} 
            </td>
            <td>{{ price }}</td>
          </tr>
        </table>
        <h3 class="buy-dialog-title">请选择银行</h3>
        <bank-chooser ></bank-chooser>
        <div class="button buy-dialog-btn" @click="buyConfirm">
          确认购买
        </div>
      </my-dialog>
      <my-dialog :is-show="isShowConfirmDialog" @on-close="hideConfirmDialog">
       {{ payResult }}
      </my-dialog>
      <!-- <check-order :is-show-check-dialog="isShowCheckOrder" :order-id="orderId" @on-close-check-dialog="hideCheckOrder"></check-order> -->
  </div>
</template>
<script>
import vCounter from '../base/counter'
import vChooser from '../base/chooser'
import vSelection from '../base/selection'
import vMulChooser from '../base/mulChooser'
import dialog from '../dialog'
import bankChooser from '../bankChooser'
export default {
  data(){
      return{
        isShowPayDialog:false,
        isShowConfirmDialog:false,
        price:0,
        payResult:'',
        buyParms:{
            "buyNum":'',
            "buyType":'',
            "avilableTime":'',
            "buyVersion":''
        },
        countNum:{
            min:1,
            max:10
        },
        periodList: [
            {
            label: '半年',
            value: 0
            },
            {
            label: '一年',
            value: 1
            },
            {
            label: '三年',
            value: 2
            }
        ],
        buyTypes: [
            {
            label: '入门版',
            value: 0
            },
            {
            label: '中级版',
            value: 1
            },
            {
            label: '高级版',
            value: 2
            }
        ],
        versionList: [
            {
            label: '客户版',
            value: 0
            },
            {
            label: '代理商版',
            value: 1
            },
            {
            label: '专家版',
            value: 2
            }
        ]
      }
  },
  components:{
       vCounter,
       vChooser,
       vSelection,
       vMulChooser,
       bankChooser,
       myDialog:dialog
   },
  methods:{
    hidePayDialog(){
        this.isShowPayDialog=false;
    },
    hideConfirmDialog(){
        this.isShowConfirmDialog=false;
        this.gotoOrderList()
    },
    gotoOrderList(){
        this.$router.push("/orderList")
        // this.$router.push({path:"/orderList"})
    },
    onParamChange(attr,val){
        this.buyParms[attr]=val;
        console.log(this.buyParms);
        this.$http.get('/api/getPrice').then((data)=>{
        this.price=data.data.cal;
        },(err)=>{
            console.log(err);
        })
    },
    gotoBuyDialog(){
        this.isShowPayDialog=true;
    },
    buyConfirm(){
        this.isShowPayDialog=false;
        this.$http.post('/api/getmmmmm').then((data)=>{
            if(data.data){
                this.payResult='支付成功！';
            }else{
                 this.payResult='支付失败！';
            }
        },(err)=>{
             this.payResult='支付失败！';
        })
        this.isShowConfirmDialog=true;
    }
  },
  mounted(){
      //初始化参数 ajax请求 计算价格
    this.buyParms["buyNum"]=1;
    this.buyParms["buyType"]=this.buyTypes[0];
    this.buyParms["avilableTime"]=this.periodList[0];
    this.buyParms["buyVersion"]=this.versionList[0];
    //console.log(this.buyParms);
    this.$http.get('/api/getPrice').then((data)=>{
        this.price=data.data.init;
    },(err)=>{
        console.log(err);
    })
  }
}
</script>

<style scoped>
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th{
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}
</style>
