import { Contact, ContactFormData } from "@/types";
import { BaseResponse, SingleResponse } from "@/utils/response-data";
import { handleAxiosError } from "./error.api";
import { axiosInstance } from "@/utils/axios-instance";

export const fetchContacts = async (): Promise<BaseResponse<Contact>> => {
  try {
    const res = await axiosInstance.get("/contacts");
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchBlockedContacts = async (): Promise<
  BaseResponse<Contact>
> => {
  try {
    const res = await axiosInstance.get("/contacts/blocked");
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchContact = async (
  id: number
): Promise<SingleResponse<Contact>> => {
  try {
    const res = await axiosInstance.get(`/contacts/${id}`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const createContact = async (
  newContact: ContactFormData
): Promise<SingleResponse<Contact>> => {
  try {
    const res = await axiosInstance.post("/contacts", newContact);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const updateContact = async (
  id: number,
  contact: ContactFormData
): Promise<SingleResponse<Contact>> => {
  try {
    const res = await axiosInstance.put(`/contacts/${id}`, contact);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const toggleBlockContact = async (
  id: number
): Promise<SingleResponse<Contact>> => {
  try {
    const res = await axiosInstance.patch(`/contacts/${id}/toggle-block`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const deleteContact = async (
  id: number
): Promise<SingleResponse<Contact>> => {
  try {
    const res = await axiosInstance.delete(`/contacts/${id}`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
