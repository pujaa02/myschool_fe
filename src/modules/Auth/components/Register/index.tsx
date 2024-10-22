import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ** enum **
import { EnumFileType } from '../../../../components/FormElement/enum';

//  ** components **
import Button from '../../../../components/Button/Button';
import DropZone from '../../../../components/FormElement/DropZoneField';
import TextArea from '../../../../components/FormElement/TextArea';

// ** constant **
import { PUBLIC_NAVIGATION } from '../../../../constants/navigation.constant';

// ** types **
import { RegisterComponentProps } from './types';

// ** hooks **
import { useAxiosPost } from '../../../../hooks/useAxios';

// ** validation **
import { RegisterAdditionalValidationSchema } from '../../validationSchema';

// ** utils **
import { convertLocationIdToName } from '../../../../utils';

// ** redux **
import { RegisterInitialValueType } from '../../pages/Register/types';
import {
  getCitiesJson,
  getCountriesJson,
  getStateJson,
} from '../../../../redux-toolkit/slices/countryJsonSlice';

const AdditionalInfo = ({
  setActive,
  currentStep,
  registerInitialValue,
  setRegisterInitialValue,
}: RegisterComponentProps) => {
  const { t } = useTranslation();
  const countries = useSelector(getCountriesJson);
  const states = useSelector(getStateJson);
  const cities = useSelector(getCitiesJson);
  const navigate = useNavigate();
  const [registerDetail, { isLoading }] = useAxiosPost();

  const OnPrevious = (data: RegisterInitialValueType) => {
    setActive((prev: any) => {
      return {
        ...prev,
        current: currentStep - 1,
        managerInfoForm: { complete: false },
      };
    });
    setRegisterInitialValue((prev: any) => {
      return {
        ...prev,
        ...data,
      };
    });
  };
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
    <div>
      <Formik
        initialValues={registerInitialValue}
        validationSchema={RegisterAdditionalValidationSchema()}
        onSubmit={(values) => OnSubmit(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="grid col-span-1 gap-4">
              <DropZone
                label={t('Auth.AdditionalInfo.companyLogoText')}
                name="company_logo"
                SubTitle={t('Auth.AdditionalInfo.dragDropText')}
                setValue={setFieldValue}
                acceptTypes="image/*"
                value={values.company_logo}
                fileType={EnumFileType.Image}
              />
              <TextArea
                placeholder={t('Auth.AdditionalInfo.descriptionPlaceHolder')}
                rows={5}
                label={t('Auth.AdditionalInfo.companyDescription')}
                name="company_description"
              />

              {/* <div>
                <p>
                  {t('Auth.RegisterCommon.termsAndPolicyText')} &nbsp;
                  <Link
                    target="_blank"
                    to={TERMS_AND_CONDITION}
                    className="text-secondary underline  transition-all "
                  >
                    {t('Auth.RegisterCommon.termsAndCondition')}
                  </Link>
                  &nbsp; and &nbsp;
                  <Link
                    target="_blank"
                    to={PRIVACY_POLICY}
                    className="text-secondary underline transition-all"
                  >
                    &nbsp;
                    {t('Auth.RegisterCommon.privacyPolicy')}
                  </Link>
                </p>
              </div> */}

              <div className="flex justify-center my-4 w-full gap-2">
                <Button
                  variants="grayLight"
                  className="w-full min-w-[150px] justify-center"
                  onClickHandler={() => OnPrevious(values)}
                  value={t('Auth.RegisterCommon.previousButtonText')}
                />
                <Button
                  isLoading={isLoading}
                  disabled={isLoading}
                  type="submit"
                  variants="primary"
                  className={`w-full min-w-[150px] justify-center ${
                    isLoading ? 'disabled:opacity-50 pointer-events-none' : ''
                  }`}
                  value={t('Auth.RegisterCommon.submitButtonText')}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdditionalInfo;
