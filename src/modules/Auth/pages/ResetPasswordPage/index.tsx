// ** libraries **
import { useLocation } from 'react-router-dom';

// ** components **
import Button from 'components/Button/Button';

// ** constants **

// ** hooks */
import { useAxiosPost } from 'hooks/useAxios';

import { FormProvider, useForm } from 'react-hook-form';
import FormField from 'components/FormField';
import { ResetPasswordFormFields } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from 'modules/Auth/validationSchema';

const ResetPasswordPage = () => {
  const { state } = useLocation();

  const formMethods = useForm<ResetPasswordFormFields>({
    resolver: yupResolver(resetPasswordSchema),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formMethods;
  const [resetPasswordApi] = useAxiosPost();

  const OnSubmit = handleSubmit(async (data: ResetPasswordFormFields) => {
    if (data) {
      const resetPassword = {
        password: data.password,
      };
      const config = {
        headers: {
          Authorization: `jwt ${state.access_token}`,
        },
      };
      await resetPasswordApi('/auth/set-password', resetPassword, config);
    }
  });

  return (
    <section className="reset-password-section bg-primary2Light bg-[center_bottom] min-h-[calc(100dvh_-_90px)] bg-authbg bg-no-repeat flex justify-center items-center">
      <div className="bg-white w-[60%] max-w-[85%] sm:max-w-[510px] max-h-[calc(100dvh-180px)] p-10 rounded-3xl overflow-y-auto my-4 ">
        <h1 className="text-blacktheme text-3xl font-semibold mb-6">
          ResetPassword
        </h1>
        <FormProvider {...formMethods}>
          <form onSubmit={OnSubmit}>
            <div className="mx-[-10px] flex flex-wrap">
              <div className="px-[10px] w-1/2 sm:w-full">
                <FormField<ResetPasswordFormFields>
                  required
                  type="password"
                  name="password"
                  label="Password"
                  labelClass="if__label__blue"
                  placeholder="Enter Your Password"
                  autoComplete="new-password"
                  icon="securityFilled"
                  register={register}
                  fieldLimit={50}
                  error={errors?.password}
                />
              </div>
              <div className="px-[10px] w-1/2 sm:w-full">
                <FormField<ResetPasswordFormFields>
                  required
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  labelClass="if__label__blue"
                  placeholder="Enter Your Confirm Password"
                  autoComplete="new-password"
                  icon="securityFilled"
                  register={register}
                  fieldLimit={50}
                  error={errors?.confirmPassword}
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-[30px]">
              Reset Password
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
