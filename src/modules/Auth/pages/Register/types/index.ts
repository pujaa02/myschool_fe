type FormCompleteType = {
  complete: boolean;
};

export type ActiveStateType = {
  current?: number;
  registerInfoForm?: FormCompleteType;
};

export type RegistervalueType = {
  first_name: string;
  last_name: string;
  // phone?: string;
  // mobile?: string;
  email: string;
  user_role: string;
  // city?: string;
  // state?: string;
  // country?: string;
  birth_date: string;
  // timezone?: string;
  password: string;
  confirmPassword: string;
};
