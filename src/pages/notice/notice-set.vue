<template>
	<div class="fund-summary" style="background-color:white;border: 1px solid #d3dce6;box-shadow: 0 0 4px 0 rgba(44, 77, 109, 0.2)">
		<div class="sum-item" v-for="i in lists">
			<div class="item-title">
				{{i.name}}
			</div>
			<div class="item-content">
				<el-input placeholder="请输入通知内容" class="edit-input" v-model="i.notice_text" style="width:70%"></el-input>
				<div class="button blue" style="display:inline-block;margin-left:5px;" @click="edittab(i.id,i.notice_text)">
					保存
				</div>
			</div>
		</div>
		
	<div>
</template>
<script>
import {saveorupdateNoticeTab} from '../../ajax/post.js'
import {getCommentTabList} from '../../ajax/get.js'
export default {
    data() {
        return {
        	lists:''
        }
    },
    methods: {
    	edittab(id,text){
    		saveorupdateNoticeTab({
	    		commentId:id,
	    		commentText:text
	    	}).then((res) => {
				this.gettablist()
				swal({
                    title: "编辑成功",
                    type: 'success',
                    text: "编辑成功",
                    timer: 2000,
                })
			})
    	},
    	gettablist(){
    		getCommentTabList({
	    		type:1
	    	}).then((res) => {
				this.lists = res.data.list
			})
    	}	 
    },
    mounted:function(){
    	this.gettablist()
    }
}
</script>
<style lang="less">
	.item-title{
		font-size: 14px;
	}
</style>