type FormCompleteType = {
  complete: boolean;
};

export type ActiveStateType = {
  current?: number;
  registerInfoForm?: FormCompleteType;
};

export type RegisterInitialValueType = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  role?: string;
  city?: string;
  state?: string;
  country?: string;
  birth_date?: string;
  timezone?: string;
};
