<template>
	<div>
		<div class="fund-summary" style="margin-top:15px;background-color:white;border: 1px solid #d3dce6;box-shadow: 0 0 4px 0 rgba(44, 77, 109, 0.2)">
			<!-- <div class="sum-item">
				<div class="item-title">
					公告序号
				</div>
				<div class="item-content item-single" >
					001
				</div>
			</div> -->
			<div class="clearfix">
				<div class="sum-item sum-double">
					<div class="item-title">
						公告主题
					</div>
					<div class="item-content item-single" >
						<el-input placeholder="请输入公告主题" class="edit-input" v-model="value3"></el-input>
					</div>
				</div>
				<div class="sum-item sum-double">
					<div class="item-title item-title2">
						公告时间
					</div>
					<div class="item-content item-single" >
						<el-date-picker type="date" v-model="time" placeholder="选择日期" style="width:220px;"></el-date-picker>
					</div>
				</div>
			</div>
			<!-- <div class="sum-item">
				<div class="item-title">
					公告类型
				</div>
				<div class="item-content item-single" >
					<el-select v-model="value" placeholder="请选择(必选)" class="edit-input">
					    <el-option
					      v-for="item in roles"
					      :label="item.roleName"
					      :value="item.id">
					    </el-option>
					</el-select>
				</div>
			</div> -->
			<!-- <div class="sum-item">
				<div class="item-title">
					发送人
				</div>
				<div class="item-content item-single clearfix" >
					<el-select v-model="value2" placeholder="请选择" class="edit-input">
					    <el-option
					      v-for="item in options2"
					      :label="item.username"
					      :value="item.id"
					      @click.native="addteam(item.id,item.image,item.username,item.rolename,item.address)">
					    </el-option>
					</el-select>
					<div class="item-team clearfix" v-for="(i,index) in team">
						<div class="head-image">
				          <img :src="i.img" style="width:100%;height:100%;border-radius:30px;">
				        </div>
				        <div class="head-word">
				          <span class="name">{{i.username}}</span><br>
				          <span class="position">{{i.role}}({{i.address}})</span>
				        </div>
				        <i class="el-icon-close" style="cursor:pointer" @click="delteam(index)"></i>
			        </div>
				</div>
			</div> -->
			<div class="sum-item">
				<div class="item-title">
					公告内容
				</div>
				<div class="item-content" >
					<textarea placeholder="请输入项目简介" class="pl-textarea" v-model="content"></textarea>
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					上传附件
				</div>
				<div class="item-content">
					<div class="uploadfile" v-for="(i,index) in filebox">
						<div class="fileimg">
							<img :src="i.img">
						</div>
						<div class="filecont">
							<div>{{i.label}}</div>
							<div class="fileoption">
								<i class="el-icon-circle-close" style="font-size:20px;float:right;margin-top:20px;margin-right:10px;cursor:pointer" @click="deletefile(index)"></i>
								<a :href="i.value" target="_blank"style="float:right;margin-top:20px;margin-right:10px;cursor:pointer">
								<i class="el-icon-information" style="font-size:20px"></i>
								</a>
							</div>
						</div>
					</div>
					<el-upload
							action="/uploadFile"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:on-success="handlesuccess"
							:default-file-list="fileList"
							>
						<div class="uploadimg">
							<i class="el-icon-plus"></i>
						</div>
					</el-upload>
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					接收对象
				</div>
				<div class="item-content" >
					<el-select v-model="valuerole" placeholder="请选择(必选)" class="edit-input" style="margin-bottom:15px;">
					    <el-option
					      v-for="item in roles"
					      :label="item.roleName"
					      :value="item.id"
					      @click.native="rolechange(item.id,item.roleName)">
					    </el-option>
					</el-select>
					<el-select v-model="value1" placeholder="请选择" class="edit-input" v-if="fund==true">
						<el-option
					      label="全部基金"
					      value="10000"
					      @click.native="rolechange(5,'投资人')">
					    </el-option>
					    <el-option
					      v-for="item in options1"
					      :label="item.name"
					      :value="item.id"
					      @click.native="tzrchange(item.id)">
					    </el-option>
					</el-select>
					<div class="personbox">
						<div class="title">
							<div class="name">{{rolename}}</div>
							<div class="chooseall">
								<el-checkbox  v-model="checkAll1" @change="handleCheckAllChange"><span style="color:#eee">全选</span></el-checkbox>
							</div>
						</div>
						<div class="contentp">
							<!-- <el-checkbox-group v-if="ceo.length!=0" v-model="checkedceo" @change="handleCheckedCitiesChange">
    							<el-checkbox v-for="city in ceo" :label="city.id" style="display:inline-block;min-width:83px;margin-bottom:10px;margin-left:0px;">{{city.name}}</el-checkbox>
  							</el-checkbox-group> -->
  							<div class="ui checkbox" v-for="i in ceo" style="display:inline-block;min-width:83px;margin-bottom:10px;margin-left:0px;">
								<input type="checkbox" :id="'check'+i.id" :checked="isChecked(i.id)" @change="check(i.id)">
								<label :for="'check'+i.id">{{i.name}}</label>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="text-align:center">
				<router-link :to="{name: 'notice-list'}" class="button grey">取消</router-link>
				<div class="button blue" style="margin-left:15px;" @click="popnotice">发布</div>
			</div>
		<div>
	</div>
