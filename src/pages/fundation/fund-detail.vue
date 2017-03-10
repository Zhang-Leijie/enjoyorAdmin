<template>
	<div>
		<el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove" style="width:100%;padding-top:25px;">
		    <el-tab-pane label="项目概要">
		    	<div class="fund-box">
		    		<f-summary :info="info" v-if="info.id"></f-summary>
		    		<!-- <f-summary></f-summary> -->
		    	</div>
			</el-tab-pane>
		    <el-tab-pane label="项目资料">
		    	<div class="fund-box">
		    		<f-data :info="info" v-if="info.id"></f-data>
		    	</div>
		    </el-tab-pane>
		    <el-tab-pane label="项目笔记">
		    	<div class="fund-box">
		    		<f-note :info="info" v-if="info.id"></f-note>
		    	</div>
		    </el-tab-pane>
		    <el-tab-pane label="项目评级">
		    	<div class="fund-box">
		    		<f-rate :info="info" v-if="info.id"></f-rate>
		    	</div>
		    </el-tab-pane>
		    <el-tab-pane label="项目视频">
		    	<div class="fund-box">
		    		<f-video :info="info" v-if="info.id"></f-video>
		    	</div>
		    </el-tab-pane>
		    <el-tab-pane label="项目进展">
		    	<div class="fund-box">
		    		<f-process :info="info"></f-process>
		    	</div>
		    </el-tab-pane>
	  	</el-tabs>
	  	<!-- <div style="text-align:center;margin-top:15px;">
		  	<a href="javascript:history.back(-1)">
				<div class="blue button">返回</div>
			</a>
		</div> -->
	</div>
</template>
<script>
  import {itemDetail,getUserList} from '../../ajax/get.js'
  import  fSummary from '../../components/creat-fund/fund-summary'
  import  fData from '../../components/creat-fund/fund-data'
  import  fNote from '../../components/creat-fund/fund-note'
  import  fProbar from '../../components/creat-fund/fund-procbar'
  import  fRate from '../../components/creat-fund/fund-rate'
  import  fVideo from '../../components/creat-fund/fund-video'
  import  fProcess from '../../components/creat-fund/fund-process'
  export default {
  	data() {
	    return {
	      	info:{},
	    }
	},
    methods: {
      handleRemove(tab) {
        
      },
      handleClick(tab, event) {
        
      },
      getInfo(){
	      	itemDetail({
				id:this.$route.query.id
			}).then((res) => {
				this.info = res.data.project
			}) 
	   }
    },
    mounted:function(){
    	this.getInfo()
    },
    components: {
	    "f-summary":fSummary,
	    "f-data":fData,
	    "f-note":fNote,
	    "f-rate":fRate,
	    "f-video":fVideo,
	    "f-process":fProcess,
	    // F_Probar,
	}
  };
</script>
<style lang="less">
	.el-tabs--card .el-tabs__nav .el-tabs__item.is-active {
		width: 120px;
	}
	.el-tabs--card .el-tabs__nav .el-tabs__item {
		width: 120px;
	}
	.el-tabs--card>.el-tabs__header>.el-tabs__item {
	    border: 1px solid #d3dce6;
	    transition: all .3s cubic-bezier(.645,.045,.355,1);
	}
	.el-tabs--card>.el-tabs__header>.el-tabs__item.is-active {
	    border: 1px solid #d1dbe5;
	    border-bottom-color: #fff;
	     border-radius: 8px 8px 0 0; 
	}
	.fund-box{
		min-height: 300px;
	}
	.el-tabs__header{
		margin: 0px;
	}
	.el-tabs__content{
		border: 1px solid #d3dce6;
		border-top: none;
		background-color: #fff;
		box-shadow:0 0 4px 0 rgba(44,77,109,0.20);
	}
	.el-tabs__item{
		width: 15%;
		text-align: center;
		font-size: 14px;
		color: #333;
		background-color: #f9f9f9;
	}
	.el-tabs__item.is-active{
		color: #333;
	}
	.el-tabs--card .el-tabs__item{
		border: 1px solid #d3dce6;
		border-radius: 8px 8px 0 0;
	}
	.el-tabs--card .el-tabs__item.is-active{
		background-color: #fff;
		border-bottom: none;
		border-radius: 8px 8px 0 0;
	}
</style>