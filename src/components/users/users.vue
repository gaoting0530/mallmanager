<template>
    <el-card class="box-card">
<!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
<!-- 搜索框 -->
        <el-row class="input1">
            <el-col>
                  <el-input @clear="afterClear()" placeholder="请输入内容" v-model="query" class="input-search" clearable>
                 <el-button slot="append" icon="el-icon-search" @click="searchUsers()"></el-button>
                </el-input>
                <el-button type="success" @click="showDialog()">添加用户</el-button>
  
            </el-col>
        </el-row>
<!-- 列表 -->
        <el-table
                height="200px"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="#"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="姓名"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="电话">
                </el-table-column>
            <!-- 若单元格内显示的内容不知字符串，
            需要给被显示的内容包裹template
            给template设置属性slot-scope--该值为create_time的数据源---tabledata（该值会自动查找数据源）
            tabledata-row ->数据中的每个对象
            
             -->
                <el-table-column
                    label="创建日期">
                    <template slot-scope="scope">
                        {{scope.row.create_time | fmtdate}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="用户状态">
                    <template slot-scope="scope">
                        <el-switch
                        @change="changeState(scope.row)"
                        v-model="scope.row.mg_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                    </template>
                    
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                            <el-button @click="showDialogEdit(scope.row)" size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
                            <el-button @click="delUser(scope.row.id)" size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
                            <el-button @click="checkShow(scope.row)" size="mini" plain type="success" icon="el-icon-check" circle></el-button>
            
                    </template>
                </el-table-column>
        </el-table>
<!-- 分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
 <!-- 弹出层 -->
        <el-dialog title="编辑用户" :visible.sync="dialogFormEdit" class="overblank">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEdit = false">取 消</el-button>
                <el-button type="primary" @click="editUser()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加用户" :visible.sync="dialogFormAdd" class="overblank">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAdd = false">取 消</el-button>
                <el-button type="primary" @click="addUser()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="分配角色" :visible.sync="dialogFormRoles" class="overblank">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                {{RoleName}}
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="RoleId" placeholder="请选择活动区域">
                        <el-option label="请选择" :value="-1" disabled></el-option>
                        <el-option :label="item.roleName" :value="item.id"  v-for="(item,i) in roles" :key="i" ></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormRoles = false">取 消</el-button>
                <el-button type="primary" @click="setRole()">确 定</el-button>
            </div>
        </el-dialog>

    </el-card>
</template>

<script>
export default {
    data() {
        return {
            query:'',
            userId : -1,
            RoleId: -1,
            RoleName: '',
            pagenum:1,
            pagesize:2,
            total: -1,
            tableData: [],
            roles: [],
            dialogFormAdd: false,
            dialogFormEdit: false,
            dialogFormRoles: false,
            form: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            formLabelWidth: '100px'
        }
    },
    created() {
        this.getUsersList();
       
    },
    methods: {
        //分配角色功能
       async setRole() {
            //users/:id/role
            const res = await this.$http.put(`users/${this.userId}/role`,{rid:this.RoleId})
            if(res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg)
            }
            this.dialogFormRoles = false;

        },
        //当前角色显示
        async checkShow(user) {
            //获取角色列表
            const res1 = await this.$http.get(`roles`);
            this.roles = res1.data.data;
            //获取RoleId
            this.dialogFormRoles = true;
            this.RoleName = user.username;
            const res = await this.$http.get(`users/${user.id}`);
            this.RoleId = res.data.data.rid;
            this.userId = user.id;
        },
        //用户状态修改
        async changeState(user) {
            const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
            const{meta:{status,msg}} = res.data;
            if(status === 200) {
                this.$message.success(msg);
            }
        },
        //编辑功能
        async editUser() {
            const res = await this.$http.put(`users/${this.form.id}`,this.form);
            const {meta:{msg,status}} = res.data;
            if(status === 200) {
                //提示修改成功
                this.$message.success(msg);
                //更新列表
                this.pagenum = 1;
                this.getUsersList();
                //清空列表
                this.formedit = {};
                //关闭弹窗
                this.dialogFormEdit =false;
            }
        },
        //编辑弹窗显示
        showDialogEdit(user) {
            this.dialogFormEdit = true;
            this.form = user;
            
        },
        //删除
        delUser(id) {
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(async () => {
                    const res = await this.$http.delete(`users/${id}`);
                    if(res.data.meta.status === 200) {
                        //提示信息
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        //更新列表
                        this.pagenum = 1;
                        this.getUsersList();

                    }else {
                        this.$message.warning(res.data.meta.msg);
                    }
                    
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                });
      
        },
        //添加用户
        async addUser() {
            this.dialogFormAdd = false;

           const res = await this.$http.post('users',this.form);
           const {data,meta:{msg,status}} = res.data;
            if(status === 201) {
                this.$message.success(msg);
                this.getUsersList();
                this.form = {}
                // for(const key in form) {
                //     if() {
                            // this.form[key] = '';
                    // }
                // }

            }else {
                this.$message.warning(msg);
                this.form = {}
            }
        },
        showDialog() {
            this.dialogFormAdd = true;
            this.form = {};
        },
        afterClear() {
            this.getUsersList();
        },
        searchUsers() {
            this.getUsersList();
        },
        //获取所有用户信息
        async getUsersList() {
            //授权交给axios设置

            const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            const {data:{total,users},meta: {msg,status}} = res.data;
            if(status === 200) {
                this.total = total;
                this.tableData = users;
                // this.$message.success(msg);
            }else {
                this.$message.warning(msg);


            }
        },
        //分页相关方法
         handleSizeChange(val) {
            this.pagesize = val;
            this.pagenum  = 1;
            this.getUsersList();
        },
        handleCurrentChange(val) {
            this.pagenum = val;
            this.getUsersList();
        }
    }
}
</script>

<style>
.box-card {
    height: 100%;
}
.input1 {
    margin-top: 30px;
}
.input-search {
    width: 400px;
    
}
</style>
