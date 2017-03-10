<template>
	<div class="fund-summary" style="background-color:white;border: 1px solid #d3dce6;box-shadow: 0 0 4px 0 rgba(44, 77, 109, 0.2)">
		<div class="sum-item">
			<div class="item-title">
				角色类型
			</div>
			<div class="item-content item-single" >
				<el-radio class="radio" v-model="role" label="0">内部角色</el-radio>
  				<el-radio class="radio" v-model="role" label="1">外部角色</el-radio>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				角色名称
			</div>
			<div class="item-content item-single" >
				<el-input placeholder="请输入角色名称" class="edit-input" v-model="name"></el-input>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				角色权限
			</div>
			<div class="item-content item-single" >
				<el-checkbox v-model="create">项目创建</el-checkbox>
			</div>
			<div class="item-content item-single" >
				<el-checkbox v-model="edit">项目编辑(全局)</el-checkbox>
			</div>
			<div class="item-content item-single" >
				<el-checkbox v-model="rate">项目评级</el-checkbox>
			</div>
			<div class="item-content item-single" >
				<el-checkbox v-model="notice">公告发布</el-checkbox>
			</div>
			<div class="item-content item-single" >
				<span>项目评论：</span>
				<span v-for="list in tabs" style="margin-left:10px;">
	            	<el-checkbox v-model="list.check">{{list.name}}</el-checkbox>
	            </span>
			</div>
			<div class="item-content item-single" >
				<span>文件下载：</span>
				<span style="margin-left:10px;">
	            	<el-checkbox v-model="jdbg">尽调报告</el-checkbox>
	            </span>
	            <span style="margin-left:5px;">
	            	<el-checkbox v-model="zsxy">正式协议</el-checkbox>
	            </span>
	            <span style="margin-left:5px;">
	            	<el-checkbox v-model="thgl">投后管理</el-checkbox>
	            </span>
	            <span style="margin-left:5px;">
	            	<el-checkbox v-model="tctz">退出投资</el-checkbox>
	            </span>
			</div>
		</div>
		<div style="text-align:center">
			<div class="button blue" style="margin:10px auto;" @click="addrole">修改</div>
		</div>
	<div>
</template>
<script>
import {saveUser,saveorupdateRole} from '../../ajax/post.js'
import {getFoundationList,getRoleList,getCommentTabList,getRole} from '../../ajax/get.js'
export default {
    data() {
        return {
        	tabs:'',
        	role:null,
        	name:null,
        	create:false,
        	edit:false,
        	rate:false,
        	notice:false,
        	jdbg:false,
        	zsxy:false,
        	thgl:false,
        	tctz:false
        }
    },
    methods: {
        getrole(){
            getRole({
                id:this.$route.query.id
            }).then((res) => {
                this.role = res.data.role.type.toString()
                this.name = res.data.role.roleName
                if (res.data.role.authority.project_create==1) {
                    this.create = true
                }
                if (res.data.role.authority.project_edit==1) {
                    this.edit = true
                }
                if (res.data.role.authority.project_edit==1) {
                    this.edit = true
                }
                if (res.data.role.authority.project_grade==1) {
                    this.rate = true
                }
                if (res.data.role.authority.project_grade==1) {
                    this.rate = true
                }
                if (res.data.role.authority.notice_publish==1) {
                    this.notice = true
                }
                if (res.data.role.authority.file_report==1) {
                    this.jdbg = true
                }
                if (res.data.role.authority.file_schedule==1) {
                    this.zsxy = true
                }
                if (res.data.role.authority.file_manage==1) {
                    this.thgl = true
                }
                if (res.data.role.authority.file_profit==1) {
                    this.tctz = true
                }
                this.tabs.forEach(function(list){
                    res.data.role.authority.project_comments.forEach(function(inlist){
                        if (inlist.id==list.id) {
                            list.check = true
                        }
                    })
                })
            })
        },
    	addrole(){
    		var create
    		var edit
    		var comments = []
    		var rate
    		var notice
    		var jdbg
    		var zsxy
    		var thgl
    		var tctz
    		if (this.create==false) {
    			create = 0
    		}
    		else{
    			create = 1
    		}
    		if (this.edit==false) {
    			edit = 0
    		}
    		else{
    			edit = 1
    		}
    		if (this.rate==false) {
    			rate = 0
    		}
    		else{
    			rate = 1
    		}
    		if (this.notice==false) {
    			notice = 0
    		}
    		else{
    			notice = 1
    		}
    		if (this.jdbg==false) {
    			jdbg = 0
    		}
    		else{
    			jdbg = 1
    		}
    		if (this.zsxy==false) {
    			zsxy = 0
    		}
    		else{
    			zsxy = 1
    		}
    		if (this.thgl==false) {
    			thgl = 0
    		}
    		else{
    			thgl = 1
    		}
    		if (this.tctz==false) {
    			tctz = 0
    		}
    		else{
    			tctz = 1
    		}
    		this.tabs.forEach(function(list){
    			if (list.check == true) {
    				comments.push({id:list.id})
    			}
    		})

    		saveorupdateRole({
    			strRole:JSON.stringify({
                    id:this.$route.query.id,
		    		type:this.role,
		    		roleName:this.name,
		    		authority:{
		    			project_create:create,
		    			project_edit:edit,
		    			project_comments:comments,
		    			project_grade:rate,
		    			notice_publish:notice,
		    			file_report:jdbg,
		    			file_schedule:zsxy,
		    			file_manage:thgl,
		    			file_profit:tctz
		    		}
	    		})		
	    	}).then((res) => {
	    		swal({
                    title: "修改成功",
                    type: 'success',
                    text: "修改成功",
                    timer: 2000,
                })
			})
    	},
    	gettab(){
    		var self = this
	    	getCommentTabList({
	    		type:0
	    	}).then((res) => {
	    		res.data.list.forEach(function(list){
	    			list.check = false
	    		})
				this.tabs = res.data.list
                this.getrole()
			}) 
	    }
    },
    mounted:function(){
    	this.gettab()
        
    }
}
</script>
<style lang="less">
	.item-title{
		font-size: 14px;
	}
</style>