import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const CourseAcceptSchema = () => {
  const { t } = useTranslation();
  return Yup.object().test(
    'trainer_error',
    'At least one lesson must be selected and no index should be empty.',
    (value) => {
      // if (_.isEmpty(session)) return false;
      const valuesArray = Object.values(value);
      const atLeastOneFilled = valuesArray.some(Boolean);
      if (!atLeastOneFilled) {
        throw new Yup.ValidationError(
          `${t('minimumLesson')}`,
          null,
          'trainer_error'
        );
      }
      return true;
    }
  );
};
