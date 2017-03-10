<template>
	<div class="fund-summary" style="background-color:white;border: 1px solid #d3dce6;box-shadow: 0 0 4px 0 rgba(44, 77, 109, 0.2)">
		<div class="sum-item">
			<div class="item-title">
				基金名称
			</div>
			<div class="item-content item-single" >
				<el-input placeholder="请输入基金名称" class="edit-input" v-model="name"></el-input>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				基金金额
			</div>
			<div class="item-content item-single" >
				<el-input placeholder="请输入基金名称" class="edit-input" v-model="money"></el-input>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				负责人
			</div>
			<div class="item-content item-single" >
				<el-select v-model="value" filterable placeholder="请选择(必选)" class="edit-input">
				    <el-option
				      v-for="item in roles"
				      :label="item.name"
				      :value="item.name">
				    </el-option>
				</el-select>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				关联外部角色
			</div>
			<div class="item-content item-single" >
				<span v-for="list in outroles" style="margin-left:10px;">
	            	<el-checkbox v-model="list.check">{{list.name}}</el-checkbox>
	            </span>
			</div>
		</div>
		<div style="text-align:center">
			<div class="button blue" style="margin:10px auto;" @click="addfund">修改</div>
		</div>
	<div>
</template>
<script>
import {saveorupdateCommentTab,saveorupdateFoundation} from '../../ajax/post.js'
import {getUserList,getFoundation} from '../../ajax/get.js'
export default {
    data() {
        return {
        	value:'',
        	role:null,
        	name:null,
        	money:null,
        	send:false,
        	roles:'',
        	outroles:''
        }
    },
    methods: {
    	getfund(){
    		getFoundation({
	    		id:this.$route.query.id,
	    	}).then((res) => {
	    		var self = this
	    		this.name = res.data.foundation.name
	    		this.money = res.data.foundation.money
	    		this.value = res.data.foundation.responsibility
	    		this.outroles.forEach(function(list){
	    			res.data.foundation.list_user.forEach(function(inlist){
	    				if (list.id==inlist.id) {
	    					list.check = true
	    				}
	    			})
	    		})
			})
    	},
    	addfund(){
    		var lists = []
    		this.outroles.forEach(function(list){
    			if (list.check == true) {
    				lists.push({id:list.id})
    			}
    		})
    		saveorupdateFoundation({
	    		strFoundation:JSON.stringify({
	    			id:this.$route.query.id,
	    			name:this.name,
	    			responsibility:this.value,
	    			money:this.money,
	    			list_user:lists
	    		})
	    	}).then((res) => {
	    		swal({
                    title: "新建成功",
                    type: 'success',
                    text: "新建成功",
                    timer: 2000,
                })
			}) 
    	},
    	getuserlist(){
    		getUserList({
	    		type:0,
	    	}).then((res) => {
	    		this.roles = res.data.list
			})
			getUserList({
	    		type:1,
	    	}).then((res) => {
	    		res.data.list.forEach(function(list){
	    			list.check = false
	    		})
	    		this.outroles = res.data.list
	    		this.getfund()
			}) 
    	}
    },
    mounted:function(){
    	this.getuserlist()
    }
}
</script>
<style lang="less">
	.item-title{
		font-size: 14px;
	}
</style>