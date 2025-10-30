// hooks/useContactData.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContact as apiCreateContact,
  deleteContact as apiDeleteContact,
  fetchContact as apiFetchContact,
  fetchContacts as apiFetchContacts,
  toggleBlockContact as apiToggleBlockContact,
  updateContact as apiUpdateContact,
} from "../apis/contact.apis";
import { Contact, ContactFormData } from "../types";

// Chuyển đổi dữ liệu từ API (id có thể là number) sang kiểu của app (id: string)
const mapApiContactToFront = (c: any): Contact => ({
  id: String(c.id),
  name: c.name,
  phone: c.phone,
  tag: c.tag,
  isBlocked: Boolean(c.isBlocked),
});

export const useContactsQuery = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await apiFetchContacts();
      return (res.data || []).map(mapApiContactToFront);
    },
  });
};

export const useContactQuery = (id: string | number | undefined) => {
  return useQuery({
    queryKey: ["contact", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await apiFetchContact(Number(id));
      return mapApiContactToFront(res.data);
    },
  });
};

export const useCreateContactMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ContactFormData) => {
      const res = await apiCreateContact(payload);
      return mapApiContactToFront(res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

export const useUpdateContactMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | number;
      data: ContactFormData;
    }) => {
      const res = await apiUpdateContact(Number(id), data);
      return mapApiContactToFront(res.data);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contact", variables.id] });
    },
  });
};

export const useToggleBlockContactMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => {
      const res = await apiToggleBlockContact(Number(id));
      return mapApiContactToFront(res.data);
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contact", id] });
    },
  });
};

export const useDeleteContactMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => {
      const res = await apiDeleteContact(Number(id));
      return mapApiContactToFront(res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};
