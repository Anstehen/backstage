<template>
  <div class="home">
    <el-container class="content">
      <el-aside width="200px" class="left_bar">
        <el-menu :default-openeds="['1']" :collapse="collapsed" :default-active="defaultPath" :router="true">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-news"></i>用户信息</template>
            <el-menu-item-group>
              <el-menu-item index="/order">登录过的用户</el-menu-item>
              <el-menu-item index="/sign">下单用户一览</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-office-building"></i>店铺资料</template>
            <el-menu-item-group>
              <el-menu-item index="/store">店铺一栏</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>基本信息</template>
            <el-menu-item-group>
              <el-menu-item index="/member">成员列表</el-menu-item>
              <el-menu-item index="/news">我的信息</el-menu-item>
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
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        collapsed:false,
        defaultPath:"order"
      }
    },
    methods:{
      //折叠导航栏
			collapse:function(){
        this.collapsed=!this.collapsed;
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