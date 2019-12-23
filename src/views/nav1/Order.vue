<template>
  <div class="order box_two">
      <el-row class="condition">
        <sysRulesManage ref="Search"></sysRulesManage>
        <div class="search">
            <el-button type="primary" @click="searchClick">搜 索</el-button>
        </div>
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
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="total">
              </el-pagination>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
//导入组件
  import sysRulesManage from '@/components/Search.vue';

export default {
  name: 'order',
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
      currentPage:1
    }
  },
  methods:{
    //搜索
    searchClick(){
      setTimeout(()=>{
          //与子组件通信
          this.$refs.Search.type = "1";
          this.$refs.Search.init();
      },60);
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
      .search{
        margin-top: 12px;
      }
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