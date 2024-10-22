// ** imports **
import { format } from 'date-fns';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

// ** components **
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';

// ** hooks **
import { useQueryGetFunction } from 'hooks/useQuery';

// ** styles **
import 'modules/Client/styles/index.css';

// ** types **
import { CompanyCourseList } from 'modules/Client/types';

// ** redux **
import StatusLabel from 'components/StatusLabel';
import { currentPageSelector } from 'redux-toolkit/slices/paginationSlice';
import { CourseList } from '../Managers/types';

const CourseListing = ({ CompanyId }: { CompanyId: string | undefined }) => {
  const { currentPage } = useSelector(currentPageSelector);
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>('-updated_at');
  const { t } = useTranslation();
  const { response, isLoading } = useQueryGetFunction(
    `/private-individual/course/enrolled/${CompanyId}`,
    {
      page: currentPage,
      limit,
      sort,
    }
  );

  const statusRender = (item: CourseList) => {
    const getStatusClass = () => {
      switch (item.status) {
        case 'publish':
          return 'completed';
        case 'confirmed':
          return 'completed';
        case 'draft':
          return 'pending';
        case 'proposed':
          return 'gray';
        case 'rejected':
          return 'cancelled';
        case 'requested':
          return 'neon';
        default:
          return 'pending';
      }
    };

    const statusClasses = ` ${getStatusClass()}`;

    return (
      <StatusLabel
        text={item.status}
        variants={getStatusClass()}
        className={`${statusClasses ?? ''}`}
      />
    );
  };

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
      name: 'marked_as',
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
      header: t('ClientManagement.clientColumnTitles.clientStatus'),
      name: 'status',
      option: {
        sort: false,
        hasFilter: false,
      },
      cell: (props) => statusRender(props as unknown as CourseList),
    },
  ];
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
