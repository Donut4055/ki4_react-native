import { Employee, EmployeeResponse } from "@/interfaces/employee.interface";
import { axiosInstance } from "@/utils/axios-instance";
import { PaginatinedResponse, SingleResponse } from "@/utils/response-data";

export const getAllEmployee = async () => {
  try {
    const resp = await axiosInstance.get<PaginatinedResponse<EmployeeResponse>>(
      "employees/all"
    );
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const createEmployee = async (data: Employee) => {
  try {
    const resp = await axiosInstance.post<SingleResponse<Employee>>(
      "employees",
      data
    );
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (id: number, data: Partial<Employee>) => {
  try {
    const resp = await axiosInstance.put<SingleResponse<Employee>>(
      `employees/${id}`,
      data
    );
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    const resp = await axiosInstance.delete<SingleResponse<EmployeeResponse>>(
      `employees/${id}`
    );
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const getEmployeeById = async (id: number) => {
  try {
    const resp = await axiosInstance.get<SingleResponse<EmployeeResponse>>(
      `employees/${id}`
    );
    return resp.data;
  } catch (error) {
    throw error;
  }
};
