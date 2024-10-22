// ** imports **
import {
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
  FormikValues,
} from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

// ** components **
import Button from 'components/Button/Button';
import CustomCard from 'components/Card';
import CityDropdown from 'components/FormElement/CityList';
import DropZone from 'components/FormElement/DropZoneField';
import InputField from 'components/FormElement/InputField';
import RadioButtonGroup from 'components/FormElement/RadioInput';
import ReactSelect from 'components/FormElement/ReactSelect';
import TextArea from 'components/FormElement/TextArea';
import { EnumFileType } from 'components/FormElement/enum';
import Image from 'components/Image';
import PageHeader from 'components/PageHeader/PageHeader';

// ** constants **
import { ConfirmationChoices } from 'constants/common.constant';
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';

import { useAxiosGet, useAxiosPatch, useAxiosPost } from 'hooks/useAxios';

import 'modules/Client/styles/index.css';

// ** types **
import { Option } from 'components/FormElement/types';
import { CompanyInitialProps, CompanyViewProps } from 'modules/Client/types';

// ** validation **
import CountrySelect from 'components/FormElement/CountryList';
import ProvinceDropDown from 'components/FormElement/ProvinceList';
import { ROLES } from 'constants/roleAndPermission.constant';
import _ from 'lodash';
import { RegisterCompanyValidationSchema } from 'modules/Client/validation';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import { getCitiesJson, getStateJson } from 'redux-toolkit/slices/countryJsonSlice';
import { customRandomNumberGenerator } from 'utils';

// ** redux **
import { setToast } from 'redux-toolkit/slices/toastSlice';

const getRegisterInitialValue = (companyData: CompanyViewProps | undefined) => {
  const {
    name = '',
    registration_number = '',
    address1 = '',
    address2 = '',
    zip = '',
    company_payment,
    country = '',
    city = '',
    address_province = '',
    description = '',
    logo = '',
    company_manager,
    ateco_code = '',
    sdi_code = '',
    accounting_emails,
    is_invoice = false,
    vat_number = '',
    ateco_id = 1,
  } = companyData || {};
  const registerInitialValue: CompanyInitialProps = {
    name,
    registration_number,
    address_l1: address1,
    address_l2: address2,
    address_zip: zip,
    payment_term: company_payment?.id ?? '',
    address_country: country,
    address_city: city,
    address_province,
    description,
    company_logo: logo,
    ateco_id,
    managers:
      company_manager?.map(({ manager }) => {
        return manager?.user_id;
      }) ?? [],
    ateco_code,
    sdi_code,
    accounting_emails:
      typeof accounting_emails === 'string'
        ? JSON.parse(accounting_emails)
        : accounting_emails ?? [{ email: '', is_primary: false }],
    is_invoice,
    vat_number,
    vat_type: '',
    role: 0,
  };
  return registerInitialValue;
};

