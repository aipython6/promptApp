import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
type DataResult = {
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
};

interface dialogForm {
  deviceId: number;
  dateRange: string;
}

export const getPatientData = (data: dialogForm) => {
  return http.request<Array<DataResult>>("post", baseUrlApi("data/getData"), { data });
};

type Result = {
  success: boolean;
  data: Array<any>;
};
type Pid = {
  pid: string;
}
export const deletePatientByPid = (data: Pid) => {
  return http.request<Result>("post", baseUrlApi("data/deletePatientByPid"), { data });
}