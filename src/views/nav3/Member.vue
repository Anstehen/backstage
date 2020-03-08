<template>
  <div class="order box_two">
      <el-button type="primary" plain class="addUser" @click="addUserClick">添 加</el-button>
      <el-row>
        <el-col :span="24">
          <div class="count box_ten">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" prop="index" label="编 号" width="66"> </el-table-column>
                <el-table-column prop="adminPhone" label="登陆账户" width="180"></el-table-column>
                <el-table-column prop="password" label="登录密码" width="180"></el-table-column>
                <!-- <el-table-column prop="time" label="注册时间" width="180"></el-table-column>
                <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
                <el-table-column prop="zip" label="身 份" width="166"></el-table-column> -->
                <el-table-column label="操作" width="266">
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
        title="管理员"
        :visible.sync="popupAdmine"
        width="60%"
        :before-close="popupAdmineCancle">
        <el-row class="box_four" style="margin-top:36px;">
          <span>账号：</span>
          <el-input
            placeholder="请输入账号"
            v-model="inputAccount"
            clearable
            style="width:66%;margin-left:2%;">
          </el-input>
        </el-row>
        <el-row class="box_four" style="margin-top:36px;">
          <span>密码：</span>
          <el-input
            placeholder="请输入密码"
            v-model="inputPassword"
            clearable
            style="width:66%;margin-left:2%;">
          </el-input>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="popupAdmineClose = false">取 消</el-button>
          <el-button type="primary" @click="popupAdmineDefine">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {judgeExist} from "../../assets/js/public";
import {apiQueryAllPeople,apiAddLogin,apiModifyLogin,apiDeleteLogin} from "../../api/api";
export default {
  name: 'member',
  data(){
    return{
      tableData: [],//表格---数据
      total:0,//表格---总数
      pageSize:6,//表格---每页多少个
      currentPage:1,//表格---当前页数
      popupAdmine:false,//弹框---显隐
      inputAccount:"",//弹框---账号
      inputPassword:"",//弹框---密码
      currentObject:null,
    }
  },
  methods:{
    // 添加
    addUserClick(){
      let self = this;
      self.inputAccount = "";
      self.inputPassword = "";
      self.popupAdmine = true;
    },
    // 编辑
    editClick(val){
      let self = this;
      // console.log(val);
      self.inputAccount = val.adminPhone;
      self.inputPassword = val.password;
      self.currentObject = val;
      self.popupAdmine = true;
    },
    // 弹出框---右上角关闭
    popupAdmineCancle(){
      let self = this;
      self.popupAdmine = false;
    },
    // 弹出框---确定
    popupAdmineDefine(){
      let self = this;
      if(self.inputAccount == ""){
        this.$message({
          message: '警告哦，请输入账号！',
          type: 'warning'
        });
        return
      }
      if(self.inputPassword == ""){
        this.$message({
          message: '警告哦，请输入密码！',
          type: 'warning'
        });
        return
      }
      if(judgeExist(self.currentObject)){//修改
        let para = {
          id:self.currentObject.id,
          adminPhone:self.inputAccount,
          password:self.inputPassword
        };
        apiModifyLogin(para).then(res => {
          console.log(res);
          self.popupAdmine = false;
          self.pageData();
          this.$message({
            message: '恭喜你，添加成功',
            type: 'success'
          });
        }).catch(err =>{
          console.log(err);
          this.$message.error('出错了，添加管理员失败，请稍后再试！');
        })
      }else{//添加
        let para = {
          adminPhone:self.inputAccount,
          password:self.inputPassword
        };
        apiAddLogin(para).then(res => {
          console.log(res);
          self.popupAdmine = false;
          self.pageData();
          this.$message({
            message: '恭喜你，添加成功',
            type: 'success'
          });
        }).catch(err =>{
          console.log(err);
          this.$message.error('出错了，添加管理员失败，请稍后再试！');
        })
      }
    },
    // 删除
    deleteClick(val){
      let self = this;
      self.$confirm('你确定要删除此用户么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let para = {
            id:val.id
          };
          apiDeleteLogin(para).then(res => {
            console.log(res);
            self.pageData();
            this.$message({
              message: '恭喜你，删除成功',
              type: 'success'
            });
          }).catch(err =>{
            console.log(err);
            this.$message.error('出错了，添加管理员失败，请稍后再试！');
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
      });
    },  
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //分页器
    handleCurrentChange: function (val) {
        this.page = val;
        // this.getList();
    },
    // 查询所有管理员
    pageData(){
      let self = this;
      let para = {};
      apiQueryAllPeople(para).then(res => {
        // console.log(res);
        self.tableData = res;
        self.total = res.length;
      }).catch(err =>{
        console.log(err);
      })
    }
  },
  created(){
    let self = this;
    self.pageData();
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
  }
</style>