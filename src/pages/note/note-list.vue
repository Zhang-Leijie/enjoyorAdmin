<template>
	<div class="fund-inlist">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>评论管理</el-breadcrumb-item>
		  	<el-breadcrumb-item>评论项目列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- <div class="tableType">
			列表形式: <span>默认</span><span>项目图标</span> <span>投资基金</span> <span>投资评级</span> 
		</div> -->
		<div class="inlist-search clearfix" v-if="highsearch==true">
			<input type="text" class="fund-input" placeholder="项目名称或编码" style="float:left" v-model="search.namecode">
			<div class="button grey" style="float:left;margin-left:15px;" @click="getsearchList">
				查询
			</div>
			<div class="button grey" style="float:left;margin-left:15px;" @click="reset">
				重置
			</div>
			<div class="button blue" style="float:right" @click="highsearch=false">
				高级搜索
			</div>
		</div>
		<div class="inlist-highsearch" v-else>
			<el-input placeholder="项目名称或编码" class="searinfo" v-model="search.namecode"></el-input>
			<el-date-picker type="date" class="searinfo" v-model="search.timeB" placeholder="选择日期"></el-date-picker>
			<span style="margin-right:20px;">至</span>			
			<el-date-picker type="date" class="searinfo" v-model="search.timeE" placeholder="选择日期"></el-date-picker>
			<el-select v-model="search.schedule" placeholder="项目节点" class="searinfo2">
			<el-option
			      label="全部"
			      :value="10000">
			    </el-option>
			    <el-option
			      v-for="item in options1"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<!-- <el-select v-model="search.project_type" placeholder="项目分类" class="searinfo2">
			    <el-option
			      v-for="item in options2"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select> -->
			<el-select v-model="search.address" placeholder="项目地点" class="searinfo2" filterable>
				<el-option
			      label="无"
			      :value="undefined">
			    </el-option>
			    <el-option
			      v-for="item in city"
			      :label="item"
			      :value="item">
			    </el-option>
			</el-select>
			<!-- <el-input placeholder="项目地点" class="searinfo2" v-model="search.address"></el-input> -->
			<el-select v-model="search.resource" placeholder="项目来源" class="searinfo2">
			<el-option
			      label="全部"
			      :value="10000">
			    </el-option>
			    <el-option
			      v-for="item in options3"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-select v-model="search.userId" placeholder="项目负责人" class="searinfo2" style="margin-right:0px;">
			<el-option
			      label="全部"
			      :value="10000">
			    </el-option>
			    <el-option
			      v-for="item in options4"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<div class="btns clearfix">
				<div class="button blue" style="margin-right:20px" @click="getsearchList">
					查询
				</div>
				<div class="button blue" @click="reset">
					重置
				</div>
			</div>
			<div class="close" @click="highsearch=true">
				<i class="el-icon-close i-close"></i>
			</div>
		</div>
		<table class="tableStyle" style="margin-top:25px;">
			<thead>
				<tr>
					<th>序号</th>
					<th style="width:150px;">项目名称</th>
					<th>地点</th>
					<th>项目来源</th>
					<th>项目阶段</th>
					<!-- <th>项目负责人</th> -->
					<th>所属基金</th>
					<th>分值</th>
					<th>项目节点</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<router-link :to="{name: 'note-edit',query:{id:list.project_id}}" tag="tr" v-for="(list,index) in lists">
					<td>{{(currentPage-1)*10+index+1}}</td>
					<td class="fabu">
						<router-link :to="{name: 'note-edit',query:{id:list.iproject_id}}" class="link">{{list.project_name}}</router-link>
					</td>
					<td>{{list.province_name}}{{list.city_name}}</td>
					<td>{{list.project_resource}}</td>
					<td>{{list.project_stage}}</td>
					<!-- <td>{{list.createUser.name}}</td> -->
					<td v-if="list.foundation">{{list.foundation.name}}</td>
					<td v-else></td>
					<td v-if="list.evaluateAvg">{{list.evaluateAvg.item_all/10/list.evaluateAvg.number}}</td>
					<td v-else></td>
					<td>{{list.project_schedule_name}}</td>
					<td>
						<router-link :to="{name: 'note-edit',query:{id:list.project_id}}" class="link">查看</router-link>
					</td>
				</router-link>
			</tbody>
		</table>
		<el-pagination v-if="intotal"
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-size="10"
	      layout="total , prev, pager, next, jumper"
	      :total='intotal'
	      style="margin:20px auto;text-align:center">
	    </el-pagination>
	</div>
