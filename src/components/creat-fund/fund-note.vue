<template>
	<div class="fund-note">
		<div class="edit" style="z-index:999;position:fixed;top:500px;right:0px;opacity:0.8" @click="dialogFormVisible = true">
			发表评论
		</div>
		<!-- <F_Probar></F_Probar> -->
		<div class="note-left">
			<div v-for="i in type1" style="margin-bottom:10px;">
				<div class="block-cont">
					<div class="cont-img">
						<img :src="i.photo.url" style="width:100%;height:100%">
					</div>
					<div class="cont-word" style="margin-top:2px;">
						<span class="name">{{i.user.name}}</span>
						<span style="margin-left:10px;">{{i.user.position}}（{{i.user.address}}）</span><br>
						<span>{{i.create_time}}</span>
					</div>
					<div class="note-label">
						<!-- {{i.commentTab.name}} -->
						<img src="../../assets/fangtanjilu.png" style="width:80px">
					</div>
				</div>
				<div class="clearfix">
					<div class="talk-detail">
						会议日期：{{formatDate(i.date)}}
					</div>
					<div class="talk-detail">
						会议地点：{{i.address}}
					</div>
					<div class="talk-detail">
						访谈对象：{{i.object}}
					</div>
					<div class="talk-detail">
						参与者：{{i.member}}
					</div>
				</div>
				<div class="talk-cont" style="word-break:break-all;word-warp:break-word">
					{{i.content}}
				</div>
			</div>
		</div>
		<div class="note-right">
			<div style="margin-bottom:10px;" v-for="i in type0">
				<div class="block-cont n-margin">
					<div class="cont-img">
						<img :src="i.photo.url" style="width:100%;height:100%">
					</div>
					<div class="cont-word" style="margin-top:2px;">
						<span class="name">{{i.user.name}}</span>
						<span style="margin-left:10px;">{{i.user.position}}（{{i.user.address}}）</span><br>
						<span>{{i.create_time}}</span>
					</div>
					<div class="note-label">
						<!-- {{i.commentTab.name}} -->
						<img v-if="i.commentTab.id==5" src="../../assets/touzidianping.png" style="width:80px">
						<img v-if="i.commentTab.id==2" src="../../assets/tongyilixiang.png" style="width:80px">
						<img v-if="i.commentTab.id==3" src="../../assets/tongyishanghui.png" style="width:80px">
						<img v-if="i.commentTab.id==4" src="../../assets/tongyitouzi.png" style="width:80px">
					</div>
				</div>
				<div class="right-cont" style="word-break:break-all;word-warp:break-word">
					{{i.content}}
				</div>
			</div>
		</div>
		<el-dialog title="发布评论" v-model="dialogFormVisible">
		  <el-form>
		    <el-form-item>
		      <el-select v-model="form.region" placeholder="请选择类型" style="width:220px;height:40px;">
		        <el-option
			      v-for="item in list"
			      :label="item.name"
			      :value="item.id"
			      @click.native="choose(item.type)">
			    </el-option>
		      </el-select>
		    </el-form-item>
		  </el-form>
		  <div v-if="form.type==1">
			  	<el-date-picker type="date" placeholder="选择日期" class="pl-input" v-model="form.date">
		    	</el-date-picker >
		    	<!-- <el-input placeholder="会议标题" class="pl-input"></el-input> -->
		    	<el-input placeholder="请输入会议地点" class="pl-input" v-model="form.address"></el-input>
		    	<el-input placeholder="请输入访谈对象" class="pl-input" v-model="form.object"></el-input>
		    	<el-input placeholder="参与者" class="pl-input" v-model="form.member"></el-input>
		    	<textarea class="pl-textarea" v-model="form.content" placeholder="请输入评论">
    	  </div>
    	  <div v-if="form.type==0">
    	  		<textarea class="pl-textarea" v-model="form.content" placeholder="请输入评论"></textarea>
    	  </div> 	  
		  <div slot="footer" class="dialog-footer" style="text-align:center">
		  	<div class="button grey" style="margin-right:15px;" @click="dialogFormVisible = false">取消</div>
		  	<div class="button blue" @click="note">确定</div>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
	import {itemDetail, getUser, getNoteList} from '../../ajax/get.js'
	import {Item, Note} from '../../ajax/post.js'
  	import  F_Probar from './fund-procbar'
	export default {
		props: {
			info: {
				type: Object
			}
		},
	  	data () {
		    return {
		    	type0:'',
		    	type1:'',
		    	list:"",
		        value1: '',
		      	dialogTableVisible: false,
	        	dialogFormVisible: false,
	        	form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: 3,
		          resource: '',
		          desc: '',
		          date:null,
		          address:null,
		          object:null,
		          member:null,
		          content:''
		        },
		        formLabelWidth: '80px'
		    }
		},
	    methods: {
	    	formatDate(time){
	    	  var   x = time - 0
	    	  console.log(x)
			  var   now = new Date(x) 
			  var   year = now.getFullYear();     
			  var   month = "0" + (now.getMonth()+1);     
			  var   date = "0" +(now.getDate());         
			  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)  
			},
	    	choose(type){
	    		this.form.type = type
	    	},
	    	getuser(){
	    		getUser().then((res) => {	
	    			this.list = res.data.user.role.authority.project_comments
				}) 
	    	},
	    	getnote(){
	    		getNoteList({
	    			number:0,
	    			projectId:this.$route.query.id
	    		}).then((res) => {
	    			res.data.type0.forEach(function(list){
	    				if (!list.photo) {
	    					list.photo={
	    						url:'../static/img/touxiang.png'
	    					}
	    				}
	    				// list.date = list.date.substring(0,10) 
	    			})
	    			res.data.type1.forEach(function(list){
	    				if (!list.photo) {
	    					list.photo={
	    						url:'../static/img/touxiang.png'
	    					}
	    				}
	    				// list.date = list.date.substring(0,10)
	    			})
	    			this.type0 = res.data.type0
	    			this.type1 = res.data.type1
				}) 
	    	},
	    	note(){
	    		var time = undefined
	    		if (this.form.date) {
	    			time = (new Date(this.form.date)).valueOf()
	    		}
	    		Note({
	    			strNote:JSON.stringify({
	    				project:{id:this.$route.query.id},
	    				commentTab:{id:this.form.region},
	    				content:this.form.content,
	    				date:time,
	    				address:this.form.address,
	    				member:this.form.member,
	    				object:this.form.object
	    			})
	    		}).then((res) => {	
	    			this.dialogFormVisible = false
	    			this.getnote()
	    			swal({
	                    title: "评论成功",
	                    type: 'success',
	                    text: "评论成功",
	                    timer: 2000,
	                })
	                this.form.content = ''
	                this.form.date = ''
	                this.form.address = ''
	                this.form.member = ''
	                this.form.object = ''
				})
	    	}        
	    },
	    mounted:function(){
	    	this.getuser()
	    	this.getnote()
	    },
	    components: {
		    F_Probar
		}
	};
