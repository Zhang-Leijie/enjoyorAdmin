<template>
	<div class="fund-video">
		<div class="fund-summary">
			<div class="video" v-if="url">
				<embed :src="url2" width="870" height="500" align="middle" allowFullScreen="true" allowScriptAccess="sameDomain" type="application/x-shockwave-flash">
				</embed>  
			</div>
			<div class="sum-item">
				<div class="item-title">
					URL地址
				</div>
				<div class="item-content item-single">
					<el-input placeholder="" class="edit-input" style="width:600px;" v-model="url"></el-input>
				</div>
			</div>
			<div style="text-align:center">
				<div class="button blue" @click="popUrl">保存</div>
			</div>
		</div>
	</div>
</template>
<script>
import {Item} from '../../ajax/post.js'
export default {
	props: {
		info: {
			type: Object
		}
	},
  data () {
    return {
      	url:'',
      	url2:''
    }
  },
  methods:{
  	geturl(){
  		if (this.info.video) {
  			this.url = this.info.video.url
  			this.url2 = this.info.video.url
  		}
  	},
  	popUrl(){
  		Item({
			type:3,
			strProject:JSON.stringify({
				id:this.$route.query.id,
				video:{url:this.url}
			})			
		}).then((res) => {
			this.url2 = this.url
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
  	this.geturl()
  }
}
</script>
<style lang="less">
	.fund-video{
		position: relative;
		padding-top: 20px;
		padding-bottom: 40px;
		.video{
			width: 870px;
			height: 520px;
			margin: 0 auto;
			video{
				width: 100%;
				height: 100%;				
			}
		}
	}
</style>