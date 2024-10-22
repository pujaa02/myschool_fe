import {
  ActiveStateType,
  RegisterInitialValueType,
} from '../../../../../modules/Auth/pages/Register/types';

export type RegisterComponentProps = {
  currentStep: number;
  setActive: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  registerInitialValue: RegisterInitialValueType;
  setRegisterInitialValue: React.Dispatch<
    React.SetStateAction<RegisterInitialValueType>
  >;
};
