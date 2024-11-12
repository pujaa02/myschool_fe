import AuthLayout from 'modules/Auth/components/AuthLayout';
import LoginForm from './LoginForm';
import { useLoginService } from './service/useLoginService';

const Login = () => {
  const { loginUser } = useLoginService();
  return (
    <AuthLayout>
      <>
        <LoginForm login={loginUser} />
      </>
    </AuthLayout>
  );
};

export default Login;
