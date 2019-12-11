import axios from 'axios'
import http from './http'

const selectHistoricalData = (data) => {
    return axios.post("/electricityMeter/selectQueryCondition", data)
}
const selectRoundedSystemTree = (data) => {
    return axios.post("/api/electricityMeter/selectHistoricalData", data)
}
const getCamalToken = (data1, data2) => {
    return axios.post(`/bpi/token/get?appKey=${data1}&appSecret=${data2}`)
}
const getCarmalControl = (data1, data2) => {
    return axios.post(`/bpi/device/ptz/start?accessToken=${data1}&deviceSerial=C12756065&channelNo=1&direction=${data2}&speed=0`)
}
const getCarmalStop = (data1, data2) => {
    return axios.post(`/bpi/device/ptz/stop?accessToken=${data1}&deviceSerial=C12756065&channelNo=1&direction=${data2}`)
}
const getMock = () => {
    return axios.get('/products')
}
export const getCompanyList = () => {
    return http('get', '/page/list', '')
}


export {
    selectHistoricalData,
    selectRoundedSystemTree,
    getCamalToken,
    getMock,
    getCarmalControl,
    getCarmalStop

}