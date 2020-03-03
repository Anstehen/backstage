/** 
 * 
 * api 接口统一管理
 *  **/
import {get,post} from "./http"

// 验证登录
export const apiLogin = p => get('/hairstyle/administrators/check',p);

// 添加管理员
export const apiAddLogin = p => post('/hairstyle/administrators/insert',p);