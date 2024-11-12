export type LoginFormFields = {
  email: string;
  password: string;
  remember?: boolean;
};

export interface LoginFormProps {
  login: (_data: LoginFormFields) => void;
}
