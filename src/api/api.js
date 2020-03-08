/** 
 * 
 * api 接口统一管理
 *  **/
import {get,post} from "./http"

// 上传图片
export const apiPicture = "http://localhost:8071/api/hairstyle/uploadFile";

// 管理员---验证登录
export const apiLogin = p => get('/hairstyle/administrators/check',p);

// 管理员---查询所有管理员
export const apiQueryAllPeople = p => get('/hairstyle/administrators/selectAll',p);

// 管理员---添加管理员
export const apiAddLogin = p => post('/hairstyle/administrators/insert',p);

// 管理员---修改管理员
export const apiModifyLogin = p => post('/hairstyle/administrators/update',p);

// 管理员---删除管理员
export const apiDeleteLogin = p => post('/hairstyle/administrators/delete',p);

// 店铺资料---店铺一栏---查询所有店铺信息
export const storeQuertAll = p => get('/hairstyle/shop/selectAll',p);