const AddEditCompany = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { slug } = useParams();
  const cities = useSelector(getCitiesJson);
  const dispatch = useDispatch();
  const states = useSelector(getStateJson);

  const [clientCreateApi, { isLoading: isAddLoading }] = useAxiosPost();
  const [clientUpdateApi, { isLoading: isUpdateLoading }] = useAxiosPatch();
  const [clientGetApi, { isLoading: isDataLoading }] = useAxiosGet();
  const location = useLocation().state;
  const RoleId = location?.role?.id;
  const user = useSelector(getCurrentUser);
  const [managersList, setManagersList] = useState<Option[]>([]);
  const [atecoCodeList, setAtecoCodeList] = useState<Option[]>([]);
  const [paymentTerms, setPaymentTerms] = useState<Option[]>([]);
  const [vatTypeOption, setVatTypeOption] = useState<Option[]>([]);
  const [companyData, setCompanyData] = useState<CompanyViewProps>();

  useEffect(() => {
    CallApi();
  }, []);

  async function CallApi() {
    const response = await clientGetApi(`/managers/get-managers-for-company`, {
      params: { dropdown: true, label: 'full_name', sort: 'id', role: RoleId },
    });
    const paymentTerms = await clientGetApi(`/paymentterms`, {
      params: { dropdown: true, label: 'name', sort: 'id', companyDropdown: true },
    });

    const atecoCodes = await clientGetApi(`/ateco-code`, {
      params: { dropdown: true, label: 'name', sort: 'id' },
    });

    if (response?.data) {
      setManagersList(response.data);
    }
    if (paymentTerms.data) {
      setPaymentTerms(paymentTerms.data);
    }
    if (atecoCodes.data) {
      setAtecoCodeList(atecoCodes.data);
    }
    if (slug) {
      const companyResponse = await clientGetApi(`/companies/${slug}`, {
        params: { role: RoleId },
      });
      if (companyResponse) {
        setCompanyData(companyResponse.data);
      }
    }

    const { data, error } = await clientGetApi('/invoice/vat-type');
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
  }

  const OnSubmit = async (companyData: FormikValues) => {
    if (companyData) {
      const clientData = {
        ...companyData,
        accounting_emails: JSON.stringify(companyData.accounting_emails),
        managers: companyData?.managers?.join(','),
        role: RoleId,
        address_country: companyData.address_country,
        address_city: companyData.address_city,
        is_invoice: companyData?.is_invoice,
        vat_type: !_.isEmpty(vatTypeOption) ? companyData.vat_type : 0,
      };
      const formData = new FormData();
      Object.entries(clientData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const { error } = slug
        ? await clientUpdateApi(`/companies/${slug}`, formData)
        : await clientCreateApi(`/companies`, formData);
      if (!error) {
        navigate(PRIVATE_NAVIGATION.clientsManagement.company.list.path);
      }
    }
  };

  const findStateIdByCountry = (e?: string) => {
    const findStateId = states.states.find(
      (state: { id: string; name: string; country_id: string }) =>
        state.name.toLowerCase() === e?.toLowerCase()
    )?.id;

    return findStateId;
  };

  const renderAccountingEmail = (
    values: CompanyInitialProps,
    accountEmail: FieldArrayRenderProps
  ) =>
    values.accounting_emails.map((email: { email: string }, index: number) => {
      return (
        <div
          key={`accounting_emails_${index + 1}`}
          className="flex items-start w-full gap-3"
        >
          <InputField
            placeholder={t(
              'ClientManagement.clientForm.fieldInfos.emailPlaceHolder'
            )}
            type="text"
            isCompulsory
            value={email.email}
            label={
              index === 0
                ? t('ClientManagement.clientForm.fieldInfos.accountingEmail')
                : ''
            }
            name={`accounting_emails[${index}].email`}
            isLoading={isDataLoading}
          />
          <div
            className={`flex items-center gap-2 mt-0  ${
              index === 0 ? 'mt-[29px] ' : ''
            }`}
          >
            {typeof values?.accounting_emails?.length === 'number' &&
              index === values.accounting_emails.length - 1 && (
                <Button
                  onClickHandler={() => {
                    accountEmail.push({
                      email: '',
                      is_primary: false,
                    });
                  }}
                  className="addIconCard min-w-[47px] min-h-[47px]"
                >
                  <Image iconName="plusIcon" />
                </Button>
              )}
            {values?.accounting_emails?.length !== 1 && (
              <Button
                className={` button dangerBorder min-w-[47px] min-h-[47px] !p-2 inline-block`}
                onClickHandler={() => accountEmail.remove(index)}
              >
                <Image iconName="deleteIcon" iconClassName="w-6 h-6" />
              </Button>
            )}
          </div>
        </div>
      );
    });

  return (
    <Formik
      enableReinitialize
      initialValues={getRegisterInitialValue(companyData)}
      validationSchema={RegisterCompanyValidationSchema()}
      onSubmit={OnSubmit}
    >
      {({ values, setFieldValue, validateForm, submitForm }) => {
        const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          submitForm();
          const formErrors = await validateForm();
          if (Object.keys(formErrors).length > 0) {
            dispatch(
              setToast({
                variant: 'Error',
                message: t('ToastMessage.InCompleteFormToastMessage'),
                type: 'error',
                id: customRandomNumberGenerator(),
              })
            );
          }
        };
        return (
          <Form>
            <PageHeader
              small
              text={
                slug
                  ? t('ClientManagement.clientForm.editTitle')
                  : t('ClientManagement.clientForm.addTitle')
              }
              url={
                location?.isAddForm
                  ? '/quotes'
                  : PRIVATE_NAVIGATION.clientsManagement.company.list.path
              }
            />
            <CustomCard minimal>
              <>
                <div className="flex flex-wrap -mx-6">
                  <div className="w-full xl:w-1/2 px-6 relative">
                    <span className="absolute right-0 top-0 bottom-0 my-auto w-px h-full bg-black/10" />
                    <div className="grid grid-cols-2 gap-x-3 gap-y-7 xl:pe-4 2xl:pe-8">
                      <div className="xl:col-span-2">
                        <DropZone
                          className="xl:max-w-[330px]"
                          label={t(
                            'ClientManagement.clientForm.fieldInfos.companyLogoText'
                          )}
                          name="company_logo"
                          SubTitle={t(
                            'ClientManagement.clientForm.fieldInfos.dragDropText'
                          )}
                          setValue={setFieldValue}
                          value={values.company_logo}
                          acceptTypes="image/*"
                          fileType={EnumFileType.Image}
                          isCompulsory
                          isLoading={isDataLoading}
                        />
                      </div>
                      <InputField
                        parentClass="xl:col-span-2"
                        placeholder={t(
                          'ClientManagement.clientForm.fieldInfos.companyNamePlaceHolder'
                        )}
                        type="text"
                        isCompulsory
                        value={values.name}
                        label={t(
                          'ClientManagement.clientForm.fieldInfos.companyName'
                        )}
                        name="name"
                        isLoading={isDataLoading}
                      />
                      <InputField
                        placeholder={t(
                          'ClientManagement.clientForm.fieldInfos.registrationNumberPlaceHolder'
                        )}
                        type="text"
                        isCompulsory
                        value={values.registration_number}
                        label={t(
                          'ClientManagement.clientForm.fieldInfos.registrationNumber'
                        )}
                        name="registration_number"
                        isLoading={isDataLoading}
                      />
                      <InputField
                        placeholder={t(
                          'ClientManagement.clientForm.fieldInfos.vatNamePlaceHolder'
                        )}
                        type="text"
                        isCompulsory
                        value={values.vat_number}
                        label={t('ClientManagement.clientForm.fieldInfos.vatNumber')}
                        name="vat_number"
                        isLoading={isDataLoading}
                      />
                      <ReactSelect
                        parentClass="xl:col-span-2"
                        name="vat_type"
                        options={vatTypeOption}
                        placeholder={t(
                          'ClientManagement.clientForm.fieldInfos.vatTypePlaceHolder'
                        )}
                        label={t('ClientManagement.clientForm.fieldInfos.vatType')}
                        isCompulsory
                        isLoading={isDataLoading}
                      />
                      <InputField
                        placeholder={t(
                          'ClientManagement.clientForm.fieldInfos.address1PlaceHolder'
                        )}
                        type="text"
                        value={values.address_l1}
                        isCompulsory
                        label={t(
                          'ClientManagement.clientForm.fieldInfos.companyAddress'
                        )}
                        name="address_l1"
                        isLoading={isDataLoading}
                      />
                      <InputField
                        placeholder={t(
                          'ClientManagement.clientForm.fieldInfos.address2PlaceHolder'
                        )}
                        type="text"
                        value={values.address_l2}
                        label={t(
                          'ClientManagement.clientForm.fieldInfos.companyAddress2'
                        )}
                        name="address_l2"
                        isLoading={isDataLoading}
                      />
                      <CountrySelect
                        className="bg-transparent"
                        parentClass="col-span-2"
                        selectedCountry={values.address_country}
                        name="address_country"
                        label={t('ClientManagement.clientForm.fieldInfos.country')}
                        placeholder={t(
                          'ClientManagement.clientForm.fieldInfos.countryPlaceHolder'
                        )}
                        isCompulsory
                      />
                      <ProvinceDropDown
                        isCompulsory
                        className="bg-transparent"
                        name="address_province"
                        label={t('ClientManagement.clientForm.fieldInfos.province')}
                        placeholder={t('Auth.RegisterCommon.provincePlaceHolder')}
                        selectedState={values.address_province}
                        selectedCountry={values.address_country}
                        onChange={(e) => {
                          findStateIdByCountry(e);
                          if (e) setFieldValue('address_province', e);
                        }}
                      />
                      {/* For City, selected state must be passed */}
                      <CityDropdown
                        selectedCity={values.address_city}
                        name="address_city"
                        cities={cities.cities}
                        label={t('Auth.RegisterCommon.city')}
                        placeholder={t('Auth.RegisterCommon.cityPlaceHolder')}
                        selectedState={findStateIdByCountry(
                          values?.address_province
                        )}
                        isCityByCountry={false}
                        isCompulsory={false}
                      />
                      <InputField
                        placeholder={t(
                          'ClientManagement.clientForm.fieldInfos.zipPlaceHolder'
                        )}
                        type="text"
                        value={values.address_zip}
                        isCompulsory
                        label={t('ClientManagement.clientForm.fieldInfos.zipcode')}
                        name="address_zip"
                        isLoading={isDataLoading}
                      />
                    </div>
                  </div>
                  <div className="w-full xl:w-1/2 px-6">
                    <div className="grid grid-cols-2 gap-x-3 gap-y-7 xl:pe-4 2xl:pe-8">
                      <div className="col-span-2 flex flex-col gap-4">
                        <FieldArray
                          name="accounting_emails"
                          render={(accountEmail) =>
                            renderAccountingEmail(values, accountEmail)
                          }
                        />
                      </div>
                      <ReactSelect
                        parentClass="xl:col-span-2"
                        name="ateco_id"
                        options={atecoCodeList}
                        placeholder={t(
                          'ClientManagement.clientForm.fieldInfos.atecoCode'
                        )}
                        selectedValue={values.ateco_id}
                        label={t('ClientManagement.clientForm.fieldInfos.ateco_id')}
                        isCompulsory
                        isLoading={isDataLoading}
                      />
                      <InputField
                        placeholder={t(
                          'ClientManagement.clientForm.fieldInfos.sdiPlaceHolder'
                        )}
                        type="text"
                        isCompulsory
                        label={t('ClientManagement.clientForm.fieldInfos.sdiCode')}
                        name="sdi_code"
                        value={values.sdi_code}
                        isLoading={isDataLoading}
                      />
                      <RadioButtonGroup
                        optionWrapper="flex gap-4"
                        name="is_invoice"
                        options={ConfirmationChoices()}
                        isCompulsory
                        label={t(
                          'ClientManagement.clientForm.fieldInfos.purchaseOrder'
                        )}
                        parentClass="radio-group col-span-2"
                      />
                      <TextArea
                        parentClass="xl:col-span-2"
                        rows={5}
                        placeholder={t(
                          'ClientManagement.clientForm.fieldInfos.descriptionPlaceHolder'
                        )}
                        label={t(
                          'ClientManagement.clientForm.fieldInfos.companyDescription'
                        )}
                        name="description"
                        isLoading={isDataLoading}
                      />
                      <ReactSelect
                        parentClass="xl:col-span-2"
                        name="managers"
                        options={managersList}
                        placeholder={t(
                          'ClientManagement.clientForm.fieldInfos.managerPlaceHolder'
                        )}
                        label={t('ClientManagement.clientForm.fieldInfos.manager')}
                        isMulti
                        isCompulsory
                        isLoading={isDataLoading}
                      />
                      {/* LEFT: condition confirm with BA */}
                      {user?.role_name !== ROLES.SalesRep && (
                        <div className="xl:col-span-2">
                          <Link
                            to={
                              PRIVATE_NAVIGATION.clientsManagement.managers.list.path
                            }
                            state={{ isModalOpen: true }}
                            className="text-ic_1 text-base inline-block cursor-pointer underline"
                          >
                            {t(
                              'ClientManagement.clientForm.fieldInfos.addManagerLink'
                            )}
                          </Link>
                        </div>
                      )}
                      <ReactSelect
                        parentClass="xl:col-span-2"
                        name="payment_term"
                        options={paymentTerms}
                        placeholder={t(
                          'ClientManagement.clientForm.fieldInfos.paymentTermPlaceHolder'
                        )}
                        label={t(
                          'ClientManagement.clientForm.fieldInfos.paymentTerm'
                        )}
                        isLoading={isDataLoading}
                        isCompulsory
                      />
                    </div>
                    <div />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    className="min-w-[90px]"
                    variants="whiteBordered"
                    onClickHandler={() => {
                      if (location?.isAddForm) {
                        navigate('/quotes');
                      } else {
                        navigate('/clients/company');
                      }
                    }}
                  >
                    {t('Button.cancelButton')}
                  </Button>
                  <Button
                    className={`min-w-[90px] ${
                      isAddLoading || isUpdateLoading
                        ? 'disabled:opacity-50 pointer-events-none'
                        : ''
                    }`}
                    disabled={isAddLoading || isUpdateLoading}
                    isLoading={isAddLoading || isUpdateLoading}
                    variants="primary"
                    onClickHandler={handleSubmit}
                  >
                    {slug ? t('editFooterTitle') : t('addFooterTitle')}
                  </Button>
                </div>
              </>
            </CustomCard>
          </Form>
        );
      }}
    </Formik>
  );
};
export default AddEditCompany;