</template>
<script>
import {saveUser,saveorupdateNotice} from '../../ajax/post.js'
import {getFoundationList,getRoleList,getUserList,getUserListByRole,getInvestByFoundationId} from '../../ajax/get.js'
function doctype(name){
	var img
	var x = name.split('.')[1]
	if (x == 'pdf') {
		img = '../static/img/PDF.png'
	}
	else if(x=='docx'||x=='doc'){
		img = '../static/img/word.png'
	}
	else if(x=='xls'||x=='xlsx'){
		img = '../static/img/excel.png'
	}
	else{
		img = '../static/img/qita.png'
	}
	return img
}
function FormatDate (strTime) {
    var date =(new Date(strTime)).valueOf();
    return date
}
// const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
    data() {
        return {
        	fund:false,
        	options1:[],
        	value1:'10000',
        	rolename:'',
        	valuerole:'',
        	value3:'',
        	content:undefined,
        	value2:'',
	    	options2:[],
	    	team:[],
        	time:undefined,
        	value:'',
            roles:'',
            fileList:[],
            filebox:[],
            ceo:[],
            checkAll1: false,
        	checkedceo: [],
        	isIndeterminate1: false,
        }
    },
    methods: {
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
    	isChecked(id){
			return !!this.lookup[id]
			console.log(Object.keys(this.lookup))
		},
		check(id){
			this.lookup[id] = !!!this.lookup[id]
			if (this.lookup[id]==false) {
				delete this.lookup[id]
				console.log(Object.keys(this.lookup))
			}
		},
		tzrchange(id){
			this.checkAll1 = true
    		this.ceo = []
    		this.rolename = name
    		var self = this
    		getInvestByFoundationId({
	      		foundationId:id
	      	}).then((res) => {
				res.list.forEach(function(list){
					self.ceo.push({
						id:list.id,
						name:list.name
					})
				})
				this.ceo.forEach(function(list){
					if (self.lookup[list.id]==null||self.lookup[list.id]==false) {
						self.checkAll1 = false
					}
				})
			})
		},
    	rolechange(id,name){
    		if (id == 5) {
    			this.fund = true
    		}
    		else{
    			this.fund = false
    			this.value1 = '10000'
    		}
    		this.checkAll1 = true
    		this.ceo = []
    		this.rolename = name
    		var self = this
    		getUserListByRole({
	      		roleId:id
	      	}).then((res) => {
				res.data.list.forEach(function(list){
					self.ceo.push({
						id:list.id,
						name:list.name
					})
				})
				this.ceo.forEach(function(list){
					if (self.lookup[list.id]==null||self.lookup[list.id]==false) {
						self.checkAll1 = false
					}
				})
			})	
    	},
    	getrole(){
	    	getRoleList().then((res) => {
				this.roles = res.data.list
			}) 
	    },
   //  	getRoleuser(){
   //  		var self = this
   //  		getUserListByRole({
	  //     		roleId:2
	  //     	}).then((res) => {
			// 	res.data.list.forEach(function(list){
			// 		self.ceo.push({
			// 			id:list.id,
			// 			name:list.name
			// 		})
			// 	})
			// })
			// getUserListByRole({
	  //     		roleId:6
	  //     	}).then((res) => {
	  //     		res.data.list.forEach(function(list){
			// 		self.tzzj.push({
			// 			id:list.id,
			// 			name:list.name
			// 		})
			// 	})
				
			// })
			// getUserListByRole({
	  //     		roleId:7
	  //     	}).then((res) => {
			// 	res.data.list.forEach(function(list){
			// 		self.tzjl.push({
			// 			id:list.id,
			// 			name:list.name
			// 		})
			// 	})
			// })
			// getUserListByRole({
	  //     		roleId:5
	  //     	}).then((res) => {
			// 	res.data.list.forEach(function(list){
			// 		self.tzr.push({
			// 			id:list.id,
			// 			name:list.name
			// 		})
			// 	})
			// })
   //  	},
    	popnotice(){
    		var self = this
    		var popuserid = Object.keys(this.lookup)
    		popuserid.forEach(function(list){
    			if (self.lookup[list]==false) {
					delete self.lookup[list]
				}
    		})
    		if (this.time) {
	    		this.time = FormatDate (this.time)
	    	}
	    	var file = []
	    	if (this.filebox.length!=0) {
	    		this.filebox.forEach(function(list){
	    			file.push({id:list.id})
	    		})
	    	}
	    	var d = []
	    	Object.keys(this.lookup).forEach(function(list){
	    		d.push({id:list})
	    	})
    		saveorupdateNotice({
	      		strNotice:JSON.stringify({
	      			title:this.value3,
	      			notice_time:this.time,
	      			request_users:d,
	      			files:file,
	      			content:this.content
	      		})
	      	}).then((res) => {
				swal({
			        title: "发送成功",
                    type: 'success',
                    text: "发送成功",
                    timer: 2000,
			    }, function(){
			        router.push({name:'notice-list'})
			    }) 
			}) 
    	},
    	handleCheckAllChange(event) {
    		var self = this
    		if (this.checkAll1==true) {
    			this.ceo.forEach(function(list){
	    			self.lookup[list.id] = true
	    		})
    		}
    		else{
    			this.ceo.forEach(function(list){
	    			self.lookup[list.id] = false
	    		})
    		}
    		console.log(Object(this.lookup))
    		// var ceoid =[]
    		// this.ceo.forEach(function(list){
    		// 	ceoid.push(list.id)
    		// })
      //   	this.checkedceo = event.target.checked ? this.ceoid : this.checkedceo;
      //   	this.isIndeterminate1 = false;
      	},
      	handleCheckedCitiesChange(value) {
        	let checkedCount = value.length;
        	this.checkAll1 = checkedCount === this.ceo.length;
        	this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.ceo.length;
      	},
    	getUser(){
	    	var self = this
	      	getUserList({
	      		type:0
	      	}).then((res) => {
				res.data.list.forEach(function(list){
					var photo
					if (list.photo) {
						photo = list.photo.url
					}
					else{
						photo = "../static/img/touxiang.png"
					}
					self.options2.push({address:list.address,id:list.id,username:list.name,rolename:list.role.roleName,image:photo})
				})
			})  
	    },
	    addteam(id,img,username,role,address){
  			var add = 0
  			this.team.forEach(function(list){
  				if(list.id==id){
  					add = 1
  				} 
  			})
  			if (add==0) {
  				this.team.push({id:id,img:img,username:username,role:role,address:address})
  			}
  			else{
  				swal({
	                title: "已添加该用户",
	                type: 'warning',
	                text: "已添加该用户",
	                timer: 2000,
	            })
  			} 			
  		},
  		delteam(num){
  			console.log(num)
  			this.team.splice(num, 1);
  		},
  		deletefile(num){
  			console.log(num)
  			this.filebox.splice(num, 1);
  		},
	    getrole(){
	    	getRoleList().then((res) => {
				this.roles = res.data.list
			}) 
	    },
	    handleRemove(file, fileList) {
	        console.log(file, fileList);
	    },
	    handlePreview(file) {
	        console.log(file);
	    },
	    handleprogress(event, file, fileList){
	    	this.fileList=[]
	    },
	    handlesuccess(response, file, fileList){
	      	console.log(response, file, fileList)
	      	var img = doctype(response.data.fileUrl)
	      	this.filebox.push({label:response.data.fileName,value:response.data.fileUrl,id:response.data.fileId,img:img})
	      	swal({
                title: "上传成功",
                type: 'success',
                text: "上传成功",
                timer: 2000,
            })
            this.fileList=[]
	    }
    },
    mounted:function(){
    	this.lookup = {}
    	// this.getRoleuser()
    	this.getUser()
    	this.getrole()
    	this.getfundlist()
    }
}
</script>
<style lang="less">
	.item-title{
		font-size: 14px;
	}
	.personbox{
		margin-bottom: 15px;
		vertical-align: top;
		display: inline-block;
		width: 100%;
		.title{
			height: 40px;
			background-color: #474e57;
			line-height: 40px;
			padding: 0px 15px;
			.name{
				float: left;
				color: #fff;
			}
			.chooseall{
				cursor: pointer;
				float: right;
				color: #888;
				float: right;
			}
		}
		.contentp{
			width: 100%;
			border: 1px solid #eee;
			border-top: none;
			padding: 15px;
		}
	}
	.uploadfile{
		margin-bottom: 15px;
		width: 300px;
		height: 60px;
		padding-left: 60px;
		position: relative;
		.fileimg{
			width: 60px;
			height: 60px;
			position: absolute;
			top: 0px;
			left: 0px;
			img{
				height: 100%;
				width: 100%;
			}
		}
		.filecont{
			width: 100%;
			height: 100%;
			background-color: #f1f2f7;
			padding: 10px;
			font-size: 12px;
			position: relative;
			.fileoption{
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0px;
				left: 0px;
				background-color:rgba(0, 0, 0, 0.3);
				opacity: 0;
				transition:0.5s;
				-moz-transition:0.5s; /* Firefox 4 */
				-webkit-transition:0.5s; /* Safari and Chrome */
				-o-transition:0.5s; /* Opera */
				&:hover{
					opacity:1
				}
			}
		}
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