let baseUrl = 'http://dinglingtech.cn'; //部署后的地址
let officialUrl = 'https://www.hepper.cn/hepper' //正式的
let proxy = '/api';
//proxy = baseUrl + '/hepper'
//proxy = officialUrl
export default {
  getAdvertiseImgList: proxy + '/manager/getAdvertiseImgList',

}
