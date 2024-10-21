import { FieldArray, FieldArrayRenderProps, Form, Formik } from 'formik';
import { useQueryGetFunction } from 'hooks/useQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// ** components **
import Button from 'components/Button/Button';
import CityDropdown from 'components/FormElement/CityList';
import InputField from 'components/FormElement/InputField';
import RadioButtonGroup from 'components/FormElement/RadioInput';
import ReactSelect from 'components/FormElement/ReactSelect';
import Image from 'components/Image';

// ** types **
import { Option } from 'components/FormElement/types';
import { RegisterInitialValueType } from 'modules/Auth/pages/Register/types';
import { RegisterComponentProps } from './types';

// ** constant **
import { ConfirmationChoices, DropdownLoaderTypes } from 'constants/common.constant';

// ** validation **
import CountrySelect from 'components/FormElement/CountryList';

import ProvinceDropDown from 'components/FormElement/ProvinceList';
import { useAxiosGet } from 'hooks/useAxios';
import { RegisterCompanyValidationSchema } from 'modules/Auth/validationSchema';
import { useSelector } from 'react-redux';
import { getCitiesJson, getStateJson } from 'redux-toolkit/slices/countryJsonSlice';

// ** redux **

const RegisterCompanyInfo = ({
  setActive,
  currentStep,
  registerInitialValue,
  setRegisterInitialValue,
}: RegisterComponentProps) => {
  const { t } = useTranslation();
  const cities = useSelector(getCitiesJson);
  const states = useSelector(getStateJson);

  const { response, isLoading } = useQueryGetFunction(
    '/futture-in-cloud/getClientData'
  );
  const [callVatType] = useAxiosGet();

  const [defaultCompanyNames, setDefaultCompanyNames] = useState<Option[]>([]);
  const [vatTypeOption, setVatTypeOption] = useState<Option[]>([]);
  const [stateId, setStateId] = useState('');
  const getVatType = async () => {
    const { data, error } = await callVatType('/invoice/vat-type');
    if (!error && data) {
      const vatOptions = data?.map(
        (item: { description: string; id: number; value: number }) => {
          return {
            label:
              item.description === '' ? `${String(item.value)} %` : item.description,
            value: item.id,
          };
        }
      );
      setVatTypeOption(vatOptions);
    }
  };

  useEffect(() => {
    getVatType();
  }, []);

  useEffect(() => {
    if (response?.data?.data?.length > 0) {
      const newData = response?.data?.data.map((dat: { name: string }) => ({
        label: dat.name,
        value: dat.name,
      }));
      setDefaultCompanyNames(newData);
    }
  }, [response]);

  const OnContinue = (data: RegisterInitialValueType) => {
    if (data) {
      if (data.vat_type === '') {
        data.vat_type = '0';
      }
      setActive((prev) => {
        return {
          ...prev,
          current: currentStep + 1,
          companyInfoForm: { complete: true },
        };
      });
      setRegisterInitialValue(data);
    }
  };

  const renderAccountingEmail = (
    values: RegisterInitialValueType,
    arrayHelpers: FieldArrayRenderProps
  ) =>
    values.company_accounting_emails.map(
      (data: { email: string }, index: number) => {
        return (
          <div className="flex gap-4" key={`company_accounting_emails_${index + 1}`}>
            <InputField
              parentClass="flex-[1_0_0%] max-w-[calc(100%_-_40px)]"
              placeholder={t('Auth.RegisterCompany.companyEmailPlaceHolder')}
              type="text"
              isCompulsory
              value={data.email}
              label={index === 0 ? t('Auth.RegisterCompany.companyEmail') : ''}
              name={`company_accounting_emails[${index}].email`}
            />
            {values.company_accounting_emails.length === 1 ||
            index === values.company_accounting_emails.length - 1 ? (
              <Button
                className={`${
                  index === 0 ? 'mt-7 ' : ''
                } dynamic-email-btn bg-primary/10 border-primary/50 text-primary`}
                onClickHandler={() => {
                  arrayHelpers.push({
                    email: '',
                    is_primary: false,
                  });
                }}
              >
                <Image iconName="plusIcon" iconClassName="w-full h-full" />
              </Button>
            ) : (
              <Button
                className={` ${
                  index === 0 ? 'mt-7 ' : ''
                } dynamic-email-btn bg-danger/10 border-danger/50 text-danger`}
                onClickHandler={() => {
                  arrayHelpers.remove(index);
                }}
              >
                <Image iconName="deleteIcon" iconClassName="w-full h-full" />
              </Button>
            )}
          </div>
        );
      }
    );

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={registerInitialValue}
        validationSchema={RegisterCompanyValidationSchema()}
        onSubmit={(values) => OnContinue(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ReactSelect
                parentClass="md:col-span-2 z-[9] relative "
                placeholder={t('Auth.RegisterCompany.companyNamePlaceHolder')}
                label={t('Auth.RegisterCompany.companyName')}
                isCompulsory
                name="company_name"
                options={defaultCompanyNames}
                isLoading={isLoading}
                loaderType={DropdownLoaderTypes.Default}
                isInput
              />

              <InputField
                parentClass="md:col-span-2"
                placeholder="e.g. AB123456"
                type="text"
                isCompulsory
                value={values.company_registration_number}
                label={t('Auth.RegisterCompany.registrationNumber')}
                name="company_registration_number"
              />
              <InputField
                parentClass="md:col-span-2"
                placeholder="e.g. AB123456"
                type="text"
                isCompulsory
                value={values.company_vat_number}
                label={t('Auth.RegisterCompany.vatNumber')}
                name="company_vat_number"
              />
              <ReactSelect
                parentClass="md:col-span-2 z-[9] relative "
                name="vat_type"
                options={vatTypeOption}
                placeholder={t('Auth.RegisterCompany.vatTypePlaceHolder')}
                label={t('Auth.RegisterCompany.vatType')}
                isCompulsory
              />
              <InputField
                parentClass="md:col-span-2"
                placeholder={t('Auth.RegisterCompany.companyAddress1PlaceHolder')}
                type="text"
                value={values.company_address_l1}
                isCompulsory
                label={t('Auth.RegisterCompany.companyAddress')}
                name="company_address_l1"
              />
              <InputField
                parentClass="md:col-span-2"
                placeholder={t('Auth.RegisterCompany.companyAddress2PlaceHolder')}
                type="text"
                value={values.company_address_l2}
                label={t('Auth.RegisterCompany.companyAddress2')}
                name="company_address_l2"
              />
              <CountrySelect
                selectedCountry={values.company_address_country}
                name="company_address_country"
                label={t('Auth.RegisterCommon.country')}
                placeholder={t('Auth.RegisterCommon.countryPlaceHolder')}
                parentClass="md:col-span-2"
                className="bg-transparent"
                isCompulsory
              />
              {/* For State, selected country must be passed */}
              <ProvinceDropDown
                isCompulsory
                className="bg-transparent"
                name="address_province"
                label={t('Auth.RegisterCommon.province')}
                placeholder={t('Auth.RegisterCommon.provincePlaceHolder')}
                selectedState={values.address_province}
                selectedCountry={values.company_address_country}
                onChange={(e) => {
                  const findStateId = states.states.find(
                    (state) => state.name.toLowerCase() === e?.toLowerCase()
                  )?.id;
                  setStateId(findStateId ?? '');
                  setFieldValue('address_province', e);
                }}
              />
              {/* For City, selected state must be passed */}
              <CityDropdown
                selectedCity={values.company_address_city}
                name="company_address_city"
                cities={cities.cities}
                label={t('Auth.RegisterCommon.city')}
                placeholder={t('Auth.RegisterCommon.cityPlaceHolder')}
                selectedState={stateId}
                isCityByCountry={false}
              />
              <InputField
                placeholder={t('Auth.RegisterCompany.companyZipPlaceHolder')}
                type="text"
                value={values.company_address_zip}
                isCompulsory
                label={t('Auth.RegisterCompany.zipcode')}
                name="company_address_zip"
              />
              <div className="md:col-span-2 flex flex-col gap-y-4">
                <FieldArray
                  name="company_accounting_emails"
                  render={(arrayHelpers) =>
                    renderAccountingEmail(values, arrayHelpers)
                  }
                />
              </div>
              <InputField
                placeholder="e.g. 01"
                type="text"
                isCompulsory
                value={values.company_ateco_code}
                label={t('Auth.RegisterCompany.atecoCode')}
                name="company_ateco_code"
              />
              <InputField
                placeholder="e.g. IT01365"
                type="text"
                isCompulsory
                value={values.company_sdi_code}
                label={t('Auth.RegisterCompany.sdiCode')}
                name="company_sdi_code"
              />
              <RadioButtonGroup
                optionWrapper="flex gap-4"
                name="company_is_invoice"
                options={ConfirmationChoices()}
                isCompulsory
                label={t('Auth.RegisterCompany.purchaseOrder')}
                parentClass="radio-group col-span-2"
              />
            </div>
            <div className="my-5 text-center">
              <Button
                variants="primary"
                type="submit"
                className="w-full mx-auto min-w-[150px] justify-center"
                value={t('Auth.RegisterCommon.continueButtonText')}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterCompanyInfo;
