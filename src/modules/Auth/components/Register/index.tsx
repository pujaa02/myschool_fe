import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// ** enum **

// ** constant **
import { PUBLIC_NAVIGATION } from '../../../../constants/navigation.constant';

// ** types **
import { RegisterComponentProps } from './types';

// ** hooks **
import { useAxiosPost } from '../../../../hooks/useAxios';

// ** validation **

// ** utils **
import { convertLocationIdToName } from '../../../../utils';

// ** redux **
import {
  getCitiesJson,
  getCountriesJson,
  getStateJson,
} from '../../../../redux-toolkit/slices/countryJsonSlice';
import { FormProvider } from 'react-hook-form';

const AdditionalInfo = ({
  // setActive,
  // currentStep,
  registerInitialValue,
  setRegisterInitialValue,
}: RegisterComponentProps) => {
  const { t } = useTranslation();
  const countries = useSelector(getCountriesJson);
  const states = useSelector(getStateJson);
  const cities = useSelector(getCitiesJson);
  const navigate = useNavigate();
  const [registerDetail, { isLoading }] = useAxiosPost();

  const OnSubmit = async (userData: {
    [key: string]: number | string | { email: string; is_primary: boolean }[];
  }) => {
    if (userData) {
      const properties = [
        'company_address_country',
        'manager_address_country',
        'manager_address_state',
        'company_address_city',
        'manager_address_city',
      ];

      if (properties.every((prop) => typeof userData[prop] === 'string')) {
        properties.forEach((prop: string) => {
          const locationType = prop.split('_')[2];
          userData[prop] = convertLocationIdToName(
            locationType,
            userData[prop] as string,
            countries,
            states,
            cities
          );
        });
      }

      const registerData = new FormData();

      Object.keys(userData).forEach((item: string) => {
        if (userData[item]) {
          if (item === 'company_accounting_emails') {
            registerData.append(`${item}`, JSON.stringify(userData[item]));
          } else {
            registerData.append(`${item}`, userData[item] as string | Blob);
          }
        }
      });

      const { data, error } = await registerDetail(
        '/auth/register',
        registerData
      );

      if (data && !error) {
        navigate(PUBLIC_NAVIGATION.login);
        setActive((prev: any) => {
          return {
            ...prev,
            current: currentStep + 1,
            additionalInfoForm: { complete: true },
          };
        });
        setRegisterInitialValue((prev: any) => {
          return {
            ...prev,
            ...data,
          };
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={OnSubmit}></form>
      <p className="text-center text-dark__TextColor text-[16px] font-biotif__Regular mb-0 mt-[30px]">
        Already have an account? &nbsp;
        <Link
          to={PUBLIC_NAVIGATION.login}
          className="text-ip__Orange hover:underline font-biotif__Medium"
        >
          Login
        </Link>
      </p>
    </>
  );
};

export default AdditionalInfo;
