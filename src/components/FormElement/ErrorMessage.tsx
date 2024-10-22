import { ErrorMessage as FormikErrorMessage } from 'formik';

// ** style **
import './style/errorMessage.css';

const ErrorMessage = ({ name }: { name: string }) => {
  return (
    <FormikErrorMessage name={name}>
      {(msg) => {
        return <span className="error-message">{msg}</span>;
      }}
    </FormikErrorMessage>
  );
};

export default ErrorMessage;
