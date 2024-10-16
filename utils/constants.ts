export const USER_ROLES: Array<string> = [
  "ADMIN",
  "SERVICE_EMPLOYEE",
  "DISTRIBUTOR",
  "GAE",
  "GJE",
  "GCM",
  "CONSUMER",
  "EMBED",
  "QC",
  "CONTROLLER",
  "MOTOR",
];

export const MOTOR_TYPE = {
  surface: "Surface",
  submersible: "Submersible",
};

export const MOTOR_CATEGORY = {
  ac: "AC",
  dc: "DC",
};

export const MOTOR_HP = [1, 2, 3, 5, 75, 10, 125, 15, 20];

export const MOTOR_PURPOSE = {
  irrigation: "IRRIGATION",
  drinking: "DRINKING",
};

export const RMS_UPDATE_QUERY = {
  customer: "Customer",
  device: "Device",
  security: "Security",
  imei: "Imei",
  distributor: "Distributor",
};

export const DISTRIBUTOR_UPDATE_QUERY = {
  personal: "Personal",
  security: "Security",
  business: "Business",
};

export const SERVICE_ENG_UPDATE_QUERY = {
  personal: "Personal",
  distributor: "Distributor",
  security: "Security",
};

export const ADMIN_UPDATE_QUERY = {
  personal: "Personal",
  security: "Security",
};

export const TICKET_PRIORITY = {
  high: {
    value: "HIGH",
    noOfDays: 1,
  },
  medium: {
    value: "MEDIUM",
    noOfDays: 3,
  },
  low: {
    value: "LOW",
    noOfDays: 10,
  },
};

export const SERVICE_TICKET_STATUS = {
  OVERDUE: "Overdue",
  UNASSIGNED: "Unassigned",
  RESOLVED: "Resolved",
  ONGOING: "Ongoing",
};

export const TICKET_CHAT_TYPE = {
  FILE: "File",
  TEXT: "Text",
  INFORMATION: "Information",
};

export const MIME_TYPES_TICKETS = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};

export const SIM_OPERATORS = {
  airtel: "AIRTEL",
  vodaphone: "VODAPHONE",
  bsnl: "BSNL",
  joi: "JIO",
  idea: "IDEA",
};

export const NETWORK_TYPE = {
  "2g": "2G",
  "4g": "4G",
};

export enum MODEL_NUMBER {
  "1hp" = "900Wp",
  "2hp" = "1800Wp",
  "3hp" = "3000Wp",
  "5hp" = "4800Wp",
  "7.5hp" = "6750Wp",
  "10hp" = "9000Wp",
}

export const ORDER_STATUS = {
  ongoing: "ONGOING",
  completed: "COMPLETED",
};

export const type = {
  normal: "NORMAL",
  pdi: "PDI",
};
