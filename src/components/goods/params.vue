<template>
    <el-card class="my_card">
        <my-bread level1="商品管理" level2="商品参数"></my-bread>
        <el-alert
            class="my_tip"
            title=" 注意只允许为第三级分类设置参数"
            type="warning"
            show-icon>
        </el-alert>
        <el-form label-position="left" label-width="110px" class="myform">
             <el-form-item label="请选择商品分类">
                 {{selectedOptions}}
                 <el-cascader
                 clearable
                :options="options"
                :props="defaultProps"
                v-model="selectedOptions"
                ></el-cascader>
            </el-form-item>
        </el-form>
        <el-tabs v-model="active" type="card" @tab-click="handleClick">
            <el-tab-pane name="1" label="动态参数">
                <el-button type="danger">添加动态参数</el-button>
                <el-table
                    :data="arrPlayList"
                    style="width: 100%">
                    <el-table-column type="expand" label="#">
                        <template slot-scope="scope">
                            <el-tag
                            :key="tag"
                            v-for="tag in scope.row.attr_vals"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(scope.row,tag)">
                            {{tag}}
                            </el-tag>
                            <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm(scope.row)"
                            @blur="handleInputConfirm(scope.row)"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="attr_name"
                        label="属性名称"
                        width="180">
                    </el-table-column>
                     <el-table-column
                        prop="username"
                        label="操作"
                        >
                        <template slot-scope="scope">
                            <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>                           
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane name="2" label="静态参数">
                <el-button type="danger">添加动态参数</el-button>
                <el-table
                    :data="arrStaticList"
                    style="width: 100%">
                     <el-table-column
                        type="index"
                        label="#" >
                    </el-table-column>
                     <el-table-column
                        prop="attr_name"
                        label="属性名称">
                    </el-table-column>
                     <el-table-column
                        prop="attr_vals"
                        label="属性值">
                    </el-table-column>
                     <el-table-column
                        prop="username"
                        label="操作"
                        >
                        <template slot-scope="scope">
                            <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>                           
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            arrPlayList:[],
            arrStaticList:[],
            options:[],
            selectedOptions: [1, 3, 6 ],
            defaultProps:{
                children: 'children',
                label: 'cat_name',
                value: 'cat_id'
            },
            active: '1',
            inputVisible: false,
            inputValue: ''

        }
    },
    created() {
        this.getCate()
    },
    methods : {
        async handleClick() {
            console.log(this.active)
            if(this.active === '1') {
                if(this.selectedOptions.length === 3) {
                    const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
                    this.arrPlayList = res.data.data
                    this.arrPlayList.forEach(item => {
                        item.attr_vals = item.attr_vals.split(',')
                    })
                    console.log(this.arrPlayList);
                }
            }else if (this.active === '2') {
                 if(this.selectedOptions.length === 3) {
                    const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
                    this.arrStaticList = res.data.data
                    console.log(this.arrStaticList);
                }
            }

        },
        async getCate() {
            const res = await this.$http.get(`categories?type=3`);
            this.options = res.data.data
        },
        async handleClose(attr,tag) {
        attr.attr_vals.splice(attr.attr_vals.indexOf(tag), 1);
            const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${attr.attr_id}`,{
                attr_name : attr.attr_name,
                attr_sel : 'many',
                attr_vals : attr.attr_vals.join(','),
            })
            this.$message.success(res.data.meta.msg)
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      async handleInputConfirm(attr) {
        let inputValue = this.inputValue;
        if (inputValue) {
          attr.attr_vals.push(inputValue);
          const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${attr.attr_id}`,{
                attr_name : attr.attr_name,
                attr_sel : 'many',
                attr_vals : attr.attr_vals.join(','),
            })
            this.$message.success(res.data.meta.msg)
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
}
</script>

<style>
.my_card {
    height: 100%;
}
.my_tip,.myform {
    margin-top: 20px
}
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
