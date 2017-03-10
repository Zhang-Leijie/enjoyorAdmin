<template>
	<div>
		<div class="fund-summary">
			<div class="sum-item">
				<div class="item-title">
					融资纪录
				</div>
				<div class="item-content item-single">
					<textarea placeholder="请输入融资纪录" class="pl-textarea" v-model="info.finance_record"></textarea>
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					所属基金
				</div>
				<div class="item-content item-single" >

					<el-select v-model="value1" placeholder="请选择" class="edit-input" v-if="options1!=[]">
						<el-option
					      label="未归属"
					      value="10000">
					    </el-option>
					    <el-option
					      v-for="item in options1"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					</el-select>
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					公司股本总额
				</div>
				<div class="item-content item-single" >
					<el-input class="edit-input" v-model="info.money_totalShare" placeholder="请输入公司总额" @blur="gbze(info.money_totalShare)">
						<template slot="prepend">¥(万元)</template>
					</el-input>
					<!-- <el-input placeholder="请输入公司股本总额" class="edit-input" v-model="info.money_totalShare"></el-input> -->
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					每股价格
				</div>
				<div class="item-content item-single" >
					<el-input class="edit-input" v-model="info.money_eachShare" placeholder="请输入每股价格" @blur="mgjg(info.money_eachShare)">
						<template slot="prepend">¥</template>
					</el-input>
					<!-- <el-input placeholder="请输入每股价格" class="edit-input" v-model="info.money_eachShare"></el-input> -->
				</div>
			</div>
			<!-- <div class="sum-item">
				<div class="item-title">
					投资／认购数量
				</div>
				<div class="item-content item-single" >
					<el-input placeholder="请输入投资／认购数量" class="edit-input" v-model="info.subscription_amount"></el-input>
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					投资／认购金额
				</div>
				<div class="item-content item-single" >
					<el-input placeholder="请输入投资／认购金额" class="edit-input" v-model="info.subscription_money"></el-input>
				</div>
			</div> -->
			<div class="sum-item">
				<div class="item-title">
					项目来源
				</div>
				<div class="item-content item-single">
					<el-select v-model="value2" placeholder="请选择" class="edit-input">
					    <el-option
					      v-for="item in options2"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</div>
			</div>
			<div class="sum-item" style="width:100%;">
				<div class="item-title">
					项目地点
				</div>
				<div class="item-content item-single" >
					<!-- <el-input placeholder="请输入项目地点" class="edit-input" v-model="info.project_address"></el-input> -->
					<el-select v-model="provinceId" placeholder="请选择省份" class="edit-input" style="float:left;margin-right:20px;" @change="getCity">
					    <el-option
					      v-for="item in province"
					      :label="item.province"
					      :value="item.provinceid"
					      @click.native="provinceName=item.province;cityId=''">
					    </el-option>
					</el-select>
					<el-select v-model="cityId" placeholder="请选择城市" class="edit-input" style="float:left">
					    <el-option
					      v-for="item in city"
					      :label="item.city"
					      :value="item.cityid"
					      @click.native="cityName=item.city">
					    </el-option>
					</el-select>
				</div>
			</div>
			<div class="clearfix">
				<div class="sum-item sum-double clearfix">
					<div class="item-title">
						项目介绍人
					</div>
					<div class="item-content item-single">
						<el-input placeholder="请输入项目介绍人" class="edit-input" v-model="info.project_introducer"></el-input>		
					</div>
				</div>
				<div class="sum-item sum-double clearfix">
					<div class="item-title item-title2">
						联系方式
					</div>
					<div class="item-content item-single">
						<el-input placeholder="请输入联系方式" class="edit-input" v-model="info.project_introducer_tel"></el-input>		
					</div>
				</div>
			</div>
			<!-- <div class="sum-item">
				<div class="item-title">
					项目评级
				</div>
				<div class="item-content" style="padding-top:40px;">
					<img src="../../assets/beijing.png" style="width:210px;height:140px;border:5px solid #d4dbe1">
				</div>
			</div> -->
			<!-- <div class="sum-item">
				<div class="item-title">
					评级纪录
				</div>
				<div class="item-content">
					<textarea class="pl-textarea" placeholder="请输入评级纪录" v-model="info.project_evaluates"></textarea>
				</div>
			</div> -->
			<div class="sum-item">
				<div class="item-title">
					最新估值
				</div>
				<div class="item-content item-single">
					<el-input class="edit-input" v-model="info.valuation_afterInvest" placeholder="请输入投后估值" @blur="thgz(info.valuation_afterInvest)">
						<template slot="prepend">¥(万元)</template>
					</el-input>
					<!-- <el-input placeholder="请输入投后估值" class="edit-input" v-model="info.valuation_afterInvest"></el-input>	 -->
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					估值商讨状态
				</div>
				<div class="item-content item-single">
					<el-input placeholder="请输入估值商讨状态" class="edit-input" v-model="info.valuation_state"></el-input>		
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					本轮投资总额
				</div>
				<div class="item-content item-single">
					<el-input class="edit-input" v-model="info.money_thisTime" placeholder="请输入本轮投资总额" @blur="tzze(info.money_thisTime)">
						<template slot="prepend">¥(万元)</template>
					</el-input>
					<!-- <el-input placeholder="请输入本轮投资总额" class="edit-input" v-model="info.money_thisTime"></el-input>	 -->		
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					占股
				</div>
				<div class="item-content item-single">
					<el-input placeholder="请输入占股" class="edit-input" v-model="info.share_common"></el-input>		
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					领投方
				</div>
				<div class="item-content item-single">
					<el-input placeholder="请输入领投方" class="edit-input" v-model="info.investment_leader"></el-input>
				</div>
			</div>
			<div class="sum-item sum-trible">
				<div class="item-title">
					银江资本投资
				</div>
				<div class="item-content item-single">
					<el-select v-model="info.enjoyor" style="width:150px;" placeholder="请选择" class="edit-input" v-if="options1!=[]">
						<el-option
					      label="无"
					      value="null">
					    </el-option>
					    <el-option
					      v-for="item in options1"
					      :label="item.name"
					      :value="item.name">
					    </el-option>
					</el-select>
					<!-- <el-input placeholder="" class="edit-input" style="width:150px;" v-model="info.enjoyor"></el-input>	 -->	
				</div>
			</div>
			<div class="sum-item sum-trible">
				<div class="item-title item-title2">
					投资金额
				</div>
				<div class="item-content item-single">
					<el-input class="edit-input" v-model="info.investment_enjoyor" placeholder="请输入投资金额" @blur="yjje(info.investment_enjoyor)" style="width:150px;">
						<template slot="prepend">¥(万元)</template>
					</el-input>
					<!-- <el-input placeholder="请输入投资金额" class="edit-input" style="width:150px;" v-model="info.investment_enjoyor"></el-input>	 -->			
				</div>
			</div>
			<div class="sum-item sum-trible">
				<div class="item-title item-title2">
					占股
				</div>
				<div class="item-content item-single">
					<el-input placeholder="请输入占股" class="edit-input" style="width:150px;" v-model="info.share_enjoyor"></el-input>			
				</div>
			</div>
			<div v-for="(i,index) in other">
				<div class="sum-item sum-trible">
					<div class="item-title">
						其他投资方
					</div>
					<div class="item-content item-single">
						{{i.other}}		
					</div>
				</div>
				<div class="sum-item sum-trible">
					<div class="item-title item-title2">
						投资金额
					</div>
					<div class="item-content item-single">
						<span v-if="i.investment_other">¥{{i.investment_other}}万元</span>			
					</div>
				</div>
				<div class="sum-item sum-trible">
					<div class="item-title item-title2">
						占股
					</div>
					<div class="item-content item-single">
						{{i.share_other}}
						<i class="el-icon-close" style="cursor:pointer;margin-left:20px;" @click="deletea(index)" ></i>
					</div>
				</div>
			</div>
			<div class="sum-item sum-trible">
				<div class="item-title">
					其他投资方
				</div>
				<div class="item-content item-single">
					<el-input placeholder="请输入其他投资方" class="edit-input" style="width:150px;" v-model="info.other"></el-input>			
				</div>
			</div>
			<div class="sum-item sum-trible">
				<div class="item-title item-title2">
					投资金额
				</div>
				<div class="item-content item-single">
					<el-input class="edit-input" v-model="info.investment_other" placeholder="请输入投资金额" @blur="qtje(info.investment_other)" style="width:150px;">
						<template slot="prepend">¥(万元)</template>
					</el-input>
					<!-- <el-input placeholder="请输入投资金额" class="edit-input" style="width:150px;" v-model="info.investment_other"></el-input> -->				
				</div>
			</div>
			<div class="sum-item sum-trible">
				<div class="item-title item-title2">
					占股
				</div>
				<div class="item-content item-single">
					<el-input placeholder="请输入占股" class="edit-input" style="width:150px;" v-model="info.share_other"></el-input>	
				</div>
			</div>
			<div style="text-align:center;margin-bottom:15px;">
				<div class="button blue" @click="addother" style="width:150px;">添加投资方</div>
			</div>
			<div style="text-align:center">
				<div class="button blue" @click="save" style="width:150px;">保存</div>
			</div>
		</div>
	</div>
