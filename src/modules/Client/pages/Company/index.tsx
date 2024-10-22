// ** imports **
import { REACT_APP_API_BASE_URL } from 'config';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// ** components **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import PageHeader from 'components/PageHeader/PageHeader';
import Table from 'components/Table/Table';
import SearchComponent from 'components/Table/search';
import { CellProps, ITableHeaderProps } from 'components/Table/types';

// ** constants **
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';
import { Fields } from 'modules/UsersManagement/constants';
import { useDebounce, useHandleExport } from 'utils';

// ** hooks **
import { useAxiosDelete, useAxiosGet } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useQueryGetFunction } from 'hooks/useQuery';
import { useRolePermission } from 'hooks/useRolePermission';

// ** types **
import { CompanyDetailsProps } from 'modules/Client/types';

// ** constants **
import { FeaturesEnum, PermissionEnum } from 'constants/common.constant';
import { ROLES } from 'constants/roleAndPermission.constant';

// ** styles **
import 'modules/Client/styles/index.css';

// ** redux **
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import { getCountriesJson } from 'redux-toolkit/slices/countryJsonSlice';
import { currentPageSelector } from 'redux-toolkit/slices/paginationSlice';
import { getRoles } from 'redux-toolkit/slices/rolePermissionSlice';

const ClientsManagement = () => {
  const deleteModal = useModal();
  const [clientDeleteApi] = useAxiosDelete();
  const [getAllUserByRole] = useAxiosGet();
  const { currentPage } = useSelector(currentPageSelector);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const CurrentUser = useSelector(getCurrentUser);
  const allRoles = useSelector(getRoles);
  const { Role_Fields } = Fields();
  const countries = useSelector(getCountriesJson);
  const currentRole = allRoles.find((role) => role.name === ROLES.Company);

  const [selectedData, setSelectedData] = useState<CompanyDetailsProps | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>('-updated_at');
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);

  const exportCurrentRole = Role_Fields.find((role) => role.key === ROLES.Company);
  const { exportDataFunc } = useHandleExport();

  const deleteAccess = useRolePermission(
    FeaturesEnum.Company,
    PermissionEnum.Delete
  );

  const editAccess = useRolePermission(FeaturesEnum.Company, PermissionEnum.Update);
  const editAccountingAccess = useRolePermission(
    FeaturesEnum.AccountingCompany,
    PermissionEnum.Update
  );

  const {
    response,
    isLoading,
    refetch: reFetchCompanies,
  } = useQueryGetFunction('/companies', {
    page: currentPage,
    sort,
    search: debouncedSearch,
    role: `${currentRole?.id}`,
    limit,
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
      name: 'name',
      header: t('ClientManagement.clientColumnTitles.clientTitle'),
      option: {
        sort: true,
        hasFilter: false,
      },
      cell: (props) => companyNameRender(props as unknown as CompanyDetailsProps),
    },
    {
      name: 'registration_number',
      header: t('ClientManagement.clientColumnTitles.clientRegistrationNo'),
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      name: 'vat_number',
      header: t('ClientManagement.clientColumnTitles.clientVatNo'),
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      name: 'country',
      header: t('ClientManagement.clientColumnTitles.clientCountry'),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      header: t('Table.action'),
      cell: (props: CellProps) => actionRender(props),
    },
  ];

  const companyNameRender = (item: CompanyDetailsProps) => {
    return (
      <div className="flex items-center">
        <div className="w-[100px] h-[70px]">
          <Image
            imgClassName="block w-full h-full object-cover rounded-lg"
            src={`${REACT_APP_API_BASE_URL}/${item?.logo}`}
            width={100}
            height={100}
          />
        </div>
        <Link
          to={`${PRIVATE_NAVIGATION.clientsManagement.company.list.path}/view/${item?.slug}`}
          target="_blank"
        >
          <div className="max-w-[220px] ps-2  hover:underline decoration-blue">
            <p className="text-sm text-dark leading-[1.3]">{item?.name}</p>
          </div>
        </Link>
      </div>
    );
  };

  const actionRender = (item: CellProps) => {
    return (
      <div className="flex gap-2 items-center justify-center ms-auto">
        <Button
          parentClass="h-fit"
          className="action-button green-btn"
          onClickHandler={() => {
            navigate(
              `${PRIVATE_NAVIGATION.clientsManagement.company.list.path}/view/${item?.slug}`,
              { state: { role: currentRole?.id } }
            );
          }}
          tooltipText={t('Tooltip.View')}
        >
          <Image
            iconName="eyeIcon"
            iconClassName=" w-5 h-5"
            width={24}
            height={24}
          />
        </Button>

        {(((editAccess || editAccountingAccess) &&
          CurrentUser?.id === item.created_by) ||
          CurrentUser?.role_name === ROLES.Admin) && (
          <Button
            parentClass="h-fit"
            className="action-button primary-btn"
            onClickHandler={() => {
              navigate(
                `${PRIVATE_NAVIGATION.clientsManagement.company.list.path}/${item?.slug}`,
                { state: { role: currentRole } }
              );
            }}
            tooltipText={t('Tooltip.Edit')}
          >
            <Image
              iconName="editIcon"
              iconClassName="stroke-current w-5 h-5"
              width={24}
              height={24}
            />
          </Button>
        )}
        {((deleteAccess && CurrentUser?.id === item.created_by) ||
          CurrentUser?.role_name === ROLES.Admin) && (
          <Button
            parentClass="h-fit"
            className="action-button red-btn "
            onClickHandler={() => {
              setSelectedData(item as unknown as CompanyDetailsProps);
              deleteModal?.openModal();
            }}
            tooltipText={t('Tooltip.Delete')}
          >
            <Image iconName="deleteIcon" iconClassName="w-5 h-5 stroke-current" />
          </Button>
        )}
      </div>
    );
  };

  const onDelete = async () => {
    if (selectedData) {
      const slug = selectedData?.slug;
      const response = await clientDeleteApi(
        `/companies/${slug}?role=${currentRole?.id}`
      );
      if (response.data) deleteModal.closeModal();
      reFetchCompanies();
    }
  };

  const handleAddClient = () => {
    navigate(PRIVATE_NAVIGATION.clientsManagement.company.add.path, {
      state: { role: currentRole },
    });
  };

  const handleExportData = async () => {
    const resp = await getAllUserByRole('/companies', {
      params: {
        role: `${exportCurrentRole?.id}`,
        limit: response?.data?.count ?? limit * currentPage,
      },
    });
    if (exportCurrentRole) {
      exportDataFunc({
        response: resp?.data?.data?.map((data: CellProps) => {
          if (data) {
            const countryName = countries?.countries?.find(
              (item) => item.id === data.country
            )?.name;
            return { ...data, country: countryName };
          }
          return {};
        }),
        currentRole: exportCurrentRole,
        exportFor: 'company',
      });
    }
  };

  useEffect(() => {
    if (location?.state?.isAddForm) {
      navigate(PRIVATE_NAVIGATION.clientsManagement.company.add.path, {
        state: { role: currentRole, isAddForm: location?.state?.isAddForm },
      });
    }
  }, [location]);

  return (
    <>
      <PageHeader small text={t('ClientManagement.ClientManagement')}>
        <div className="flex justify-end gap-2">
          <div>
            <SearchComponent
              onSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e?.target?.value);
              }}
              value={search}
              placeholder={t('Table.tableSearchPlaceholder')}
              onClear={() => {
                setSearch('');
              }}
            />
          </div>
          <Button
            variants="whiteBordered"
            onClickHandler={() => {
              handleExportData();
            }}
          >
            <span className="w-5 h-5 inline-block me-2">
              <Image iconName="exportCsv" iconClassName="w-full h-full" />
            </span>
            {t('ClientManagers.managersButtons.exportButton')}
          </Button>
          <Button variants="primary" onClickHandler={handleAddClient}>
            <span className="w-5 h-5 inline-block me-2">
              <Image iconName="plusSquareIcon" iconClassName="w-full h-full" />
            </span>
            {t('ClientManagement.ClientButtons.addClientButton')}
          </Button>
        </div>
      </PageHeader>
      {deleteModal.isOpen && (
        <ConfirmationPopup
          modal={deleteModal}
          bodyText={t('ClientManagement.ClientButtons.deleteText', {
            CompanyName: selectedData?.name,
          })}
          variants="primary"
          deleteTitle={t('Button.deleteTitle')}
          confirmButtonText={t('Button.deleteButton')}
          confirmButtonFunction={onDelete}
          confirmButtonVariant="primary"
          cancelButtonText={t('Button.cancelButton')}
          cancelButtonFunction={() => {
            setSelectedData(null);
            deleteModal.closeModal();
          }}
        />
      )}
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
    </>
  );
};

export default ClientsManagement;
