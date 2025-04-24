export interface ApiRequestParams {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: any;
  params?: Record<string, any>;
  requireToken?: boolean;
  content_type?: string;
}
