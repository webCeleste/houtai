<template>
<div class="list">
    <!-- 卡片组件 --> 
    <el-card class="box-card">

        <!-- 标题 -->
        <div slot="header" class="clearfix header">
            <span>权限列表</span>
        </div>

        <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
        </el-input>
 
        <el-tree
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree2">
        </el-tree>

    </el-card>
    <!-- /卡片组件 -->
</div>
</template>

<script>
// 导入接口
import {authsApi} from '@/api'

// 导出组件数据
export default {
  created() {
      this.initData()
  },

  // 过滤
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },

  methods: {
    // 默认数据
    initData() {
      authsApi.get().then(res => {
        // console.log(res.data)
        this.data = res.data
      })
    },
    // 过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.auth_name.indexOf(value) !== -1;
    }
  },

  data() {
    return {
      // 过滤内容
      filterText: '',
      // 默认数据
      data: [],
      // 数据字段声明
      defaultProps: {
        children: 'children',
        label: 'auth_name'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.list {
    // 卡片组件
    .el-card 
    {
        // 搜索框
        .el-input {
            margin-top: 10px;
            margin-bottom: 20px;
        }
    }
}
</style>