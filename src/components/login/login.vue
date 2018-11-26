<template>
    <div class="login-wrap">
        <el-form label-position="top" label-width="80px" :model="formdata" class="login-form">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
                <el-input v-model="formdata.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formdata.password"></el-input>
            </el-form-item>
             <el-button type="primary" class="login-button" @click.prevent="login_check()">登录</el-button>
        </el-form>
    </div>
</template>

<script>
 export default {
    data() {
      return {
        formdata: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
        login_check() {
            this.$http.post('login',this.formdata)
                .then( res => {
                    const {data,meta:{msg,status}} = res.data
                    if(status === 200) {
                        //提示登录成功
                         this.$message.success(msg)
                        //跳转首页
                        this.$router.push({name: 'home'})
                    } else {
                        //提示错误信息
                         this.$message.error(msg)
                        
                    }
                    console.log(res)
                })
        }
    }
  }
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-form .login-button {
  width: 100%;
}
</style>
