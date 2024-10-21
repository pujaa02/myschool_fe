import { Form, Formik, FormikValues } from 'formik';

// ** components **
import Button from 'components/Button/Button';
import DropZone from 'components/FormElement/DropZoneField';
import InputField from 'components/FormElement/InputField';
import ReactSelect from 'components/FormElement/ReactSelect';
import { EnumFileType } from 'components/FormElement/enum';
import { fileInputEnum } from 'components/FormElement/types';

// ** hooks **
import { useAxiosPatch } from 'hooks/useAxios';
import { useQueryGetFunction } from 'hooks/useQuery';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ** services **
import { getActiveUserDataApi } from 'modules/Auth/services';

// ** validation schema **
import { RegisterTrainerValidationSchema } from 'modules/Auth/validationSchema';

// ** redux **
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';

// ** types **
import Map from 'components/GoogleMap';
import { useState } from 'react';
import { TrainerInitialRegister } from './types';

const RegisterTrainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [updateTrainerUser, { isLoading }] = useAxiosPatch();
  const { getActiveUser } = getActiveUserDataApi();
  const { response: categories } = useQueryGetFunction(
    '/course-sub-category?dropdown=true'
  );
  const user = useSelector(getCurrentUser);
  const [, setLatLng] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 0,
    lng: 0,
  });
  const registerTrainerInitialValue: TrainerInitialRegister = {
    profile_image: user?.profile_image ?? '',
    first_name: user?.first_name ?? '',
    last_name: user?.last_name ?? '',
    trainer_attachment:
      user?.trainer?.trainerAttachment?.map((item) => item?.attachment_url) ?? [],
    location: user?.trainer?.location ?? '',
    sub_categories:
      user?.trainer?.trainerSubCategory?.map((item) => item?.sub_category?.id) ?? [],
    profile: true,
  };

  const OnSubmit = async (data: FormikValues) => {
    if (data) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'sub_categories' && key !== 'trainer_attachment') {
          formData.append(key, value);
        }
      });
      if (data.sub_categories && Array.isArray(data.sub_categories)) {
        const subCategoriesString = JSON.stringify(data.sub_categories);
        formData.append('sub_categories', subCategoriesString);
      }

      data?.trainer_attachment?.forEach((item: string) => {
        formData.append(`trainer_attachment`, item);
      });

      await updateTrainerUser(`/trainer/${user?.username}`, formData);
      await getActiveUser();
      navigate('/', {
        state: {
          isFirstTimeLogin: true,
        },
      });
    }
  };

  return (
    <section className="register-section bg-primary2Light bg-[center_bottom] min-h-[calc(100dvh_-_90px)] bg-authbg bg-no-repeat flex justify-center items-center px-4">
      <div className="max-w-[85%] sm:max-w-[510px] w-full">
        <div className="p-10 bg-white rounded-3xl h-[calc(100dvh_-_170px)] overflow-y-auto auth-scroll">
          <h2 className="text-blacktheme text-3xl font-semibold mb-6 2xl:mb-8">
            {t('Auth.RegisterTrainer.trainerProfileSetup')}
          </h2>

          <Formik
            enableReinitialize
            initialValues={registerTrainerInitialValue}
            validationSchema={RegisterTrainerValidationSchema()}
            onSubmit={(values) => OnSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DropZone
                    parentClass="col-span-2"
                    Title={t('Auth.RegisterTrainer.profileImageText')}
                    setValue={setFieldValue}
                    fileType={EnumFileType.Image}
                    acceptTypes="image/*"
                    name="profile_image"
                    value={values.profile_image}
                  />
                  <InputField
                    placeholder={t('Auth.RegisterTrainer.trainerNamePlaceHolder')}
                    type="text"
                    parentClass="col-span-2"
                    isCompulsory
                    value={values.first_name}
                    label={t('Auth.RegisterTrainer.trainerName')}
                    name="first_name"
                  />
                  <InputField
                    placeholder={t('Auth.RegisterTrainer.trainerNamePlaceHolder')}
                    type="text"
                    parentClass="col-span-2"
                    isCompulsory
                    value={values.last_name}
                    label={t('Auth.RegisterTrainer.trainerName')}
                    name="last_name"
                  />
                  <DropZone
                    variant={fileInputEnum.LinkFileInput}
                    fileType={EnumFileType.Document}
                    acceptTypes="application/pdf"
                    parentClass="col-span-2"
                    label={t('Auth.RegisterTrainer.trainerAttachment')}
                    Title={t('Auth.RegisterTrainer.trainerAttachmentPlaceHolder')}
                    setValue={setFieldValue}
                    name="trainer_attachment"
                    value={values.trainer_attachment ?? []}
                    isMulti
                    limit={3}
                  />
                  <div className=" col-span-2">
                    <label className="text-sm text-black leading-4 inline-block mb-2">
                      {t('TrainerRegister.Map')}
                    </label>
                    <Map
                      isCompulsory
                      setFieldValue={setFieldValue}
                      setLatLng={setLatLng}
                      name="location"
                      center={{ lat: -3.745, lng: -38.523 }}
                    />
                  </div>
                  <ReactSelect
                    isCompulsory
                    menuPlacement="top"
                    parentClass="col-span-2"
                    label={t('Auth.RegisterTrainer.trainerCourse')}
                    placeholder={t('Auth.RegisterTrainer.trainerCoursePlaceHolder')}
                    options={categories?.data}
                    isMulti
                    name="sub_categories"
                  />
                  <div className="flex my-4 w-full gap-2 justify-center col-span-2">
                    <Button
                      isLoading={isLoading}
                      disabled={isLoading}
                      variants="primary"
                      className="w-auto min-w-[150px] justify-center"
                      type="submit"
                      value={t('Auth.RegisterCommon.submitButtonText')}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default RegisterTrainer;
