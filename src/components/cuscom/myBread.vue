<template>
     <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    data () {
        return{
            name: 'mybread'
        }
    },
    //props中数据用法和data中数据用法一致
    //props中的数据来源于使用组件时传的值
    //props中的数据也是该组件的属性
    props:['level1','level2']
}
</script>

<style>

</style>
