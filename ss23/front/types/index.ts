// types.ts
export enum ContactTag {
  Family = "Gia đình",
  Friend = "Bạn bè",
  Colleague = "Đồng nghiệp",
  Other = "Khác",
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  tag: ContactTag;
  isBlocked: boolean;
}

// Dùng cho Form
export interface ContactFormData {
  name: string;
  phone: string;
  tag: ContactTag;
}

// Dùng cho SectionList
export interface ContactSection {
  title: string;
  data: Contact[];
}
