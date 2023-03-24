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

export const getPatientData = (data: Object) => {
  return http.request<DataResult>("get", baseUrlApi("/data/getData"), data);
};
