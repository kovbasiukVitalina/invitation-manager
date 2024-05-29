export interface RecipientProps {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  personalizedMessage: string;
  inviteId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface InviteProps {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  createdAt: string;
  updatedAt?: string;
  recipients: RecipientProps[];
}
