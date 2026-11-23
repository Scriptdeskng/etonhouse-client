export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  button_text?: string;
  button_link?: string;
}
