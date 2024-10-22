import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import ErrorMessage from 'components/FormElement/ErrorMessage';
import Image from 'components/Image';
import { Modal } from 'components/Modal/Modal';
import { format } from 'date-fns';
import { Form, Formik, FormikValues } from 'formik';
import { UserModalType } from 'hooks/types';
import { useAxiosPut } from 'hooks/useAxios';
import { useQueryGetFunction } from 'hooks/useQuery';
import { TFunction } from 'i18next';
import _ from 'lodash';
import { CourseResponse } from 'modules/Courses/types';
import { ICourseAccept, LessonSessionApproval } from 'modules/EmailTemplate/types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SetFieldValue } from 'types/common';
import { CourseAcceptSchema } from './validation';

type modalProps = {
  modal: UserModalType;
  refetchTrainers: () => void;
  bundleSlug?: string;
  bundleId?: number;
  refetch?: () => void;
};
const CourseAcceptModal = ({
  modal,
  refetchTrainers,
  bundleSlug,
  bundleId,
  refetch,
}: modalProps) => {
  const { t } = useTranslation();
  const data = modal?.modalData as CourseResponse;
  const [course, setCourse] = useState<ICourseAccept>();
  const [updateCourseApi] = useAxiosPut();
  const [acceptCourse] = useAxiosPut();

  const initialValue = !_.isEmpty(course?.lessonSessionApproval)
    ? (course?.lessonSessionApproval ?? []).reduce((acc, item, index) => {
        acc[index] = item?.lessonSessions?.slug ? item.lessonSessions.slug : '';
        return acc;
      }, {} as Record<number | string, string>)
    : (course?.sessions ?? []).reduce((acc, item, index) => {
        acc[index] = item?.slug ? item.slug : '';
        return acc;
      }, {} as Record<number | string, string>);
  initialValue.trainer_error = '';

  const apiUrl = !bundleSlug
    ? '/trainer/courses/invites'
    : '/trainer/courses/bundle/invites';
  const { response, isLoading } = useQueryGetFunction(apiUrl, {
    option: {
      profile: true,
      ...(data?.slug ? { course_slug: data?.slug } : {}),
      ...(bundleSlug ? { course_bundle_slug: bundleSlug } : {}),
      ...(bundleSlug ? { course_bundle_id: bundleId } : {}),
    },
  });
  useEffect(() => {
    if (response?.data) {
      setCourse(response?.data);
    }
  }, [response?.data]);

  const handleChange = (
    checkData: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: SetFieldValue,
    index: number
  ) => {
    if (checkData.target.checked) {
      setFieldValue(
        String(index),
        !_.isEmpty(course?.lessonSessionApproval)
          ? course?.lessonSessionApproval?.[index]?.lessonSessions?.slug
          : course?.sessions?.[index]?.slug
      );
    } else {
      setFieldValue(String(index), '');
    }
  };

  const OnSubmit = async (value: FormikValues) => {
    delete value.trainer_error;
    const selectedSessions = Object.values(value).filter((value) => value !== '');
    const temp: { [key: string]: unknown } = {
      course_slug: data?.slug,
      accept_entire_course: !(course && course?.sessions?.length > 0),
      lesson_session_slugs: selectedSessions,
    };
    if (course?.course_bundle_id) {
      temp.course_bundle_id = course?.course_bundle_id;
    }
    const { error } = await updateCourseApi('/trainer/courses/invites/accept', temp);
    if (!error) {
      modal?.closeModal();
      refetchTrainers();
    }
  };

  const onAccept = async () => {
    const temp = {
      course_bundle_id: bundleId,
      accept_entire_bundle: true,
    };
    const { error } = await acceptCourse('/trainer/bundle/invites/accept', temp);
    if (!error) {
      modal?.closeModal();
      refetch?.();
    }
  };
  const renderDates = (
    startDate: string | number | Date | undefined,
    endDate: string | number | Date | undefined
  ) => (
    <p className="text-xs font-medium leading-4 text-dark/50 flex items-center whitespace-nowrap">
      <Image
        iconName="calendarCheckIcon"
        iconClassName="w-[18px] h-[18px] inline-block me-1.5"
      />
      {startDate ? format(new Date(startDate), 'MM/dd/yyyy') : ''} -{' '}
      {endDate ? format(new Date(endDate), 'MM/dd/yyyy') : ''}
    </p>
  );

  const renderSessionTime = (
    startTime: string | number | Date,
    endTime: string | number | Date
  ) => (
    <p className="text-xs font-medium leading-4 text-dark/50 flex items-center whitespace-nowrap gap-3">
      <Image
        iconName="calendarCheckIcon"
        iconClassName="w-[18px] h-[18px] inline-block me-1.5"
      />
      <span>{startTime ? format(new Date(startTime), 'MM-dd-yyyy') : ''}</span>
      <span>
        <Image
          iconName="clockIcon"
          iconClassName="w-[18px] h-[18px] inline-block me-1.5"
        />
        {startTime ? format(new Date(startTime), 'hh:mm a') : ''} -{' '}
        {endTime ? format(new Date(endTime), 'hh:mm a') : ''}
      </span>
    </p>
  );

  const renderHourlyRateDetails = (item: LessonSessionApproval) => (
    <div className="w-fit">
      <p className="text-sm text-primary font-medium mb-2 block">
        {t('UserManagement.addEditUser.hourlyRate')} :
      </p>
      <div className="flex gap-7">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-dark font-medium">{t('trainer.hours')}</p>
          <span className="text-xs text-dark font-bold">{item?.hours}</span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-dark font-medium">
            {t('CoursesManagement.CreateCourse.price')}
          </p>
          <span className="text-xs text-dark font-bold">
            €{item?.trainerHourlyCharge}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-dark font-medium">{t('totalPrice')}</p>
          <span className="text-xs text-dark font-bold">{item?.hourlyRate}</span>
        </div>
      </div>
    </div>
  );

  const renderReimbursementFees = (item: LessonSessionApproval) => (
    <div className="w-fit">
      <p className="text-sm text-primary font-medium mb-2 block">
        {t('reimbursementFees')} :
      </p>
      <div className="flex gap-7">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-dark font-medium">{t('Payment.days')}</p>
          <span className="text-xs text-dark font-bold">{item?.totalDays}</span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-dark font-medium">KM</p>
          <span className="text-xs text-dark font-bold">{item?.totalDistance}</span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-dark font-medium">
            {t('CoursesManagement.CreateCourse.price')}
          </p>
          <span className="text-xs text-dark font-bold">
            €{item?.travelFees ?? 0}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-dark font-medium">{t('trainer.totalFees')}</p>
          <span className="text-xs text-dark font-bold">
            €{item?.totalTravelFees}
          </span>
        </div>
      </div>
    </div>
  );

  const renderNetTotal = (netTotal: number | string) => (
    <div className="w-fit ml-auto">
      <p className="text-sm text-primary font-medium mb-2 block">
        {t('netTotal')} :
      </p>
      <div className="flex gap-7">
        <div className="flex flex-col gap-1">
          <span className="text-xl text-dark font-bold">€{netTotal}</span>
        </div>
      </div>
    </div>
  );

  const renderLumpsumDetails = (item: LessonSessionApproval) => (
    <div className="flex flex-wrap gap-10">
      <div className="w-fit">
        <p className="text-sm text-primary font-medium mb-2 block">
          {t('lumpsumpDetails')}
        </p>
        <div className="flex gap-7">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-dark font-medium">{t('amount')}</p>
            <span className="text-xs text-dark font-bold">€{item?.amount ?? 0}</span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-dark font-medium">{t('reimbursementFees')}</p>
            <span className="text-xs text-dark font-bold">
              €{item?.reimbursement_amount ?? 0}
            </span>
          </div>
        </div>
      </div>
      {renderNetTotal(
        item?.amount && item?.reimbursement_amount
          ? (item.amount + item.reimbursement_amount).toFixed(2)
          : '0.00'
      )}
    </div>
  );

  const renderDefaultDetails = (item: LessonSessionApproval) => (
    <div className="flex flex-wrap gap-10">
      {renderHourlyRateDetails(item)}
      {renderReimbursementFees(item)}
      {renderNetTotal(item?.totalNetFees)}
    </div>
  );

  const renderDetails = (item: LessonSessionApproval) => {
    if (item?.is_lumpsum_select) {
      if (item?.lesson_session_id === null) {
        return renderLumpsumDetails(item);
      }
      return renderDefaultDetails(item);
    }
    return renderDefaultDetails(item);
  };

  const renderNotes = () => {
    return (
      <div>
        <p className="my-2 font-medium">{t('SendMail.Notes')}</p>

        <div className="flex gap-1 items-center">
          <Image iconName="checkRoundIcon2" iconClassName="w-4 h-4 text-grayText" />
          <p className="text-dark">{t('trainerNote1')}</p>
        </div>
        <div className="flex gap-1 items-center">
          <Image iconName="checkRoundIcon2" iconClassName="w-4 h-4 text-grayText" />

          <p className="text-dark">{t('trainerNote2')}</p>
        </div>
      </div>
    );
  };

  const getCourseAcceptanceText = (
    sessionApproval: LessonSessionApproval | undefined,
    t: TFunction<'translation', undefined>
  ) => {
    if (sessionApproval?.is_full_course) {
      return sessionApproval?.is_optional
        ? 'Accept entire course as Optional Trainer'
        : t('courseAccept.fullCourse');
    }
    return t('courseAccept.extraTrainer');
  };

  const amount = response?.data?.data?.[0]?.amount ?? 0;
  const reimbursementAmount = response?.data?.data?.[0]?.reimbursement_amount ?? 0;
  const total = (amount + reimbursementAmount).toFixed(2);
  const sessionApproval = course?.lessonSessionApproval?.[0];

  return (
    <Modal modal={modal} headerTitle={t('AcceptCourse')}>
      <>
        {!bundleSlug && (
          <Formik
            enableReinitialize
            initialValues={initialValue}
            validationSchema={CourseAcceptSchema()}
            onSubmit={(data) => OnSubmit(data)}
          >
            {({ values, setFieldValue }) => (
              <Form className="flex flex-col gap-4">
                {isLoading ? (
                  <>
                    <div className="lazy h-6 w-[270px]" />
                    <div className="lazy p-4 h-12 w-full" />
                    <div className="lazy h-[150px] w-full ps-4 pe-10" />
                    <div className="lazy h-[150px] w-full ps-4 pe-10" />
                    <div>
                      <p className="lazy h-5 w-[250px] my-2" />
                      <p className="lazy h-5 w-[300px] my-2" />
                      <p className="lazy h-5 w-2/3 my-2" />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-navText text-sm">
                      {getCourseAcceptanceText(sessionApproval, t)}
                    </p>
                    {course?.lessonSessionApproval?.[0]?.trainerRequest?.note ? (
                      <div className="p-4 rounded-lg border border-dashed border-primary text-[14px]">
                        <p>
                          <strong className="text-primary">
                            {t('Quote.note.title')}:{' '}
                          </strong>
                          {course?.lessonSessionApproval?.[0]?.trainerRequest?.note}
                        </p>
                      </div>
                    ) : (
                      ''
                    )}

                    {(course?.lessonSessionApproval ?? []).map((item, index) => {
                      return (
                        <div
                          key={`Session_${index + 1}`}
                          className="bg-primaryLight ps-4 rounded-xl pe-10"
                        >
                          <div className="flex items-center py-4">
                            <div className="w-[78px] h-[58px] rounded-xl">
                              {item?.lesson_session_id === null ? (
                                <Image
                                  src={`${process.env.REACT_APP_API_BASE_URL}/${course?.image}`}
                                  width={100}
                                  height={100}
                                  imgClassName="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <div className="icons text-lg font-bold w-14 h-14 rounded-full flex items-center justify-center bg-secondary/30">
                                  <Image iconName="bookOpenIcon" />
                                </div>
                              )}
                            </div>
                            <div className="w-full max-w-[calc(100%_-_100px)] ps-4">
                              <div className="flex flex-col gap-1 w-full">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm text-blacktheme font-semibold line-clamp-1">
                                    {item?.lesson_session_id === null
                                      ? course?.title
                                      : `${t('Calendar.eventDetails.sessionTitle')}`}
                                  </p>
                                  {item?.lesson_session_id !== null && (
                                    <>
                                      <span className="w-1 h-1 bg-secondary rounded-full" />
                                      <p className="text-sm text-blacktheme font-normal line-clamp-1">
                                        {item?.lessons?.title}
                                      </p>
                                    </>
                                  )}
                                </div>
                                {item?.lesson_session_id === null
                                  ? renderDates(course?.start_date, course?.end_date)
                                  : renderSessionTime(
                                      item?.lessonSessions?.start_time,
                                      item?.lessonSessions?.end_time
                                    )}
                              </div>
                            </div>
                            {item?.lesson_session_id ? (
                              <Checkbox
                                check={!!(!item?.lesson_session_id || values[index])}
                                name={`${index}`}
                                onChange={(checkData) => {
                                  if (values) {
                                    handleChange(checkData, setFieldValue, index);
                                  }
                                }}
                                parentClass="ms-auto"
                                disabled={
                                  !item?.lesson_session_id || item?.is_optional
                                }
                              />
                            ) : (
                              ''
                            )}
                          </div>
                          <div className="border-t border-solid border-dark/20 pt-5 pb-4">
                            {renderDetails(item)}
                          </div>
                        </div>
                      );
                    })}
                    {course && (course?.sessions ?? []).length > 0 && (
                      <div className="flex flex-col gap-2">
                        {course?.sessions?.map((item, index) => {
                          return (
                            <>
                              <div
                                key={`SessionValue_${index + 1}`}
                                className="bg-primaryLight ps-4 pe-10 py-4 rounded-xl flex items-center"
                              >
                                <div className="icons text-lg font-bold w-14 h-14 rounded-full text-black flex items-center justify-center bg-secondary/30">
                                  {`S${index + 1}`}
                                </div>

                                <div className="w-full max-w-[calc(100%_-_90px)] ps-4">
                                  <h3 className="text-sm text-blacktheme font-bold mb-2">
                                    <Button className="text-current">
                                      {t('Calendar.eventDetails.sessionTitle')}
                                      &nbsp;{index + 1}
                                    </Button>
                                    <Button className="text-current text-secondary text-[80%] inline-block mx-2.5">
                                      &bull;
                                    </Button>
                                    <Button className="text-current font-medium">
                                      {item?.lessonTitle}
                                    </Button>
                                  </h3>
                                  <p className="text-xs font-medium leading-4 text-dark/50 flex items-center whitespace-nowrap">
                                    <Image
                                      iconName="calendarIcon2"
                                      iconClassName="  w-[18px] h-[18px] inline-block me-1.5"
                                    />
                                    {(item as unknown as CourseResponse)
                                      ? format(
                                          new Date(item?.start_time),
                                          'MM-dd-yyyy hh:mm a'
                                        )
                                      : ''}
                                    &nbsp;-&nbsp;
                                    {(item as unknown as CourseResponse)
                                      ? format(
                                          new Date(item?.end_time),
                                          'MM-dd-yyyy hh:mm a'
                                        )
                                      : ''}
                                  </p>
                                </div>

                                <Checkbox
                                  check={!!values[index]}
                                  name={`${index}`}
                                  onChange={(checkData) => {
                                    if (values) {
                                      handleChange(checkData, setFieldValue, index);
                                    }
                                  }}
                                  parentClass="ms-auto"
                                />
                              </div>
                              <div className="border-t border-solid border-dark/20 pt-5 pb-4">
                                {course?.course_bundle_id
                                  ? renderDetails(item.lessonSessionApproval[0])
                                  : ''}
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}

                    <ErrorMessage name="trainer_error" />

                    {!bundleSlug && renderNotes()}
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variants="whiteBordered"
                        className="min-w-[140px]"
                        onClickHandler={() => {
                          modal?.closeModal();
                        }}
                      >
                        {t('Button.cancelButton')}
                      </Button>
                      <Button
                        type="submit"
                        variants="primary"
                        className="min-w-[140px]"
                      >
                        {t('Button.submit')}
                      </Button>
                    </div>
                  </>
                )}
              </Form>
            )}
          </Formik>
        )}
        {bundleSlug && (
          <>
            <div className="bg-primaryLight ps-4 rounded-xl pe-10">
              <div className="flex items-center py-4">
                <div className="w-[78px] h-[58px] rounded-xl">
                  <Image
                    src={`${process.env.REACT_APP_API_BASE_URL}/${course?.image}`}
                    width={100}
                    height={100}
                    imgClassName="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="w-full max-w-[calc(100%_-_100px)] ps-4">
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-blacktheme font-semibold line-clamp-1">
                        {response?.data?.data?.[0]?.course_bundle?.title}
                      </p>
                    </div>
                    {renderDates(
                      response?.data?.data?.[0]?.course_bundle?.start_date,
                      response?.data?.data?.[0]?.course_bundle?.end_date
                    )}
                  </div>
                </div>
              </div>
              {response?.data?.data?.[0]?.amount > 0 ? (
                <div className="border-t border-solid border-dark/20 pt-5 pb-4">
                  <div className="flex flex-wrap gap-10">
                    <div className="w-fit">
                      <p className="text-sm text-primary font-medium mb-2 block">
                        {t('lumpsumpDetails')}
                      </p>
                      <div className="flex gap-7">
                        <div className="flex flex-col gap-1">
                          <p className="text-xs text-dark font-medium">
                            {t('amount')}
                          </p>
                          <span className="text-xs text-dark font-bold">
                            €{response?.data?.data?.[0]?.amount ?? 0}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-xs text-dark font-medium">
                            {t('reimbursementFees')}
                          </p>
                          <span className="text-xs text-dark font-bold">
                            €{response?.data?.data?.[0]?.reimbursement_amount ?? 0}
                          </span>
                        </div>
                      </div>
                    </div>
                    {renderNetTotal(total)}
                  </div>
                </div>
              ) : (
                <div className="border-t border-solid border-dark/20 pt-5 pb-4">
                  {renderDetails(response?.data?.data?.[0])}
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-2 mt-4">
              <Button
                variants="whiteBordered"
                className="min-w-[140px]"
                onClickHandler={() => {
                  modal?.closeModal();
                }}
              >
                {t('Button.cancelButton')}
              </Button>
              <Button
                onClickHandler={onAccept}
                variants="primary"
                className="min-w-[140px]"
              >
                {t('Button.submit')}
              </Button>
            </div>
          </>
        )}
      </>
    </Modal>
  );
};

export default CourseAcceptModal;
