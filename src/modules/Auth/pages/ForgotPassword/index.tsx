import { useNavigate } from 'react-router-dom';

// ** components **
import Button from 'components/Button/Button';

// ** constants **
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

// ** redux **
import { useAxiosPost } from 'hooks/useAxios';

// ** validation **
import { forgotPasswordSchema } from 'modules/Auth/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { ForgotPasswordFormFields } from './types';
import FormField from 'components/FormField';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [forgotPasswordApi] = useAxiosPost();

  const formMethods = useForm<ForgotPasswordFormFields>({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formMethods;

  const OnSubmit = handleSubmit(async (userData: ForgotPasswordFormFields) => {
    if (userData) {
      const forgotPasswordObject = {
        email: userData.email,
        type: 'FORGOT',
      };
      const { error } = await forgotPasswordApi(
        '/auth/forgot-password',
        forgotPasswordObject
      );
      if (!error) {
        navigate(PUBLIC_NAVIGATION.otp, { state: { email: userData.email } });
      }
    }
  });

  return (
    <section className="forgot-password-section bg-primary2Light bg-[center_bottom] min-h-[calc(100dvh_-_90px)] bg-authbg bg-no-repeat flex justify-center items-center">
      <div className="bg-white max-w-[85%] sm:max-w-[510px] max-h-[calc(100dvh-180px)] p-10 rounded-3xl overflow-y-auto my-4 ">
        <h1 className="text-blacktheme text-3xl font-semibold mb-2">
          ForgotPassword
        </h1>
        <FormProvider {...formMethods}>
          <form onSubmit={OnSubmit}>
            <FormField<ForgotPasswordFormFields>
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
            <Button type="submit" className="w-full mt-[30px]">
              Submit
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
