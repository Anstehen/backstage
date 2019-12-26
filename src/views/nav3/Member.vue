<template>
  <div class="order box_two">
      <el-button type="primary" plain class="addUser" @click="addUserClick">添 加</el-button>
      <el-row>
        <el-col :span="24">
          <div class="count box_ten">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" prop="index" label="编 号" width="66"> </el-table-column>
                <el-table-column prop="name" label="登陆账户" width="180"></el-table-column>
                <el-table-column prop="phone" label="登录密码" width="180"></el-table-column>
                <el-table-column prop="time" label="注册时间" width="180"></el-table-column>
                <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
                <el-table-column prop="zip" label="身 份" width="166"></el-table-column>
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
          <span>登陆账号</span>
            <el-input
              placeholder="请输入内容"
              v-model="inputAccount"
              clearable
              style="width:66%;margin-left:1%;">
            </el-input>
        </el-row>
        <el-row style="margin-top:36px;">
          <span>登陆密码</span>
          <el-input
            placeholder="请输入内容"
            v-model="inputPassword"
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
        <el-row style="margin-top:66px;">
          <span>身份</span>
          <el-radio v-model="radio" label="1" style="margin-left:1%;">超级管理员</el-radio>
          <el-radio v-model="radio" label="2">普通用户</el-radio>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'member',
  data(){
    return{
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        sex:"女",
        id:1234567890,
        phone:14725836900,
        time:"2019-12-17 23:23:06",
        age:23
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        sex:"女",
        id:1234567890,
        phone:14725836900,
        time:"2019-12-17 23:23:06",
        age:23
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333,
        sex:"女",
        id:1234567890,
        phone:14725836900,
        time:"2019-12-17 23:23:06",
        age:23
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
        sex:"女",
        id:1234567890,
        phone:14725836900,
        time:"2019-12-17 23:23:06",
        age:23
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
        sex:"女",
        id:1234567890,
        phone:14725836900,
        time:"2019-12-17 23:23:06",
        age:23
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
        sex:"女",
        id:1234567890,
        phone:14725836900,
        time:"2019-12-17 23:23:06",
        age:23
      }],
      total:1200,
      pageSize:6,
      currentPage:1,
      dialogVisible: false,
      radio: '1',
      inputAccount:"",
      inputPassword:"",
      inputPhone:""
    }
  },
  methods:{
    // 添加
    addUserClick(){
      let self = this;
      self.dialogVisible = true;
    },
    // 编辑
    editClick(){
      let self = this;
      self.dialogVisible = true;
    },
    // 关闭
    handleClose(){
      let self = this;
      self.dialogVisible = false;
    },
    // 删除
    deleteClick(){
      let self = this;
      self.$confirm('你确定要删除此用户么？', '提示', {
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
  }
</style>