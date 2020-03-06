<template>
  <div class="order box_two">
      <el-button type="primary" plain class="addUser" @click="editClick(null)">添 加</el-button>
      <el-row>
        <el-col :span="24">
          <div class="count box_ten">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" prop="index" label="编 号" width="66"> </el-table-column>
                <el-table-column prop="shopName" label="店 名" width="188"></el-table-column>
                <el-table-column label="店铺照片" width="108">
                  <div class="store_img" slot-scope="scope">
                      <el-image 
                        class="store_img_pic"
                        :src="scope.row.shopAddressphoto" 
                        :preview-src-list="previewPictureList"
                        @click="previewPicture(scope.row.shopAddressphoto)">
                      </el-image>
                  </div>
                </el-table-column>
                <el-table-column prop="shopAddress" label="地 址" width="230"></el-table-column>
                <el-table-column prop="shopCity" label="搜索地址" width="136"></el-table-column>
                <el-table-column prop="mobilePhone" label="联系方式" width="180"></el-table-column>
                <el-table-column label="图 片" width="160">
                  <el-button type="primary" plain @click="itemPicturePoupu">查 看</el-button>
                </el-table-column>
                <el-table-column prop="haircutPrice" label="最低价格" width="88"></el-table-column>
                <el-table-column prop="ironingPrice" label="最高价格" width="88"></el-table-column>
                <el-table-column label="操作" width="188">
                  <div slot-scope="scope">
                    <el-button type="primary" @click="editClick(scope.row)">编 辑</el-button>
                    <el-button type="danger" @click="deleteClick(scope.row)">删 除</el-button>
                  </div>
                </el-table-column>
              </el-table>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="paging box_ten">
              <el-pagination
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="total">
              </el-pagination>
          </div>
        </el-col>
      </el-row>
      <el-dialog
        title="用户信息"
        :visible.sync="addPopupShow"
        width="50%"
        :before-close="handleClose">
        <el-row>
          <span>店 名</span>
            <el-input
              placeholder="请输入内容"
              v-model="inputStroeName"
              clearable
              style="width:66%;margin-left:1%;">
            </el-input>
        </el-row>
        <el-row style="margin-top:36px;">
          <span>手机号</span>
          <el-input
            placeholder="请输入内容"
            v-model="inputPhone"
            clearable
            style="width:66%;margin-left:1%;">
          </el-input>
        </el-row>
        <el-row style="margin-top:36px;">
          <span>价格</span>
          <span class="priceOne">起始价：</span>
          <el-input-number v-model="numStart" @change="popupStart" :min="0" :max="10000" label="开始价格"></el-input-number>
          <span class="priceTwo">最高价：</span>
          <el-input-number v-model="numEnd" @change="popupEnd" :min="0" :max="10000" label="终止价格"></el-input-number>
        </el-row>
        <el-row style="margin-top:36px;">
          <span>店铺地址</span>
          <el-input
            placeholder="请输入店铺地址"
            v-model="inputStoreAddress"
            clearable
            style="width:66%;margin-left:1%;">
          </el-input>
        </el-row>
        <el-row style="margin-top:36px;">
          <span>选择搜索城市（例：郑州市）</span>
            <el-select v-model="cityValue" placeholder="请选择">
              <el-option
                v-for="item in cityArr"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-row>
        <el-row style="margin-top:36px;">
          <span>店铺门店图片</span>
          <el-row style="margin-top:36px;">
            <el-upload
              class="avatar-uploader"
              :action="pictureUrl"
              :show-file-list="false"
              :multiple="false"
              :limit=1
              :headers="headers"
              name="file"
              :with-credentials="wetherSure"
              list-type="picture"
              accept="image/*"
              :on-success="storeSuccess"
              :on-error="storeError"
              :before-upload="storeUpload">
              <img v-if="storeImageUrl" :src="storeImageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" style="border:1px dotted lightgray"></i>
            </el-upload>
          </el-row>
        </el-row>
        <el-row style="margin-top:36px;">
          <span>店铺图片</span>
          <el-button type="primary" plain class="picture" @click="editPictureClick">编 辑</el-button>
        </el-row>
        <el-row class="box_four" style="margin-top:36px;">
          <span>到店前的准备</span>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入到店前的准备"
            v-model="inputBeforeStore"
            style="width:66%;margin-left:2%;">
          </el-input>
        </el-row>
        <el-row class="box_four" style="margin-top:36px;">
          <span>到店后的注意事项</span>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入到店后的注意事项"
            v-model="inputAfterStore"
            style="width:66%;margin-left:2%;">
          </el-input>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addPopupShow = false">取 消</el-button>
          <el-button type="primary" @click="addPopupShow = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- <el-dialog
        title="店铺内的图片"
        :visible.sync="popupStorePicture"
        width="66%"
        :before-close="popupStorePicture">
        <div class="demo-image__preview">
          <el-image 
            style="width: 100px; height: 100px"
            :src="url" 
            :preview-src-list="srcList">
          </el-image>
        </div>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="unloadNumbber">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogLoading">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="popupStorePicture = false">取 消</el-button>
          <el-button type="primary" @click="popupStorePicture = false">确 定</el-button>
        </span>
      </el-dialog> -->
  </div>
