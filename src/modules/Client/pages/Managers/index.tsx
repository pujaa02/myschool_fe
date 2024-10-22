/* eslint-disable no-restricted-syntax */

// ** hooks **
import { useAxiosDelete, useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useQueryGetFunction } from 'hooks/useQuery';
import { useRolePermission } from 'hooks/useRolePermission';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// ** components **
import Button from 'components/Button/Button';
import CustomCard from 'components/Card';
import ReactSelect from 'components/FormElement/ReactSelect';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import PageHeader from 'components/PageHeader/PageHeader';
import Table from 'components/Table/Table';
import SearchComponent from 'components/Table/search';
import TabComponent from 'components/Tabs';
import { AddEditManagerModal } from 'modules/Client/components/Managers/AddEditManagerModal';
import BulkUploadModal from 'modules/UsersManagement/pages/bulkUploadModal';

// ** constant **
import { useBulkUploadMessageConstant } from 'constants/BulkUploadNotes';
import { CompanyManagerBulkUploadObject } from 'constants/BulkUploadStructure';
import { FeaturesEnum, PermissionEnum } from 'constants/common.constant';
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';
import { ROLES } from 'constants/roleAndPermission.constant';
import { Fields } from 'modules/UsersManagement/constants';
import { RoleFields } from 'types/common';

// ** libraries **
import { FormikValues } from 'formik';
import _ from 'lodash';

// ** types **
import { Option } from 'components/FormElement/types';
import { CellProps, ITableHeaderProps } from 'components/Table/types';
import { CompanyManagerInfo, ManagerData } from 'modules/Client/types';
import { tabProps } from 'modules/Courses/pages/CourseViewDetail/types';

// ** validation **
import { ManagerBulkUploadValidationSchema } from 'modules/Client/validation';

// ** utils **
import { wait } from '@testing-library/user-event/dist/utils';
import { customRandomNumberGenerator, useDebounce, useHandleExport } from 'utils';

// ** style **
import 'modules/Client/styles/index.css';

// ** redux **
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import { currentPageSelector } from 'redux-toolkit/slices/paginationSlice';
import { setToast } from 'redux-toolkit/slices/toastSlice';

