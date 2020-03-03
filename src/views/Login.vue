<template>
  <div class="home box_three">
    <el-card class="box_nine" shadow="hover" body-style="width:360px;height:260px;">
          <el-row class="box_three">
            <span>欢迎来到葳蕤科技</span>
          </el-row>
          <el-row class="account box_eight">
            <span>账号：</span>
            <el-input v-model="accountIpt" placeholder="请输入账号" class="account_ipt"></el-input>
          </el-row>
          <el-row class="account box_eight">
            <span>密码：</span>
            <el-input v-model="passwordInput" placeholder="请输入密码" show-password class="account_ipt"></el-input>
          </el-row>
          <el-row class="btn box_eight">
              <el-button type="primary" class="btn_login" @click="loginClick">登 录</el-button>
          </el-row>
    </el-card>
  </div>
</template>

<script>
import  {apiLogin} from "../api/api"
export default {
  name: 'login',
  data(){
    return{
      accountIpt:'',
      passwordInput:''
    }
  },
  methods:{
    // 登录
    loginClick(){
      let self = this;
      if(self.accountIpt == ""){
        this.$message.error('出错了，请输入账号！');
        return
      }
      if(self.passwordInput == ""){
        this.$message.error('出错了，请输入密码！');
        return
      }
      let para = {
        adminPhone:self.accountIpt,
        password:self.passwordInput
      }
      apiLogin(para).then(res => {
        // console.log(res);
        if(res.status == 200){
          this.$router.push('/Order');
        }else if(res.status == 500){
          this.$message.error('出错了，请输入正确的账号和密码！');
        }else{
          this.$message.error('出错了，请求出错！');
        }
      }).catch(error => {
        console.log(error);
        this.$message.error('出错了，您的操作出错了哦！');
      })
      //直接跳转
      // this.$router.push('/Order');

      //带参数跳转
      // this.$router.push({path:'/testDemo',query:{setid:123456}});
      // this.$router.push({name:'testDemo',params:{setid:111222}});
    }
  }
}
</script>
<style lang="scss" scoped>
  .home{
    width: 100%;
    height: 100%;
    background: cyan;
    .account{
      margin-top: 26px;
      .account_ipt{
        width: 266px;
      }
    }
    .btn{
      margin-top: 36px;
      .btn_login{
        width: 320px;
      }
    }
  }
</style>