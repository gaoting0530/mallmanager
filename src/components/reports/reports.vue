<template>
    <el-card class="my_card">
        <my-bread level1="数据统计" level2="数据报表"></my-bread>
        <div id="main" style="width: 800px;height:600px;"></div>
    </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
    data() {
        return {
            option: []
        }
    },
    mounted() {
        this.initOption()
    },
    methods: {
        async initOption() {
            var option1 = {
                title: {
                    text: '堆叠区域图'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                
            };
            const res = await this.$http.get(`reports/type/1`)
            this.option = {...option1,...res.data.data};
            console.log(this.option)

            var myChart = echarts.init(document.getElementById('main'));
            myChart.setOption(this.option);
        }
        
    }
}
</script>

<style>
.my_card {
    height: 100%;
}
</style>
