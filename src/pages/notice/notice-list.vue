<template>
	<div class="fund-inlist">
		<div class="inlist-search clearfix">
			<el-date-picker type="date" class="searinfo" v-model="search.timeB" placeholder="选择日期" style="margin-right:10px;"></el-date-picker>
			<span style="margin-right:10px;">至</span>			
			<el-date-picker type="date" class="searinfo" v-model="search.timeE" placeholder="选择日期" style="margin-right:10px;"></el-date-picker>
			<div class="button grey" style="display:inline-block;margin-left:5px;" @click="searchlist">
				查询
			</div>
			<router-link :to="{name: 'notice-create'}" class="button blue" style="float:right">
				公告发布
			</router-link>
		</div>
		<table class="tableStyle" style="margin-top:25px;">
			<thead>
				<tr>
					<th>序号</th>
					<th style="width:150px;">公告类型</th>
					<th>公告主题</th>
					<th>公告内容</th>
					<th>公告日期</th>
					<th>发送人</th>
				</tr>
			</thead>
			<tbody>
				<router-link :to="{name: 'notice-detail',query:{id:list.id}}" tag="tr" v-for="(list,index) in lists" style="cursor:pointer">
					<td>{{index+1}}</td>
					<td>{{list.type}}</td>
					<td>{{list.title}}</td>
					<td class="thenmore">{{list.content}}</td>
					<td>{{formatDate(list.notice_time)}}</td>
					<td>{{list.send_user.name}}</td>
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
	import {itemList,getUserList,getNoticeList,getNoticeList_back} from '../../ajax/get.js'
	export default {
	    data() {
	      return {
	      	search:{
	      		namecode:null,
	      		timeB:null,
	      		timeE:null,
	      		schedule:null,
	      		project_type:null,
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
	        }
	      }
	    },
	    methods:{
	    	formatDate(time)   {  
			  var   now = new Date(time)   
			  var   year = now.getFullYear();     
			  var   month = "0" + (now.getMonth()+1);     
			  var   date = "0" +(now.getDate());         
			  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)  
			},
	    	handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		    },
		    handleCurrentChange(val) {
		    	var timeb = undefined
		    	var timee = undefined
		    	if (this.search.timeB!=undefined) {
		    		timeb = (new Date(this.search.timeB)).valueOf()
		    	}
		    	if (this.search.timeE!=undefined) {
		    		timee = (new Date(this.search.timeE)).valueOf()
		    	}
		        this.currentPage = val;
		        console.log(`当前页: ${val}`);
		        getNoticeList_back({
    				begin_time:timeb,
		    		end_time:timee,
    				page:val,
    				line:10
    			}).then((res) => {
					this.lists = res.noticeList
					this.intotal = parseInt(res.count)
				})  
		    },
		    getList(){
		    	var timeb = undefined
		    	var timee = undefined
		    	if (this.search.timeB!=undefined) {
		    		timeb = (new Date(this.search.timeB)).valueOf()
		    	}
		    	if (this.search.timeE!=undefined) {
		    		timee = (new Date(this.search.timeE)).valueOf()
		    	}
		    	getNoticeList_back({
		    		begin_time:timeb,
		    		end_time:timee,
		    		page:1,
    				line:10
		    	}).then((res) => {
					this.lists = res.noticeList
					this.intotal = parseInt(res.count)
				}) 
		    },
		    searchlist(){
		    	var timeb = undefined
		    	var timee = undefined
		    	if (this.search.timeB!=undefined) {
		    		timeb = (new Date(this.search.timeB)).valueOf()
		    	}
		    	if (this.search.timeE!=undefined) {
		    		timee = (new Date(this.search.timeE)).valueOf()
		    	}
		    	getNoticeList_back({
		    		begin_time:timeb,
		    		end_time:timee,
		    		page:1,
    				line:10
		    	}).then((res) => {
					this.lists = res.noticeList
					this.intotal = parseInt(res.count)
				}) 
		    }
	    },
	    mounted:function(){
	    	this.getList()
	    }
	}
</script>
<style lang="less" scoped>
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
			.searinfo{
				margin-right: 20px;
				display: inline-block;
				width: 240px;
				height: 40px;
			}
		}
		.inlist-highsearch{
			width: 100%;
			min-height: 200px;
			background-color: #fff;
			margin-top: 20px;
			padding: 20px;
			position: relative;
			.searinfo{
				margin-right: 10px;
				display: inline-block;
				width: 240px;
				height: 40px;
			}
			.searinfo2{
				margin-top: 15px;
				margin-right: 10px;
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
	.thenmore{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
