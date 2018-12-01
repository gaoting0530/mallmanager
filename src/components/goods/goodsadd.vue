<template>
    <el-card class="my_card">
        <!-- 面包屑导航 -->
        <my-bread level1="商品管理" level2="商品添加"></my-bread>
        <!-- 提示文字 -->
        <el-alert
        class="my_tips"
        title="成功提示的文案"
        type="success"
        center
        show-icon>
        </el-alert>
        <!-- 步骤条 -->
        <el-steps :active="1*active" finish-status="success" class="my_steps">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
        </el-steps>
        <!-- tabs切换 -->
        <el-form label-position="top" label-width="80px" :model="form">

            <el-tabs @tab-click="changTab()" v-model="active" tab-position="left" style="height: 400px; overflow: auto" class="my_tabs">
                <el-tab-pane name="1" label="基本信息">
                    <el-form-item label="商品名称">
                        <el-input v-model="form.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="form.goods_price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量">
                        <el-input v-model="form.goods_number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量">
                        <el-input v-model="form.goods_weight"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类">
                        {{selectedOptions}}
                        <el-cascader
                            clearable
                            :props = "propsconfig"
                            :options="options"
                            v-model="selectedOptions"
                            ></el-cascader>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="2" label="商品参数">
                    <el-form-item :label="item.attr_name" v-for="(item,i) in arrPlayParams" :key="i">
                        <el-checkbox-group v-model="item.attr_vals">
                            <el-checkbox :label="item1" v-for="(item1,i) in item.attr_vals" :key="i" border></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="3" label="商品属性">
                    <el-form-item :label="item.attr_name" v-for="(item,i) in arrStaticParams" :key="i">
                        <el-input v-model="item.attr_vals"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="4" label="商品图片">定时任务补偿</el-tab-pane>
                <el-tab-pane name="5" label="商品内容">定时任务补偿</el-tab-pane>

            </el-tabs>
        </el-form>

    </el-card>
</template>

<script>

export default {
    data() {
        return {
            active: '1',
            form:{
                goods_name : '',
                goods_cat : '',
                goods_price : '',
                goods_number : '',
                goods_weight : '',
                goods_introduce : '',
                pics : '',
                attrs : ''

            },
            //联级选择器相关数据
            options: [],
            selectedOptions: [1,3,6],
            propsconfig: {
                value:'cat_id',
                label: 'cat_name',
                children: 'children'

            },
            arrPlayParams: [],//动态参数列表
            arrStaticParams: [],//静态参数列表
        }
    },
    created() {
        this.getGoods();
    },
    methods: {
        //当选项发生变化时触发该方法
        async changTab() {
            //如果切换到第二目录，且三级目录选择
            if(this.active === '2') {
                if(this.selectedOptions.length !== 3) {
                    this.$message.warning('请选择第三级参数');
                    return;
                }
                //获取动态参数
                const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`);
                this.arrPlayParams = res.data.data;
                //attr_vals 将字符串转成数组
                this.arrPlayParams.forEach(item => {
                    item.attr_vals = item.attr_vals.split(',')
                })
                console.log(res);
            } else if(this.active === '3') {
                if(this.selectedOptions.length !== 3) {
                    this.$message.warning('请选择第三级参数');
                    return;
                }
                //获取静态参数
                const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`);
                this.arrStaticParams = res.data.data;
                console.log(res);

            }

        },
        // 获取商品数据列表
        async getGoods() {
            const res = await this.$http.get(`categories?type=3`);
            this.options = res.data.data;
        }
        
    }
}
</script>

<style>
.my_card {
    height: 100%;
}
.my_tips {
    margin-top: 20px;
}
.my_steps {
    padding: 0 60px;
    margin-top: 40px;
}
.my_tabs {
    margin-top: 20px;
}
</style>
