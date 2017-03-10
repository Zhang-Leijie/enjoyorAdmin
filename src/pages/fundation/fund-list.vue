<template>
	<div>
		<table class="tableStyle" style="margin-top:25px;">
			<thead>
				<tr>
					<th>基金名称</th>
					<th>基金负责人</th>
					<th>基金金额</th>
					<th>项目数量</th>
					<th>授权人数（投资人）</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<!-- <router-link tag="tr" :to="{name:'fund-item',query:{id:i.id}}" v-for="(i,index) in lists"> -->
				<tr v-for="(i,index) in lists">
					<td><router-link :to="{name:'fund-item',query:{id:i.id}}" class="link">{{i.name}}</router-link></td>
					<td>{{i.responsibility}}</td>
					<td>{{i.money}}</td>
					<td>{{i.list_project.length}}</td>
					<td>{{i.list_user.length}}</td>
					<td>
						<router-link :to="{name:'fund-item',query:{id:i.id}}" class="link">查看</router-link>
						<router-link :to="{name:'fund-edit',query:{id:i.id}}" class="link">编辑</router-link>
					</td>
				</tr>
				<!-- </router-link> -->
			</tbody>
		</table>
	</div>
</template>
<script>
	import {Item} from '../../ajax/post.js'
	import {getFoundationList} from '../../ajax/get.js'
	export default {
		data() {
	      	return {
	      		lists:''
	      	}
	    },
	    methods:{
	    	getfundlist(){
		    	var self = this
		    	getFoundationList().then((res) => {
					this.lists = res.data.list
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
		&:hover{
			color: #4990e2;
		}
	}
</style>