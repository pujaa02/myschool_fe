/* eslint-disable no-restricted-syntax */

// ** hooks **
import { useAxiosDelete, useAxiosGet, useAxiosPost } from 'hooks/useAxios';
import { useModal } from 'hooks/useModal';
import { useQueryGetFunction } from 'hooks/useQuery';
import { useRolePermission } from 'hooks/useRolePermission';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

// ** components **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { ConfirmationPopup } from 'components/Modal/ConfirmationPopup';
import PageHeader from 'components/PageHeader/PageHeader';
import Table from 'components/Table/Table';
import SearchComponent from 'components/Table/search';
import { AddEditMemberModal } from 'modules/Client/components/PrivateMembers/AddEditMemberModal';
import BulkUploadModal from 'modules/UsersManagement/pages/bulkUploadModal';

// ** constant **
import { useBulkUploadMessageConstant } from 'constants/BulkUploadNotes';
import { PrivateMembersBulkUploadObject } from 'constants/BulkUploadStructure';
import { FeaturesEnum, PermissionEnum } from 'constants/common.constant';
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';
import { ROLES } from 'constants/roleAndPermission.constant';
import { Fields } from 'modules/UsersManagement/constants';

// ** libraries **
import { FormikValues } from 'formik';

// ** types **
import { CellProps, ITableHeaderProps } from 'components/Table/types';
import { PrivateMembersDetails } from 'modules/Client/types';

// ** validation **
import { MemberBulkUploadValidationSchema } from 'modules/Client/validation';

// ** utils **
import { wait } from '@testing-library/user-event/dist/utils';
import { customRandomNumberGenerator, useDebounce, useHandleExport } from 'utils';

// ** style **
import 'modules/Client/styles/index.css';

// ** redux **
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import { currentPageSelector } from 'redux-toolkit/slices/paginationSlice';
import { setToast } from 'redux-toolkit/slices/toastSlice';

