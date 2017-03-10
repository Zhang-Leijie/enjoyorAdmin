<template>
	<div>
		<div class="fund-summary">
			<div class="sum-item">
				<div class="item-title">
					项目LOGO
				</div>
				<div class="item-content">
					<el-upload
  						action="/uploadFile"
  						:on-preview="handlePreview"
  						:on-remove="handleRemove"
  						:on-success="handlesuccess"
  						:default-file-list="fileList"
  						>
						<div class="uploadimg" v-if="!photourl" style="border-radius:0px;">
							<i class="el-icon-plus"></i>
						</div>
						<div class="uploadimg" v-else style="border-radius:0px;width:150px;">
							<img :src="photourl" style="width:100%;height:100%;">
						</div>
					</el-upload>
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					项目名称
				</div>
				<div class="item-content item-single" >
					<el-input placeholder="请输入项目名称" class="edit-input" v-model="info.project_name"></el-input>
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					项目简介
				</div>
				<div class="item-content item-single" >
					<textarea placeholder="请输入项目简介" class="pl-textarea" v-model="info.project_introduction"></textarea>
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					项目编码
				</div>
				<div class="item-content item-single" >
					{{info.project_code}}
				</div>
			</div>
			<div class="sum-item" v-if="info.evaluateAvg">
				<div class="item-title">
					项目评级
				</div>
				<div class="item-content" style="padding-top:40px;">
					<img :src="info.evaluateAvg.fileEvaluate.url" style="width:100px;height:100px">
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					项目阶段
				</div>
				<div class="item-content item-single" >
					<el-select v-model="info.project_stage" placeholder="请选择" class="edit-input">
					    <el-option
					      v-for="item in options"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					项目估值
				</div>
				<div class="item-content item-single">
					<el-input class="edit-input" v-model="info.valuation" placeholder="请输入项目估值" @blur="guzhi(info.valuation)">
						<template slot="prepend">¥(万元)</template>
					</el-input>
				</div>
			</div>
			<div class="sum-item" style="width:95%">
				<div class="item-title">
					行业／领域
				</div>
				<div class="item-content" >
					<!-- <el-input placeholder="请输入行业／领域" class="edit-input" style="display:inline-block" v-model="labelval"></el-input> -->
					<el-select v-model="onetag" placeholder="请选择一级标签" class="edit-input" style="display:inline-block" @change="gettwolist">
					    <el-option
					      v-for="item in onetaglist"
					      :label="item.name"
					      :value="item.id"
					      @click.native="twotag='';threetag='';labelval1=item.name;labeltype='1';labelid=item.id;labelval2='';labelval3=''">
					    </el-option>
					</el-select>
					<el-select v-model="twotag" placeholder="请选择二级标签" class="edit-input" style="display:inline-block" clearable @change="getthreelist">
					    <el-option
					      v-for="item in twotaglist"
					      :label="item.name"
					      :value="item.id"
					      @click.native="threetag='';labelval2=item.name;labeltype='2';labelid=item.id;;labelval3=''">
					    </el-option>
					</el-select>
					<el-select v-model="threetag" placeholder="请选择三级标签" class="edit-input" style="display:inline-block" clearable>
					    <el-option
					      v-for="item in threetaglist"
					      :label="item.name"
					      :value="item.id"
					      @click.native="labelval3=item.name;labeltype='3';labelid=item.id">
					    </el-option>
					</el-select>
					<div class="blue button" @click="addLabel">添加</div><br>
					<!-- <span class="item-label">共享经济</span>
					<span class="item-label">共享经济</span> -->
					<el-tag
					  v-for="tag in tags"
					  :closable="true"
					  :type="tag.type"
					  :key="tag"
					  :close-transition="false"
					  @close="handleClose(tag)"
					  style="margin-top:10px;margin-right:10px;"
					>
						{{tag.name}}
					</el-tag>
				</div>
			</div>
			<div class="sum-item" style="width:100%">
				<div class="item-title">
					项目团队
				</div>
				<div class="item-content clearfix">
					<el-select v-model="value2" placeholder="请选择" class="edit-input" style="display:block">
					    <el-option
					      v-for="item in options2"
					      :label="item.username"
					      :value="item.id"
					      @click.native="addteam(item.id,item.image,item.username,item.rolename,item.address,item.position)">
					    </el-option>
					</el-select>
					<!-- <div class="button blue" style="display:block;margin-top:10px;">添加</div><br> -->
					<div class="item-team clearfix">
						<div class="head-image">
				          <img :src="info.createUser.photo.url" style="width:100%;height:100%;">
				        </div>
				        <div class="head-word">
				          <span class="name">{{info.createUser.name}}</span><br>
				          <span class="position">{{info.createUser.position}}({{info.createUser.address}})</span>
				        </div>
			        </div>
					<div class="item-team clearfix" v-for="(i,index) in team">
						<div class="head-image">
				          <img :src="i.img" style="width:100%;height:100%;border-radius:30px;">
				        </div>
				        <div class="head-word">
				          <span class="name">{{i.username}}</span><br>
				          <span class="position">{{i.position}}({{i.address}})</span>
				        </div>
				        <i class="el-icon-close" style="cursor:pointer" @click="delteam(index)"></i>
			        </div>
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					商业计划书
				</div>
				<div class="item-content" style="padding-top:40px;" v-show="pdf">
					<div style="text-align:center">  
						  <span>页数: <span id="page_num"></span> / <span id="page_count"></span></span>	    
					</div>

					<div style="margin-top:20px;position:relative">
						<div id="prev" style="top:50%;left:0px;position:absolute;font-size:40px;cursor:pointer;transform: translateY(-50%)">
							<i class="el-icon-arrow-left"></i>
						</div>
						<div id="next" style="top:50%;right:0px;position:absolute;font-size:40px;cursor:pointer;transform: translateY(-50%)">
							<i class="el-icon-arrow-right"></i>
						</div>
						<canvas id="the-canvas" style="border:1px solid black;width:100%;"></canvas>
					</div>
					<div style="text-align:center">
						<div class="blue button" @click="showbigimg" style="margin:5px auto">查看大图</div>
					</div>
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					立项理由
				</div>
				<div class="item-content item-single">
					<textarea class="pl-textarea" v-model="info.project_reason" placeholder="请输入立项理由"></textarea>
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					公司名称
				</div>
				<div class="item-content item-single">
					<el-input placeholder="请输入公司名称" class="edit-input" v-model="info.company_name"></el-input>
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					公司网站
				</div>
				<div class="item-content item-single">
					<el-input placeholder="请输入公司网站" class="edit-input" v-model="info.company_web"></el-input>				
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					公司app
				</div>
				<div class="item-content item-single">
					<el-input placeholder="请输入公司app" class="edit-input" v-model="info.company_app"></el-input>	
				</div>
			</div>
			<div class="sum-item">
				<div class="item-title">
					公司公众号
				</div>
				<div class="item-content item-single">
					<el-input placeholder="请输入公司公众号" class="edit-input" v-model="info.company_public"></el-input>			
				</div>
			</div>
			<div class="sum-item sum-double">
				<div class="item-title">
					公司创始人
				</div>
				<div class="item-content item-single">
					<el-input placeholder="请输入公司创始人" class="edit-input" v-model="info.company_founder"></el-input>			
				</div>
			</div>
			<div class="sum-item sum-double">
				<div class="item-title item-title2">
					联系方式
				</div>
				<div class="item-content item-single">
					<el-input placeholder="请输入联系方式" class="edit-input" v-model="info.company_tel"></el-input>			
				</div>
			</div>
			<div class="sum-item sum-double">
				<div class="item-title">
					公司联系人
				</div>
				<div class="item-content item-single">
					<el-input placeholder="请输入公司联系人" class="edit-input" v-model="info.company_contact"></el-input>		
				</div>
			</div>
			<div class="sum-item sum-double">
				<div class="item-title item-title2">
					联系方式
				</div>
				<div class="item-content item-single">
					<el-input placeholder="请输入联系方式" class="edit-input" v-model="info.contact_phone"></el-input>	
				</div>
			</div>
			<div style="text-align:center">
				<div class="button blue" @click="save">保存</div>
			</div>
		</div>
		<el-dialog title="查看大图" v-model="bigimgshow" size="large">
		  	<div class="item-content" style="margin-bottom:20px;">
				<div style="text-align:center">  
					<span>页数: <span id="page_num2"></span> / <span id="page_count2"></span></span>
				</div>
				<div style="margin-top:20px;position:relative">
					<div id="prev2" style="top:50%;left:0px;position:absolute;font-size:40px;cursor:pointer;transform: translateY(-50%)">
						<i class="el-icon-arrow-left"></i>
					</div>
					<div id="next2" style="top:50%;right:0px;position:absolute;font-size:40px;cursor:pointer;transform: translateY(-50%)">
						<i class="el-icon-arrow-right"></i>
					</div>
					<canvas id="the-canvass" style="border:1px solid black;width:100%;"></canvas>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import {itemDetail,getUserList,getProjectFile,vocationOneList,vocationTwoList,vocationThreeList} from '../../ajax/get.js'
