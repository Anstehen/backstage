<template>
  <div class="order box_two">
      <el-button type="primary" plain class="addUser" @click="addUserClick">添 加</el-button>
      <el-row>
        <el-col :span="24">
          <div class="count box_ten">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" prop="index" label="编 号" width="66"> </el-table-column>
                <el-table-column prop="name" label="店 名" width="230"></el-table-column>
                <el-table-column prop="address" label="地 址" width="230"></el-table-column>
                <el-table-column prop="phone" label="联系方式" width="180"></el-table-column>
                <el-table-column label="图 片" width="160">
                  <el-button type="primary" plain @click="itemPicturePoupu">编 辑</el-button>
                </el-table-column>
                <el-table-column prop="price" label="价 格" width="166"></el-table-column>
                <el-table-column label="操作" width="266">
                  <el-button type="primary" @click="editClick">编 辑</el-button>
                  <el-button type="danger" @click="deleteClick">删 除</el-button>
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
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <el-row>
          <span>店 名</span>
            <el-input
              placeholder="请输入内容"
              v-model="inputStroe"
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
          <span>地址</span>
          <el-select v-model="valueProvince" placeholder="请选择" class="region">
            <el-option
              v-for="item in provinceArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="valuecity" placeholder="请选择" class="region">
            <el-option
              v-for="item in cityArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="valueArea" placeholder="请选择" class="region">
            <el-option
              v-for="item in areaArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-row>
        <el-row style="margin-top:36px;">
          <span>图片</span>
          <el-button type="primary" plain class="picture" @click="editPictureClick">编 辑</el-button>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="发型秀"
        :visible.sync="dialogPicture"
        width="66%"
        :before-close="picturePopupClose">
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
          <el-button @click="dialogPicture = false">取 消</el-button>
          <el-button type="primary" @click="dialogPicture = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'store',
  data(){
    return{
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        name: '海伦造型',
        address: '浙江省行杭州市西湖区',
        id:1234567890,
        phone:14725836900,
        price:"50~500",
        age:23
      }],
      total:1200,
      pageSize:6,
      currentPage:1,
      dialogVisible: false,
      radio: '1',
      inputStroe:"",
      inputPhone:"",
      provinceArr: [{
          value: '选项1',
          label: '浙江'
        }, {
          value: '选项2',
          label: '河南'
        }],
        valueProvince: '',
      cityArr: [{
          value: '选项1',
          label: '杭州'
        }, {
          value: '选项2',
          label: '绍兴'
        }],
        valuecity: '',
      areaArr: [{
          value: '选项1',
          label: '浙江'
        }, {
          value: '选项2',
          label: '河南'
        }],
        valueArea: '',
        numStart: 1,
        numEnd:1,
        dialogPicture:false,
        dialogImageUrl: '',
        dialogLoading: false,
        unloadNumbber:12,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        ]
    }
  },
  methods:{
    // 添加
    addUserClick(){
      let self = this;
      self.dialogVisible = true;
    },
    // 弹出框一：编辑
    editClick(){
      let self = this;
      self.dialogVisible = true;
    },
    // 弹出框一：关闭
    handleClose(){
      let self = this;
      self.dialogVisible = false;
    },  
    // 弹出框一：起始价格
    popupStart(value) {
        console.log(value);
    },
    // 弹出框一：终止价格
    popupEnd(row) {
      console.log(row);
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
  }
</style>