</template>

<script>
import {storeQuertAll,apiPicture} from "../../api/api";
import {judgeExist} from "../../assets/js/public";
import {cityAddrees} from "../../assets/js/city";
export default {
  name: 'store',
  data(){
    return{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', //请求头
        'Access-Control-Allow-Origin':"*",
        'Access-Control-Allow-Headers':"Content-Type,Token",
      },
      wetherSure:true,
      tableData: [],//表格数据
      total:0,//总数
      pageSize:6,//一页的数据
      currentPage:1,//当前的页码
      dialogVisible: false,
      radio: '1',
      inputStroeName:"",//店名
      inputPhone:"",//店铺电话
      inputStoreAddress:"",//店铺地址
      inputSearchAddress:"",//搜索地址
      numStart: 0,//最低价
      numEnd:0,//最高价
      storeImageUrl:"",//店铺图片
      popupStorePicture:false,//店铺的图片弹出层
      dialogPicture:false,
      dialogImageUrl: '',
      dialogLoading: false,
      unloadNumbber:12,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ],
      cityArr:[],//全国所有城市
      cityValue:"",//选择的城市
      inputBeforeStore:"",//到店前的准备
      inputAfterStore:"",//到店后的注意事项
      previewPictureList:[],//预览图片
      addPopupShow:false,//添加店铺、修改店铺
      pictureUrl:"",//上传图片的接口
    }
  },
  methods:{
    // 添加
    addUserClick(){
      let self = this;
      self.addPopupShow = true;
    },
    // table 列表---图片预览
    previewPicture(val){
      // console.log(val);
      let self = this;
      self.previewPictureList = [val];
    },
    // 弹出框一：编辑
    editClick(val){
      let self = this;
      console.log(val);
      if(judgeExist(val)){//修改

      }else{//添加

      }
      self.addPopupShow = true;
    },
    //店铺门店图片---上传图片前
    storeUpload(){
      console.log("11111111111111")
    },
    //店铺门店图片---成功
    storeSuccess(res, file){
      console.log(res);
      console.log(file);
      console.log("22222222222222222")
    },
    // 店铺门店图片---失败
    storeError(){
      this.$message.error('出错了，上传失败，请稍后再试！');
    },




    // 弹出框一：起始价格
    popupStart(value) {
        console.log(value);
    },
    // 弹出框一：终止价格
    popupEnd(row) {
      console.log(row);
    },
    // 弹出框一：关闭
    handleClose(){
      let self = this;
      self.addPopupShow = false;
    },  
    // 弹出框一：编辑图片
    editPictureClick(){
      let self = this;
      self.dialogPicture = true;
    },
    // 列表：弹出框二激活
    itemPicturePoupu(){
      let self = this;
      self.dialogPicture = true;
    },
    // 弹出框二：关闭
    picturePopupClose(){
      let self = this;
      self.dialogPicture = false;
    },
    // 弹出框二：删除图片
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    // 弹出框二：图片预览
    handlePictureCardPreview(file, fileList) {
        console.log(file, fileList);
    },
    // 删除
    deleteClick(){
      let self = this;
      self.$confirm('你确定要删除此店铺么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //分页器
    handleCurrentChange: function (val) {
        this.page = val;
        // this.getList();
    }
  },
  created(){
    let self = this;
    self.cityArr = cityAddrees;
    self.pictureUrl = apiPicture;
    // 查询所有店铺
    function pageData(){
      let para = {};
      storeQuertAll(para).then(res => {
        // console.log(res);
        self.tableData = res;
        self.total = res.length;
      }).catch(err =>{
        console.log(err);
      })
    }
    pageData();
  }
}
</script>
<style lang="scss" scoped>
  .order{
    width: 100%;
    height: 100%;
    .addUser{
      position: absolute;
      top: 12px;
      left: 223px;;
    }
    .condition{
      width: 100%;
      height: 180px;
    }
    .count{
      min-height: 100px;
      border-radius: 4px;
      .store_img{
        width: 68px;
        height: 68px;
        overflow: hidden;
        .store_img_pic{
          width: 68px;
          height: 68px;
        }
      }
    }
    .screen {
      min-height: 100px;
      border-radius: 4px;
      border: 1px dotted #99a9bf;
    }
    .paging{
      min-height: 60px;
      border-radius: 4px;
      border: 1px dotted #99a9bf;
    }
    .region{
      width: 120px;
      margin-left: 12px;
    }
    .priceOne{
      margin-left: 26px;
    }
    .priceTwo{
      margin-left: 16px;
    }
    .picture{
      margin-left: 16px;
    }
    .avatar-uploader .el-upload {
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>