import { useNavigate } from 'react-router-dom';

// ** components **

// ** constants **
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

// ** redux **
import { useAxiosPost } from 'hooks/useAxios';

// ** validation **
import { forgotPasswordSchema } from 'modules/Auth/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ForgotPasswordFormFields } from './types';

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
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="container mx-auto p-6 max-w-md bg-white border-4 border-blue-600 rounded-lg">
          <form className="space-y-4" onSubmit={OnSubmit}>
            <h2 className="text-2xl font-bold text-center text-red-600">
              ForgotPassword
            </h2>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-bold">
                Email:
              </label>
              <input
                type="text"
                id="email"
                {...register('email', {
                  required: 'Email is Required!!',
                })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.email && (
                <p className="mt-1 text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="flex items-center justify-center mt-4 space-x-4">
              <button
                type="submit"
                className="w-20 p-2 text-center text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