const PrivateMembers = () => {
  const deleteModal = useModal();
  const memberModal = useModal();
  const [selectedData, setSelectedData] = useState<PrivateMembersDetails | null>(
    null
  );
  const { exportDataFunc } = useHandleExport();
  const [bulkUploadManager] = useAxiosPost();
  const [clientDeleteApi] = useAxiosDelete();
  const { currentPage } = useSelector(currentPageSelector);
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSort] = useState<string>('-updated_at');
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { Role_Fields } = Fields();
  const CurrentUser = useSelector(getCurrentUser);

  const currentRole = Role_Fields.find(
    (role) => role.key === ROLES.PrivateIndividual
  );
  const deleteAccess = useRolePermission(
    FeaturesEnum.PrivateIndividual,
    PermissionEnum.Delete
  );

  const editAccess = useRolePermission(
    FeaturesEnum.PrivateIndividual,
    PermissionEnum.Update
  );

  const bulkUploadModal = useModal();

  const { uploadNotes } = useBulkUploadMessageConstant();

  const {
    response,
    isLoading,
    refetch: reFetchMembers,
  } = useQueryGetFunction('/private-individual', {
    page: currentPage,
    limit,
    sort,
    role: `${currentRole?.id}`,
    search: debouncedSearch,
  });
  const [getAllPrivateIndividuals] = useAxiosGet();

  const columnData: ITableHeaderProps[] = [
    {
      header: t('Table.no.'),
      name: 'no',
      className: 'w-16',
      option: {
        sort: false,
        hasFilter: false,
        isIndex: true,
      },
    },
    {
      name: 'manager.user.full_name',
      header: t('PrivateMembers.membersColumnTitles.memberName'),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      name: 'manager.user.email',
      header: t('PrivateMembers.membersColumnTitles.memberEmail'),
      option: {
        sort: true,
        hasFilter: false,
      },
    },
    {
      name: 'manager.user.contact',
      header: t('PrivateMembers.membersColumnTitles.memberMobileNo'),
      option: {
        sort: false,
        hasFilter: false,
      },
    },
    {
      name: 'manager.private_individual.codice_fiscale',
      header: t('PrivateMembers.clientForm.fieldInfos.codiceFiscale'),
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

  useEffect(() => {
    if (location?.state?.isModalOpen) {
      memberModal?.openModal();
    }
  }, [location]);

  const actionRender = (item: CellProps) => {
    return (
      <div className="flex gap-2 items-center justify-center ms-auto">
        <Button
          parentClass="h-fit"
          className="action-button green-btn"
          onClickHandler={() => {
            const itemSlug = item as unknown as PrivateMembersDetails;
            navigate(
              `${PRIVATE_NAVIGATION.clientsManagement.members.list.path}/${itemSlug?.username}`,
              {
                state: {
                  role: String(currentRole?.id),
                },
              }
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
        {((editAccess && CurrentUser?.id === item.added_by) ||
          CurrentUser?.role_name === ROLES.Admin) && (
          <Button
            parentClass="h-fit"
            className="action-button primary-btn"
            onClickHandler={() => {
              setSelectedData(item as unknown as PrivateMembersDetails);
              memberModal?.openModal();
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
        {((deleteAccess && CurrentUser?.id === item.added_by) ||
          CurrentUser?.role_name === ROLES.Admin) && (
          <Button
            parentClass="h-fit"
            className="action-button red-btn"
            onClickHandler={() => {
              setSelectedData(item as unknown as PrivateMembersDetails);
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
      const slug = selectedData?.username;
      const { error } = await clientDeleteApi(
        `/private-individual/${slug}?role=${currentRole?.id}`
      );
      if (!error) deleteModal.closeModal();
      reFetchMembers();
    }
  };

  const handleExportData = async () => {
    const resp = await getAllPrivateIndividuals('/private-individual', {
      params: {
        role: `${currentRole?.id}`,
        limit: response?.data?.count ?? limit * currentPage,
      },
    });
    if (currentRole) {
      exportDataFunc({
        response: resp?.data?.data,
        currentRole,
        exportFor: 'private',
      });
    }
  };
  const dispatch = useDispatch();

  const handleBulkUpload = async (insertObj: FormikValues) => {
    const resp = await bulkUploadManager('users/bulkInsert', {
      role: Number(currentRole?.id),
      users: insertObj,
    });
    bulkUploadModal.closeModal();
    if (!resp?.error) reFetchMembers();
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

  return (
    <>
      {currentRole?.id ? (
        <BulkUploadModal
          currentRole={currentRole}
          exportFor="private"
          formFields={PrivateMembersBulkUploadObject(t)}
          modal={bulkUploadModal}
          validationSchema={MemberBulkUploadValidationSchema()}
          handleBulkUploadSubmit={handleBulkUpload}
          notesForData={[
            uploadNotes.email,
            uploadNotes.mobileNumber,
            uploadNotes.CodiceFiscale,
          ]}
        />
      ) : (
        ''
      )}
      <PageHeader small text={t('PrivateMembers.PrivateMembers')}>
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
          <Button variants="whiteBordered" onClickHandler={() => handleExportData()}>
            <span className="w-5 h-5 inline-block me-2">
              <Image iconName="exportCsv" iconClassName="w-full h-full" />
            </span>
            {t('PrivateMembers.membersButtons.exportButton')}
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
            {t('PrivateMembers.membersButtons.bulkUploadButton')}
          </Button>

          <Button
            variants="primary"
            onClickHandler={() => {
              setSelectedData(null);
              memberModal.openModal();
            }}
          >
            <span className="w-5 h-5 inline-block me-2">
              <Image iconName="userGroupStrokeSD" iconClassName="w-full h-full" />
            </span>
            {t('PrivateMembers.membersButtons.addClientButton')}
          </Button>
        </div>
      </PageHeader>
      {memberModal?.isOpen && (
        <AddEditMemberModal
          role={currentRole?.id?.toString()}
          modal={memberModal}
          data={selectedData}
          setData={setSelectedData}
          refetch={() => {
            reFetchMembers();
          }}
        />
      )}
      {deleteModal.isOpen && (
        <ConfirmationPopup
          modal={deleteModal}
          bodyText={t('PrivateMembers.membersButtons.deleteText', {
            MemberName: selectedData?.full_name,
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

export default PrivateMembers;
