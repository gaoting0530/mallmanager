<template>
    <el-card class="box-card">
        <!-- 面包屑导航 -->
        <my-bread level1="商品管理" level2="商品列表"></my-bread>
        <!-- 搜索框 -->
        <el-row class="searchbox">
            <el-col>
                <el-input placeholder="请输入内容" v-model="query" class="input-with-select mysearch_box" clearable @clear="clearMessage()">
                    <el-button slot="append" icon="el-icon-search" @click="searchGoods()"></el-button>
                </el-input>
                <el-button type="success" @click="addGoodsShow()">添加商品</el-button>
            </el-col>
        </el-row>
        <!-- 商品数据展示 -->
         <el-table
            class="my_table"
            height="450px"
            border
            :data="goodslist"
            stripe
            style="width: 100%">
            <el-table-column
            type="index"
            label="#"
            width="80">
            </el-table-column>
            <el-table-column
            prop="goods_name"
            label="商品名称"
            width="580">
            </el-table-column>
            <el-table-column
            prop="goods_price"
            label="商品价格"
            width="150">
            </el-table-column>
            <el-table-column
            prop="goods_number"
            label="商品数量"
            width="150">
            </el-table-column>
            <el-table-column
            label="上新日期"
            width="140">
                <template slot-scope="scope">
                    {{scope.row.upd_time | fmtdate}}
                </template>
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>    
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>

    </el-card>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            pagenum: 1,
            pagesize: 100,
            goodslist: [],
            total: -1,
        }
    },
    created() {
        this.getAllGoods();
    },
    methods : {
        //添加商品页面显示
        addGoodsShow() {
            this.$router.push({name: 'goodsadd'})

        },
        //文本框信息清空后的操作
        clearMessage() {
            this.getAllGoods();
        },
        //根据关键字搜索商品
        searchGoods() {
            this.getAllGoods();
        },
        //pagesize每页几条数据
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.pagenum = 1;
            this.getAllGoods();
        },
        //pagenum当前页
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pagenum = val;
            this.getAllGoods();
        },
        //获取所有商品信息
        async getAllGoods() {
            const res = await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            const {data:{total,goods},meta:{msg,status}} = res.data;
            if(status === 200) {
                this.goodslist = goods;
                this.total = total;
            }
        }
    }
}
</script>

<style>
.box-card {
    height: 100%;
}
.searchbox {
    margin-top: 20px;
}
.mysearch_box {
    width: 450px;
}
.my_table {
    margin-top: 20px;
}
</style>
