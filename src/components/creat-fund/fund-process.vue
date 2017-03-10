<template>
	<div class="fund-note" style="padding-left:0px;padding-right:0px">
		<!-- <div class="edit">
			<i class="el-icon-edit"></i>
			评级
		</div> -->
		<F_Probar></F_Probar>
		<div class="sum-item">
			<div class="item-title">
				协议签署日期
			</div>
			<div class="item-content item-single">
				<el-date-picker v-model="info.sign_date" type="date" placeholder="选择日期" class="pl-input" style="width:220px;">
		    	</el-date-picker>		
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				付款日期
			</div>
			<div class="item-content item-single">
				<el-date-picker type="date" placeholder="选择日期" class="pl-input" v-model="info.pay_date" style="width:220px;">
		    	</el-date-picker>		
			</div>
		</div>
		<div class="sum-item">
			<div class="item-title">
				付款金额
			</div>
			<div class="item-content item-single">
				<!-- <el-input placeholder="请输入付款金额" class="edit-input" v-model="info.pay_money" style="width:220px;"></el-input> -->	
				<el-input class="edit-input" v-model="info.pay_money" style="width:220px;" placeholder="请输入付款金额" @blur="fkje(info.pay_money)">
					<template slot="prepend">¥(万元)</template>
				</el-input>
			</div>
		</div>
		<div class="uploadcontent clearfix" style="padding:20px">
			<div class="clearfix">
				<div class="upload_block">
					<div class="upload_none" v-if="!xmjb">
						<i class="el-icon-upload" style="font-size:70px;margin-top:20px;"></i>
						<div>未上传</div>
						<div class="up_hover">
								<div class="white button">
									<el-upload
					  				action="/uploadFile"
					  				:on-success="handlesuccess"
					  				:default-file-list="fileList1"
					  				style="width:100%">
									上传
									</el-upload>
								</div>					
						</div>
					</div>
					<div class="upload_none" v-else>
						<div class="upload_img">
							<img :src="xmjb.img">
						</div>
						<div class="up_hover" style="padding-top:10px;">
							<div class="white button" style="margin:10px auto">
								<el-upload
					  				action="/uploadFile"
					  				:on-success="handlesuccess"
					  				:default-file-list="fileList1"
					  				style="width:100%">
								上传
								</el-upload>
							</div>
							<a class="white button" target="_blank" :href='xmjb.fileUrl' style="margin:10px auto">下载</a>
						</div>
					</div>
					<div class="upload_name">项目简报<br><div style="width:140px">更新时间：<span v-if="xmjb">{{xmjb.time}}</span></div></div>
				</div>
				<div class="upload_block">
					<div class="upload_none" v-if="!syjhs">
						<i class="el-icon-upload" style="font-size:70px;margin-top:20px;"></i>
						<div>未上传</div>
						<div class="up_hover">
							<div class="white button">
								<el-upload
				  				action="/uploadFile"
				  				:on-success="handlesuccess2"
				  				:default-file-list="fileList2"
				  				 style="width:100%">
				  					上传
				  				</el-upload>
				  			</div>
						</div>
					</div>
					<div class="upload_none" v-else>
						<div class="upload_img">
							<img :src="syjhs.img">
						</div>
						<div class="up_hover" style="padding-top:10px;">
							<div class="white button" style="margin:10px auto">
								<el-upload
					  				action="/uploadFile"
					  				:on-success="handlesuccess2"
					  				:default-file-list="fileList2"
					  				style="width:100%">
									上传
								</el-upload>
							</div>
							<a class="white button" target="_blank" :href='syjhs.fileUrl' style="margin:10px auto">下载</a>
						</div>
					</div>
					<div class="upload_name">商业计划书<div style="width:140px">更新时间：<span v-if="syjhs">{{syjhs.time}}</span></div></div>
				</div>
				<div class="upload_block">
					<div class="upload_none" v-if="!ts">
						<i class="el-icon-upload" style="font-size:70px;margin-top:20px;"></i>
						<div>未上传</div>
						<div class="up_hover">
							<div class="white button">
								<el-upload
				  				action="/uploadFile"
				  				:on-success="handlesuccess3"
				  				:default-file-list="fileList3"
				  				 style="width:100%;">
				  					上传
				  				</el-upload>
				  			</div>
						</div>
					</div>
					<div class="upload_none" v-else>
						<div class="upload_img">
							<img :src="ts.img">
						</div>
						<div class="up_hover" style="padding-top:10px;">
							<div class="white button" style="margin:10px auto">
								<el-upload
					  				action="/uploadFile"
					  				:on-success="handlesuccess3"
					  				:default-file-list="fileList3"
					  				style="width:100%;">
									上传
								</el-upload>
							</div>
							<a class="white button" target="_blank" :href='ts.fileUrl' style="margin:10px auto">下载</a>
						</div>
					</div>
					<div class="upload_name">TS协议框架<div style="width:140px">更新时间：<span v-if="ts">{{ts.time}}</span></div></div>
				</div>
			</div>
			<div class="clearfix" style="margin-top:20px;">
				<div style="float:left">
					<div class="clearfix">
						<div class="upload_block">
							<div class="upload_none" v-if="jdbg.length!=0" >
								<div class="upload_img">
									<img :src="jdbg[0].img">
								</div>
								<div class="up_hover" :class="{pa:value}">
									<div class="white button" :class="{ma:value}">
										<el-upload
							  				action="/uploadFile"
							  				:on-success="handlesuccess4"
							  				:default-file-list="fileList4"
							  				style="width:100%;">
											上传
										</el-upload>
									</div>
									<a class="white button" v-if="value" :href='value' style="margin:10px auto" target="_blank">下载</a>
								</div>
							</div>
							<div class="upload_none" v-else>
								<i class="el-icon-upload" style="font-size:70px;margin-top:20px;"></i>
								<div>未上传</div>
								<div class="up_hover">
									<div class="white button">
										<el-upload
						  				action="/uploadFile"
						  				:on-success="handlesuccess4"
						  				:default-file-list="fileList4"
						  				 style="width:80px;">
						  				上传
						  				</el-upload>
						  			</div>
								</div>
							</div>				
							<div class="upload_name">尽调报告</div>
						</div>
					</div>
					<div>
						<span style="font-size:14px;text-align:center">历史文件：</span>
						<el-select v-model="value" placeholder="请选择" style="width:130px">
						    <el-option
						      v-if="jdbg"
						      v-for="item in jdbg"
						      :label="item.time+'---'+item.label"
						      :value="item.value"
						      >
						    </el-option>
						</el-select>
						<div style="font-size:14px">更新时间:<span v-if="jdbg.length!=0">{{jdbg[0].time}}</span></div>
					</div>
				</div>
				<div style="float:left">
					<div class="clearfix">
						<div class="upload_block">
							<div class="upload_none" v-if="zsxy.length!=0" >
								<div class="upload_img">
									<img :src="zsxy[0].img">
								</div>
								<div class="up_hover" :class="{pa:value2}">
									<div class="white button" :class="{ma:value2}">
										<el-upload
							  				action="/uploadFile"
							  				:on-success="handlesuccess5"
							  				:default-file-list="fileList5"
							  				style="width:100%;">
											上传
										</el-upload>
									</div>
									<a class="white button" v-if="value2" :href='value2' style="margin:10px auto" target="_blank">下载</a>
								</div>
							</div>
							<div class="upload_none" v-else>
								<i class="el-icon-upload" style="font-size:70px;margin-top:20px;"></i>
								<div>未上传</div>
								<div class="up_hover">
									<div class="white button">
										<el-upload
						  				action="/uploadFile"
						  				:on-success="handlesuccess5"
						  				:default-file-list="fileList5"
						  				 style="width:80px;">
						  				上传
						  				</el-upload>
						  			</div>
								</div>
							</div>				
							<div class="upload_name">正式协议</div>
						</div>
					</div>
					<div>
						<span style="font-size:14px;text-align:center">历史文件：</span>
						<el-select v-model="value2" placeholder="请选择" style="width:130px">
						    <el-option
						      v-for="item in zsxy"
						      :label="item.time+'---'+item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
						<div style="font-size:14px">更新时间:<span v-if="zsxy.length!=0">{{zsxy[0].time}}</span></div>
					</div>
				</div>
				<div style="float:left">
					<div class="clearfix">
						<div class="upload_block">
							<div class="upload_none" v-if="thgl.length!=0" >
								<div class="upload_img">
									<img :src="thgl[0].img">
								</div>
								<div class="up_hover" :class="{pa:value3}">
									<div class="white button" :class="{ma:value3}">
										<el-upload
							  				action="/uploadFile"
							  				:on-success="handlesuccess6"
							  				:default-file-list="fileList6"
							  				style="width:100%;">
											上传
										</el-upload>
									</div>
									<a class="white button" v-if="value3" :href='value3' style="margin:10px auto" target="_blank">下载</a>
								</div>
							</div>
							<div class="upload_none" v-else>
								<i class="el-icon-upload" style="font-size:70px;margin-top:20px;"></i>
								<div>未上传</div>
								<div class="up_hover">
									<div class="white button">
										<el-upload
						  				action="/uploadFile"
						  				:on-success="handlesuccess6"
						  				:default-file-list="fileList6"
						  				 style="width:80px;">
						  				上传
						  				</el-upload>
						  			</div>
								</div>
							</div>				
							<div class="upload_name">投后管理</div>
						</div>
					</div>
					<div>
						<span style="font-size:14px;text-align:center">历史文件：</span>
						<el-select v-model="value3" placeholder="请选择" style="width:130px">
						    <el-option
						      v-for="item in thgl"
						      :label="item.time+'---'+item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
						<div style="font-size:14px">更新时间:<span v-if="thgl.length!=0">{{thgl[0].time}}</span></div>
					</div>
				</div>
				<div style="float:left">
					<div class="clearfix">
						<div class="upload_block" style="margin-right:0px;">
							<div class="upload_none" v-if="tztc.length!=0" >
								<div class="upload_img">
									<img :src="tztc[0].img">
								</div>
								<div class="up_hover" :class="{pa:value4}">
									<div class="white button" :class="{ma:value4}">
										<el-upload
							  				action="/uploadFile"
							  				:on-success="handlesuccess7"
							  				:default-file-list="fileList7"
							  				style="width:100%;">
											上传
										</el-upload>
									</div>
									<a class="white button" v-if="value4" :href='value4' style="margin:10px auto" target="_blank">下载</a>
								</div>
							</div>
							<div class="upload_none" v-else>
								<i class="el-icon-upload" style="font-size:70px;margin-top:20px;"></i>
								<div>未上传</div>
								<div class="up_hover">
									<div class="white button">
										<el-upload
						  				action="/uploadFile"
						  				:on-success="handlesuccess7"
						  				:default-file-list="fileList7"
						  				 style="width:80px;">
						  				上传
						  				</el-upload>
						  			</div>
								</div>
							</div>				
							<div class="upload_name">投资退出盈利</div>
						</div>
					</div>
					<div>
						<span style="font-size:14px;text-align:center">历史文件：</span>
						<el-select v-model="value4" placeholder="请选择" style="width:130px">
						    <el-option
						      v-for="item in tztc"
						      :label="item.time+'---'+item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
						<div style="font-size:14px">更新时间:<span v-if="tztc.length!=0">{{tztc[0].time}}</span></div>
					</div>
				</div>
			</div>	
		</div>
		<div style="text-align:center">
			<div class="button blue" style="margin:10px auto;" @click='postfile'>保存</div>
		</div>
	</div>
