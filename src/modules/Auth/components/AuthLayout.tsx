// ** Component **
import Footer from 'components/Layout/components/Footer';
import Header from 'components/Layout/components/Header';

export type Props = {
  children: React.ReactNode;
  isSomethingWentWrong?: boolean;
};

const AuthLayout = ({ children, isSomethingWentWrong = true }: Props) => {
  return (
    <>
      {isSomethingWentWrong && <Header />}
      {children}
      {isSomethingWentWrong && <Footer />}
    </>
  );
};

export default AuthLayout;
