// **hooks**
import { useQueryGetFunction } from 'hooks/useQuery';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// **components**
import Table from 'components/Table/Table';
import { ITableHeaderProps } from 'components/Table/types';

// **styles**
import 'modules/Client/styles/index.css';

const AttendeeListing = ({ CompanyId }: { CompanyId: number | undefined }) => {
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>('-updated_at');
  const { t } = useTranslation();
  const { response, isLoading } = useQueryGetFunction('/course/participates', {
    option: { company_id: CompanyId },
  });

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
      name: 'first_name',
      header: t('CompanyManager.AttendeeList.firstNameTitle'),
      image: 'logo',
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      name: 'last_name',
      header: t('CompanyManager.AttendeeList.lastNameTitle'),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      name: 'email',
      header: t('CompanyManager.AttendeeList.emailTitle'),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      name: 'code',
      header: t('CompanyManager.AttendeeList.codeTitle'),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      name: 'job_title',
      header: t('CompanyManager.AttendeeList.roleTitle'),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      name: 'mobile_number',
      header: t('CompanyManager.AttendeeList.contactTitle'),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
  ];

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

export default AttendeeListing;
