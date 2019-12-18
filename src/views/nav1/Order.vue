<template>
  <div class="order box_two">
      <el-row>
        <el-col :span="24">
          <div class="screen box_ten">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="审批人">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-select v-model="formInline.region" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
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
                <el-table-column prop="time" label="登陆时间" width="160"></el-table-column>
                <el-table-column prop="sex" label="是否购买过服务" width="166"></el-table-column>
                <el-table-column fixed="right" label="操作" width="88">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删 除</el-button>
                  </template>
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
                :page-sizes="pageSize"
                :page-size="100"
                @size-change="handleSizeChange"
                :current-page="currentPage"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
//导入组件
// import search from '@/components/Search.vue';
export default {
  name: 'order',
  //注册组件
  //  components:{
  //     search
  // },
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
      currentPage:6
    }
  },
  methods:{
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
    },
  }
}
</script>
<style lang="scss" scoped>
  .order{
    width: 100%;
    height: 100%;
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