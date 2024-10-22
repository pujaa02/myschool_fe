import Button from 'components/Button/Button';
import Image from 'components/Image';
import Table from 'components/Table/Table';
import { CellProps, ITableHeaderProps } from 'components/Table/types';
import { format } from 'date-fns';
import { useQueryGetFunction } from 'hooks/useQuery';
import 'modules/Client/styles/index.css';
import { CompanyCourseList } from 'modules/Client/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentPageSelector } from 'redux-toolkit/slices/paginationSlice';

const CourseListing = ({
  CompanyId,
  activeTab,
  userSlug,
  role,
  type,
}: {
  CompanyId: number | undefined;
  activeTab: number;
  userSlug?: string;
  role?: number;
  type?: string;
}) => {
  const { currentPage } = useSelector(currentPageSelector);
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>('-updated_at');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { response, isLoading } = useQueryGetFunction(
    `/managers/course/enrolled/${CompanyId}`,
    {
      page: currentPage,
      limit,
      sort,
      option: {
        ...(type ? { course_type: type } : {}),
      },
    }
  );

  const columnData: ITableHeaderProps[] = [
    {
      header: t('Table.no.'),
      name: 'no',
      className: '',
      option: {
        sort: false,
        hasFilter: false,
        isIndex: true,
      },
    },
    {
      name: 'title',
      header: t('ClientManagement.courseListing.courseName'),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      name: 'courseCategory.name',
      header: t('ClientManagement.courseListing.category'),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      name: 'type',
      header: t('ClientManagement.courseListing.type'),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      name: 'start_date',
      header: t('ClientManagement.courseListing.startDate'),
      option: {
        sort: false,
        hasFilter: false,
      },
      cell: (props) => dateRender(props as unknown as CompanyCourseList),
    },
    {
      name: 'end_date',
      header: t('ClientManagement.courseListing.endDate'),
      option: {
        sort: false,
        hasFilter: false,
      },
      cell: (props) => dateRender(props as unknown as CompanyCourseList),
    },
    {
      header: t('CoursesManagement.columnHeader.Actions'),
      cell: (props) => actionRender(props),
    },
  ];
  const actionRender = (item: CellProps) => {
    return (
      <div className="flex gap-2 items-center justify-center ms-auto">
        <Button
          onClickHandler={() => {
            navigate(`/courses/view/${item?.slug}`, {
              state: {
                fromClientCompany: true,
                activeTab,
                userSlug,
                role,
                type: item?.type,
                isCourse: true,
              },
            });
          }}
          parentClass="h-fit"
          className="action-button green-btn relative group"
          tooltipText={t('Tooltip.View')}
        >
          <Image
            iconName="eyeIcon"
            iconClassName=" w-5 h-5"
            width={24}
            height={24}
          />
        </Button>
      </div>
    );
  };
  const dateRender = (item: CompanyCourseList) => {
    return (
      <div>
        {item?.start_date || item?.end_date
          ? format(new Date(item?.start_date || item?.end_date), 'MM/dd/yy')
          : '-'}
      </div>
    );
  };

  return (
    <Table
      parentClassName=""
      headerData={columnData}
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
  );
};

export default CourseListing;
