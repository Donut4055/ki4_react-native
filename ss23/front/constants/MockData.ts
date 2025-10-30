// constants/MockData.ts
import { Contact, ContactTag } from "../types";

export const MOCK_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "An Nguyễn",
    phone: "0901234567",
    tag: ContactTag.Friend,
    isBlocked: false,
  },
  {
    id: "2",
    name: "Bố",
    phone: "0912345678",
    tag: ContactTag.Family,
    isBlocked: false,
  },
  {
    id: "3",
    name: "Bình Trần",
    phone: "0987654321",
    tag: ContactTag.Colleague,
    isBlocked: false,
  },
  {
    id: "4",
    name: "Mẹ",
    phone: "0912345679",
    tag: ContactTag.Family,
    isBlocked: false,
  },
  {
    id: "5",
    name: "Sếp Hoàng",
    phone: "0934567890",
    tag: ContactTag.Colleague,
    isBlocked: true,
  },
  {
    id: "6",
    name: "Cường Đỗ",
    phone: "0978123456",
    tag: ContactTag.Friend,
    isBlocked: false,
  },
  {
    id: "7V",
    name: "Giao hàng nhanh",
    phone: "19001234",
    tag: ContactTag.Other,
    isBlocked: true,
  },
];
