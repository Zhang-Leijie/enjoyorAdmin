<template>
	<div class="fund-summary" style="background-color:white;border: 1px solid #d3dce6;box-shadow: 0 0 4px 0 rgba(44, 77, 109, 0.2)">
		<div class="sum-item">
			<div class="item-title">
				头像
			</div>
			<div class="item-content">
				<el-upload
						action="/uploadFile"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						:on-success="handlesuccess"
						:default-file-list="fileList"
						>
					<div class="uploadimg" v-if="!photourl">
						<i class="el-icon-plus"></i>
					</div>
					<div class="uploadimg" v-else>
						<img :src="photourl" style="width:100%;height:100%;border-radius:50%">
					</div>
				</el-upload>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				用户名
			</div>
			<div class="item-content item-single" >
				<el-input placeholder="请输入邮箱" class="edit-input" v-model="email"></el-input>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				密码
			</div>
			<div class="item-content item-single" >
				<el-input placeholder="请输入密码" class="edit-input" v-model="pass" type="password"></el-input>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				选择角色
			</div>
			<div class="item-content item-single" >
				<el-select v-model="value" placeholder="请选择" class="edit-input">
				    <el-option
				      v-for="item in roles"
				      :label="item.roleName"
				      :value="item.id">
				    </el-option>
				</el-select>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				姓名
			</div>
			<div class="item-content item-single" >
				<el-input placeholder="请输入姓名" class="edit-input" v-model="name"></el-input>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				职位
			</div>
			<div class="item-content item-single" >
				<el-input placeholder="请输入职位" class="edit-input" v-model="posi"></el-input>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				地区
			</div>
			<div class="item-content item-single" >
				<el-input placeholder="请输入地区" class="edit-input" v-model="local"></el-input>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				手机号码
			</div>
			<div class="item-content item-single">
				<el-input placeholder="请输入手机号码" class="edit-input" v-model="phone"></el-input>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				用户备注
			</div>
			<div class="item-content item-single">
				<el-input placeholder="用户备注" class="edit-input" v-model="note"></el-input>
			</div>
		</div>
		<div class="sum-item" v-if="value==5">
			<div class="item-title">
				选择基金
			</div>
			<div class="item-content item-single" >
				<span v-for="list in lists" style="margin-left:10px;">
	            	<el-checkbox v-model="list.state">{{list.name}}</el-checkbox>
	            </span>
			</div>
		</div>
		<div style="text-align:center">
			<div class="button blue" style="margin:10px auto;" @click="adduser">保存</div>
		</div>
	<div>
</template>
<script>
import {saveUser} from '../../ajax/post.js'
import {getFoundationList,getRoleList,getUser} from '../../ajax/get.js'
export default {
    data() {
        return {
        	photoid:null,
	    	photourl:'',
	    	fileList:[],
        	user:'',
        	value:'',
            lists:'',
            roles:'',
            email:null,
            pass:null,
            name:null,
            posi:null,
            local:null,
            phone:null,
            note:null,
            fund:[]
        }
    },
    methods: {
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
	      	this.fileList=[]
	      	this.photoid = response.data.fileId
	      	this.photourl = response.data.fileUrl
	    },
    	getuser(){
	        getUser({
	        	userId:this.$route.query.id
	        }).then((res) => {
	        	var self = this
	          	this.user = res.data.user
	          	this.email = res.data.user.userName
	          	this.pass = res.data.user.password
	          	this.name = res.data.user.name
	          	this.posi = res.data.user.position
	          	this.local = res.data.user.address
	          	this.phone = res.data.user.phone
	          	this.value = res.data.user.role.id
	          	this.photoid = res.data.user.photo.id
	          	this.photourl = res.data.user.photo.url
	          	this.note = res.data.user.remark
	          	self.lists.forEach(function(list){
	          		res.data.user.list_foundation.forEach(function(i){
	          			if (list.id==i.id) {
	          				list.state = true
	          			}
	          		})
	          	})
	        })
	    },
        getfundlist(){
	    	getFoundationList().then((res) => {
	    		res.data.list.forEach(function(list){
	    			list.state = false
	    		})
				this.lists = res.data.list
				this.getuser()
			}) 
	    },
	    getrole(){
	    	getRoleList().then((res) => {
				this.roles = res.data.list
			}) 
	    },
	    adduser(){
	    	var data = {
	    		id:this.$route.query.id
	    	}
	    	if (this.email) {
	    		data.userName = this.email
	    	}
	    	if (this.pass) {
	    		data.password = this.pass
	    	}
	    	if (this.name) {
	    		data.name = this.name
	    	}
	    	if (this.posi) {
	    		data.position = this.posi
	    	}
	    	if (this.local) {
	    		data.address = this.local
	    	}
	    	if (this.phone) {
	    		data.phone = this.phone
	    	}
	    	if(this.note){
	    		data.remark = this.note
	    	}
	    	if (this.value) {
	    		data.role = {
	    			id:this.value
	    		}
	    	}
	    	if (this.photoid) {
	    		data.photo = {
	    			id:this.photoid
	    		}
	    	}
	    	var self = this
	    	if (this.lists.length!=0) {
	    		this.lists.forEach(function(list){
	    			if (list.state==true) {
	    				self.fund.push({
	    					id:list.id
	    				})
	    			}
	    		})
	    		data.list_foundation = this.fund
	    	}
	    	saveUser({
	    		strUser:JSON.stringify(data)
	    	}).then((res) => {
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
    	this.getfundlist()
    	this.getrole()
    }
}
</script>
<style lang="less">
	.item-title{
		font-size: 14px;
	}
</style>