<template>
  <div class="order box_two">
      <el-row class="condition">
        <sysRulesManage pagesType="1" @publicClick="queryClick"></sysRulesManage>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="count box_ten">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" prop="index" label="编号" width="66"> </el-table-column>
                <el-table-column prop="name" label="昵称" width="120"></el-table-column>
                <el-table-column prop="id" label="userid" width="160"></el-table-column>
                <el-table-column prop="sex" label="性别" width="80"></el-table-column>
                <el-table-column prop="age" label="年龄" width="80"></el-table-column>
                <el-table-column prop="address" label="地址" width="350"></el-table-column>
                <el-table-column prop="phone" label="电话" width="120"></el-table-column>
                <el-table-column prop="time" label="下单时间时间" width="160"></el-table-column>
                <el-table-column label="资料" width="166">
                  <el-button type="primary" plain @click="lookMaterialClick">查看</el-button>
                </el-table-column>
                <el-table-column prop="phone" label="下单次数" width="126"></el-table-column>
                <el-table-column fixed="right" label="操作" width="168">
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
        title="用户资料"
        :visible.sync="popupMateral"
        width="76%"
        :before-close="popupMateralClose">
        <el-row>
          <div class="picture box_one">
            <div class="box_two">
              <span>正面照：</span>
              <div class="demo-image__preview">
                <el-image 
                  style="width: 100px; height: 100px"
                  :src="url" 
                  :preview-src-list="srcList">
                </el-image>
              </div>
            </div>
            <div class="picture_model box_two">
              <span>侧面照：</span>
              <div class="demo-image__preview">
                <el-image 
                  style="width: 100px; height: 100px"
                  :src="url" 
                  :preview-src-list="srcList">
                </el-image>
              </div>
            </div>
            <div class="picture_model box_two">
              <span>发长照：</span>
              <div class="demo-image__preview">
                <el-image 
                  style="width: 100px; height: 100px"
                  :src="url" 
                  :preview-src-list="srcList">
                </el-image>
              </div>
            </div>
            <div class="picture_model box_two">
              <span>全身照：</span>
              <div class="demo-image__preview">
                <el-image 
                  style="width: 100px; height: 100px"
                  :src="url" 
                  :preview-src-list="srcList">
                </el-image>
              </div>
            </div>
          </div>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <span>性别：</span>
          <span class="spanone">女</span>
          <span class="spantwo">身高：</span>
          <span class="spanone">170cm</span>
          <span class="spantwo">年龄：</span>
          <span class="spanone">25</span>
          <span class="spantwo">体重：</span>
          <span class="spanone">52kg</span>
          <span class="spantwo">职业：</span>
          <span class="spanone">不知道</span>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <span>位置：</span>
          <span class="spanone">浙江省杭州市西湖区</span>
          <span class="spantwo">发行改变程度：</span>
          <span class="spanone">适当的接受改变</span>
          <span class="spantwo">对长度的要求：</span>
          <span class="spanone">好看就行</span>
          <span class="spantwo">对烫发的要求：</span>
          <span class="spanone">好看就行</span>
          <span class="spantwo">电话：</span>
          <span class="spanone">1234567890</span>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <span>着装风格：</span>
          <span class="spanone">随意、随心</span>
          <span class="spantwo">打理习惯：</span>
          <span class="spanone">偶尔</span>
          <span class="spantwo">职业：</span>
          <span class="spanone">不知道</span>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="popupMateral = false">取 消</el-button>
          <el-button type="primary" @click="popupMateral = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑"
        :visible.sync="popupEdit"
        width="78%"
        :before-close="editClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="popupEdit = false">取 消</el-button>
          <el-button type="primary" @click="popupEdit = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
//导入组件
  import sysRulesManage from '@/components/Search.vue';

export default {
  name: 'sign',
  //注册组件
   components:{
      sysRulesManage
    },

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
      }],
      total:1200,
      pageSize:6,
      currentPage:1,
      popupMateral:false,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ],
      popupEdit:false
    }
  },
  methods:{
    //搜索
    queryClick(res){
      // let self = this;
      console.log(res);
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
    // 弹框一 查看用户资料
    lookMaterialClick(){
      let self = this;
      self.popupMateral = true;
    },
    // 弹框一 关闭
    popupMateralClose(){
      let self = this;
      self.popupMateral = false;
    },
    // 弹框二 编辑
    editClick(){
      let self = this;
      self.popupEdit = true;
    },
    // 弹框二 关闭
    editClose(){
      let self = this;
      self.popupEdit = false;
    },
    onSubmit() {
      console.log('submit!');
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
    .picture{
      width: 100%;
      height: auto;
      .picture_model{
        margin-left: 12px;
      }
    }
    .spanone{
      margin-left: 8px;
    }
    .spantwo{
      margin-left: 26px;
    }
  }
</style>