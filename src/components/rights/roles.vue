<template>
    <el-card class="box-card">
        <my-bread level1="权限管理" level2="角色列表"></my-bread>
        <el-row class="mybtn">
            <el-col>
                <el-button type="info">添加角色</el-button>
            </el-col>
        </el-row>

        <!-- 列表 -->
        <el-table
                :data="roleslist"
                style="width: 100%">

                <el-table-column type="expand" width="80">
                    <template slot-scope="scope">
                        <el-row v-for="(item1,i) in scope.row.children" :key="i">
                            <el-col :span="4"><el-tag>{{item1.authName}}</el-tag></el-col>
                            <el-col :span="20">
                                <el-row v-for="(item2,index) in scope.row.children.children" :key="index">
                                    <el-col :span="4"><el-tag>{{item2.authName}}</el-tag></el-col>
                                    <el-col :span="20"></el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column
                    type="index"
                    label="#"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="roleName"
                    label="角色名称"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="roleDesc"
                    label="角色描述"
                    width="300">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                            <el-button  size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
                            <el-button  size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
                            <el-button  size="mini" plain type="success" icon="el-icon-check" circle></el-button>
            
                    </template>
                </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
    data() {
            return {
                roleslist: [],
            }
        },
        created() {
            this.getRoles()
        },
    methods: {
        async getRoles(){
            //除了登陆之外的所有请求都需要设置头部
            
            const res = await this.$http.get('roles');
            this.roleslist = res.data.data;
            console.log(res);
        }
    }
}
</script>

<style>
.box-card {
    height: 100%;
}
.mybtn {
    margin-top: 20px;
}
</style>
