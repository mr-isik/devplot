export type AuthResponse = {
  data: any;
  error: {
    message: string;
    code?: string;
  } | null;
};
