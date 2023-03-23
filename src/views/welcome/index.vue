<script setup lang="ts">
import { Delete, Edit, Upload, Timer } from "@element-plus/icons-vue";
defineOptions({
  name: "Welcome"
});
interface User {
  date: string;
  name: string;
  address: string;
}

interface Inpatient {
  date: string;
  pid: string;
  isEncode: string;
  diagnosis: string;
  bp: number;
  tc: number;
  ams: string;
  ebsd: string;
  ia: string;
  te: string;
}

const tableRowClassName = ({ rowIndex }: { row: User; rowIndex: number }) => {
  if (rowIndex === 1) {
    return "warning-row";
  } else if (rowIndex === 3) {
    return "success-row";
  }
  return "";
};

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const tableData: Inpatient[] = [
  {
    date: "2023-03-19 00:00:00",
    pid: "2023031901",
    isEncode: "已加密",
    diagnosis: "PTSD",
    bp: 100.1,
    tc: 14.9,
    ams: "良好1",
    ebsd: "良好1",
    ia: "检测机构1",
    te: "检测设备1"
  },
  {
    date: "2023-03-19 00:00:00",
    pid: "2023031902",
    isEncode: "已加密",
    diagnosis: "PTSD",
    bp: 98.6,
    tc: 13.1,
    ams: "良好2",
    ebsd: "良好2",
    ia: "检测机构2",
    te: "检测设备2"
  },
  {
    date: "2023-03-19 00:00:00",
    pid: "2023031903",
    isEncode: "已加密",
    diagnosis: "PTSD",
    bp: 99.2,
    tc: 16.7,
    ams: "良好3",
    ebsd: "良好3",
    ia: "检测机构3",
    te: "检测设备3"
  },
  {
    date: "2023-03-19 00:00:00",
    pid: "2023031904",
    isEncode: "已加密",
    diagnosis: "PTSD",
    bp: 100.1,
    tc: 12.5,
    ams: "良好4",
    ebsd: "良好4",
    ia: "检测机构4",
    te: "检测设备4"
  }
];
</script>

<template>
  <div class="box">
    <img src="../../images/bg-bat.jpg" alt="" class="w-full" />
    <div class="flex flex-row-reverse py-2">
      <el-button type="success"
        >批量导入
        <el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      class="mt-8 mb-8"
    >
      <el-table-column label="日期" width="180" align="center">
        <template #default="scope">
          <el-icon><timer /></el-icon>
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住院号" width="150">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.pid }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否加密" width="80" align="center">
        <template #default="scope">
          <el-tag>{{ scope.row.isEncode }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="诊断" width="180" align="center">
        <template #default="scope">
          <span>{{ scope.row.diagnosis }}</span>
        </template>
      </el-table-column>
      <el-table-column label="血压" width="60" align="center">
        <template #default="scope">
          <span>{{ scope.row.bp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="血脂" width="60" align="center">
        <template #default="scope">
          <span>{{ scope.row.bp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="心里状态" width="150" align="center">
        <template #default="scope">
          <span>{{ scope.row.ams }}</span>
        </template>
      </el-table-column>
      <el-table-column label="行为情绪" width="150" align="center">
        <template #default="scope">
          <span>{{ scope.row.ebsd }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检测机构" width="120" align="center">
        <template #default="scope">
          <span>{{ scope.row.ia }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检测设备" width="120" align="center">
        <template #default="scope">
          <span>{{ scope.row.te }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            :icon="Edit"
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            :icon="Delete"
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
