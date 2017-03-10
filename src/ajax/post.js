// import $ from 'jquery'
import {postFactory as factory} from './const.js'

export const Item = factory('/saveorupdateProject')
//登录
export const Login = factory('/login')
//后台登陆
export const login_back = factory('/login_back')
//注销
export const Logout = factory('/logout')
//评级
export const Rate = factory('/saveorupdateEvaluate')
//新建笔记
export const Note = factory('/saveorupdateNote')
//新建项目文件
export const File = factory('/saveorupdateProjectFile')
//新增用户
export const saveUser = factory('/saveorupdateUser')
//删除草稿箱项目
export const deleteProject = factory('/deleteProject')
//修改密码
export const updatePassword = factory('/updatePassword')
//发布公告
export const saveorupdateNotice = factory('/saveorupdateNotice')
//删除评论
export const deleteNote = factory('/deleteNote')
//回收站操作
export const recoverProject = factory('/recoverProject')
//清空回收站
export const cleanRecycleBin = factory('/cleanRecycleBin')
//启用和禁用用户
export const update_user = factory('/update_user')
//新增角色
export const saveorupdateRole = factory('/saveorupdateRole')
//修改通知内容
export const saveorupdateNoticeTab = factory('/saveorupdateNoticeTab')
//新增修改标签
export const saveorupdateCommentTab = factory('/saveorupdateCommentTab')
//新增基金
export const saveorupdateFoundation = factory('/saveorupdateFoundation')
//新增行业标签
export const saveorupdateVocation = factory('/saveorupdateVocation')
//删除行业标签
export const deleteVocation = factory('/deleteVocation')
//添加上会项目
export const saveorupdateMeeting = factory('/saveorupdateMeeting')
//上会项目排序
export const meetingProjectListSequence = factory('/meetingProjectListSequence')





