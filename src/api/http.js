// 在 vue 项目中，和后台交互获取数据这块，我们通常使用的是 axios 库，它是基于 promise 的 http 库，可运行在浏览器端和 node.js 中。它有很多优秀的特性，例如：拦截请求和响应、取消请求、转换 json 、客户端防御 cSRF 等。所以我们的尤大大也是果断放弃了对其官方库 vue-resource 的维护，直接推荐我们使用 axios 库。
// 安装： npm install axios
// 引入：一般会在项目的 src 目录中，新建一个 request文件夹，然后在里面新建一个 http.js 和 app.js 文件。http.js 文件用来封装我们的 axios，api.js 文件用来统一管理我们的接口
// 在 http.js 中引入 axios

import axios from "axios"           //引入 axios
import QS from "qs"                 //引入 qs 模块，用来序列化 post 类型的数据

// 环境的切换
// 项目中一般会有开发环境、测试环境和生产环境。可以通过 node 的环境变量来匹配默认的接口 url 前缀。axios.defaults.baseURL 可以设置 axios 的默认请求地址。

// 环境的切换
// axios.defaults.baseURL = "https://www.hzweirui.com";
axios.defaults.baseURL = '/api/';
// if(process.env.NODE.ENV == "development"){
//     axios.defaults.baseURL = "https://www.hzweirui.com";
// }else if(process.env.NODE.ENV == "debug"){
//     axios.defaults.baseURL = "https://www.hzweirui.com";
// }else if(process.env.NODE.ENV == "production"){
//     axios.defaults.baseURL = "https://www.hzweirui.com";
// }

// 设置请求超时
// 通过 axios.default.timeout 设置默认的请求超时时间。例如超过了 10s ，就会告知用户当前请求超时。

axios.defaults.timeout = 10000;

// post 请求的时候，需要加上一个请求头，所以这里可以设置一个默认的值，即设置 post 的请求头为 application/x-www-form-urlencoded;charrset=UTF-8

axios.defaults.headers.common['Access-Control-Allow-Origin']="*";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 在数据请求之前可以进行一个请求的拦截，拦截的目的是：比如，有些请求是需要用户登录之后才能访问的，或者是 post 请求的时候，需要序列话提交的数据。这时候，可以在请求被发送之前进行一个拦截，从而进行想要的操作。


// 请求拦截
// 先导入 vuex ，因为要使用到里面的状态对象
// vuex 的路径根据自己的路径去写
// import store from "@/store/index"
// // 请求拦截器
// axios.interceptors.requset.use(
//     config =>{
//         // 每次发送请求之前判断 vuex 中是否存在 token
//         // 如果存在，则统一在 http 请求的 header 都加上 token ，这样后台根据 token 判断你的登录情况
//         // 即便本地存在 token ,也有可能是 token 是过期的，所以在响应拦截器中要对返回状态进行判断
//         const token = store.state.token;
//         token && (config.headers.Authorization = token);
//         return config;
//     },
//     error =>{
//         return Promise.error(error);
//     }
// )

// token ，一般是在登录完成之后，将用户的 token 通过 localStroage 或者 cookie 存在本地，然后用户每次进入页面的时候 （即在 main.js中）,会首先从本地存储中读取 token ，如果 token 存在说明用户已经登陆过，则更新 vuex 中的 token 状态。然后，在每次请求接口的时候，都会在请求的 header 中携带 token ，后台人员就可以根据携带的 token 来判断你的登录是否过期，如果没有携带，则说明没有登陆过。疑问：每个请求都携带 token ，这时有一个页面不需要用户登录就可以直接访问，这时前端携带 token ，后台可以选择不接受


// 响应的拦截
// 响应拦截器
// axios.interceptors.response.use(
//     response =>{
//         // 如果返回的状态码为 200 ，说明接口请求成功，可以正常拿到数据
//         // 否则的话抛出错误
//         if(response.status === 200){
//             return Promise.resolve(response);
//         }else{
//             return Promise.reject(response);
//         }
//     },
//     // 服务器状态码不是 2 开头的情况
//     // 这里可以跟后台的开发人员协商统一好错误的状态码
//     // 然后根据返回的状态码进行一些操作，例如登陆过期，错误提示等等
//     // 下面是几个常见的操作，其他的可以根据需求自行扩展
//     error =>{
//         if(error.response.status){
//             switch(error.response.status){
//                 // 401:未登录
//                 // 未登录则跳转登录页面，并携带当前页面的路径
//                 // 在登陆成功后返回当前页面，这一步需要在登录页面操作
//                 case 401:
//                     router.replace({
//                         path:'/login',
//                         query:{
//                             redirect:router.currentRouter.fullPath
//                         }
//                     })
//                     break;
//                 // 403 token 过期
//                 // 登录过期对用户进行提示
//                 // 清除本地 token 和清空 vuex 中的 token 对象
//                 // 跳转登录页面
//                 case 403:
//                     alert('登录过期，请重新登录');
//                     // 清除 token 
//                     localStorage.removeItem('token');
//                     store.commit('loginSuccess',null);
//                     // 跳转登录页面，并将要浏览的页面 fullPath 传过去，登录成功后跳转需要访问的页面
//                     setTimeout(() => {
//                         router.replace({
//                             path:'/login',
//                             query:{
//                                 redirect:router.currentRouter.fullPath
//                             }
//                         },3000)
//                     })
//                     break;
//                 // 404 请求不存在
//                 case 404:
//                     alert("网络请求不存在");
//                     break;
//                 // 其他错误，直接抛出错误提示
//                 default:
//                     alert(error.response.data.message); 
//             }
//             return Promise.reject(error.response);
//         }
//     }
// )
// 响应拦截器很好理解，就是服务器返回给我门的数据，我们可以在拿到之前对他进行一些处理。例如上面的思想：如果后台返回的状态码是 200，则正常返回数据，否则的话根据错误的状态码类型进行一些我们需要的错误，其实这里主要就是进行了错误的统一处理和没登录或登陆过期后调整登录页的一个操作。


// 封装 get 方法和 post 方法
// 我们常用的 ajax 方法有 get 、 post 和 put 等方法。axios 对应的也有很多类似的方法。
// get 方法：通过定义一个 get 函数，get 函数有两个参数，第一个参数表示要请求的 url 地址，第二个参数是要携带的请求参数。get 函数返回一个 promise 对象，当 axios 其请求成功时 resolve 服务器返回值，请求失败时 reject 错误值。最后通过 export 抛出 get 函数。
/** 
 * get 方法，对应 get 请求
 * param{String} url 【请求的 url 地址】
 * param{Object} params 【请求时携带的参数】
 *  **/ 
export function get(url,params){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
        .then(res =>{
            resolve(res.data);
        })
        .catch(err =>{
            reject(err);
        })
    })
}

// post 方法：原理同 get 一样，但是要注意的是，post 方法必须要使用对提交从参数对象进行序列话的操作，所以这里我们通过 node 的 qs 模块来序列话我们的参数。这个很重要，如果没有序列话操作，后台是拿不到提交的数据的。这就是开头 import QS from 'qs' 的原因。
/** 
 * post 方法，对应 post 请求
 * param{String} url 【请求的 url 地址】
 * param{Object} params 【请求时携带的参数】
 *  **/ 
export function post(url,params){
    return new Promise((resolve,reject) => {
        axios.post(url,QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}
// 细节：axios.get() 方法和 axios.post() 在提交数据时参数的书写方法还是有区别的。区别就是，get 的第二个参数是一个 {} ，然后这个对象的 params 属性值是一个参数的对象的。而 post 的第二个参数就是一个参数对象。两者有略微的区别。