</template>
<script>
import {itemDetail,getUserList,getFoundationList,getProvinceList,getCityList} from '../../ajax/get.js'
import {Item} from '../../ajax/post.js'

export default {
	props: {
		info: {
			type: Object
		}
	},
  data () {
    return {
    	city:[],
    	province:[],
    	provinceName:[],
    	cityName:[],
    	provinceId:'',
    	cityId:'',
    	other:[],
    	num:2,
    	value2:'',
    	value1:null,
    	options1:[],
    	options2: [{
		      value: '朋友推荐',
		      label: '朋友推荐'
		  }, {
		      value: '管理或合作基金',
		      label: '管理或合作基金'
		  }, {
		      value: '创业比赛',
		      label: '创业比赛'
		  }, {
		      value: '高校创业',
		      label: '高校创业'
		  }, {
		      value: '技术成果转化',
		      label: '技术成果转化'
		  }, {
		      value: '大公司高管创业',
		      label: '大公司高管创业'
		  }, {
		      value: '投资圈合投',
		      label: '投资圈合投'
		  }, {
		      value: '孵化器/加速器/创客空间',
		      label: '孵化器/加速器/创客空间'
		  }, {
		      value: '创业园区',
		      label: '创业园区'
		  }, {
		      value: '项目路演活动',
		      label: '项目路演活动'
		  }, {
		      value: 'FA',
		      label: 'FA'
		  }, {
		      value: '投资机构推送',
		      label: '投资机构推送'
		  }, {
		      value: '微信群/朋友圈',
		      label: '微信群/朋友圈'
		  }, {
		      value: '创业学院',
		      label: '创业学院'
		  }, {
		      value: '个人/公司邮箱',
		      label: '个人/公司邮箱'
		  }, {
		      value: '股东/高管推送',
		      label: '股东/高管推送'
		  }]
    }
  },
  	methods: {
  		useid(){
  			if (this.info.province_id) {
  				this.provinceId = this.info.province_id.toString()
  			}
  			if (this.info.city_id) {
				this.cityId = this.info.city_id.toString()
  			}
  			this.cityName = this.info.city_name
  			this.provinceName = this.info.province_name
  		},
  		getCity(){
  			// this.cityId = ''
  			getCityList({
				provinceid:this.provinceId
			}).then((res) => {
				this.city = res.cities
			}) 
  		},
  		getprovince(){
	    	getProvinceList({
				
			}).then((res) => {
				this.province = res.provinces
			}) 
	    },
  		qtje(number){
  			this.info.investment_other = this.outputmoney(number)
  		},
  		yjje(number){
  			this.info.investment_enjoyor = this.outputmoney(number)
  		},
  		tzze(number){
  			this.info.money_thisTime = this.outputmoney(number)
  		},
  		thgz(number){
  			this.info.valuation_afterInvest = this.outputmoney(number)
  		},
  		mgjg(number){
  			this.info.money_eachShare = this.outputmoney(number)
  		},
  		gbze(number){
  			this.info.money_totalShare = this.outputmoney(number)
  		},
  		outputmoney(number) {
  			console.log(1)
			number = number.replace(/\,/g, "");
			if(isNaN(number) || number == "")return "";
			number = Math.round(number * 100) / 100;
		    if (number < 0)
		        return '-' + this.outputdollars(Math.floor(Math.abs(number) - 0) + '') + this.outputcents(Math.abs(number) - 0);
		    else
		    	console.log(this.outputdollars(Math.floor(number - 0) + '') + this.outputcents(number - 0))
		        return this.outputdollars(Math.floor(number - 0) + '') + this.outputcents(number - 0);
		        // name = this.outputdollars(Math.floor(number - 0) + '') + this.outputcents(number - 0)
		},
		//格式化金额
		outputdollars(number) {
		    if (number.length <= 3)
		        return (number == '' ? '0' : number);
		    else {
		        var mod = number.length % 3;
		        var output = (mod == 0 ? '' : (number.substring(0, mod)));
		        for (var i = 0; i < Math.floor(number.length / 3); i++) {
		            if ((mod == 0) && (i == 0))
		                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
		            else
		                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
		        }
		        return (output);
		    }
		},
		outputcents(amount) {
		    amount = Math.round(((amount) - Math.floor(amount)) * 100);
		    return (amount < 10 ? '.0' + amount : '.' + amount);
		},
  		deletea(num){
  			console.log(1)
  			this.other.splice(num, 1);
  		},
  		addother(){
  			var x = this.info.other
  			var y = this.info.investment_other
  			var z = this.info.share_other
  			this.other.push({
  				project:{
  					id:this.$route.query.id
  				},
  				other:x,
  				investment_other:y,
  				share_other:z
  			})
  			this.info.other = ''
  			this.info.investment_other = ''
  			this.info.share_other = ''
  		},
  		getInfoin(){
  			if (this.info.foundation) {
				this.value1 = this.info.foundation.id
			}
			if (this.info.project_resource) {
				this.value2 = this.info.project_resource
			}
			if (this.info.investment_others) {
				var self = this
				this.info.investment_others.forEach(function(list){
					self.other.push({
		  				project:{
		  					id:self.$route.query.id
		  				},
		  				other:list.other,
		  				investment_other:list.investment_other,
		  				share_other:list.share_other,
		  			})
				})
			}
	    },
	    getInfodata(){
	    	itemDetail({
				id:this.$route.query.id
			}).then((res) => {
				this.info = res.data.project
				if (res.data.project.foundation) {
					this.value1 = res.data.project.foundation.id
				}
				if (res.data.project.project_resource) {
					this.value2 = res.data.project.project_resource
				}
			}) 
	    },
	    getfundlist(){
	    	var self = this
	    	getFoundationList().then((res) => {
				res.data.list.forEach(function(list){
					self.options1.push({
						id:list.id,
						name:list.name
					})
				})
			})  
	    },
	    save(){
	    	var fundation
	    	if (this.value1==null||this.value1==10000) {
	    		fundation = null
	    	}
	    	else{
	    		fundation={
	    			id:this.value1
	    		}
	    	}
	    	// var other = []
	    	if (this.other.length==0) {
	    		if (this.info.other==null||this.info.other=="") {
	    			// this.other = null
	    		}
	    		else{
	    			var x = this.info.other
		  			var y = this.info.investment_other
		  			var z = this.info.share_other
		  			this.other.push({
		  				project:{
		  					id:this.$route.query.id
		  				},
		  				other:x,
		  				investment_other:y,
		  				share_other:z
		  			})
	    		}
	    	}
	    	else{
	    		if (this.info.other==null||this.info.other=="") {
	    			// this.other = null
	    		}
	    		else{
		    		var x = this.info.other
		  			var y = this.info.investment_other
		  			var z = this.info.share_other
		  			this.other.push({
		  				project:{
		  					id:this.$route.query.id
		  				},
		  				other:x,
		  				investment_other:y,
		  				share_other:z
		  			})
	  			}
	    	}
	    	console.log(this.other)
	      	Item({
				type:1,
				strProject:JSON.stringify({
					id:this.$route.query.id,
					finance_record:this.info.finance_record,
					foundation:fundation,
					money_totalShare:this.info.money_totalShare,
					money_eachShare:this.info.money_eachShare,
					subscription_amount:this.info.subscription_amount,
					subscription_money:this.info.subscription_money,
					project_resource:this.value2,
					// project_address:this.info.project_address,
					province_id:this.provinceId,
					city_id:this.cityId,
					province_name:this.provinceName,
					city_name:this.cityName,
					project_introducer:this.info.project_introducer,
					project_introducer_tel:this.info.project_introducer_tel,
					project_evaluates:this.info.project_evaluates,
					valuation_afterInvest:this.info.valuation_afterInvest,
					valuation_state:this.info.valuation_state,
					money_thisTime:this.info.money_thisTime,
					share_common:this.info.share_common,
					investment_leader:this.info.investment_leader,
					enjoyor:this.info.enjoyor,
					investment_enjoyor:this.info.investment_enjoyor,
					share_enjoyor:this.info.share_enjoyor,
					// other:this.info.other,
					investment_others:this.other,
					// share_other:this.info.share_other
				})			
			}).then((res) => {
				this.info.other = ''
  				this.info.investment_other = ''
  				this.info.share_other = ''
				// this.getInfodata()
				swal({
	                title: "修改成功",
	                type: 'success',
	                text: "修改成功",
	                timer: 2000,
	            })
			}) 
      	}
  	},
  	mounted:function(){
  		this.getprovince()
  		this.getInfoin()
  		this.getfundlist()
  		this.useid()
  	}
}
</script>
<style lang="less" scoped>
	.el-upload__files{
		height: 30px !important;
		overflow:hidden;
	}
	.money-input{
		input{
			text-align: right;
		}
	}
	.el-input__inner{
		height: 40px !important;
	}
	@media(max-width:1200px){
	  .sum-double{
	    width: 80% !important;
	    float: none !important;
	  }
	  .sum-trible{
	    width: 80% !important;
	    float: none !important;
	  }
	  .item-title2{
	  	border-radius: 0 20px 20px 0 !important;
	  }
	}
</style>