import {Item} from '../../ajax/post.js'

export default {
	props: {
		info: {
			type: Object
		}
	},
	data () {
	    return {
	    	bigimgshow:false,
	    	onetag:"",
	    	twotag:"",
	    	threetag:"",
	    	onetaglist:"",
	    	twotaglist:"",
	    	threetaglist:"",
	    	fileList:[],
	    	pdf:'',
	    	team:[],
	    	value2:'',
	    	options2:[],
	    	labelval1:'',
	    	labelval2:'',
	    	labelval3:'',
	    	labeltype:'',
	    	labelid:'',
	    	tags:[],
	    	// info:'',
	    	photoid:null,
	    	photourl:'',
		    options: [{
			      value: '种子',
			      label: '种子'
				}, {
			      value: '天使',
			      label: '天使'
			  	}, {
			      value: 'pre-a',
			      label: 'pre-a'
			  	}, {
			      value: 'A',
			      label: 'A'
			  	}, {
			      value: 'A+',
			      label: 'A+'
			  	}, {
			      value: 'B',
			      label: 'B'
			  	}, {
			      value: 'C',
			      label: 'C'
			 	 }, {
			      value: 'PE',
			      label: 'PE'
			  	}, {
			      value: '新三板',
			      label: '新三板'
			  	}, {
			      value: 'pre-ipo',
			      label: 'pre-ipo'
			  	}, {
			      value: '一级半',
			      label: '一级半'
			  	}, {
			      value: '子基金',
			      label: '子基金'
			}],
			value: '',
			
		    }
	},
  	methods: {
  		showbigimg(){
  				var self = this
  				this.bigimgshow = true
  				function bigimg(){
  					var url = self.pdf;
  					console.log(1)
  					console.log(url)
				    var pdfDoc = null,
				      pageNum = 1,
				      pageRendering = false,
				      pageNumPending = null,
				      scale = 2,
				      canvas = document.getElementById('the-canvass')
				      // console.log(canvas)
				      var ctx = canvas.getContext('2d');
				      ctx.clearRect(0,0,canvas.width,canvas.height);
				  function renderPage(num) {
				    pageRendering = true;
				    // Using promise to fetch the page
				    pdfDoc.getPage(num).then(function(page) {
				      var viewport = page.getViewport(scale);
				      canvas.height = viewport.height;
				      canvas.width = viewport.width;

				      // Render PDF page into canvas context
				      var renderContext = {
				        canvasContext: ctx,
				        viewport: viewport
				      };
				      var renderTask = page.render(renderContext);

				      // Wait for rendering to finish
				      renderTask.promise.then(function () {
				        pageRendering = false;
				        if (pageNumPending !== null) {
				          // New page rendering is pending
				          renderPage(pageNumPending);
				          pageNumPending = null;
				        }
				      });
				    });

				    // Update page counters
				    document.getElementById('page_num2').textContent = pageNum;
				  }

				  /**
				   * If another page rendering in progress, waits until the rendering is
				   * finised. Otherwise, executes rendering immediately.
				   */
				  function queueRenderPage(num) {
				    if (pageRendering) {
				      pageNumPending = num;
				    } else {
				      renderPage(num);
				    }
				  }

				  function onPrevPage() {
				    if (pageNum <= 1) {
				      return;
				    }
				    pageNum--;
				    queueRenderPage(pageNum);
				  }
				  document.getElementById('prev2').addEventListener('click', onPrevPage);

				  /**
				   * Displays next page.
				   */
				  function onNextPage() {
				    if (pageNum >= pdfDoc.numPages) {
				      return;
				    }
				    pageNum++;
				    queueRenderPage(pageNum);
				  }
				  document.getElementById('next2').addEventListener('click', onNextPage);

				  /**
				   * Asynchronously downloads PDF.
				   */
				  PDFJS.getDocument(url).then(function (pdfDoc_) {
				    pdfDoc = pdfDoc_;
				    document.getElementById('page_count2').textContent = pdfDoc.numPages;

				    // Initial/first page rendering
				    renderPage(pageNum);
				  });
  				}
  				if (document.getElementById('the-canvass')==null) {
  					window.setTimeout(bigimg,1000); 
  				}
  		},
  		getonelist(){
  			vocationOneList().then((res) => {
				this.onetaglist = res.vocationOneList
			})  
  		},
  		gettwolist(){
  			vocationTwoList({
  				vocationOneId:this.onetag
  			}).then((res) => {
				this.twotaglist = res.vocationTwoList
			})  
  		},
  		getthreelist(){
  			vocationThreeList({
  				vocationTwoId:this.twotag
  			}).then((res) => {
				this.threetaglist = res.vocationThreeList
			})  
  		},
  		guzhi(number){
  			this.info.valuation = this.outputmoney(number)
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
  		getfile(){
	      	getProjectFile({
	      		projectId:this.$route.query.id
	      	}).then((res) => {
	      		this.pdf = res.data.projectFile.proposal.url

	      		var url = res.data.projectFile.proposal.url;
			  var pdfDoc = null,
			      pageNum = 1,
			      pageRendering = false,
			      pageNumPending = null,
			      scale = 2,
			      canvas = document.getElementById('the-canvas'),
			      ctx = canvas.getContext('2d');
			  function renderPage(num) {
			    pageRendering = true;
			    // Using promise to fetch the page
			    pdfDoc.getPage(num).then(function(page) {
			      var viewport = page.getViewport(scale);
			      canvas.height = viewport.height;
			      canvas.width = viewport.width;

			      // Render PDF page into canvas context
			      var renderContext = {
			        canvasContext: ctx,
			        viewport: viewport
			      };
			      var renderTask = page.render(renderContext);

			      // Wait for rendering to finish
			      renderTask.promise.then(function () {
			        pageRendering = false;
			        if (pageNumPending !== null) {
			          // New page rendering is pending
			          renderPage(pageNumPending);
			          pageNumPending = null;
			        }
			      });
			    });

			    // Update page counters
			    document.getElementById('page_num').textContent = pageNum;
			  }

			  /**
			   * If another page rendering in progress, waits until the rendering is
			   * finised. Otherwise, executes rendering immediately.
			   */
			  function queueRenderPage(num) {
			    if (pageRendering) {
			      pageNumPending = num;
			    } else {
			      renderPage(num);
			    }
			  }

			  function onPrevPage() {
			    if (pageNum <= 1) {
			      return;
			    }
			    pageNum--;
			    queueRenderPage(pageNum);
			  }
			  document.getElementById('prev').addEventListener('click', onPrevPage);

			  /**
			   * Displays next page.
			   */
			  function onNextPage() {
			    if (pageNum >= pdfDoc.numPages) {
			      return;
			    }
			    pageNum++;
			    queueRenderPage(pageNum);
			  }
			  document.getElementById('next').addEventListener('click', onNextPage);

			  /**
			   * Asynchronously downloads PDF.
			   */
			  PDFJS.getDocument(url).then(function (pdfDoc_) {
			    pdfDoc = pdfDoc_;
			    document.getElementById('page_count').textContent = pdfDoc.numPages;

			    // Initial/first page rendering
			    renderPage(pageNum);
			  });
			}).catch((e) => {
                
            })
	    },
  		delteam(num){
  			console.log(num)
  			this.team.splice(num, 1);
  		},
  		addteam(id,img,username,role,address,position){
  			var add = 0
  			this.team.forEach(function(list){
  				if(list.id==id){
  					add = 1
  				} 
  			})
  			if (add==0) {
  				this.team.push({id:id,img:img,username:username,role:role,address:address,position:position})
  			}
  			else{
  				swal({
	                title: "已添加该用户",
	                type: 'warning',
	                text: "已添加该用户",
	                timer: 2000,
	            })
  			} 			
  		},
  		addLabel(){
  			if (this.labelval1=='') {
  				swal({
	                title: "请输入标签",
	                type: 'warning',
	                text: "请输入标签",
	                timer: 2000,
	            })
  			}
  			else{
  				this.tags.push({name:this.labelval1+' '+this.labelval2+' '+this.labelval3,type:this.labeltype,id:this.labelid})
  				// this.labelval = ""
  			}			
  		},
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
	    handleClose(tag) {
	        this.tags.splice(this.tags.indexOf(tag), 1);
	    },
	    getInfoin(){
	    	console.log(this.info)
	    	if (this.info.logo) {
				this.photoid = this.info.logo.id
				this.photourl = this.info.logo.url
			}
			if (this.info.tab) {
				var self = this
				self.tags = []
				this.info.tab.forEach(function(list){
					self.tags.push({name:list})
				})
			}
			if (this.info.project_member) {
				var self = this
				self.team = []
				this.info.project_member.forEach(function(list){
					var photo
					if (list.photo) {
						photo = list.photo.url
					}
					else{
						photo = "../static/img/touxiang.png"
					}

					self.team.push({id:list.id,img:photo,username:list.name,role:list.role.roleName,address:list.address,position:list.position})
				})
			}
	    },
	    getUser(){
	    	var self = this
	      	getUserList({
	      		type:0
	      	}).then((res) => {
				res.data.list.forEach(function(list){
					var photo
					if (list.photo) {
						photo = list.photo.url
					}
					else{
						photo = "../static/img/touxiang.png"
					}
					self.options2.push({address:list.address,id:list.id,username:list.name,rolename:list.role.roleName,image:photo,position:list.position})
				})
			})  
	    },
	    save(){
	    	var alltags = []
	    	// var twotags = []
	    	// var threetags = []
	    	this.tags.forEach(function(list){
	    		// if (list.type=='1') {
	    		// 	onetags.push({id:list.id})
	    		// }
	    		// if (list.type=='2') {
	    		// 	twotags.push({id:list.id})
	    		// }
	    		// if (list.type=='3') {
	    		// 	threetags.push({id:list.id})
	    		// }	
	    		alltags.push({id:list.id})
	    	})
	    	var member = []
	    	this.team.forEach(function(list){
	    		member.push({id:list.id})
	    	})
	    	var logo
	    	if (this.photoid==null) {
	    		logo = null
	    	}
	    	else{
	    		logo={
	    			id:this.photoid
	    		}
	    	}
	      	Item({
				type:0,
				strProject:JSON.stringify({
					id:this.$route.query.id,
					logo:logo,
					project_name:this.info.project_name,
					project_introduction:this.info.project_introduction,
					project_code:this.value,
					valuation:this.info.valuation,
					project_reason:this.info.project_reason,
					company_name:this.info.company_name,
					company_web:this.info.company_web,
					company_app:this.info.company_app,
					company_public:this.info.company_public,
					company_founder:this.info.company_founder,
					company_tel:this.info.company_tel,
					company_contact:this.info.company_contact,
					contact_phone:this.info.contact_phone,
					// tab:tab,
					vocations:alltags,
					project_member:member,
					project_stage:this.info.project_stage
				})			
			}).then((res) => {
				// this.getInfo()
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
    	var self = this
    	this.getonelist()
    	this.getfile()
    	this.getInfoin()
    	this.getUser()
    	this.info.vocations.forEach(function(list){
    		self.tags.push({id:list.id,name:list.name})
    	})
    }
}
</script>
<style lang="less">
	.el-upload__files{
		height: 30px !important;
		overflow:hidden;
	}
	.money-input{
		input{
			text-align: right;
		}
	}
	.el-input__inner{
		height: 40px;
	}
	
</style>
<style lang="less" scoped>
	@media(max-width:1200px){
	  .sum-double{
	    width: 80% !important;
	    float: none !important;
	  }
	  .sum-trible{
	    width: 80% !important;
	    float: none !important;
	  }
	  .item-title2{
	  	border-radius: 0 20px 20px 0 !important;
	  }
	}
</style>