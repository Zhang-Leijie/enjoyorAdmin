<template>
	<div>
		<div class="fund-summary" v-show="personal==false">
			<div class="edit" @click="dialogFormVisible = true">
				<i class="el-icon-edit"></i>
				评分
			</div>
			<div  class="ratechart" id='ratechart' >
				
			</div>
			<div class="sum-item">
				<div class="item-title">
					{{time}}
				</div>
			</div>
			<div class="rate-table">
				<div class="title">
					平均分：{{item_all}}/110
				</div>
				<div class="checkmore" style="cursor:pointer" @click="checkall">查看历史评分</div>
				<table class="tableStyle">
					<thead>
						<tr>
							<th style="width:120px;">{{quarter}}季度评估</th>
							<th>独角兽潜力</th>
							<th>千亿市场</th>
							<th>前两名机会</th>
							<th>银江生态</th>
							<th>变现造血能力</th>
							<th>复制和扩张</th>
							<th>CEO综合</th>
							<th>团队运营</th>
							<th>估值性价比</th>
							<th>融资退出</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>总分：{{item_all}}</td>
							<td>{{item_one}}</td>
							<td>{{item_two}}</td>
							<td>{{item_three}}</td>
							<td>{{item_four}}</td>
							<td>{{item_five}}</td>
							<td>{{item_six}}</td>
							<td>{{item_seven}}</td>
							<td>{{item_eight}}</td>
							<td>{{item_nine}}</td>
							<td>{{item_ten}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div v-for="i in personList">
				<div class="sum-item">
					<div class="item-title">
						{{i.updateTime}}
					</div>
				</div>
				<div class="rate-table" style="padding-top:50px;">
					<div class="block-cont" style="background-color:#fff;border:none;width:70%">
						<div class="cont-img" v-if="i.user.photo">
							<img :src="i.user.photo.url" style="width:100%;height:100%">	
						</div>
						<div class="cont-img" v-else>
							<img src="../../assets/touxiang.png" style="width:100%;height:100%">
						</div>
						<div class="cont-word" style="margin-top:2px;">
							<span class="name">{{i.user.name}}</span>
							<span style="margin-left:10px;">{{i.user.position}}（{{i.user.address}}）</span><br>
						</div>
					</div>
					<div class="checkmore" style="top:70px;cursor:pointer" @click="checkperson(i.user.id)">查看历史评分</div>
					<table class="tableStyle">
						<thead>
							<tr>
								<th style="width:120px;">{{i.quarter}}季度评估</th>
								<th>独角兽潜力</th>
								<th>千亿市场</th>
								<th>前两名机会</th>
								<th>银江生态</th>
								<th>变现造血能力</th>
								<th>复制和扩张</th>
								<th>CEO综合</th>
								<th>团队运营</th>
								<th>估值性价比</th>
								<th>融资退出</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>总分：{{(i.item_all-0)/10}}</td>
								<td>{{(i.item_one-0)/10}}</td>
								<td>{{(i.item_two-0)/10}}</td>
								<td>{{(i.item_three-0)/10}}</td>
								<td>{{(i.item_four-0)/10}}</td>
								<td>{{(i.item_five-0)/10}}</td>
								<td>{{(i.item_six-0)/10}}</td>
								<td>{{(i.item_seven-0)/10}}</td>
								<td>{{(i.item_eight-0)/10}}</td>
								<td>{{(i.item_nine-0)/10}}</td>
								<td>{{(i.item_ten-0)/10}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<el-dialog title="项目评分" v-model="dialogFormVisible" class="ratebox">
		  <el-form :model="form">
		    <el-form-item label="独角兽潜力" :label-width="formLabelWidth">
		      <!-- <el-input auto-complete="off" v-model="itemown_one" placeholder="请输入独角兽潜力评分(满分10分)"></el-input> -->
		      <el-slider v-model="itemown_one" show-input :step="0.1" :min="0" :max="10"></el-slider>
		    </el-form-item>
		    <el-form-item label="千亿市场" :label-width="formLabelWidth">
		      <!-- <el-input auto-complete="off" v-model="itemown_two" placeholder="请输入千亿市场评分(满分10分)"></el-input> -->
		      <el-slider v-model="itemown_two" show-input :step="0.1" :min="0" :max="10"></el-slider>
		    </el-form-item>
		    <el-form-item label="前两名机会" :label-width="formLabelWidth">
		      <!-- <el-input auto-complete="off" v-model="itemown_three" placeholder="请输入前两名机会评分(满分10分)"></el-input> -->
		      <el-slider v-model="itemown_three" show-input :step="0.1" :min="0" :max="10"></el-slider>
		    </el-form-item>
		    <el-form-item label="银江生态" :label-width="formLabelWidth">
		      <!-- <el-input auto-complete="off" v-model="itemown_four" placeholder="请输入银江生态评分(满分10分)"></el-input> -->
		      <el-slider v-model="itemown_four" show-input :step="0.1" :min="0" :max="10"></el-slider>
		    </el-form-item>
		    <el-form-item label="变现造血能力" :label-width="formLabelWidth">
		      <!-- <el-input auto-complete="off" v-model="itemown_five" placeholder="请输入变现造血能力评分(满分10分)"></el-input> -->
		      <el-slider v-model="itemown_five" show-input :step="0.1" :min="0" :max="10"></el-slider>
		    </el-form-item>
		    <el-form-item label="复制和扩张" :label-width="formLabelWidth">
		      <!-- <el-input auto-complete="off" v-model="itemown_six" placeholder="请输入复制和扩张评分(满分10分)"></el-input> -->
		      <el-slider v-model="itemown_six" show-input :step="0.1" :min="0" :max="10"></el-slider>
		    </el-form-item>
		    <el-form-item label="CEO综合" :label-width="formLabelWidth">
		      <!-- <el-input auto-complete="off" v-model="itemown_seven" placeholder="请输入CEO综合评分(满分15分)"></el-input> -->
		      <el-slider v-model="itemown_seven" show-input :step="0.1" :min="0" :max="15"></el-slider>
		    </el-form-item>
		    <el-form-item label="团队运营" :label-width="formLabelWidth">
		      <!-- <el-input auto-complete="off" v-model="itemown_eight" placeholder="请输入团队运营评分(满分10分)"></el-input> -->
		      <el-slider v-model="itemown_eight" show-input :step="0.1" :min="0" :max="10"></el-slider>
		    </el-form-item>
		    <el-form-item label="估值性价比" :label-width="formLabelWidth">
		      <!-- <el-input auto-complete="off" v-model="itemown_nine" placeholder="请输入估值性价比评分(满分10分)"></el-input> -->
		      <el-slider v-model="itemown_nine" show-input :step="0.1" :min="0" :max="10"></el-slider>
		    </el-form-item>
		    <el-form-item label="融资退出" :label-width="formLabelWidth">
		      <!-- <el-input auto-complete="off" v-model="itemown_ten" placeholder="请输入融资退出评分(满分15分)"></el-input> -->
		      <el-slider v-model="itemown_ten" show-input :step="0.1" :min="0" :max="15"></el-slider>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer" style="text-align:center">
		  	<div class="button grey" style="margin-right:15px;" @click="dialogFormVisible = false">取消</div>
		  	<div class="button blue" @click="postRate">确定</div>
		  </div>
		</el-dialog>
		<div class="fund-summary" style="padding-top:60px;" v-show="personal==true">
			<div class="back" @click="personal=!personal">
				返回
			</div>
			<div v-for="i in allList">
				<div class="sum-item">
					<div class="item-title">
						{{i.updateTime}}
					</div>
				</div>
				<div class="rate-table" style="padding-top:50px;">
					<table class="tableStyle">
						<thead>
							<tr>
								<th style="width:120px;">{{i.quarter}}季度评估</th>
								<th>独角兽潜力</th>
								<th>千亿市场</th>
								<th>前两名机会</th>
								<th>银江生态</th>
								<th>变现造血能力</th>
								<th>复制和扩张</th>
								<th>CEO综合</th>
								<th>团队运营</th>
								<th>估值性价比</th>
								<th>融资退出</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>总分：{{(i.item_all-0)/10}}</td>
								<td>{{(i.item_one-0)/10}}</td>
								<td>{{(i.item_two-0)/10}}</td>
								<td>{{(i.item_three-0)/10}}</td>
								<td>{{(i.item_four-0)/10}}</td>
								<td>{{(i.item_five-0)/10}}</td>
								<td>{{(i.item_six-0)/10}}</td>
								<td>{{(i.item_seven-0)/10}}</td>
								<td>{{(i.item_eight-0)/10}}</td>
								<td>{{(i.item_nine-0)/10}}</td>
								<td>{{(i.item_ten-0)/10}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	// 引入 ECharts 主模块
	var echarts = require('echarts/lib/echarts');
	//引入折线图
	require('echarts/lib/chart/radar');
	// 引入提示框和标题组件
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/title');
	import { Rate } from '../../ajax/post.js'
	import { getRateList, getRatePList, getEvaluateRecordList} from '../../ajax/get.js'
	export default {
		props: {
			info: {
				type: Object
			},
			user:{
				type: Object
			}
		},
		data () {
		    return {
		    	allList:'',
		    	personList:'',
		      	personal:false,
		      	dialogTableVisible: false,
	        	dialogFormVisible: false,
	        	form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
		        formLabelWidth: '100px',
		        itemown_one:0,
		        itemown_two:0,
		        itemown_three:0,
		        itemown_four:0,
		        itemown_five:0,
		        itemown_six:0,
		        itemown_seven:0,
		        itemown_eight:0,
		        itemown_nine:0,
		        itemown_ten:0,
		        itemown_all:0,
		        item_one:'',
		        item_two:'',
		        item_three:'',
		        item_four:'',
		        item_five:'',
		        item_six:'',
		        item_seven:'',
		        item_eight:'',
		        item_nine:'',
		        item_ten:'',
		        item_all:'',
		        time:'',
		        quarter:''
		    }
		},
		methods:{
			checkperson(id){
				getEvaluateRecordList({
		      		projectId:this.$route.query.id,
		      		userId:id,
		      		number:0
		      	}).then((res) => {
		      		this.allList = res.data.list
		      		this.personal=!this.personal
				}) 
			},
			checkall(){
				getRateList({
		      		projectId:this.$route.query.id,
		      		number:0
		      	}).then((res) => {
		      		this.allList = res.data.list
		      		this.personal=!this.personal
				}) 
			},
			postRate(){
				var self = this
				swal({
			        title: "",
			        text: "确定评分",
			        type: "warning",
			        showCancelButton: true,
			        confirmButtonColor: "#DD6B55",
			        confirmButtonText: "是",
			        cancelButtonText: "否",
			        closeOnConfirm: true,
			        html: false
			    }, function(){
			        self.itemown_all = (self.itemown_one-0) + (self.itemown_two-0) + (self.itemown_three-0) + (self.itemown_four-0) + (self.itemown_five-0) + (self.itemown_six-0) +  (self.itemown_seven-0) + (self.itemown_eight-0) + (self.itemown_nine-0) + (self.itemown_ten-0)
					Rate({
						strEvaluate:JSON.stringify({
				      		project:{
				      			id:self.$route.query.id
				      		},
				      		item_one:Math.floor((self.itemown_one-0)*10),
				      		item_two:Math.floor((self.itemown_two-0)*10),
				      		item_three:Math.floor((self.itemown_three-0)*10),
				      		item_four:Math.floor((self.itemown_four-0)*10),
				      		item_five:Math.floor((self.itemown_five-0)*10),
				      		item_six:Math.floor((self.itemown_six-0)*10),
				      		item_seven:Math.floor((self.itemown_seven-0)*10),
				      		item_eight:Math.floor((self.itemown_eight-0)*10),
				      		item_nine:Math.floor((self.itemown_nine-0)*10),
				      		item_ten:Math.floor((self.itemown_ten-0)*10),
				      		item_all:Math.floor((self.itemown_all-0)*10)
			      		})
			      	}).then((res) => {
			      		self.getList()
			      		self.getPersonList()
						swal({
		                    title: "评价成功",
		                    type: 'success',
		                    text: "评价成功",
		                    timer: 2000,
		                })
		                self.dialogFormVisible = false
					}).catch((e) => {
		                swal({
		                    title: "输入有误",
		                    type: 'warn',
		                    text: "输入有误",
		                    timer: 2000,
		                })
		            }) 
			    })
			},	
		  	getDate(){
		  		var myChart = echarts.init(document.getElementById('ratechart'))
				myChart.setOption({
			        title: {
				        text: ''
				    },
				    tooltip: {},
				    // legend: {
				    //     data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
				    // },
				    radar: {
				        // shape: 'circle',
				        indicator: [
				           { name: '独角兽潜力', max: 10},
				           { name: '千亿市场', max: 10},
				           { name: '前两名机会', max: 10},
				           { name: '银江生态', max: 10},
				           { name: '变现造血能力', max: 10},
				           { name: '复制和扩张', max: 10},
				           { name: 'CEO综合', max: 15},
				           { name: '团队运营', max: 10},
				           { name: '估值性价比', max: 10},
				           { name: '融资退出', max: 15},
				        ]
				    },
				    series: [{
				        name: '评分',
				        type: 'radar',
				        // areaStyle: {normal: {}},
				        data : [
				            {
				                value : [this.item_one,this.item_two,this.item_three,this.item_four,this.item_five,this.item_six,this.item_seven,this.item_eight,this.item_nine,this.item_ten],
				                name : ''
				            }
				        ]
				    }]
			    });
		  	},
		  	getList(){
				getRateList({
		      		projectId:this.$route.query.id,
		      		number:1
		      	}).then((res) => {
		      		if (res.data.list[0]) {
		      			this.item_one = (res.data.list[0].item_one/10)
		      			this.item_two = (res.data.list[0].item_two/10)
		      			this.item_three = (res.data.list[0].item_three/10)
		      			this.item_four = (res.data.list[0].item_four/10)
		      			this.item_five = (res.data.list[0].item_five/10)
		      			this.item_six = (res.data.list[0].item_six/10)
		      			this.item_seven = (res.data.list[0].item_seven/10)
		      			this.item_eight = (res.data.list[0].item_eight/10)
		      			this.item_nine = (res.data.list[0].item_nine/10)
		      			this.item_ten = (res.data.list[0].item_ten/10)
		      			// this.item_all = (this.item_one-0) + (this.item_two-0) + (this.item_three-0) + (this.item_four-0) + (this.item_five-0) + (this.item_six-0) +  (this.item_seven-0) + (this.item_eight-0) + (this.item_nine-0) + (this.item_ten-0)
		      			this.item_all = (res.data.list[0].item_all/10)
		      			this.time = res.data.list[0].updateTime
		      			this.quarter = res.data.list[0].quarter
		      		}
		      		this.getDate()
				}) 
			},
			getPersonList(){
				getRatePList({
		      		projectId:this.$route.query.id,
		      		number:1
		      	}).then((res) => {
		      		this.personList = res.data.list
				}) 
			}
		},
		mounted:function() {
		  	this.getList()
		  	this.getPersonList()
		}
	}
</script>
<style lang="less">
	.el-input-number__decrease, .el-input-number__increase{
		top: 3px;
	} 
	.el-input .el-input--small{
		.el-input__inner{
			height: 30px !important;
		}
	}
	.ratechart{
		width: 1000px;
		margin: 40px auto 0;
		height: 350px;
	}
	.rate-table{
		text-align: center;
		width: 95%;
		margin: 10px auto;
		position: relative;
		.title{
			font-size: 18px;
			color: #666;
		}
		.checkmore{
			color: #4990e2;
			position: absolute;
			right: 0px;
			top: 10px;
		}
	}
	@media(max-width:1200px){
		.ratechart{
			width: 700px;
			margin: 40px auto 0;
			height: 350px;
		}
	}
</style>
