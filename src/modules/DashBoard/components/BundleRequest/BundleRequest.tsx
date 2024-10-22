import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';
import { format } from 'date-fns';
import { useAxiosPut } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useQueryGetFunction } from 'hooks/useQuery';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentPageSelector } from 'redux-toolkit/slices/paginationSlice';
import { useDebounce } from 'utils';
import CourseAcceptModal from '../CourseAccept';

type propTypes = {
  search?: string;
  activeTab?: number;
};
interface BundleProp {
  [key: string]: {
    [key: string]: string;
  };
}
interface TimeProp {
  courses: { [key: string]: string };
  course_bundle: { [key: string]: string };
  course_id: number | null;
}
const CourseStartTime = (item: TimeProp) => {
  return (
    <>
      {item?.course_id
        ? format(new Date(item?.courses?.start_date), 'hh/MM/yyyy')
        : format(new Date(item?.course_bundle?.start_date), 'hh/MM/yyyy')}
    </>
  );
};
const CourseEndTime = (item: TimeProp) => {
  return (
    <>
      {item?.course_id
        ? format(new Date(item?.courses?.end_date), 'hh/MM/yyyy')
        : format(new Date(item?.course_bundle?.end_date), 'hh/MM/yyyy')}
    </>
  );
};
const BundleRequest = ({ search, activeTab }: propTypes) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentPage } = useSelector(currentPageSelector);
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>('-updated_at');
  const [bundleSlug, setBundleSlug] = useState<string>('');
  const searchString = typeof search === 'string' ? search : '';
  const rejectModal = useModal();
  const acceptModal = useModal();

  const [rejectCourse] = useAxiosPut();

  const [rejectPayload, setRejectPayload] = useState({
    course_slug: '',
    course_bundle_id: 0,
  });

  const debouncedSearch = useDebounce(searchString, 500);

  const { response, isLoading, refetch } = useQueryGetFunction(
    '/trainer/bundle/invites',
    {
      page: currentPage,
      search: debouncedSearch,
      limit,
      sort,
      option: {
        profile: true,
      },
    }
  );

  const columnData = [
    {
      header: t('UserManagement.columnHeader.no'),
      name: 'no',
      option: {
        sort: false,
        hasFilter: false,
        isIndex: true,
      },
    },
    {
      header: t('Calendar.createEvent.topic'),
      cell: (props: BundleProp) => templateRender(props),
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      name: '',
      header: t('ClientManagement.courseListing.startDate'),
      cell: (props: TimeProp) => CourseStartTime(props),
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      name: '',
      header: t('ClientManagement.courseListing.endDate'),
      cell: (props: TimeProp) => CourseEndTime(props),
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      header: t('EmailTemplate.emailTempTableActions'),
      name: 'action',
      className: 'w-40',
      cell: (props: BundleProp) => viewRender(props),
    },
    {
      header: t('Dashboard.Trainer.CourseInvitation.invite'),
      className: 'w-40',
      cell: (props: BundleProp) => actionRender(props),
    },
  ];
  const templateRender = (item: BundleProp) => {
    return (
      <div className="flex">
        <div className="max-w-[220px] ps-2">
          <p className="text-base text-dark leading-[1.3] mb-1">
            {item?.course_id ? item?.courses?.title : item?.course_bundle?.title}
          </p>
        </div>
      </div>
    );
  };
  const actionRender = (item: any) => {
    return (
      <div className="flex gap-2 items-center justify-center">
        <Button
          onClickHandler={() => {
            setRejectPayload({
              course_slug: item?.course_id ? item?.courses?.slug : null,
              course_bundle_id: item?.course_bundle_id,
            });
            setBundleSlug(item?.course_bundle?.slug);
            acceptModal.openModal();
          }}
          parentClass="h-fit"
          className="w-7 h-7 inline-block bg-green2/10 text-green2 p-1 rounded-md transition-all duration-300 active:scale-90 cursor-pointer select-none"
        >
          <Image
            iconName="checkIcon"
            iconClassName="stroke-current w-full h-full"
            width={24}
            height={24}
          />
        </Button>
        <Button
          onClickHandler={() => {
            setRejectPayload({
              course_slug: item?.course_id ? item?.courses?.slug : null,
              course_bundle_id: item?.course_bundle_id,
            });
            rejectModal.openModal();
          }}
          parentClass="h-fit"
          className="w-7 h-7 inline-block bg-danger/10 text-danger p-1 rounded-md transition-all duration-300 active:scale-90 cursor-pointer select-none"
        >
          <Image
            iconName="crossIcon"
            iconClassName="stroke-current w-full h-full"
            width={24}
            height={24}
          />
        </Button>
      </div>
    );
  };
  const viewRender = (item: any) => {
    return (
      <div className="flex gap-2 items-center justify-center">
        <Button
          onClickHandler={() =>
            navigate(
              `/trainer/course-bundle/view?slug=${item?.course_bundle?.slug}`,
              {
                state: {
                  fromTrainerBundleRequest: true,
                  activeTab,
                },
              }
            )
          }
          parentClass="h-fit"
          className="action-button green-btn"
          tooltipText={t('Tooltip.View')}
        >
          <Image
            iconName="eyeIcon"
            iconClassName="stroke-current w-5 h-5"
            width={24}
            height={24}
          />
        </Button>
      </div>
    );
  };

  const onReject = async () => {
    const { error } = await rejectCourse(
      '/trainer/bundle/invites/reject',
      rejectPayload
    );
    if (!error) {
      rejectModal.closeModal();
      setRejectPayload({
        course_slug: '',
        course_bundle_id: 0,
      });
      refetch();
    }
  };
  return (
    <>
      <Table
        headerData={columnData as ITableHeaderProps[]}
        bodyData={response?.data?.data}
        loader={isLoading}
        pagination
        dataPerPage={limit}
        setLimit={setLimit}
        totalPage={response?.data?.lastPage}
        dataCount={response?.data?.count}
        setSort={setSort}
        sort={sort}
      />
      {rejectModal.isOpen && (
        <ConfirmationPopup
          modal={rejectModal}
          bodyText={t('rejectCourse.body')}
          variants="primary"
          confirmButtonText={t('rejectCourse.reject')}
          deleteTitle={t('rejectCourse.title')}
          confirmButtonFunction={onReject}
          confirmButtonVariant="primary"
          cancelButtonText={t('Button.cancelButton')}
          cancelButtonFunction={() => {
            rejectModal.closeModal();
          }}
        />
      )}
      {acceptModal.isOpen && (
        <CourseAcceptModal
          modal={acceptModal}
          refetchTrainers={refetch}
          bundleSlug={bundleSlug}
          bundleId={rejectPayload.course_bundle_id}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default BundleRequest;