</script>
<style lang="less">
	.el-dialog.el-dialog--small{
		width: 600px;
	}
	.el-dialog__body{
		padding: 30px 40px 0px;
	}
	.pl-input{
		&:nth-child(2n){
			margin-left: 5px;
		}
		display: inline-block;
		width: 255px;
		height: 40px;
		// float: left;
		margin-bottom: 20px;
	}
	.pl-textarea{
		width: 100%;
		height: 200px;
		border:1px solid #c0ccda;
		padding: 10px;
		font-size: 14px;
	}
	.fund-note{
		position: relative;
		padding: 20px;	
		.note-right{
			width: 49%;
			float: right;
			.right-cont{
				font-size: 14px;
				padding: 5px;
				width: 100%;
				border: 4px solid #f1f2f7;
				// min-height: 100px;
			}
		}
		.note-left{
			width: 49%;
			float: left;
			.talk-detail{
				&:nth-child(2n){
					margin-left: 1%;
				}
				margin-bottom: 3px;
				height: 30px;
				background-color: #f1f2f7;
				float: left;
				width: 49.5%;
				padding: 0px 10px;
				line-height: 30px;
			}
			.talk-cont{
				padding: 10px 5px;
				font-size: 14px;
				color: #333;
				width: 100%;
				border: 4px solid #f1f2f7;
				min-height: 100px;
			}
		}
	}
	.block-cont{
		margin-bottom: 3px;
		background-color: #f1f2f7;
		height: 60px;
		padding: 10px;
		.note-label{
			margin-top: 3px;
			float: right;
			color: #fff;
			// padding: 8px 16px;
			// background-color: #5ac0de;
		}
		.note-label2{
			// background-color: #51ccb3;
		}
	}
</style>