</template>
<script>
	import {Item} from '../../ajax/post.js'
	import {itemList,getUserList,getSearchCityList,getProjectList_back} from '../../ajax/get.js'
	export default {
	    data() {
	      return {
	      	pagenum:'',
	      	city:"",
	      	search:{
	      		namecode:null,
	      		timeB:null,
	      		timeE:null,
	      		schedule:null,
	      		// project_type:2,
	      		address:null,
	      		resource:null,
	      		userId:null
	      	},
	      	currentPage: 1,
	      	lists:'',
	      	intotal:'',
	        pickerOptions0: {
	          disabledDate(time) {
	            return time.getTime() < Date.now() - 8.64e7;
	          }
	        },
	        value1: '',
	        value2: '',
	        svalue1: '',
	        svalue2: '',
	        svalue3: '',
	        svalue4: '',
	        svalue5: '',
	        options1:[{
	        	value: '0',
	          	label: '项目录入'
	        },{
	        	value: '1',
	          	label: '同意立项'
	        },{
	        	value: '2',
	          	label: '同意上会'
	        },{
	        	value: '3',
	          	label: '已上会'
	        },{
	        	value: '4',
	          	label: '同意投资'
	        },{
	        	value: '5',
	          	label: '协议签订'
	        },{
	        	value: '6',
	          	label: '出资'
	        },{
	        	value: '7',
	          	label: '投后管理'
	        },{
	        	value: '8',
	          	label: '退出投资'
	        }],
	        options2:[{
	        	value: 2,
	          	label: '已投'
	        },{
	          	value: 3,
	          	label: '退出'
	        }],
	        options3: [{
			      value: '朋友推荐',
			      label: '朋友推荐'
			  }, {
			      value: '管理或合作基金',
			      label: '管理或合作基金'
			  }, {
			      value: '创业比赛',
			      label: '创业比赛'
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
			  }],
			options4:[],
	        options: [{
	          value: '选项1',
	          label: '选项1'
	        }, {
	          value: '选项2',
	          label: '选项2'
	        }],
	        highsearch:true
	      }
	    },
	    methods:{
	    	getCityList(){
		    	getSearchCityList({
		    		type:2,
		    		foundationId:0
		    	}).then((res) => {
					this.city = res.data.list
				}) 
		    },
	    	reset(){
	    		this.search={
		      		namecode:null,
		      		timeB:null,
		      		timeE:null,
		      		schedule:null,
		      		// project_type:2,
		      		address:null,
		      		resource:null,
		      		userId:null
		      	}
		      	this.getList()
	    	},
	    	handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		    },
		    handleCurrentChange(val) {
		        this.currentPage = val;
		        console.log(`当前页: ${val}`);
		        function FormatDate (strTime) {
				    var date =(new Date(strTime)).valueOf();
				    return date
				}
				var timeB
				var timeE
				if (this.search.timeB==null) {
					timeB = null					
				}
				else{
					timeB = FormatDate(this.search.timeB);
				}
				if (this.search.timeE==null) {
					timeE = null
				}
				else{
					timeE = FormatDate(this.search.timeE);
				}
				var data={
					// project_type:2,
					page:val,
    				line:10
				}
				if (this.search.project_type) {
					data.project_type=this.search.project_type
				}
				if (this.search.namecode) {
					data.nameorcode = this.search.namecode
				}
				if (timeB) {
					data.begin_time = timeB
				}
				if (timeE) {
					data.end_time = timeE
				}
				if (this.search.schedule&&this.search.schedule!='10000') {
					data.schedule = this.search.schedule
				}
				if (this.search.address) {
					data.address = this.search.address
				}
				if (this.search.resource&&this.search.resource!='10000') {
					data.resource = this.search.resource
				}
				if (this.search.userId&&this.search.userId!='10000') {
					data.userId = this.search.userId
				}
	    		getProjectList_back(data).then((res) => {
    				res.list.forEach(function(list){
    					if (list.project_schedule==0) {
    						list.project_schedule_name = '项目录入'
    					}
    					else if(list.project_schedule==1){
    						list.project_schedule_name = '同意立项'
    					}
    					else if(list.project_schedule==2){
    						list.project_schedule_name = '同意上会'
    					}
    					else if(list.project_schedule==3){
    						list.project_schedule_name = '已上会'
    					}
    					else if(list.project_schedule==4){
    						list.project_schedule_name = '同意投资'
    					}
    					else if(list.project_schedule==5){
    						list.project_schedule_name = '协议签订'
    					}
    					else if(list.project_schedule==6){
    						list.project_schedule_name = '出资'
    					}
    					else if(list.project_schedule==7){
    						list.project_schedule_name = '投后管理'
    					}
    					else if(list.project_schedule==8){
    						list.project_schedule_name = '退出投资'
    					}
    				})
					this.lists = res.list
					this.intotal = parseInt(res.count)
				})     
		    },
		    getUserList(){
		    	getUserList({
					type:3
				}).then((res) => {
					var self = this
					res.data.list.forEach(function(list){
						self.options4.push({
							label:list.name,
							value:list.id
						})
					})
				}) 
		    },
		    getsearchList(){
		    	function FormatDate (strTime) {
				    var date =(new Date(strTime)).valueOf();
				    return date
				}
				var timeB
				var timeE
				if (this.search.timeB==null) {
					timeB = null					
				}
				else{
					timeB = FormatDate(this.search.timeB);
				}
				if (this.search.timeE==null) {
					timeE = null
				}
				else{
					timeE = FormatDate(this.search.timeE);
				}
				var data={
					// project_type:2,
					page:1,
    				line:10
				}
				if (this.search.project_type) {
					data.project_type=this.search.project_type
				}
				if (this.search.namecode) {
					data.nameorcode = this.search.namecode
				}
				if (timeB) {
					data.begin_time = timeB
				}
				if (timeE) {
					data.end_time = timeE
				}
				if (this.search.schedule&&this.search.schedule!='10000') {
					data.schedule = this.search.schedule
				}
				if (this.search.address) {
					data.address = this.search.address
				}
				if (this.search.resource&&this.search.resource!='10000') {
					data.resource = this.search.resource
				}
				if (this.search.userId&&this.search.userId!='10000') {
					data.userId = this.search.userId
				}
	    		getProjectList_back(data).then((res) => {
    				res.list.forEach(function(list){
    					if (list.project_schedule==0) {
    						list.project_schedule_name = '项目录入'
    					}
    					else if(list.project_schedule==1){
    						list.project_schedule_name = '同意立项'
    					}
    					else if(list.project_schedule==2){
    						list.project_schedule_name = '同意上会'
    					}
    					else if(list.project_schedule==3){
    						list.project_schedule_name = '已上会'
    					}
    					else if(list.project_schedule==4){
    						list.project_schedule_name = '同意投资'
    					}
    					else if(list.project_schedule==5){
    						list.project_schedule_name = '协议签订'
    					}
    					else if(list.project_schedule==6){
    						list.project_schedule_name = '出资'
    					}
    					else if(list.project_schedule==7){
    						list.project_schedule_name = '投后管理'
    					}
    					else if(list.project_schedule==8){
    						list.project_schedule_name = '退出投资'
    					}
    				})
					this.lists = res.list
					this.intotal = parseInt(res.count)
				})    
	    	},
	    	getList(){
	    		getProjectList_back({
    				// project_type:2,
    				page:1,
    				line:10,
    				// foundationId:this.$route.query.id
    			}).then((res) => {
    				res.list.forEach(function(list){
    					if (list.project_schedule==0) {
    						list.project_schedule_name = '项目录入'
    					}
    					else if(list.project_schedule==1){
    						list.project_schedule_name = '同意立项'
    					}
    					else if(list.project_schedule==2){
    						list.project_schedule_name = '同意上会'
    					}
    					else if(list.project_schedule==3){
    						list.project_schedule_name = '已上会'
    					}
    					else if(list.project_schedule==4){
    						list.project_schedule_name = '同意投资'
    					}
    					else if(list.project_schedule==5){
    						list.project_schedule_name = '协议签订'
    					}
    					else if(list.project_schedule==6){
    						list.project_schedule_name = '出资'
    					}
    					else if(list.project_schedule==7){
    						list.project_schedule_name = '投后管理'
    					}
    					else if(list.project_schedule==8){
    						list.project_schedule_name = '退出投资'
    					}
    				})
					this.lists = res.list
					this.intotal = parseInt(res.count)
				})    
	    	}
	    },
	    mounted:function(){
	    	this.getCityList()
	    	this.getList()
	    	this.getUserList()
	    }
	}
