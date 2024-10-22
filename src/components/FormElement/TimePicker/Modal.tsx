import { IconTypes } from 'components/Icon/types';
import { Modal } from 'components/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { ModalProps, SetFieldValue } from 'types/common';
import ReactTimePicker from '.';

interface ReactTimePickerProps {
  modal: ModalProps;
  name: string;
  label?: string;
  placeHolder?: string;
  labelClass?: string;
  parentClass?: string;
  selectedTime?: Date;
  minTime?: Date;
  maxTime?: Date;
  isCompulsory?: boolean;
  setFieldValue?: SetFieldValue;
  iconName?: IconTypes;
}

const TimePickerModal = ({ modal, ...props }: ReactTimePickerProps) => {
  const { t } = useTranslation();
  return (
    <Modal
      modal={modal}
      headerTitle={t('TimePicker.SelectTime')}
      width="!max-w-[400px] "
    >
      <ReactTimePicker {...props} />
    </Modal>
  );
};

export default TimePickerModal;
