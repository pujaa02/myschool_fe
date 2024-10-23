import { yupResolver } from '@hookform/resolvers/yup';
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';
import { useAxiosPost } from 'hooks/useAxios';
import { loginSchema } from 'modules/Auth/validationSchema';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginFormFields } from './types';
import FormField from 'components/FormField';
import Button from 'components/Button/Button';

const Login = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loginUserApi, { isLoading }] = useAxiosPost();

  const formMethods = useForm<LoginFormFields>({
    resolver: yupResolver(loginSchema),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formMethods;

  const OnSubmit = handleSubmit(async (userData: LoginFormFields) => {
    if (userData) {
      const loginData = {
        email: userData.email,
        password: userData.password,
        remember: userData.remember,
      };
      await loginUserApi('/auth/login', loginData);
    }
  });

  useEffect(() => {
    navigate(PUBLIC_NAVIGATION.login);
  }, []);

  return (
    <section className="login-section bg-primary2Light bg-[center_bottom] min-h-[calc(100dvh_-_90px)] bg-authbg bg-no-repeat flex justify-center items-center">
      <div className="bg-white max-w-[85%] sm:max-w-[510px] max-h-[calc(100dvh-180px)] p-10 rounded-3xl overflow-y-auto my-4 auth-scroll">
        <h1 className="text-dark text-3xl font-semibold mb-2">Login</h1>
        <FormProvider {...formMethods}>
          <form onSubmit={OnSubmit}>
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
              {/* <Link
            to={PUBLIC_NAVIGATION.forgotPassword}
            className="font-biotif__Medium text-ip__Orange text-[14px] hover:underline"
          >
            Forgot Password
          </Link> */}
            </div>
            <Button type="submit" className="w-full mt-[30px]">
              Login
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};
export default Login;
