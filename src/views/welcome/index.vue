<script setup lang="ts">
import { reactive, ref } from "vue";
import { Delete, Edit, Upload } from "@element-plus/icons-vue";
import { getPatientData } from "@/api/data";
defineOptions({
  name: "Welcome"
});
interface Inpatient {
  patientId: number;
  EEG: number;
  HRV: number;
  CBF: number;
  MEG: number;
  HR: number;
  RR: number;
  EMG: number;
  symptom: number;
  mentality: number;
  QOL: number;
  CF: number;
  EA: number;
  date: Date;
}

const dialogVisible = ref<Boolean>(false);

const openDialog = (val: Boolean) => {
  dialogVisible.value = !val;
};

const selectedDate = reactive<Array<String>>([]);

const dateChange = (date: String) => {
  selectedDate.push(date);
  console.log(selectedDate);
};

const tableData: Inpatient[] = reactive<Array<Inpatient>>([]);
const getRemoteData = async (data: Object) => {
  const temp = await getPatientData(data);
  console.log(temp);
};

const handleEdit = (index: number, row: Inpatient) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: Inpatient) => {
  console.log(index, row);
};
</script>
<template>
  <!-- dialog对话框 -->
  <el-dialog v-model="dialogVisible" title="数据导入" width="30%" draggable>
    <span>请选择需要数据源</span>
    <img src="../../images/data.jpg" class="w-36 h-28" />
    <span>请选择时间范围</span>
    <el-date-picker
      v-model="selectedDate"
      type="daterange"
      range-separator="To"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      size="default"
      @change="dateChange"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="openDialog(dialogVisible)">取消</el-button>
        <el-button type="primary" @click="openDialog(dialogVisible)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <div class="box">
    <img src="../../images/bg-bat.jpg" alt="" class="w-full" />
    <div class="flex flex-row-reverse py-2">
      <el-button type="success" @click="openDialog(dialogVisible)"
        >批量导入
        <el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" class="mt-8 mb-8">
      <el-table-column label="日期" width="100" align="center">
        <template #default="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ID" width="50">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.patientId }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="EEG(μV)" width="95" align="center">
        <template #default="scope">
          <el-tag>{{ scope.row.EEG }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="HRV(ms)" width="95" align="center">
        <template #default="scope">
          <span>{{ scope.row.HRV }}</span>
        </template>
      </el-table-column>
      <el-table-column label="脑血流量(mL/min)" width="140" align="center">
        <template #default="scope">
          <span>{{ scope.row.CBF }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MEG(nA/m)" width="110" align="center">
        <template #default="scope">
          <span>{{ scope.row.MEG }}</span>
        </template>
      </el-table-column>
      <el-table-column label="HR(bpm)" width="90" align="center">
        <template #default="scope">
          <span>{{ scope.row.HR }}</span>
        </template>
      </el-table-column>
      <el-table-column label="RR(bpm)" width="90" align="center">
        <template #default="scope">
          <span>{{ scope.row.RR }}</span>
        </template>
      </el-table-column>
      <el-table-column label="EMG(μV)" width="90" align="center">
        <template #default="scope">
          <span>{{ scope.row.EMG }}</span>
        </template>
      </el-table-column>
      <el-table-column label="症状自评(1-10)" width="120" align="center">
        <template #default="scope">
          <span>{{ scope.row.symptom }}</span>
        </template>
      </el-table-column>
      <el-table-column label="心理状态自评(1-10)" width="150" align="center">
        <template #default="scope">
          <span>{{ scope.row.mentality }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生活质量自评(1-10)" width="150" align="center">
        <template #default="scope">
          <span>{{ scope.row.QOL }}</span>
        </template>
      </el-table-column>
      <el-table-column label="认知功能测试(1-10)" width="150" align="center">
        <template #default="scope">
          <span>{{ scope.row.CF }}</span>
        </template>
      </el-table-column>
      <el-table-column label="情绪评估(1-10)" width="120" align="center">
        <template #default="scope">
          <span>{{ scope.row.EA }}</span>
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
