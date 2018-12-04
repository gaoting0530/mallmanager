<template>
    <el-card class="mycard">
        <my-bread level1="订单管理" level2="订单业务"></my-bread>
        <!-- 搜索框 -->
        <el-row class="input1">
            <el-col>
                  <el-input placeholder="请输入内容" v-model="query" class="input-search" clearable>
                 <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="success">添加用户</el-button>
  
            </el-col>
        </el-row>
        <!-- 列表 -->
        <el-table
                height="400px"
                :data="orderlist"
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="#"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="order_number"
                    label="订单编号"
                    width="580">
                </el-table-column>
                <el-table-column
                    prop="order_fapiao_title"
                    label="订单类型">
                </el-table-column>
                <el-table-column
                    prop="is_send"
                    label="用户状态">             
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                            <el-button @click="addAreaShow()" size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>           
                    </template>
                </el-table-column>
        </el-table>
        <el-dialog title="添加地址" :visible.sync="dialogFormAddress" class="overblank">
            <el-form>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-cascader
                    :options="options"
                    v-model="selectedOptions"
                    :props="defaultProps"
                    ></el-cascader>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAddress = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormAddress = false">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
import area from '@/components/orders/city_data2017_element.js'
export default {
    data() {
        return {
            query:'',
            orderlist: [],
            pagenum: 1,
            pagesize: 20,
            dialogFormAddress: false,
            formLabelWidth: '120px',
            options:[],
            selectedOptions: [],
            defaultProps: {
                value: 'value',
                label: 'label',
                children: 'children'
            }


        }
    },
    created() {
        this.getAllOrder()
    },
    methods: {
        addAreaShow() {
            this.dialogFormAddress = true
            this.options = area
        },
        async getAllOrder() {
            const res = await this.$http.get(`orders?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            this.orderlist = res.data.data.goods
            console.log(res)
        }
    }
}
</script>

<style>
.mycard {
    height: 100%;
}
.input1 {
    margin-top: 30px;
}
.input-search {
    width: 400px;
    
}
</style>
