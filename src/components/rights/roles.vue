<template>
    <el-card class="box-card">
        <my-bread level1="权限管理" level2="角色列表"></my-bread>
        <el-row class="mybtn1">
            <el-col>
                <el-button type="info">添加角色</el-button>
            </el-col>
        </el-row>

        <!-- 列表 -->
        <el-table
                :data="roleslist"
                style="width: 100%">

                <el-table-column type="expand" width="150">
                    <template slot-scope="scope">
                        <el-row v-for="(item1,i) in scope.row.children" :key="i">
                            <el-col :span="4">
                                <el-tag @close="delRight(scope.row,item1.id)" closable>{{item1.authName}}</el-tag>
                                <i class="el-icon-arrow-right"></i>
                            </el-col>

                            <el-col :span="20">
                                <el-row v-for="(item2,index) in item1.children" :key="index">
                                    <el-col :span="4">
                                        <el-tag @close="delRight(scope.row,item2.id)" type="success" closable>{{item2.authName}}</el-tag>
                                        <i class="el-icon-arrow-right"></i>
                                    </el-col>
                                    <el-col :span="20">
                                        <el-tag @close="delRight(scope.row,item3.id)" closable v-for="(item3,index) in item2.children" :key="index" type="warning">{{item3.authName}}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <span v-if="scope.row.children.length === 0">该用户没有权限</span>
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
                            <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
                            <el-button  size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
                            <el-button  @click="checkShowRight(scope.row)" size="mini" plain type="success" icon="el-icon-check" circle></el-button>
            
                    </template>
                </el-table-column>
        </el-table>
        <el-dialog title="权限增加" :visible.sync="dialogFormVisibleRight">
             <!-- :default-expanded-keys="[2, 3]" -->
                <!-- :default-checked-keys="[5]" -->
            <el-tree
                ref="tree"
                :data="righttree"
                show-checkbox
                node-key="id"
                default-expand-all
                :default-checked-keys="rightchecked"
                :props="defaultProps">
            </el-tree>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
                <el-button type="primary" @click="setRoleRight()">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    data() {
            return {
                roleslist: [],
                righttree:[],
                dialogFormVisibleRight: false,
                defaultProps: {
                    children: 'children',
                    label: 'authName'
                },
                // arrexpand:[]
                rightchecked:[],
                currRoleId: -1

            }
        },
        created() {
            this.getRoles()
        },
    methods: {
        //roles/:roleId/rights
        async setRoleRight () {
            // getCheckedKeys
            var arrcheched = this.$refs.tree.getCheckedKeys();
            // getHalfCheckedKeys
            var arrHalfChecked = this.$refs.tree.getHalfCheckedKeys();
            //
            let arr = [...arrcheched,...arrHalfChecked];
            // console.log(arr);
            //roleId---当前要修改权限的角色id
            const res = await this.$http.post(`roles/${this.currRoleId}/rights`,{rids:arr.join(',')});

            this.getRoles();
            this.dialogFormVisibleRight = false;
        },
        async checkShowRight(role) {
           this.dialogFormVisibleRight = true;
           this.currRoleId = role.id;
            
            const res = await this.$http.get('rights/tree');
            this.righttree = res.data.data;
            var tmparr = [];
            role.children.forEach((item) => {
                // tmparr.push(item.id);
                item.children.forEach((item1) => {
                item1.children.forEach((item2) => {
                tmparr.push(item2.id)

                })

                })

            })
            // console.log(tmparr)
            this.rightchecked = tmparr;
            // var tmparr = [];
            // this.righttree.forEach((item) => {
            //     tmparr.push(item.id);
            //     item.children.forEach((item1) => {
            //     tmparr.push(item1.id);
            //     item1.children.forEach((item2) => {
            //     tmparr.push(item2.id)

            //     })

            //     })

            // })
            // console.log(tmparr)
            // this.arrexpand = tmparr;
            console.log(role);
        
        },
        //删除权限
        async delRight(role,rightId) {
            //roles/:roleId/rights/:rightId
            const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
            if(res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg);
                //更新整个表格
                // this.getRoles();
                role.children = res.data.data
                //删除成功返回的是角色的剩余的权限
            }

        },
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
.mybtn1 {
    margin-top: 20px;
}
</style>
