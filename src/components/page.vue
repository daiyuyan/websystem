<template>
  <div>
    <el-row>
      <!--创建一个echarts的容器-->
      <el-table :data="tableData">
        <el-table-column prop="date" label="患者" width="140">
        </el-table-column>
        <el-table-column prop="name" label="性别" width="120">
        </el-table-column>
        <el-table-column prop="address" label="年龄" width="120">
        </el-table-column>
         <el-table-column prop="name" label="所属机构" width="120">
        </el-table-column>
         <el-table-column prop="name" label="科室" width="120">
        </el-table-column>
         <el-table-column prop="name" label="患者详情" width="120">
        </el-table-column>
         <el-table-column prop="name" label="操作" width="120">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>


</script>