const ClientManagers = () => {
  const deleteModal = useModal();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const managersModal = useModal();
  const bulkUploadModal = useModal();

  const deleteAccess = useRolePermission(
    FeaturesEnum.CompanyManager,
    PermissionEnum.Delete
  );

  const editAccess = useRolePermission(
    FeaturesEnum.CompanyManager,
    PermissionEnum.Update
  );

  const { exportDataFunc } = useHandleExport();
  const CurrentUser = useSelector(getCurrentUser);

  const { t } = useTranslation();
  const { Role_Fields } = Fields();
  const [clientGetApi] = useAxiosGet();
  const [clientDeleteApi] = useAxiosDelete();
  const { currentPage } = useSelector(currentPageSelector);
  const currentRole = Role_Fields.find((role) => role.key === ROLES.CompanyManager);
  const [bulkUploadManager] = useAxiosPost();
  const [getAllCompanyManagers] = useAxiosGet();
  const [selectedCompany, setSelectedCompany] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<ManagerData | null>(null);
  const [managerData, setManagerData] = useState<ManagerData | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>('-updated_at');
  const [search, setSearch] = useState<string>('');
  const [url, setUrl] = useState('/managers');
  const [activeTab, setActiveTab] = useState(0);

  const [allowFileUpload, setAllowFileUpload] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { uploadNotes } = useBulkUploadMessageConstant();

  const { response: companyData, isLoading: getCompaniesDataLoading } =
    useQueryGetFunction(`/companies?dropdown=true&label=name`, {
      role: currentRole?.id?.toString(),
    });
  const {
    response,
    isLoading,
    refetch: reFetchManagers,
  } = useQueryGetFunction(url, {
    page: currentPage,
    limit,
    sort,
    role: `${currentRole?.id}`,
    option: {
      search: debouncedSearch,
      ...(url === '/users' && { is_manager: true }),
    },
  });

  useEffect(() => {
    if (location?.state?.isModalOpen) {
      managersModal?.openModal();
      window.history.replaceState(null, '');
    }
  }, [location]);

  useEffect(() => {
    if (selectedData) {
      onEdit();
    }
  }, [selectedData]);

  useEffect(() => {
    if (bulkUploadModal.isOpen) {
      setSelectedCompany([]);
    }
  }, [bulkUploadModal.isOpen]);

  const handleCategoryOrSubCategoryChange = (
    val: Option | Option[],
    type: string | undefined
  ) => {
    // setSelectedCompany
    const updatedIds: string[] =
      type === 'Removed'
        ? selectedCompany.filter(
            (item) => `${item}` !== `${(val as Option[])[0].value}`
          )
        : [...selectedCompany, ...(val as Option[]).map((opt) => `${opt.value}`)];
    setSelectedCompany(
      updatedIds.filter((item, index) => updatedIds.indexOf(item) === index)
    );
  };

  const getCompanyIds = (itemSlug: ManagerData) => {
    if (url === '/managers') {
      return itemSlug?.companies?.map((item) => item.id.toString());
    }
    return itemSlug?.company_manager?.map((item) => item.company?.id.toString());
  };

  const actionRender = (item: CellProps) => {
    return (
      <div className="flex gap-2 items-center justify-center ms-auto">
        <Button
          parentClass="h-fit"
          // bg-primary/10 text-primary p-1
          className="action-button green-btn"
          onClickHandler={() => {
            const itemSlug =
              url === '/managers'
                ? (item as unknown as ManagerData)
                : (item.managers[0] as unknown as ManagerData);
            if (currentRole?.id) {
              navigate(
                `${PRIVATE_NAVIGATION.clientsManagement.managers.list.path}/${itemSlug?.user?.username}`,
                {
                  state: {
                    companyId: getCompanyIds(itemSlug),
                    role: currentRole.id.toString(),
                  },
                }
              );
            }
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
        {((editAccess && CurrentUser?.id === item.created_by) ||
          item.added_by ||
          CurrentUser?.role_name === ROLES.Admin) && (
          <Button
            parentClass="h-fit"
            className="action-button primary-btn"
            onClickHandler={() => {
              if (tabs?.[activeTab]?.uniqueKey === 'companyManager') {
                setSelectedData(item as unknown as ManagerData);
              } else {
                setSelectedData(item.managers[0] as unknown as ManagerData);
              }
              managersModal?.openModal();
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
            // bg-red-600/10 text-red-600 p-1
            className="action-button red-btn"
            onClickHandler={() => {
              if (tabs?.[activeTab]?.uniqueKey === 'companyManager') {
                setSelectedData(item as unknown as ManagerData);
              } else {
                setSelectedData(item.managers[0] as unknown as ManagerData);
              }
              deleteModal?.openModal();
            }}
            tooltipText={t('Tooltip.Delete')}
          >
            <Image iconName="deleteIcon" iconClassName="stroke-current w-5 h-5" />
          </Button>
        )}
      </div>
    );
  };

  const onDelete = async () => {
    if (selectedData) {
      const slug = selectedData?.id;
      if (url === '/managers') {
        const response = await clientDeleteApi(
          `/managers/company-manager/${slug}?role=${currentRole?.id}`
        );
        if (response?.data) deleteModal.closeModal();
      } else {
        const response = await clientDeleteApi(
          `/users/${selectedData?.user?.username}?role=${currentRole?.id}`
        );
        if (response?.data) deleteModal.closeModal();
      }
      reFetchManagers();
    }
  };

  const onEdit = async () => {
    const slug = selectedData?.user?.username;
    const response = await clientGetApi(`/managers/${slug}?role=${currentRole?.id}`);
    setManagerData(response?.data);
  };

  const handleBulkUpload = async (insertObj: FormikValues) => {
    const resp = await bulkUploadManager('users/bulkInsert', {
      role: Number(currentRole?.id),
      users: insertObj,
    });
    setAllowFileUpload(false);
    bulkUploadModal.closeModal();
    if (!resp?.error) reFetchManagers();
    if (resp?.error && resp?.data && Object.keys(resp?.data)?.length > 0) {
      for (const errorMessage of resp?.data?.split(', ') ?? []) {
        if (errorMessage) {
          dispatch(
            setToast({
              variant: 'Error',
              message: errorMessage,
              type: 'error',
              id: customRandomNumberGenerator(),
            })
          );
          // eslint-disable-next-line no-await-in-loop
          await wait(0);
        }
      }
    }
  };

  const selectCompanyComponent = () => {
    return (
      <div className="col-span-2">
        {companyData?.data ? (
          <ReactSelect
            options={companyData?.data}
            placeholder={t(
              'ClientManagers.clientForm.fieldInfos.companyPlaceHolder'
            )}
            label={t('ClientManagers.clientForm.fieldInfos.companies')}
            isMulti
            isCompulsory
            isLoading={getCompaniesDataLoading}
            onChange={(value, type) => {
              handleCategoryOrSubCategoryChange(value as Option | Option[], type);
            }}
            selectedValue={selectedCompany}
          />
        ) : (
          ''
        )}
      </div>
    );
  };

  const handleExportData = async () => {
    const resp = await getAllCompanyManagers(url, {
      params: {
        role: `${currentRole?.id}`,
        limit: response?.data?.count ?? limit * currentPage,
      },
    });
    if (currentRole) {
      exportDataFunc({
        response: resp?.data?.data,
        currentRole,
        exportFor: url === '/managers' ? 'managers' : 'allManager',
      });
    }
  };

  const columnData = [
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
      name: 'manager.user.full_name',
      header: t('ClientManagers.managersColumnTitles.managerName'),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      name: 'manager.user.email',
      header: t('ClientManagers.managersColumnTitles.managerEmail'),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      name: 'manager.user.contact',
      header: t('ClientManagers.managersColumnTitles.managerMobileNo'),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      name: 'company.name',
      header: t('ClientManagers.managersColumnTitles.managerCompanyName'),
      option: {
        sort: false,
        hasFilter: false,
      },
      cell: (props: CellProps) => companyName(props),
    },
    {
      header: t('Table.action'),
      cell: (props: CellProps) => actionRender(props),
    },
  ];

  const companyName = (props: CellProps) => {
    if (url !== '/managers') {
      const data = props as unknown as CompanyManagerInfo;
      const companyName = data?.managers?.map((item) => {
        return item?.company_manager?.map((companyDet) => companyDet?.company?.name);
      });

      return !_.isEmpty(companyName[0]) && companyName[0]?.length > 0
        ? companyName[0].join(',').toString()
        : '-';
    }
    const data = props as unknown as ManagerData;
    const companyName = data?.companies?.map((item) => {
      return item?.name;
    });
    return !_.isEmpty(companyName) ? companyName.join(',').toString() : '-';
  };

  const tabs: tabProps[] = [
    {
      uniqueKey: 'companyManager',
      title: 'ClientManagers.tab.companyManager',
      component: (
        <Table
          parentClassName=""
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
      ),
      icon: 'userGroupIcon',
    },
    {
      uniqueKey: 'manager',
      title: 'ClientManagers.tab.manager',
      component: (
        <Table
          parentClassName=""
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
      ),
      icon: 'userGroupIcon',
    },
  ];

  useEffect(() => {
    const urlToCall =
      tabs?.[activeTab]?.uniqueKey === 'companyManager' ? '/managers' : '/users';
    setUrl(urlToCall);
  }, [activeTab]);

  return (
    <>
      {bulkUploadModal?.isOpen ? (
        <BulkUploadModal
          currentRole={currentRole as RoleFields}
          exportFor="managers"
          formFields={CompanyManagerBulkUploadObject(t)}
          modal={bulkUploadModal}
          validationSchema={ManagerBulkUploadValidationSchema(t)}
          defaultValue={{
            'manager.companies': selectedCompany.map((data) => Number(data)),
          }}
          handleBulkUploadSubmit={handleBulkUpload}
          isValidData={selectedCompany?.length > 0}
          allowFileUpload={allowFileUpload}
          setAllowFilUpload={setAllowFileUpload}
          DynamicValueComponent={selectCompanyComponent}
          notesForData={[uploadNotes.email, uploadNotes.mobileNumber]}
        />
      ) : (
        ''
      )}
      <PageHeader small text={t('SideNavigation.client.managerTitle')}>
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

          <Button
            variants="whiteBordered"
            onClickHandler={() => {
              bulkUploadModal.openModal();
            }}
          >
            <span className="w-5 h-5 inline-block me-2">
              <Image iconName="bulkUpload" iconClassName="w-full h-full" />
            </span>
            {t('ClientManagers.managersButtons.bulkUploadButton')}
          </Button>

          <Button
            variants="primary"
            onClickHandler={() => {
              setManagerData(null);
              setSelectedData(null);
              managersModal.openModal();
            }}
          >
            <span className="w-5 h-5 inline-block me-2">
              <Image iconName="userGroupStrokeSD" iconClassName="w-full h-full" />
            </span>
            {t('ClientManagers.managersButtons.addClientButton')}
          </Button>
        </div>
      </PageHeader>
      {managersModal?.isOpen && (
        <AddEditManagerModal
          role={currentRole?.id?.toString()}
          modal={managersModal}
          data={managerData}
          setData={setSelectedData}
          refetch={() => {
            reFetchManagers();
          }}
        />
      )}
      {deleteModal.isOpen && (
        <ConfirmationPopup
          modal={deleteModal}
          bodyText={t('ClientManagers.managersButtons.deleteText', {
            ManagerName: selectedData?.manager?.user?.full_name,
          })}
          variants="primary"
          confirmButtonText={t('Button.deleteButton')}
          deleteTitle={t('Button.deleteTitle')}
          confirmButtonFunction={onDelete}
          confirmButtonVariant="primary"
          cancelButtonText={t('Button.cancelButton')}
          cancelButtonFunction={() => {
            setSelectedData(null);
            deleteModal.closeModal();
          }}
        />
      )}
      <div className="tab-wrapper">
        <CustomCard>
          <TabComponent
            current={activeTab}
            onTabChange={(tabIndex) => setActiveTab(tabIndex)}
          >
            {tabs.map(({ title, component, icon, uniqueKey }, index) => (
              <TabComponent.Tab key={uniqueKey} title={t(title)} icon={icon}>
                {activeTab === index && component}
              </TabComponent.Tab>
            ))}
          </TabComponent>
        </CustomCard>
      </div>
    </>
  );
};

export default ClientManagers;
