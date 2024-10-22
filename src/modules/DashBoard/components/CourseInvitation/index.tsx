import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import Table from 'components/Table/Table';
import { CellProps, ITableHeaderProps } from 'components/Table/types';
import { REACT_APP_API_BASE_URL } from 'config';
import { useAxiosPut } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useQueryGetFunction } from 'hooks/useQuery';
import { COURSE_TYPE } from 'modules/Courses/Constants';
import { CourseResponse } from 'modules/Courses/types';
import 'modules/DashBoard/components/style/dashboard.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentPageSelector } from 'redux-toolkit/slices/paginationSlice';
import { useDebounce } from 'utils';

const CourseAcceptModal = React.lazy(
  () => import('modules/DashBoard/components/CourseAccept/index')
);

const templateRender = (item: CellProps) => {
  return (
    <div className="flex items-center">
      <div className="w-[100px] h-[70px]">
        <Image
          src={`${REACT_APP_API_BASE_URL}/${item.image}`}
          width={100}
          height={100}
          imgClassName="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="max-w-[220px] ps-2">
        <p className="text-base text-dark leading-[1.3] mb-1">{item.title}</p>
        {item?.course_bundle_id && (
          <p className="text-base text-primary leading-[1.3] mb-1">Bundle Course</p>
        )}
      </div>
    </div>
  );
};
const CourseTypeCell = (props: CellProps): string =>
  getCourseType((props as unknown as CourseResponse)?.type);
const getCourseType = (courseType: string): string => {
  switch (courseType) {
    case COURSE_TYPE.Academy:
      return COURSE_TYPE.academy;
    case COURSE_TYPE.Private:
      return COURSE_TYPE.private;
    default:
      return '';
  }
};
type inviteProp = {
  search?: string;
  dashboard?: boolean;
};
const CourseInvitation = ({ search, dashboard = false }: inviteProp) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentPage } = useSelector(currentPageSelector);

  const searchString = typeof search === 'string' ? search : '';
  const debouncedSearch = useDebounce(searchString, 500);
  const rejectModal = useModal();
  const acceptModal = useModal();
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>('-updated_at');
  const [rejectCourse] = useAxiosPut();
  const [slug, setSlug] = useState<{
    course_slug: string;
    course_bundle_id: number | null;
  }>({
    course_slug: '',
    course_bundle_id: 0,
  });

  const { response, isLoading, refetch } = useQueryGetFunction(
    '/trainer/courses/invites',
    {
      page: currentPage,
      limit,
      sort,
      search: debouncedSearch,
      option: {
        profile: true,
        ...(dashboard && { view: true }),
      },
    }
  );

  const columnData: ITableHeaderProps[] = [
    {
      header: t('CoursesManagement.columnHeader.No'),
      name: 'no',
      className: '',
      option: {
        sort: false,
        hasFilter: false,
        isIndex: true,
      },
    },
    {
      header: t('Dashboard.Trainer.CourseInvitation.invite'),
      className: 'w-40',
      cell: (props: CellProps) => actionRender(props),
    },
    {
      header: t('UserManagement.courseTab.Title'),
      cell: (props) => templateRender(props),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      header: t('CoursesManagement.columnHeader.Category'),
      name: 'course.courseCategory.name',
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      header: t('CoursesManagement.columnHeader.Type'),
      cell: (props) => CourseTypeCell(props),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      header: t('Calendar.eventDetails.creatorTitle'),
      name: 'createdByUser.first_name',
      option: {
        sort: false,
        hasFilter: false,
      },
    },

    {
      header: t('EmailTemplate.emailTempTableActions'),
      name: 'action',
      className: 'w-40',
      cell: (props: CellProps) => viewRender(props),
    },
  ];
  let courseTabs = [...columnData];

  if (dashboard) {
    courseTabs = courseTabs.filter(
      (item) =>
        item.name !== 'course.courseCategory.name' &&
        item.name !== 'action' &&
        item.name !== 'createdByUser.first_name'
    );
  }
  const viewRender = (item: CellProps) => {
    return (
      <div className="flex gap-2 items-center justify-center">
        <Button
          onClickHandler={() =>
            navigate(`/trainer/courses/view/${item?.slug}`, {
              state: { isInvite: true },
            })
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
  const actionRender = (item: CellProps) => {
    return (
      <div className="flex gap-2 items-center justify-center">
        <Button
          onClickHandler={() => {
            acceptModal?.openModalWithData?.(item);
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
            setSlug({
              course_slug: item?.slug,
              course_bundle_id: item?.course_bundle_id
                ? Number(item?.course_bundle_id)
                : null,
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
  const onReject = async () => {
    const temp: {
      course_slug: string;
      course_bundle_id?: number;
    } = {
      course_slug: slug?.course_slug,
    };
    if (slug?.course_bundle_id) {
      temp.course_bundle_id = slug?.course_bundle_id;
    }
    const { error } = await rejectCourse('/trainer/courses/invites/reject', temp);
    if (!error) {
      rejectModal.closeModal();
      setSlug({
        course_slug: '',
        course_bundle_id: 0,
      });
      refetch();
    }
  };
  return (
    <div>
      <Table
        parentClassName="!p-0"
        tableRoundedRadius="pt-[1.75rem]"
        tableHeaderClass="sticky top-0"
        tableHeightClassName={`${
          dashboard ? '!min-h-[unset] max-h-[390px] overflow-auto pe-2' : ''
        }`}
        headerTitle={dashboard ? 'Course Invitation' : ''}
        headerData={courseTabs}
        bodyData={response?.data?.data}
        loader={isLoading}
        pagination={!dashboard}
        dataPerPage={!dashboard ? limit : -1}
        setLimit={setLimit}
        totalPage={response?.data?.lastPage}
        dataCount={response?.data?.count}
        setSort={setSort}
        sort={sort}
        width={`${dashboard ? '' : 'min-w-[1300px]'}`}
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
        <CourseAcceptModal modal={acceptModal} refetchTrainers={refetch} />
      )}
    </div>
  );
};
export default CourseInvitation;
