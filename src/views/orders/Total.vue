<template>
<div class="list">

    <!-- 卡片组件 -->
    <el-card class="box-card">

        <!-- 标题 -->
        <div slot="header" class="clearfix header">
            <span>订单统计</span>
        </div>
        <!-- /标题 -->  

        <!-- 筛选 -->
        <div class="filter"> 
            
            <el-input placeholder="收货人" v-model="consignee">
                <el-button slot="append" icon="el-icon-search" @click="initData"></el-button>
            </el-input>
            
            <el-date-picker
            @change="changeDate" 
            v-model="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="下单开始日期"
            end-placeholder="下单结束日期">
            </el-date-picker> 
        </div>
        <!-- /筛选 -->

        <!-- 图表 -->
        <div class="Echarts">
            <div ref="echarts" style="width: 100%;height:400px;"></div>
        </div>
        <!-- /图表 -->

    </el-card>
    <!-- /卡片组件 -->
</div>
</template>
<script> 
// 导入接口
import {ordersApi} from '@/api'

// 导出组件数据
export default {
    created() {
        this.initData()
    },
    methods: {
      // 初始化数据
      initData() {
        ordersApi.total({
            consignee:this.consignee,
            start_time:this.start_time,
            end_time:this.end_time
        }).then(res => {
            // titleDataArr: [5, 20, 36, 10, 10, 20],
            // titleArr: ['一月', '二月', '三月', '四月', '五月']

            this.titleDataArr = res.data.data
            this.titleArr = res.data.title

            // 重置echarts图标数据
            this.myEcharts();
        })
      },
      // 日期发生改变
      changeDate() {
          this.start_time = this.date ? this.date[0] : ''
          this.end_time = this.date ? this.date[1] : ''
          this.initData()
      },
      myEcharts()
      {
		  // 基于准备好的dom，初始化echarts实例
		  let myChart = this.$echarts.init(this.$refs.echarts);

		  // 指定图表的配置项和数据
		  let option = {
			  title: {
				  text: ''
			  },
			  tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params) {
                        var tar = params[0];
                        return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                    }
              },
			  legend: {
				  data:['']
			  },
			  xAxis: {
				  data: this.titleArr
			  },
			  yAxis: {},
			  series: [{
                name: '销量',
                type: 'bar',
                label: {
                    show: true,
                    position: 'inside'
                },
                data: this.titleDataArr
			  }]
		  };

		  // 使用刚指定的配置项和数据显示图表。
		  myChart.setOption(option);
		}
    },
    mounted() {
        this.myEcharts();
    },
    data()
    {
        return {
            // 搜索
            date: [],
            consignee: '',
            start_time: '',
            end_time: '',
            // 默认数据
            titleDataArr: [5, 20, 36, 10, 10, 20],
            titleArr: ['一月', '二月', '三月', '四月', '五月']
        }
    }
}
</script>
<style lang="scss" scoped>
.list {

    // 卡片组件
    .el-card 
    {
        // 头部
        .header .el-button {
            float:right;
            margin-top: -10px;
        }

        // 筛选
        .filter {
            margin-bottom: 20px;
            overflow: hidden;
            
            // 搜索框
            .el-input {
                width: 300px;
                float: left;
                margin-right: 20px;
            }
            
            // 日期
            .el-date-editor {float: right;}
        } 
    }
}
</style>