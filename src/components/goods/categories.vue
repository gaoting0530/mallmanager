<template>
    <el-card class="my_card">
        <my-bread level1="商品管理" level2="商品分类"></my-bread>
        <el-button type="success" class="my_btnn" @click="addCateShow()">添加分类</el-button>
        <el-table
                height="500px"
                :data="categorieslist"
                style="width: 100%">
                <!-- <el-table-column
                    type="index"
                    label="#"
                    width="60"> -->
                <!-- </el-table-column> -->
                <el-tree-grid
                    prop=""
                    label="#"
                    width="60"
                    treeKey="cat_id"
                    parentKey="cat_pid"
                    levelKey="cat_level"
                    childKey="children"
                >

                </el-tree-grid>
                <el-table-column
                    prop="cat_name"
                    label="分类名称"
                    width="380">
                </el-table-column>
                <el-table-column
                    label="级别">
                    <template slot-scope="scope">
                        <span v-if="scope.row.cat_level === 0">一级</span>
                        <span v-if="scope.row.cat_level === 1">二级</span>
                        <span v-if="scope.row.cat_level === 2">三级</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="cat_deleted"
                    label="是否有效">
                     <template slot-scope="scope">
                        <span v-if="scope.row.cat_deleted === false">是</span>
                        <span v-if="scope.row.cat_deleted === true">否</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                            <el-button size="mini" plain type="primary" icon="el-icon-edit"></el-button>
                            <el-button size="mini" plain type="danger" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
        </el-table>
        <el-dialog title="添加分类" :visible.sync="dialogFormCate" class="overblank">
            <el-form :model="form">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input v-model="form.cat_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类" :label-width="formLabelWidth">
                    {{selectedOptions}}
                    <el-cascader
                    clearable
                    :options="options"
                    change-on-select
                    :props="defaultProps"
                    v-model="selectedOptions"
                    ></el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormCate = false">取 消</el-button>
                <el-button type="primary" @click="addCate()">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
var ElTreeGrid = require('element-tree-grid')
export default {
    components: {
        ElTreeGrid
    },
    data() {
        return {
            categorieslist:[],
            options:[],
            form:{
                cat_pid : 0,
                cat_name : '',
                cat_level : -1
            },
            selectedOptions:[],
            dialogFormCate: false,
            formLabelWidth: '120px',
            defaultProps:{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            }
        }
    },
    created() {
        this.getCate()
    },
    methods: {
        async addCate() {
            this.dialogFormCate = false
            if(this.selectedOptions.length === 0) {
                this.form.cat_level = 0
            } else if (this.selectedOptions.length === 1) {
                this.form.cat_pid = 1
                this.form.cat_level = 1
            } else if (this.selectedOptions.length === 2) {
                this.form.cat_pid = 3
                this.form.cat_level = 2
            }
            const res = await this.$http.post(`categories`,this.form)
            this.$message.success(res.data.meta.msg)
            this.getCate()

        },
        async getCate() {
            const res = await this.$http.get(`categories?type=3`);
            this.categorieslist = res.data.data
            console.log(res)
        },
        async addCateShow() {
            this.dialogFormCate = true
            const res = await this.$http.get(`categories?type=2`);
            this.options = res.data.data
            console.log(this.options)
        }
    }

}
</script>

<style>
.my_card {
    height: 100%;
}
.my_btnn {
    margin-top: 20px;
}
</style>
