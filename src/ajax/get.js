import {getFactory as factory} from './const.js'

//基金列表
export const itemList = factory('/getProjectList')
//基金详情
export const itemDetail = factory('/getProject')
//用户列表
export const getUserList = factory('/getUserList')
//基金列表
export const getFoundationList = factory('/getFoundationList')
//获取用户信息
export const getUser = factory('/getUser')
//项目评级值总和列表
export const getRateList = factory('/getEvaluateAvgList')
//获取项目评级列表
export const getRatePList = factory('/getEvaluateList')
//获取笔记列表
export const getNoteList = factory('/getNoteList')
//获取项目文件
export const getProjectFile = factory('/getProjectFile')
//获取角色列表
export const getRoleList = factory('/getRoleList')
//评级所有历史记录
export const getEvaluateRecordList = factory('/getEvaluateRecordList')
//主页项目列表
export const getMainProjectList = factory('/getMainProjectList')
//按角色获取用户
export const getUserListByRole = factory('/getUserListByRole')
//公告列表
export const getNoticeList = factory('/getNoticeList')
//公告详情
export const getNotice = factory('/getNotice')
//获取省份列表
export const getProvinceList = factory('/getProvinceList')
//获取城市列表
export const getCityList = factory('/getCityList')
//城市搜素列表
export const getSearchCityList = factory('/getSearchCityList')
//微信公众号文章列表
export const getMaterialList = factory('/getMaterialList')
//获得标签一级列表
export const vocationOneList = factory('/vocationOneList')
//获得标签二级列表
export const vocationTwoList = factory('/vocationTwoList')
//获得标签三级列表
export const vocationThreeList = factory('/vocationThreeList')
//统计已投项目
export const getType0 = factory('/getType0')
//统计退出项目
export const getType1 = factory('/getType1')
//统计未投项目
export const getType2 = factory('/getType2')
//统计新增项目统计
export const getType3 = factory('/getType3')
//统计-标签
export const vocation_project = factory('/vocation_project')
//统计-除标签外
export const statistics_project = factory('/statistics_project')
//统计-搜索列表
export const getSearchList = factory('/getSearchList')
//获取个人点评
export const getNoteListByUserId = factory('/getNoteListByUserId')
//个人中心我的评论项目列表
export const getProjectListByUser = factory('/getProjectListByUser')
//对应项目我的评价
export const getNoteListByProject = factory('/getNoteListByProject')
//获取全部评论标签
export const getCommentTabList = factory('/getCommentTabList')
//获取角色详情
export const getRole = factory('/getRole')
//获取所有公告列表
export const getNoticeList_back = factory('/getNoticeList_back')
//获取单个标签
export const getCommentTab = factory('/getCommentTab')
//基金详情
export const getFoundation = factory('/getFoundation')
//获取所有评论项目列表
export const getProjectList_back = factory('/getProjectList_back')
//后台获取标签列表 
export const getNoteListByProject_back = factory('/getNoteListByProject_back')
//获取上会项目
export const getProjectListFromMeeting = factory('/getProjectListFromMeeting')
//获得基金对应投资人
export const getInvestByFoundationId = factory('/getInvestByFoundationId')












