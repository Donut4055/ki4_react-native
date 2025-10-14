export interface Employee {
  employeeCode: string;
  employeeName: string;
  employeeStatus: "WORKING" | "INACTIVE" | "RESIGNED";
  address: string;
  dateBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  email: string;
  phoneNumber: string;
}

export interface EmployeeUpdateRequest {
  employeeCode: string;
  employeeName: string;
  phoneNumber: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dateBirth: string;
  positionId: number;
}


export interface EmployeeResponse {
  id: number;
  employeeCode: string;
  employeeName: string;
  phoneNumber: string;
  positions: Position | object;
}

export interface Position {
  id: number;
  positionName: string;
}
