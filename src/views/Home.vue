<template>
  <div class="home">
    <el-container class="content">
      <el-aside width="200px" class="left_bar">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-news"></i>用户信息</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">登录过的用户</el-menu-item>
              <el-menu-item index="1-2">下单用户一栏</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-office-building"></i>店铺资料</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">店铺一栏</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>基本信息</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">成员列表</el-menu-item>
              <el-menu-item index="3-2">我的信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>Anstehen</span>
        </el-header>
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
    height: 100%;
    .content{
      width: 100%;
      height: 100%;
      border: 1px solid #eee;
      .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
      }
      .el-aside {
        color: #333;
      }
    }
  } 
</style>