</template>
<script>
	import { getProjectFile } from '../../ajax/get.js'
	import { File } from '../../ajax/post.js'
  	import  F_Probar from './fund-procbar'
  	// function   formatDate(time)   {  
  	//   return new Date(parseInt(time)).toLocaleString()
   //  }
    function formatDate(time){
  		var d = new Date(time);
    	var sd = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    	return sd
  	}
  	function doctype(name){
		var img
		var x = name.split('.')[1]
		if (x == 'pdf') {
			img = '../static/img/PDF.png'
		}
		else if(x=='docx'||x=='doc'){
			img = '../static/img/word.png'
		}
		else if(x=='xls'||x=='xlsx'){
			img = '../static/img/excel.png'
		}
		else{
			img = '../static/img/qita.png'
		}
		return img
	}

  export default {
  	props: {
		info: {
			type: Object
		}
	},
  	data() {
      return {
      	valued1:'',
      	valued2:'',
      	fileList1:[],
      	fileList2:[],
      	fileList3:[],
      	fileList4:[],
      	fileList5:[],
      	fileList6:[],
      	fileList7:[],
      	xmjb:null,
      	syjhs:null,
      	ts:null,
      	jdbg:[],
      	jdbgurl:null,
      	zsxy:[],
      	thgl:[],
      	tztc:[],
        value: null,
        value2: null,
        value3: null,
        value4: null
      }
    },
    methods: {
    	fkje(number){
  			this.info.pay_money = this.outputmoney(number)
  		},
  		outputmoney(number) {
  			console.log(1)
			number = number.replace(/\,/g, "");
			if(isNaN(number) || number == "")return "";
			number = Math.round(number * 100) / 100;
		    if (number < 0)
		        return '-' + this.outputdollars(Math.floor(Math.abs(number) - 0) + '') + this.outputcents(Math.abs(number) - 0);
		    else
		    	console.log(this.outputdollars(Math.floor(number - 0) + '') + this.outputcents(number - 0))
		        return this.outputdollars(Math.floor(number - 0) + '') + this.outputcents(number - 0);
		        // name = this.outputdollars(Math.floor(number - 0) + '') + this.outputcents(number - 0)
		    
		},
		//格式化金额
		outputdollars(number) {
		    if (number.length <= 3)
		        return (number == '' ? '0' : number);
		    else {
		        var mod = number.length % 3;
		        var output = (mod == 0 ? '' : (number.substring(0, mod)));
		        for (var i = 0; i < Math.floor(number.length / 3); i++) {
		            if ((mod == 0) && (i == 0))
		                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
		            else
		                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
		        }
		        return (output);
		    }
		},
		outputcents(amount) {
		    amount = Math.round(((amount) - Math.floor(amount)) * 100);
		    return (amount < 10 ? '.0' + amount : '.' + amount);
		},
    	// getdata(){
    	// 	if (this.info.sign_date==null) {
    	// 		this.valued1 = ''
    	// 	}
    	// 	else{
    	// 		this.valued1 = this.info.sign_date
    	// 	}
    	// 	if (this.info.pay_date==null) {
    	// 		this.valued2 = ''
    	// 	}
    	// 	else{
    	// 		this.valued2 = this.info.pay_date
    	// 	}
    	// },
    	postfile(){
    		var xmjbid
    		if (this.xmjb) {
    			xmjbid = {id:this.xmjb.id}
    		}
    		else{
    			xmjbid = null
    		}
    		var syjhsid
    		if (this.syjhs) {
    			syjhsid = {id:this.syjhs.id}
    		}
    		else{
    			syjhsid = null
    		}
    		var tsid
    		if (this.ts) {
    			tsid = {id:this.ts.id}
    		}
    		else{
    			tsid = null
    		}
    		var jdbgid = []
    		this.jdbg.forEach(function(list){
    			jdbgid.push({id:list.id})
    		})
    		var zsxyid = []
    		this.zsxy.forEach(function(list){
    			zsxyid.push({id:list.id})
    		})
    		var thglid = []
    		this.thgl.forEach(function(list){
    			thglid.push({id:list.id})
    		})
    		var tztcid = []
    		this.tztc.forEach(function(list){
    			tztcid.push({id:list.id})
    		})
    		File({
    			strProjectFile:JSON.stringify({
    				project:{id:this.$route.query.id},
    				briefing:xmjbid,
    				proposal:syjhsid,
    				agreement:tsid,
    				reports:jdbgid,
    				schedules:zsxyid,
    				manages:thglid,
    				profits:tztcid,
    			}),
    			signDate:this.info.sign_date,
    			payDate:this.info.pay_date,
    			payMoney:this.info.pay_money
	      	}).then((res) => {
	      		swal({
                    title: "上传成功",
                    type: 'success',
                    text: "上传成功",
                    timer: 2000,
                })
	      		this.getfile()
			})
    	},
	    handlesuccess(response, file, fileList){
	      	console.log(response, file, fileList)
	      	var img = doctype(response.data.fileUrl)
	      	this.xmjb={
	      		id:response.data.fileId,
	      		fileUrl:response.data.fileUrl,
	      		img:img
	      	}
	      	swal({
                title: "上传成功",
                type: 'success',
                text: "上传成功",
                timer: 2000,
            })
            this.fileList1=[]
	    },
	    handlesuccess2(response, file, fileList){
	      	console.log(response, file, fileList)
	      	var img = doctype(response.data.fileUrl)
	      	this.syjhs={
	      		id:response.data.fileId,
	      		fileUrl:response.data.fileUrl,
	      		img:img
	      	}
	      	swal({
                title: "上传成功",
                type: 'success',
                text: "上传成功",
                timer: 2000,
            })
            this.fileList2=[]
	    },
	    handlesuccess3(response, file, fileList){
	      	console.log(response, file, fileList)
	      	var img = doctype(response.data.fileUrl)
	      	this.ts={
	      		id:response.data.fileId,
	      		fileUrl:response.data.fileUrl,
	      		img:img
	      	}
	      	swal({
                title: "上传成功",
                type: 'success',
                text: "上传成功",
                timer: 2000,
            })
            this.fileList3=[]
	    },
	    handlesuccess4(response, file, fileList){
	      	console.log(response, file, fileList)
	      	var img = doctype(response.data.fileUrl)
	      	this.jdbg.push({label:response.data.fileName,value:response.data.fileUrl,id:response.data.fileId,img:img})
	      	swal({
                title: "上传成功",
                type: 'success',
                text: "上传成功",
                timer: 2000,
            })
            this.fileList4=[]
	    },
	    handlesuccess5(response, file, fileList){
	      	console.log(response, file, fileList)
	      	var img = doctype(response.data.fileUrl)
	      	this.zsxy.push({label:response.data.fileName,value:response.data.fileUrl,id:response.data.fileId,img:img})
	      	swal({
                title: "上传成功",
                type: 'success',
                text: "上传成功",
                timer: 2000,
            })
            this.fileList5=[]
	    },
	    handlesuccess6(response, file, fileList){
	      	console.log(response, file, fileList)
	      	var img = doctype(response.data.fileUrl)
	      	this.thgl.push({label:response.data.fileName,value:response.data.fileUrl,id:response.data.fileId,img:img})
	      	swal({
                title: "上传成功",
                type: 'success',
                text: "上传成功",
                timer: 2000,
            })
            this.fileList6=[]
	    },
	    handlesuccess7(response, file, fileList){
	      	console.log(response, file, fileList)
	      	var img = doctype(response.data.fileUrl)
	      	this.tztc.push({label:response.data.fileName,value:response.data.fileUrl,id:response.data.fileId,img:img})
	      	swal({
                title: "上传成功",
                type: 'success',
                text: "上传成功",
                timer: 2000,
            })
            this.fileList7=[]
	    },
	    getfile(){
	      	getProjectFile({
	      		projectId:this.$route.query.id
	      	}).then((res) => {
	      		var info = res.data.projectFile
	      		if (info.briefing) {
	      			var img = doctype(info.briefing.url)
	      			var time = formatDate(info.briefing.update_current)
		      		this.xmjb={
			      		id:info.briefing.id,
			      		fileUrl:info.briefing.url,
			      		img:img,
			      		time:time
			      	}
		      	}
		      	if (info.proposal) {
		      		var img = doctype(info.proposal.url)
		      		var time = formatDate(info.proposal.update_current)
			      	this.syjhs={
			      		id:info.proposal.id,
			      		fileUrl:info.proposal.url,
			      		img:img,
			      		time:time
			      	}
		      	}
		      	if (info.agreement) {
		      		var img = doctype(info.agreement.url)
		      		var time = formatDate(info.agreement.update_current)
			      	this.ts={
			      		id:info.agreement.id,
			      		fileUrl:info.agreement.url,
			      		img:img,
			      		time:time
			      	}
		      	}
		      	if (info.reports.length!=0) {
		      		this.jdbg = []
		      		var self = this
		      		info.reports.reverse().forEach(function(list){
		      			var img = doctype(list.url)
		      			var time = formatDate(list.update_current)
		      			self.jdbg.push({
			      			label:list.fileName,value:list.url,id:list.id,img:img,time:time
			      		})
		      		})
		      		var array = info.reports.reverse()
		      		if (array[0]) {
		      			this.value =  array[0].url 
		      		}	      		
		      	}
		      	if (info.schedules.length!=0) {
		      		this.zsxy = []
		      		var self = this
		      		info.schedules.reverse().forEach(function(list){
		      			var img = doctype(list.url)
		      			var time = formatDate(list.update_current)
		      			self.zsxy.push({
			      			label:list.fileName,value:list.url,id:list.id,img:img,time:time
			      		})
		      		})
		      		var array = info.schedules.reverse()
		      		if (array[0]) {
		      			this.value2 =  array[0].url 
		      		}        		
		      	}
		      	if (info.manages.length!=0) {
		      		this.thgl = []
		      		var self = this
		      		info.manages.reverse().forEach(function(list){
		      			var img = doctype(list.url)
		      			var time = formatDate(list.update_current)
		      			self.thgl.push({
			      			label:list.fileName,value:list.url,id:list.id,img:img,time:time
			      		})
		      		})
		      		var array = info.manages.reverse()
		      		if (array[0]) {
		      			this.value3 =  array[0].url 
		      		}       		
		      	}
		      	if (info.profits.length!=0) {
		      		this.tztc = []
		      		var self = this
		      		info.profits.reverse().forEach(function(list){
		      			var img = doctype(list.url)
		      			var time = formatDate(list.update_current)
		      			self.tztc.push({
			      			label:list.fileName,value:list.url,id:list.id,img:img,time:time
			      		})
		      		})
		      		var array = info.profits.reverse()
		      		if (array[0]) {
		      			this.value4 =  array[0].url 
		      		}      		
		      	}
			}).catch((e) => {
                
            })
	    }
    },
    mounted:function(){
    	this.getfile()
    	// this.getdata()
    },
    components: {
	    F_Probar
	}
  };
