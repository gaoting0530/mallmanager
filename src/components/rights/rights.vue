<template>
    <el-card class="box-card">
        <!-- 面包屑导航 -->
        <my-bread level1="权限管理" level2="权限列表"></my-bread>
        <!-- 权限列表渲染 -->
        <el-table
            height="500px"
            class="mytable"
            :data="rightlist"
            border
            style="width: 100%">
            <el-table-column
            label="#"
            type="index"
            width="100">
            </el-table-column>
            <el-table-column
            prop="authName"
            label="权限名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="path"
            label="路径">
            </el-table-column>
            <el-table-column label="层级">
            <template slot-scope="scope">
                <span v-if="scope.row.level === '0'">一级</span>
                <span v-if="scope.row.level === '1'">二级</span>
                <span v-if="scope.row.level === '2'">三级</span>
            </template>
            </el-table-column>
        </el-table>

    </el-card>
</template>

<script>
export default {
    data() {
        return {
            rightlist: [],
        }
    },
    created() {
        this.getRights()
    },
    methods: {
        async getRights(){
            //除了登陆之外的所有请求都需要设置头部
            
            const res = await this.$http.get('rights/list');
            this.rightlist = res.data.data;
            console.log(res);
        }
    }
}
</script>

<style>
.box-card {
    height: 100%;
}
.mytable {
    margin-top: 30px;
}
</style>
