import Button from 'components/Button/Button';
import Image from 'components/Image';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ErrorMessage from '../ErrorMessage';
import '../style/inputField.css';

interface DatePickerProps {
  label?: string;
  className?: string;
  parentClass?: string;
  labelClass?: string;
  isCompulsory?: boolean;
  range?: boolean;
  icon?: React.ReactNode;
  selectedDate?: Date | null;
  endingDate?: Date | null;
  onChange?: (date: Date) => void;
  onRangeChange?: (startDate: Date, endDate: Date) => void;
  isTimePicker?: boolean;
  showTimeSelectOnly?: boolean;
  dateFormat?: string;
  name?: string;
  startDateName?: string;
  endDateName?: string;
  minTime?: Date;
  maxTime?: Date;
  startDateMinTime?: Date;
  startDateMaxTime?: Date;
  endDateMinTime?: Date;
  endDateMaxTime?: Date;
  placeholder?: string;
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
  isLoading?: boolean;
  type?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  timeInterval?: number;
  isClearable?: boolean;
}

const DatePicker = ({
  label,
  className,
  parentClass,
  isCompulsory,
  labelClass,
  icon,
  selectedDate,
  endingDate,
  onChange,
  range,
  onRangeChange,
  isTimePicker,
  showTimeSelectOnly,
  dateFormat,
  name = '',
  startDateName = '',
  endDateName = '',
  placeholder,
  startDatePlaceholder,
  endDatePlaceholder,
  isLoading = false,
  type,
  minDate,
  disabled,
  minTime,
  maxTime,
  startDateMaxTime,
  startDateMinTime,
  endDateMaxTime,
  endDateMinTime,
  maxDate,
  timeInterval,
  isClearable = false,
}: DatePickerProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const formik = useFormikContext();

  useEffect(() => {
    if (!selectedDate) setStartDate(undefined);
    else setStartDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (!endingDate) setEndDate(undefined);
    else setEndDate(endingDate);
  }, [endingDate]);

  return (
    <div
      className={`relative calendarClassName [&>.react-datepicker-wrapper]:w-full ${parentClass}`}
    >
      {isLoading ? (
        <div className="lazy h-[50px]" />
      ) : (
        <>
          {label && (
            <label
              className={`text-sm text-black leading-4 inline-block mb-2 ${
                labelClass ?? ''
              }`}
            >
              {label}
              {isCompulsory && <span className="text-red-700">*</span>}
            </label>
          )}
          {range ? (
            <div className="border border-solid pe-3 border-borderColor bg-white rounded-10px flex items-center [&:has(.inputField:focus)]:ring-2 [&:has(.inputField:focus)]:ring-dark/20 [&:has(.inputField:focus)]:ring-offset-2 transition-all duration-300">
              <ReactDatePicker
                autoComplete="off"
                wrapperClassName="flex-[1_0_0%]"
                className={`inputField !border-none !ring-0 !ring-offset-0 !ring-transparent ${
                  className ?? ''
                }`}
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date as Date);
                  if (range) {
                    if (onRangeChange) {
                      onRangeChange(date as Date, endDate as Date);
                    }
                  } else if (onChange) {
                    onChange(date as Date);
                  }
                }}
                showTimeSelect={isTimePicker}
                showTimeSelectOnly={showTimeSelectOnly}
                placeholderText={startDatePlaceholder}
                timeIntervals={15}
                dateFormat={dateFormat}
                disabled={disabled}
                minTime={
                  startDateMinTime && startDateMaxTime ? startDateMinTime : undefined
                }
                maxTime={
                  startDateMinTime && startDateMaxTime ? startDateMaxTime : undefined
                }
                maxDate={maxDate}
                isClearable={isClearable}
              />
              <Button className="w-6 h-6 inline-block p-1 text-grayText">
                <Image iconName="arrowRight" iconClassName="w-full h-full" />
              </Button>

              <ReactDatePicker
                wrapperClassName="flex-[1_0_0%]"
                className={`inputField !border-none !ring-0 !ring-offset-0 !ring-transparent ${
                  className ?? ''
                }`}
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date as Date);
                  if (range) {
                    if (onRangeChange) {
                      onRangeChange(startDate as Date, date as Date);
                    }
                  } else if (onChange) {
                    onChange(date as Date);
                  }
                }}
                showTimeSelect={isTimePicker}
                showTimeSelectOnly={showTimeSelectOnly}
                placeholderText={endDatePlaceholder}
                timeIntervals={15}
                dateFormat={dateFormat}
                disabled={disabled}
                minTime={
                  endDateMinTime && endDateMaxTime ? endDateMinTime : undefined
                }
                maxTime={
                  endDateMinTime && endDateMaxTime ? endDateMaxTime : undefined
                }
                minDate={minDate}
                isClearable={isClearable}
              />
              <Button className="w-6 h-6 inline-block p-0.5 text-grayText">
                <Image
                  iconName={type === 'date' ? 'calendarIcon' : 'clockIcon'}
                  iconClassName="w-full h-full"
                />
              </Button>
            </div>
          ) : (
            <>
              <ReactDatePicker
                name={name}
                autoComplete="off"
                className={`inputField ${icon && '!pe-10'} ${className ?? ''}`}
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date as Date);
                  if (onChange) onChange(date as Date);
                }}
                showTimeSelect={isTimePicker}
                showTimeSelectOnly={showTimeSelectOnly}
                timeIntervals={timeInterval ?? 15}
                dateFormat={dateFormat}
                placeholderText={placeholder}
                minDate={minDate}
                maxDate={maxDate}
                disabled={disabled}
                minTime={minTime && maxTime ? minTime : undefined}
                maxTime={minTime && maxTime ? maxTime : undefined}
                isClearable={isClearable}
              />
              <div
                className={`input-icon absolute right-4 text-black/50 ${
                  label ? 'top-[42px]' : 'top-4'
                }`}
              >
                {icon && <Image iconName="calendarIcon2" iconClassName="w-5 h-5" />}
              </div>
            </>
          )}
        </>
      )}
      {formik && name && <ErrorMessage name={name} />}
      {formik && startDateName && <ErrorMessage name={startDateName} />}
      {formik && endDateName && <ErrorMessage name={endDateName} />}
    </div>
  );
};

export default DatePicker;
