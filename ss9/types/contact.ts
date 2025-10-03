export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  isFavorite: boolean;
  avatar?: string;
}

export type ContactFormData = Omit<Contact, 'id' | 'isFavorite'>;
