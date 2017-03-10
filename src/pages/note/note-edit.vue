<template>
	<div>
	<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{ name: 'note-list' }">评论项目列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>评论</el-breadcrumb-item>
		</el-breadcrumb>
	<div class="person-note clearfix" style="margin-top:20px;">
		<div class="item-content" v-for="i in list">
			<div style="margin-bottom:10px;" v-if="i.commentTab.id!=1">
				<div class="block-cont n-margin">
					<div class="cont-word" style="margin-top:2px;">
						<span class="name" style="line-height:30px;">{{i.project.project_name}}</span>
					</div>
					<div class="note-label">
						<img v-if="i.commentTab.id==5" src="../../assets/touzidianping.png" style="width:80px">
						<img v-if="i.commentTab.id==2" src="../../assets/tongyilixiang.png" style="width:80px">
						<img v-if="i.commentTab.id==3" src="../../assets/tongyishanghui.png" style="width:80px">
						<img v-if="i.commentTab.id==4" src="../../assets/tongyitouzi.png" style="width:80px">
					</div>
					<div class="note-btn" @click="delnote(i.id)">
						删除
					</div>
				</div>
				<div class="right-cont">
					{{i.content}}
				</div>
			</div>
			<div style="margin-bottom:10px;" v-if="i.commentTab.id==1" class='note-left'>
				<div class="block-cont">
					<div class="cont-word" style="margin-top:2px;">
						<span class="name">{{i.project.project_name}}</span>
					</div>
					<div class="note-label">
						<img src="../../assets/fangtanjilu.png" style="width:80px">
					</div>
					<div class="note-btn" @click="delnote(i.id)">
						删除
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
	</div>
	</div>
</template>
<script>
	import {itemDetail, getUser, getNoteList ,getNoteListByProject,getNoteListByProject_back} from '../../ajax/get.js'
	import {Item, Note ,deleteNote} from '../../ajax/post.js'
	export default {
	  	data () {
		    return {
		    	list:""
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
	    	getnote(){
	    		getNoteListByProject_back({
	    			projectId:this.$route.query.id
	    		}).then((res) => {
	    			this.list = res.data
				}) 
	    	},
	    	delnote(id){
	    		var self = this
	    		swal({
			        title: "",
			        text: "确定删除",
			        type: "warning",
			        showCancelButton: true,
			        confirmButtonColor: "#DD6B55",
			        confirmButtonText: "是",
			        cancelButtonText: "否",
			        closeOnConfirm: true,
			        html: false
			    }, function(){
			    	deleteNote({
		    			noteId:id
		    		}).then((res) => {
		    			swal({
		                    title: "删除成功",
		                    type: 'success',
		                    text: "删除成功",
		                    timer: 2000,
		                })
		                self.getnote()
					}) 
			    })
	    	}
	    },
	    mounted:function(){
	    	this.getnote()
	    }
	};
</script>
<style lang="less">
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
	.right-cont{
		font-size: 14px;
		padding: 5px;
		width: 100%;
		border: 4px solid #f1f2f7;
		// min-height: 100px;
	}
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
	.person-note{
		background-color: white;
		position: relative;
		padding: 20px;	
		
	}
	.block-cont{
		margin-bottom: 3px;
		background-color: #f1f2f7;
		height: 60px;
		padding: 10px;
		.note-btn{
			margin-right: 5px;
			margin-top: 3px;
			float: right;
			color: #fff;
			padding: 5.5px 16px;
			background-color: #EE3D11;
			cursor: pointer;
		}
		.note-label{
			margin-top: 3px;
			float: right;
			color: #fff;
			// padding: 6px 16px;
			// background-color: #5ac0de;
		}
		.note-label2{
			// background-color: #51ccb3;
		}
		.right-cont{
			font-size: 14px;
			padding: 5px;
			width: 100%;
			border: 4px solid #f1f2f7;
			// min-height: 100px;
		}
	}
</style>