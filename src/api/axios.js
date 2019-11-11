import axios from 'axios';
import Vue from 'vue'
import api from "./api"
import router from '../router/index'
import qs from 'qs'
import { Notify } from 'vant';
//axios.defaults.baseURL = "http://nannyapi.xiaoyujia.com";
// axios.defaults.headers.common['Authorization'] = '111';
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//axios.defaults.baseURL = 'http://localhost:8088'
axios.defaults.timeout = 120000;  // 响应时长 2min 长语音(30s)识别需要较长时间
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;


// 添加请求拦截器(axios请求前)
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token');
  let expire = Date.now() - localStorage.getItem('date') > 3600000; //过期时间为1小时
  //console.log(Date.now(), localStorage.getItem('date'), (Date.now() - localStorage.getItem('date')) / 1000, expire);
  if (config.method == 'post' && !config.headers.filePost) {
    config.data = qs.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }
  if (token && !expire) {
    localStorage.setItem('date', Date.now()); //如果没有过期，则更新，1小时未访问则会过期
    config.headers.token = token;
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          Notify({ type: 'danger', message: '请先登录' })
          localStorage.removeItem('token');
          router.replace({
            path: '/user_login',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });

const postData = (url, data, config = {}) => {
  // return axios.post(api[url], qs.stringify(data));
  return axios.post(api[url], data, config);
}

const getData = (url, params) => {
  return axios.get(api[url], {
    params,
  });
}

Vue.prototype.$postData = postData;
Vue.prototype.$getData = getData;

export default {
  postData,
  getData
};
