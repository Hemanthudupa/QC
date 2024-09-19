import { number, string } from "joi";

export type registerHP = {
  motorSerialNumber: string;
  motorHp: number;
  modelNumber: string;
  controllerSerialNumber: string;
  rmsDeviceId: string;
  headSize: number;
  motorCategory: string;
};

export type rmsDetails = {
  motorSerialNumber?: string;
  motorHp?: number;
  modelNumber?: string;
  controllerSerialNumber?: string;
  rmsDeviceId?: string;
  headSize?: number;
  motorCategory?: string;
};

export type embedRmsDetails = {
  distributorId: string;
  imeiNo: string;
  simPhoneNumber: string;
  simNumber: string;
  simOperator: string;
  networkType: string;
  rmsDeviceId: string;
};

export type OrderDetails = {
  orderNumber: string;
  count: number;
  status?: string;
};

export type login = {
  username: string;
  passward: string;
};

export type userType = {
  username: string;
  id: string;
  role: string;
  name?: string;
};

export type product_set = "PMC" | "C" | "PM" | "M";