</script>
<style lang="less">
	.uploadcontent{
		width: 100%;
		padding: 20px;
		.upload_block{
			width: 130px;
			height: 130px;
			float: left;
			// margin-right: 120px;
			// margin-bottom: 50px;
			margin: 0px 50px 50px;
			&:nth-child(4n){
				margin-right: 0px;
			}
			.upload_none{
				background-color: #f6f7f9;
				width: 100%;
				height: 100%;
				text-align: center;
				color: #ccc;
				position: relative;
				.upload_img{
					position: absolute;
					top: 0px;
					bottom: 0px;
					left: 0px;
					right: 0px;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.up_hover{
					&:hover{
						opacity: 1;
					}				
					// display: none;
					transition:0.5s;
					-moz-transition:0.5s; /* Firefox 4 */
					-webkit-transition:0.5s; /* Safari and Chrome */
					-o-transition:0.5s; /* Opera */
					opacity: 0;
					text-align: center;
					position: absolute;
					top: 0px;
					bottom: 0px;
					left: 0px;
					right: 0px;
					background-color: rgba(0, 0, 0, 0.5);
					.button{
						margin:45px auto;
					}
				}			
			}
			.upload_name{
				text-align: center;
				font-size: 14px;
				color: #333;
				line-height: 25px;
			}
		}
	}
	.el-upload__inner{
		width: 100%;
	}
	.ma{
		margin:10px auto !important;
	}
	.pa{
		padding-top:10px !important;
	}
	.el-upload__files {
	    height: 0px;
	    /* margin: 0 0 10px; */
	    padding: 0;
	    list-style: none;
	}
	@media(max-width:1200px){
		.uploadcontent{
			width: 100%;
			padding: 20px;
			.upload_block{
				width: 130px;
				height: 130px;
				float: left;
				// margin-right: 50px;
				// margin-bottom: 50px;
				margin: 0px 40px 50px;
				&:nth-child(4n){
					margin-right: 0px;
				}
				.upload_none{
					background-color: #f6f7f9;
					width: 100%;
					height: 100%;
					text-align: center;
					color: #ccc;
					position: relative;
					.upload_img{
						position: absolute;
						top: 0px;
						bottom: 0px;
						left: 0px;
						right: 0px;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.up_hover{
						&:hover{
							opacity: 1;
						}				
						// display: none;
						transition:0.5s;
						-moz-transition:0.5s; /* Firefox 4 */
						-webkit-transition:0.5s; /* Safari and Chrome */
						-o-transition:0.5s; /* Opera */
						opacity: 0;
						text-align: center;
						position: absolute;
						top: 0px;
						bottom: 0px;
						left: 0px;
						right: 0px;
						background-color: rgba(0, 0, 0, 0.5);
						.button{
							margin:45px auto;
						}
					}			
				}
				.upload_name{
					text-align: center;
					font-size: 14px;
					color: #333;
					line-height: 25px;
				}
			}
		}
	}
	// .el-upload__file{
	// 	margin-top: -60px;
	// }
</style>