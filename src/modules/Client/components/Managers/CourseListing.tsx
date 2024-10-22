import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Table from 'components/Table/Table';
import { CellProps, ITableHeaderProps } from 'components/Table/types';

import { useQueryGetFunction } from 'hooks/useQuery';

import Button from 'components/Button/Button';
import Image from 'components/Image';
import StatusLabel from 'components/StatusLabel';
import { format } from 'date-fns';
import 'modules/Client/styles/index.css';
import { FundedBy } from 'modules/Courses/Constants';
import { useNavigate } from 'react-router-dom';
import { currentPageSelector } from 'redux-toolkit/slices/paginationSlice';
import { CourseList } from './types';

const CourseListing = ({
  managerId,
  companyId,
  activeTab,
  userSlug,
  type,
}: {
  managerId: number | undefined;
  companyId: number | undefined;
  activeTab: number;
  userSlug?: string;
  type?: string;
}) => {
  const { currentPage } = useSelector(currentPageSelector);
  const [limit, setLimit] = useState<number>(10);
  const navigate = useNavigate();
  const [sort, setSort] = useState<string>('-updated_at');
  const { t } = useTranslation();
  const { response, isLoading } = useQueryGetFunction(
    `/managers/course/enrolled/manager/${managerId}`,
    {
      page: currentPage,
      limit,
      sort,
      option: {
        company_id: companyId,
        ...(type ? { course_type: type } : {}),
        ...(type === 'private' ? { is_publish: true } : {}),
      },
    }
  );

  const getFundedBy = (funded_by: string): string => {
    switch (funded_by) {
      case FundedBy.ClientAddress:
        return FundedBy['client-address'];
      case FundedBy.ProlevenAcademy:
        return FundedBy['proleven-academy'];
      case FundedBy.NAN:
        return '-';
      default:
        return '';
    }
  };
  const FundedByCell = (props: CellProps): string =>
    getFundedBy((props as unknown as CourseList)?.funded_by);

  const dateRender = (item: CourseList, dateType?: string) => {
    if (dateType === 'start') {
      return (
        <div>
          {item?.start_date ? format(new Date(item?.start_date), 'MM/dd/yy') : '-'}
        </div>
      );
    }
    if (dateType === 'end') {
      return (
        <div>
          {item?.end_date ? format(new Date(item?.end_date), 'MM/dd/yy') : '-'}
        </div>
      );
    }
    return (
      <div>
        {item?.expiry_date ? format(new Date(item?.expiry_date), 'MM/dd/yy') : '-'}
      </div>
    );
  };

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
      header: t('CoursesManagement.columnHeader.FundedBy'),
      name: 'funded_by',
      cell: (props) => FundedByCell(props),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      name: 'card.course_type',
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
      cell: (props) => dateRender(props as unknown as CourseList, 'start'),
    },
    {
      name: 'end_date',
      header: t('ClientManagement.courseListing.endDate'),
      option: {
        sort: false,
        hasFilter: false,
      },
      cell: (props) => dateRender(props as unknown as CourseList, 'end'),
    },
    {
      name: 'expiry_date',
      header: t('ClientManagement.courseListing.expiryDate'),
      option: {
        sort: false,
        hasFilter: false,
      },
      cell: (props) => dateRender(props as unknown as CourseList),
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
                fromClientManager: true,
                activeTab,
                type: item?.type,
                isCourse: true,
                userSlug,
                companyId,
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
