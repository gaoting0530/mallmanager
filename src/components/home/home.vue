<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="4"><a href=""><img src="../../assets/logo.png" alt=""></a></el-col>
                <el-col :span="16"><h3 class="middle">电商后台管理系统</h3></el-col>
                <el-col :span="4"><a href="" class="logout" @click.prevent="logout()">退出</a></el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px" class="aside">
                 <el-menu
                    :unique-opened="true"
                    :router="true"
                    default-active="2">
                    <el-submenu :index="''+item.order" v-for="(item, i) in menus" :key="i">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item :index="''+item1.path" v-for="(item1, i) in item.children" :key="i">
                            <i class="el-icon-location"></i>
                            <span>{{item1.authName}}</span>
                        </el-menu-item>   
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
</el-container>
</template>

<script>
export default {
    data () {
        return {
            menus:[]
        }
    },
    // beforeCreate() {
    //     const token = localStorage.getItem('token');
    //     if(!token) {
    //         this.$router.push({name: 'login'})
    //     }
    // },
    created() {
        this.getMenus();
    },
    methods: {
        async getMenus() {
            const res = await this.$http.get(`menus`);
            this.menus = res.data.data;
            console.log(res);
        },

        logout() {
            localStorage.clear();
            this.$message.success('退出成功');
            this.$router.push({name: 'login'})
        }
    }

}
</script>

<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  /* height: 100%; */
}
.middle {
    text-align: center;
    font-size: 18px;
    color: #fff;
    font-weight: 700;
}
.logout {
    line-height: 60px;
    text-align: right;
}
</style>
