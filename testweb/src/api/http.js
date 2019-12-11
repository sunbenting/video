import axios from 'axios'
import qs from 'qs'
// import Vue from "vue";
import {
    Message
} from 'element-ui'
import {
    config
} from 'rxjs';
import router from '@/router/index';

let lock = false
    /**
     * 封装axios
     * */
const http = (type, url, datas, head) => {
        const config = {
            url: url,
            method: type,
            timeout: 10000,
            baseURL: process.env.NODE_ENV === 'production' ? 'http://test.server.biz:9097' : 'http://test.server.biz:9097',
            headers: {
                'Content-Type': head ? 'application/x-www-form-urlencoded' : 'application/json'
            }
        };
        let extend = type === 'get' ? {
            params: datas
        } : {
            data: head ? qs.stringify(datas) : datas
        }
        return axios({
            ...config,
            ...extend
        })
    }
    /**
     * 请求前拦截
     * */
axios.interceptors.request.use(config => {
        // let token = store.state.user.token
        // if (token) {
        //     config.headers['Authorization'] = token
        // }
        return config
    }, (error) => {
        return Promise.reject(error)
    })
    /**
     * 请求响应拦截
     * 用于处理需要在请求返回后的操作
     */
axios.interceptors.response.use(response => {
    const responseCode = response.data.code
    const responseMsg = response.data.msg
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
    if (responseCode === 200) {
        return Promise.resolve(response.data)
    } else {
        console.log(responseCode, responseMsg)
        errorHandle(responseCode, responseMsg)
    }
    if (responseCode === '200') {
        return Promise.resolve(response.data)
    } else {
        console.log(responseCode, responseMsg)
        errorHandle(responseCode, responseMsg)
    }
}, error => {
    if (!error.response) {
        if (error.message.includes('timeout')) {
            lock && Message.error({
                content: "请检查网络是否连接正常",
                onClose: () => lock = true
            })
            lock = false
        }
        return
    }
    // 服务器返回不是 2 开头的情况，会进入这个回调
    // 可以根据后端返回的状态码进行不同的操作
    const responseCode = error.response.status
    errorHandle(responseCode)
    return Promise.reject(error)
})
export default http

function errorHandle(code, msg) {
    switch (code) {
        case '60000':
            Message.error(msg)
            break;
        case '60001':
            Message.error(msg)
            break;
        case '60002':
            Message.error(msg)
            break;
        case '60003':
            Message.error(msg)
            break;
        case '60004':
            Message.error(msg)
            break;
        case '60005':
            Message.error(msg)
            break;
        case '60006':
            Message.error(msg)
            break;
        default:
            lock && Message.error({
                content: '未知错误',
                onClose: () => lock = true
            });
            lock = false

    }
}