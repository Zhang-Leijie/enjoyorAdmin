var retCodes = {
    success : "0",
    nonLogin : "10000",
    expired: "10004",
    beReplaced: "10016"
}

// import $ from 'jquery'
import router from '../router.js'
import {routerState} from '../router.js'

// export const server_match_url = 'http://jr.xiyoukeji.com/index.php/match'

export const server_url = ''

const LOGIN_ERROR = "LOGIN_ERROR_0"

var hasNonLoginError = false

export const Factory_ = (server_url) => (method) => (url) => (params, loginSilent) => {
    //console.dir(params)
    return Promise.resolve($.ajax({
        url: server_url + url,
        type:method,
        data: params
    })).then((res) => {
        if (res.code == retCodes.success) {
            hasNonLoginError = false
            return Promise.resolve(res)
        } else if (res.code == retCodes.nonLogin || 
            res.code == retCodes.expired || 
            res.code == retCodes.beReplaced){

            var e = new Error(LOGIN_ERROR)
            e.detail__ = res.detail
            return Promise.reject(e)
        } else if(res.code==2){
            router.push({name: 'sign-in'})
        }else if(res.code==3){
            swal({
                title: "用户无权限",
                type: 'warning',
                text: "用户无权限",
                timer: 2000,
            })
        }
        else if(res.code==4){
            swal({
                title: "创建失败",
                type: 'warning',
                text: "命名重复，请重新输入",
                timer: 2000,
            })
        }else {
            console.log("error")
            // return Promise.reject(new Error(res.code))
        }
    }).catch((e) => {
        if (e.message == LOGIN_ERROR && !loginSilent) {
            if (!hasNonLoginError) {
                hasNonLoginError = true
            } else {
                return
            }
            alert(e.detail__)
            routerState.previous = router.currentRoute.name
            router.push({name: 'sign-in'})
        }
        return Promise.reject(e)
    })
}

// const matchFactory = Factory_(server_match_url)
const serverFactory = Factory_(server_url)


// export const postFactory = matchFactory('POST')
// export const getFactory = matchFactory('GET')

export const getFactory = serverFactory('GET')
export const postFactory = serverFactory('POST')