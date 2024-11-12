// ** external packages **
import 'react-datepicker/dist/react-datepicker.css';

// ** components **
import CustomCreatableSelect from './components/CreatableSelectFormField';
import { CustomAsyncSelect } from './components/CustomAsyncSelectFormField';
import CustomSelect from './components/CustomSelectFormField';
// import DateAndTimeFormField from './components/DateAndTimeFormField';
import DateFormField from './components/DateFormField';
import TimeFormField from './components/TimeFormField';
import TextAreaFormField from './components/TextAreaFormField';
import ColorPickerFormField from './components/ColorPickerFormField';
import PassportFormField from './components/PassportFormField';
import CheckBoxFormField from './components/CheckBoxFormField';
import RadioFormField from './components/RadioFormField';
import DefaultFormField from './components/DefaultFormField';
import CurrencyFormatFormField from './components/CurrencyFormatFormField';
import ActivityTopicField from './components/ActivityTopicField';

// ** types **
import {
  FieldType,
  FormFieldProps,
} from 'components/FormField/types/formField.types';
import PhoneNumberWithCountryCode from './components/PhoneNumberWithCountryCode';

const FormField = <TFormValues extends Record<string, unknown>>(
  fieldProps: FormFieldProps<TFormValues>
) => {
  const {
    type = 'text',
    getOptions = undefined,
    isLoading,
    wrapperClass,
    defaultSelectValue,
    getOnChange,
    tabIndex,
  } = fieldProps;

  const updatedFormField = {
    autoComplete: 'off',
    ...fieldProps,
  };

  const renderField = (field: FieldType) => {
    switch (field) {
      case 'date':
        return <DateFormField {...updatedFormField} />;
      // case 'dateAndTime':
      //   return <DateAndTimeFormField {...updatedFormField} />;
      case 'time':
        return <TimeFormField {...updatedFormField} />;
      case 'select':
        return <CustomSelect {...updatedFormField} />;
      case 'asyncSelect':
        return (
          <CustomAsyncSelect
            {...updatedFormField}
            getOptions={getOptions}
            getOnChange={getOnChange}
            defaultSelectValue={defaultSelectValue}
            isLoading={isLoading}
            tabIndex={tabIndex}
          />
        );
      case 'creatableSelect':
        return <CustomCreatableSelect {...updatedFormField} />;
      case 'textarea':
        return <TextAreaFormField {...updatedFormField} />;
      case 'color':
        return <ColorPickerFormField {...updatedFormField} />;
      case 'password':
        return <PassportFormField {...updatedFormField} />;
      case 'radio':
        return <RadioFormField {...updatedFormField} />;
      case 'checkbox':
        return <CheckBoxFormField {...updatedFormField} />;
      case 'currency_format':
        return <CurrencyFormatFormField {...updatedFormField} />;
      case 'activity_topic':
        return <ActivityTopicField {...updatedFormField} />;
      case 'mask_input_country_code':
        return <PhoneNumberWithCountryCode {...updatedFormField} />;
      default:
        return <DefaultFormField {...updatedFormField} />;
    }
  };

  return (
    <div className={`form__Group ${wrapperClass}`}>{renderField(type)}</div>
  );
};

export default FormField;
