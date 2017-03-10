<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>行业标签管理</el-breadcrumb-item>
		  	<el-breadcrumb-item :to="{ name: 'label-one' }">一级标签列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>二级标签列表</el-breadcrumb-item>
		</el-breadcrumb>
		<table class="tableStyle" style="margin-top:25px;">
			<thead>
				<tr>
					<th>标签名称</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<!-- <router-link tag="tr" :to="{name:'fund-item',query:{id:i.id}}" v-for="(i,index) in lists"> -->
				<tr v-for="(i,index) in lists">
					<td><router-link :to="{name:'label-three',query:{id:i.id,lastid:$route.query.id}}" class="link">{{i.name}}</router-link></td>
					<td>
						<router-link :to="{name:'label-three',query:{id:i.id,lastid:$route.query.id}}" class="link">查看下级标签</router-link>
						<span class="link" @click="dellabel(i.id)">删除</span>
					</td>
				</tr>
				<!-- </router-link> -->
			</tbody>
		</table>
		<div>
			<div>
				<span>标签名称：</span>
				<el-input placeholder="请输入项目名称" class="edit-input" v-model="name"></el-input>
				<div class="button blue" style="margin:10px auto;" @click="addlabel">新建</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {Item, saveorupdateVocation, deleteVocation} from '../../ajax/post.js'
	import {getFoundationList,vocationThreeList} from '../../ajax/get.js'
	export default {
		data() {
	      	return {
	      		name:null,
	      		lists:''
	      	}
	    },
	    methods:{
	    	dellabel(id){
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
		    		deleteVocation({
		    			vocationId:id
		    		}).then((res) => {
						self.getfundlist()
						swal({
		                    title: "删除成功",
		                    type: 'success',
		                    text: "删除成功",
		                    timer: 2000,
		                })
					}) 
				})
	    	},
	    	addlabel(){
	    		saveorupdateVocation({
	    			type:1,
	    			name:this.name,
	    			parent_id:this.$route.query.id
	    		}).then((res) => {
					this.getfundlist()
					this.name = null
				}) 
	    	},
	    	getfundlist(){
		    	var self = this
		    	vocationThreeList({
		    		vocationTwoId:this.$route.query.id
		    	}).then((res) => {
					this.lists = res.vocationThreeList
				}) 
		    }
	    },
	    mounted:function(){
	    	this.getfundlist()
	    }
	}
</script>
<style lang="less">
	.link{
		cursor: pointer;
		&:hover{
			color: #4990e2;
		}
	}
</style>