<template>
	<div>
		<table class="tableStyle" style="margin-top:25px;">
			<thead>
				<tr>
					<th>标签名称</th>
					<th>标签种类</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<!-- <router-link tag="tr" :to="{name:'fund-item',query:{id:i.id}}" v-for="(i,index) in lists"> -->
				<tr v-for="(i,index) in lists">
					<td>{{i.name}}</td>
					<td v-if="i.type==1">多人评论</td>
					<td v-if="i.type==0">单体评论</td>
					<td>
						<router-link :to="{name:'note-labeledit',query:{id:i.id}}" class="link">编辑</router-link>
						<span class="link">删除</span>
					</td>
				</tr>
				<!-- </router-link> -->
			</tbody>
		</table>
	</div>
</template>
<script>
	import {Item} from '../../ajax/post.js'
	import {getCommentTabList} from '../../ajax/get.js'
	export default {
		data() {
	      	return {
	      		lists:''
	      	}
	    },
	    methods:{
	    	getcommentlist(){
		    	var self = this
		    	getCommentTabList({
		    		type:0
		    	}).then((res) => {
					this.lists = res.data.list
				}) 
		    }
	    },
	    mounted:function(){
	    	this.getcommentlist()
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