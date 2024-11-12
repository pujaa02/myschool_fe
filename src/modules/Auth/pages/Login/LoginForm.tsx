import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from 'modules/Auth/validationSchema';
import { useForm } from 'react-hook-form';
import { LoginFormFields, LoginFormProps } from './types/index.types';
import AuthCard from 'modules/Auth/components/AuthCard';
import FormField from 'components/FormField';
import Button from 'components/Button';

const LoginForm = (props: LoginFormProps) => {
  const { login } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = handleSubmit((value) => {
    const loginData = {
      email: value.email,
      password: value.password,
      remember: value.remember,
    };
    login(loginData);
  });

  return (
    <AuthCard
      title="Login"
      subTitle="Please enter your email and password in order to continue."
    >
      <form onSubmit={onSubmit}>
        <FormField<LoginFormFields>
          type="text"
          name="email"
          label="Email"
          icon="mailFilled"
          placeholder="Enter Your Email"
          register={register}
          error={errors.email}
          fieldLimit={60}
          required
        />
        <FormField<LoginFormFields>
          type="password"
          name="password"
          label="Password"
          placeholder="Enter Your Password"
          icon="securityFilled"
          register={register}
          error={errors.password}
          required
        />
        <div className="rememberForgot flex flex-wrap items-center justify-between">
          <FormField<LoginFormFields>
            wrapperClass="form__Groupip__Checkbox"
            type="checkbox"
            name="remember"
            label="Remember me"
            register={register}
          />
        </div>
        <Button type="submit" className="w-full mt-[30px]">
          Login
        </Button>
      </form>
    </AuthCard>
  );
};
export default LoginForm;
