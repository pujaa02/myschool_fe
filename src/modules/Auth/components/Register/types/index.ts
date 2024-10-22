import {
  ActiveStateType,
  RegisterInitialValueType,
} from '../../../pages/Register/types';

export type RegisterComponentProps = {
  currentStep: number | undefined;
  setActive: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  registerInitialValue: RegisterInitialValueType;
  setRegisterInitialValue: React.Dispatch<
    React.SetStateAction<RegisterInitialValueType>
  >;
};
