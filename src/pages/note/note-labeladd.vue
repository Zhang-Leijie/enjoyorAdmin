<template>
	<div class="fund-summary" style="background-color:white;border: 1px solid #d3dce6;box-shadow: 0 0 4px 0 rgba(44, 77, 109, 0.2)">
		<div class="sum-item">
			<div class="item-title">
				标签种类
			</div>
			<div class="item-content item-single" >
				<el-radio class="radio" v-model="role" label="1">多人评论</el-radio>
  				<el-radio class="radio" v-model="role" label="0">单体评论</el-radio>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				标签名称
			</div>
			<div class="item-content item-single" >
				<el-input placeholder="请输入标签名称" class="edit-input" v-model="name"></el-input>
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				是否发送通知
			</div>
			<div class="item-content item-single" >
				<el-checkbox v-model="send">是</el-checkbox>
			</div>
		</div>
		<div style="text-align:center">
			<div class="button blue" style="margin:10px auto;" @click="addlabel">新建</div>
		</div>
	<div>
</template>
<script>
import {saveorupdateCommentTab} from '../../ajax/post.js'
import {} from '../../ajax/get.js'
export default {
    data() {
        return {
        	role:null,
        	name:null,
        	send:false
        }
    },
    methods: {
    	addlabel(){
    		var send
    		if (this.send==false) {
    			send = 0
    		}
    		else{
    			send = 1
    		}
    		saveorupdateCommentTab({
	    		type:this.role,
	    		name:this.name,
	    		notice:send
	    	}).then((res) => {
	    		swal({
                    title: "新建成功",
                    type: 'success',
                    text: "新建成功",
                    timer: 2000,
                })
			}) 
    	}
    },
    mounted:function(){
    }
}
</script>
<style lang="less">
	.item-title{
		font-size: 14px;
	}
</style>