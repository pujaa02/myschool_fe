import { yupResolver } from '@hookform/resolvers/yup';
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';
import { useAxiosPost } from 'hooks/useAxios';
import { loginSchema } from 'modules/Auth/validationSchema';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginFormFields } from './types';
// import { getActiveUserDataApi } from 'modules/Auth/services';

const Login = () => {
  const navigate = useNavigate();
  const [loginUserApi] = useAxiosPost();
  // const { getActiveUser } = getActiveUserDataApi();

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
      const { data, error } = await loginUserApi('/auth/login', loginData);
      if (data && !error) {
        // await getActiveUser();
      }
    }
  });

  useEffect(() => {
    navigate(PUBLIC_NAVIGATION.login);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 max-w-md bg-white border-4 border-blue-600 rounded-lg">
        <form className="space-y-4" onSubmit={OnSubmit}>
          <h2 className="text-2xl font-bold text-center text-red-600">Login</h2>
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
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-bold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is Required!!',
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.password && (
              <p className="mt-1 text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <p
              onClick={() => navigate(`${PUBLIC_NAVIGATION.forgotPassword}`)}
              className="w-40 p-2 text-center text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
            >
              Forget Password
            </p>
            <button
              type="submit"
              className="w-20 p-2 text-center text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
            >
              Login
            </button>
          </div>
          <div className="mt-4 text-center">
            <p onClick={() => navigate(`${PUBLIC_NAVIGATION.register}`)}>
              Don&apos;t have an account?{' '}
              {/* <Link to="/auth/register" className="text-blue-500 underline"> */}
              <span className="text-red-600">Register</span>
              {/* </Link> */}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
