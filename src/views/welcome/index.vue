<script setup lang="ts">
import { reactive, ref, computed, onMounted } from "vue";
import { Delete, Edit, Upload, InfoFilled } from "@element-plus/icons-vue";
import { getPatientData, deletePatientByPid } from "@/api/data";
import { message } from "@/utils/message";
import dayjs from "dayjs";
defineOptions({
  name: "Welcome"
});

const startDate = ref<string>(dayjs(new Date()).format("YYYY-MM-DD HH:MM:ss"));
const endDate = ref<string>(dayjs(new Date()).format("YYYY-MM-DD HH:MM:ss"));

interface Inpatient {
  patientId: string;
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

interface Device {
  index: number;
  name: string;
}

interface dialogFormInter {
  deviceId: number;
  dateRange: string;
}

const dialogForm = reactive<dialogFormInter>({ deviceId: 0, dateRange: "" });

const dialogVisible = ref<boolean>(false);

const openDialog = (val: boolean) => {
  dialogVisible.value = !val;
  resetDialogForm();
  showDeviceName.value = "";
};

// 检测设备列表
const devices = reactive<Array<Device>>([
  { index: 1, name: "数字化便携式无创经颅磁神经调控治疗仪" }
]);

const showDeviceName = ref<string>("");

const resetDialogForm = () => {
  dialogForm.deviceId = 0;
  dialogForm.dateRange = "";
};

// 保存设备id和查询日期的临时变量
const tempVal = reactive({ did: 0, date: "" });

const selectedDataFrom = (val: number) => {
  tempVal.did = val;
  showDeviceName.value = devices[0].index === val ? devices[0].name : "";
};

// 最终展示的数据
const tableData: Inpatient[] = reactive<Array<Inpatient>>([]);
const getRemoteData = async (form: dialogFormInter) => {
  if (!dialogForm.deviceId || !dialogForm.dateRange) {
    message("设备ID或日期不能为空", { type: "warning" });
    return;
  }
  const { data } = await getPatientData(form);
  if (data.length > 0) {
    message("导入数据成功", { type: "success" });
    data.forEach(e => {
      tableData.push(e);
    });
    dialogVisible.value = !dialogVisible.value;
  }
};

// 页码相关
const pageSize = ref<number>(0);
const currentPage = ref<number>(0);
const total = ref<number>(0);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

const handleEdit = (index: number, row: Inpatient) => {
  console.log(index, row);
};

const dateChange = (val: string) => {
  console.log(val);
  tempVal.date = val;
};

interface Pid {
  pid: string;
}
const deletePid = reactive<Pid>({ pid: "" });
const handleDelete = async (index: number, row: Inpatient) => {
  deletePid.pid = row.patientId;
  const data = await deletePatientByPid(deletePid);
  if (data.success) {
    message("删除成功", { type: "success" });
    tableData.length = 0;
    const data1 = await getPatientData({
      deviceId: tempVal.did,
      dateRange: tempVal.date
    });
    data1?.data.forEach(e => {
      tableData.push(e);
    });
  }
};
</script>
<template>
  <!-- dialog对话框 -->
  <el-dialog v-model="dialogVisible" title="数据导入" width="30%" draggable>
    <div class="flex flex-col">
      <div class="flex flex-col h-36">
        <div>
          您选择的设备是:<span class="text-red-500">{{ showDeviceName }}</span>
        </div>
        <el-radio-group
          v-model="dialogForm.deviceId"
          class="mt-12"
          @change="selectedDataFrom"
        >
          <el-radio :label="1">
            <img src="../../images/data.jpg" class="w-36 h-28" alt="检测设备" />
          </el-radio>
        </el-radio-group>
      </div>
      <span class="my-2">请选择时间范围</span>
      <el-date-picker
        v-model="dialogForm.dateRange"
        type="daterange"
        range-separator="To"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="default"
        value-format="YYYY-MM-DD"
        @change="dateChange"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="openDialog(dialogVisible)">取消</el-button>
        <el-button type="primary" @click="getRemoteData(dialogForm)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <div class="box">
    <img src="../../images/1.jpg" alt="" class="w-full" />
    <!-- <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <img src="../../images/1.jpg" alt="" class="w-full h-full" />
      </el-carousel-item>
    </el-carousel> -->
    <div class="flex flex-row-reverse py-2">
      <el-button type="success" @click="openDialog(dialogVisible)"
        >批量导入
        <el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%; font-size: 12px"
      class="mt-8 mb-8"
      :stripe="true"
    >
      <el-table-column label="日期" width="90" align="center">
        <template #default="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="ID" width="50">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.patientId }}</span>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="EEG(μV)" width="75" align="center">
        <template #default="scope">
          <el-tag>{{ scope.row.EEG }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="HRV(ms)" width="75" align="center">
        <template #default="scope">
          <span>{{ scope.row.HRV }}</span>
        </template>
      </el-table-column>
      <el-table-column label="脑血流量(mL/min)" width="125" align="center">
        <template #default="scope">
          <span>{{ scope.row.CBF }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MEG(nA/m)" width="90" align="center">
        <template #default="scope">
          <span>{{ scope.row.MEG }}</span>
        </template>
      </el-table-column>
      <el-table-column label="HR(bpm)" width="75" align="center">
        <template #default="scope">
          <span>{{ scope.row.HR }}</span>
        </template>
      </el-table-column>
      <el-table-column label="RR(bpm)" width="75" align="center">
        <template #default="scope">
          <span>{{ scope.row.RR }}</span>
        </template>
      </el-table-column>
      <el-table-column label="EMG(μV)" width="75" align="center">
        <template #default="scope">
          <span>{{ scope.row.EMG }}</span>
        </template>
      </el-table-column>
      <el-table-column label="症状自评(1-10)" width="105" align="center">
        <template #default="scope">
          <span>{{ scope.row.symptom }}</span>
        </template>
      </el-table-column>
      <el-table-column label="心理状态自评(1-10)" width="130" align="center">
        <template #default="scope">
          <span>{{ scope.row.mentality }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生活质量自评(1-10)" width="130" align="center">
        <template #default="scope">
          <span>{{ scope.row.QOL }}</span>
        </template>
      </el-table-column>
      <el-table-column label="认知功能测试(1-10)" width="130" align="center">
        <template #default="scope">
          <span>{{ scope.row.CF }}</span>
        </template>
      </el-table-column>
      <el-table-column label="情绪评估(1-10)" width="105" align="center">
        <template #default="scope">
          <span>{{ scope.row.EA }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <!-- <el-button
            :icon="Edit"
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          > -->
          <el-popconfirm
            confirm-button-text="是"
            cancel-button-text="否"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="是否删除该条记录?"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button :icon="Delete" size="small" type="danger"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      v-show="total > 0"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 50, 100]"
      :small="false"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /> -->
  </div>
</template>
<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}
.el-carousel__item .el-carousel__item--card {
  height: 300px;
}
</style>
