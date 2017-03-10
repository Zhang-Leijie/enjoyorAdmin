<template>
	<div>
		<table class="tableStyle" style="margin-top:25px;">
			<thead>
				<tr>
					<th>角色</th>
					<th>类型</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(i,index) in lists">
					<td>{{i.roleName}}</td>
					<td v-if="i.type==0">内部角色</td>
					<td v-if="i.type==1">外部角色</td>
					<td>
						<router-link :to="{name:'role-edit',query:{id:i.id}}" class="link">编辑</router-link>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import {update_user} from '../../ajax/post.js'
import {getUserList,getRoleList,getCommentTabList} from '../../ajax/get.js'
export default {
    data() {
        return {
        	lists:''
        }
    },
    methods: {
        getUserList(){
	    	getUserList({
				type:2
			}).then((res) => {
				this.lists = res.data.list
			}) 
	    },
	    getrole(){
	    	getRoleList().then((res) => {
				this.lists = res.data.list
			}) 
	    },
    },
    mounted:function(){
    	this.getrole()
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