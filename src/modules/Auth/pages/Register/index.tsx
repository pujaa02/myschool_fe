/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ** constant **
import { PUBLIC_NAVIGATION } from '../../../../constants/navigation.constant';

// ** hooks **
import { useAxiosPost } from '../../../../hooks/useAxios';

// ** redux **
// import {
//   getCitiesJson,
//   getCountriesJson,
//   getStateJson,
// } from '../../../../redux-toolkit/slices/countryJsonSlice';
import FormField from 'components/FormField';
import { RegistervalueType } from 'modules/Auth/pages/Register/types';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from 'modules/Auth/validationSchema';
import { Option } from 'components/FormField/types/formField.types';

const Register = () => {
  // const countries = useSelector(getCountriesJson);
  // const states = useSelector(getStateJson);
  // const cities = useSelector(getCitiesJson);
  const navigate = useNavigate();
  const [registerDetail] = useAxiosPost();

  const formMethods = useForm<RegistervalueType>({
    resolver: yupResolver(registerSchema),
  });

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = formMethods;

  const OnSubmit = handleSubmit(async (registerData: RegistervalueType) => {
    const { data, error } = await registerDetail(
      '/auth/register',
      registerData
    );

    if (data && !error) {
      navigate(PUBLIC_NAVIGATION.login);
    }
  });

  return (
    <>
      <div className="w-11/12 max-w-2xl p-6 mx-auto border-4 border-blue-600 rounded-lg bg-white mt-20">
        <h2 className="text-center text-red-600 mb-6">Registration Page</h2>
        <FormProvider {...formMethods}>
          <form onSubmit={OnSubmit} className="space-y-4">
            <div className="mx-[-10px] flex flex-wrap">
              <div className="px-[10px] w-1/2 sm:w-full">
                <FormField<RegistervalueType>
                  required
                  type="text"
                  name="first_name"
                  label="First Name"
                  labelClass="if__label__blue"
                  placeholder="Enter Your First Name"
                  autoComplete="new-password"
                  register={register}
                  fieldLimit={50}
                  error={errors?.first_name}
                />
              </div>
              <div className="px-[10px] w-1/2 sm:w-full">
                <FormField<RegistervalueType>
                  required
                  type="text"
                  name="last_name"
                  label="Last Name"
                  labelClass="if__label__blue"
                  placeholder="Enter Your Last Name"
                  autoComplete="new-password"
                  register={register}
                  fieldLimit={50}
                  error={errors?.last_name}
                />
              </div>
            </div>
            <div className="mx-[-10px] flex flex-wrap">
              <div className="px-[10px] w-1/2 sm:w-full">
                <FormField<RegistervalueType>
                  required
                  type="password"
                  name="password"
                  label="Password"
                  labelClass="if__label__blue"
                  placeholder="Enter Your Password"
                  autoComplete="new-password"
                  icon="securityFilled"
                  register={register}
                  fieldLimit={50}
                  error={errors?.password}
                />
              </div>
              <div className="px-[10px] w-1/2 sm:w-full">
                <FormField<RegistervalueType>
                  required
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  labelClass="if__label__blue"
                  placeholder="Enter Your Confirm Password"
                  autoComplete="new-password"
                  icon="securityFilled"
                  register={register}
                  fieldLimit={50}
                  error={errors?.confirmPassword}
                />
              </div>
            </div>

            <div className="mx-[-10px] flex flex-wrap">
              <div className="w-1/2 px-[10px] sm:w-full">
                <FormField<RegistervalueType>
                  required
                  type="text"
                  name="email"
                  label="Email"
                  autoComplete="off"
                  labelClass="if__label__blue"
                  placeholder="Enter Your Email Address"
                  register={register}
                  fieldLimit={60}
                  error={errors?.email}
                />
              </div>
              <div className="px-[10px] w-1/2 sm:w-full">
                <FormField<RegistervalueType>
                  required
                  type="select"
                  // key={watch('linkedin')}
                  name="user_role"
                  placeholder="Select User Role"
                  label="Role"
                  labelClass="if__label__blue"
                  fieldLimit={1024}
                  autoComplete="off"
                  // defaultValue={getLinkedin_data}
                  options={
                    [
                      { label: 'Teacher', value: 2 },
                      { label: 'Student', value: 3 },
                    ] as Option[]
                  }
                  register={register}
                  control={control}
                  // defaultValue={getLinkedin_data}
                  error={errors?.user_role}
                />
              </div>
            </div>
            <div className="mx-[-10px] flex flex-wrap">
              <div className="w-1/2 px-[10px] sm:w-full">
                <FormField<RegistervalueType>
                  type="date"
                  name="birth_date"
                  showYearDropdown
                  showMonthDropdown
                  label="Date Of Birth"
                  labelClass="if__label__blue"
                  placeholder="MM-DD-YYYY"
                  register={register}
                  control={control}
                  maxDate={new Date()}
                  error={errors.birth_date}
                  isClearable
                />
              </div>
            </div>
            {/* <div className="mx-[-10px] flex flex-wrap">
              <div className="w-1/2 px-[10px] sm:w-full">
                <FormField<RegisterInitialValueType>
                  type="mask_input_country_code"
                  maskInputType="mask_input_phone"
                  name="phone"
                  label="Phone"
                  labelClass="if__label__blue"
                  placeholder="EX. (XXX) XXX-XXXX"
                  register={register}
                  error={errors?.phone}
                  control={control}
                  inputMode="numeric"
                />
              </div>
              <div className="px-[10px] w-1/2 sm:w-full">
                <FormField<RegisterInitialValueType>
                  type="mask_input_country_code"
                  maskInputType="mask_input_phone"
                  name="mobile"
                  label="Mobile No."
                  labelClass="if__label__blue"
                  placeholder="EX. (XXX) XXX-XXXX"
                  register={register}
                  error={errors?.mobile}
                  control={control}
                  inputMode="numeric"
                />
              </div>
            </div> */}
            {/* <div className="mx-[-10px] flex flex-wrap">
              <div className="w-1/2 px-[10px] sm:w-full">
                <FormField<RegisterInitialValueType>
                  id="timezone"
                  label="TimeZone"
                  placeholder="Select TimeZone"
                  key={defaultTimezone?.value}
                  type="asyncSelect"
                  menuPosition="absolute"
                  menuPlacement="auto"
                  name="timezone"
                  labelClass="if__label__blue"
                  control={control}
                  error={errors?.timezone}
                  isLoading={isTimeZoneListLoading}
                  defaultOptions={[defaultTimezone]}
                  getOptions={getTimezoneList}
                />
              </div>
            </div> */}
            <button
              type="submit"
              className="block w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Register
            </button>
            <div className="flex justify-center mt-4">
              <p onClick={() => navigate(`${PUBLIC_NAVIGATION.login}`)}>
                Already Have an Account?{' '}
                {/* <Link to="/auth/login" className="text-blue-500 underline"> */}
                Login
                {/* </Link> */}
              </p>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default Register;