</script>
<style lang="less">
	.fund-inlist{
		position: relative;
		.tableType{
			position: absolute;
			right: 0px;
			top: 0px;
			font-size: 12px;
			color: #666;
			span{
				margin-left: 15px;
				cursor: pointer;
			}
		}
		.inlist-search{
			margin-top: 20px;
		}
		.inlist-highsearch{
			width: 100%;
			min-height: 200px;
			background-color: #fff;
			margin-top: 20px;
			padding: 20px;
			position: relative;
			.searinfo{
				margin-right: 20px;
				display: inline-block;
				width: 240px;
				height: 40px;
			}
			.searinfo2{
				margin-top: 15px;
				margin-right: 20px;
				display: inline-block;
				width: 168px;
				height: 40px;
			}
			.btns{
				width: 100%;
				margin-top: 20px;
				text-align: center;
			}
			.close{
				top: -20px;
				right: -20px;
				position: absolute;
				background-color: #4990e2;
				width: 60px;
				height: 60px;
				border-radius: 50%;
				border: 10px solid #f1f2f7;
				text-align: center;
				.i-close{
					cursor: pointer;
					font-size: 20px;
					color: #fff;
					margin-top: 10px;
				}
			}
		}
	}
	.fund-input{
		border: 1px solid #ccc;
		width: 240px;
		height: 40px;
		padding: 12px 10px;
	}
	.link{
		&:hover{
			color: #4990e2;
		}
	}
</style>
