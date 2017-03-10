<template>
	<div>
		<table class="tableStyle" style="margin-top:25px;">
			<thead>
				<tr>
					<th>账号</th>
					<th>姓名</th>
					<th>角色</th>
					<th>职位</th>
					<th>操作</th>

				</tr>
			</thead>
			<tbody>
				<tr v-for="(i,index) in lists">
					<td>{{i.userName}}</td>
					<td>{{i.name}}</td>
					<td v-if="i.role">{{i.role.roleName}}</td>
					<td v-else></td>
					<td>{{i.position}}</td>
					<td>
						<router-link :to="{name: 'user-edit',query:{id:i.id}}" class="link">
							编辑
						</router-link>
						<span class="link" v-if="i.available==1" style="cursor:pointer" @click="upuser(i.id,0)">禁用</span>
						<span class="link" v-if="i.available==0" style="cursor:pointer" @click="upuser(i.id,1)">启用</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import {update_user} from '../../ajax/post.js'
import {getUserList} from '../../ajax/get.js'
export default {
    data() {
        return {
        	lists:''
        }
    },
    methods: {
    	upuser(id,type){
    		update_user({
    			id:id,
				type:type
			}).then((res) => {
				swal({
                    title: "操作成功",
                    type: 'success',
                    text: "操作成功",
                    timer: 2000,
                })
                this.getUserList()
			}) 
    	},
        getUserList(){
	    	getUserList({
				type:4
			}).then((res) => {
				this.lists = res.data.list
			}) 
	    }
    },
    mounted:function(){
    	this.getUserList()
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