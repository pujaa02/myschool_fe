// import { useToggleDropdown } from 'hooks/useToggleDropdown';
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import LeadDeal from '../BulkEdit/LeadDeal';
import AccountBulkEdit from '../BulkEdit/Account';
import ActivityBulkEdit from '../BulkEdit/Activity';
import ContactBulkEdit from '../BulkEdit/Contact';
import LeadToDealEdit from '../BulkEdit/LeadToDeal';
import DiscardConfirmationModal from 'components/Modal/DiscardConfirmationModal';
import { useSelector } from 'react-redux';
import {
  getOpenDiscardConformationModal,
  getViewDiscardPromptStatus,
} from 'redux/slices/commonSlice';
import RouteChangeConformationModal from 'components/Modal/RouteChangeConformationModal';

interface Props {
  dropdownRef: React.RefObject<HTMLDivElement>;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  modelName: string;
  selectedIds: number[];
  refreshTable: () => void;
  setIsSaveChangeModelOpen: Dispatch<SetStateAction<boolean>>;
  handleClickOutside: () => void;
}

const BulkEditToggle = forwardRef<any, Props>((props, ref) => {
  const {
    dropdownRef,
    isDropdownOpen,
    toggleDropdown,
    modelName,
    selectedIds,
    refreshTable,
    setIsSaveChangeModelOpen,
    handleClickOutside,
  } = props;
  const slideRef = useRef<HTMLDivElement>(null);
  const leadDealRef = useRef<any>(null);
  const [moduleTitle, setModuleTitle] = useState('');
  const [discardSaveLoading, setDiscardSaveLoading] = useState(false);
  const [openDiscardModal, setOpenDiscardModal] = useState<boolean>(false);
  const [isViewUpdate, setIsViewUpdate] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    handleSave: leadDealRef?.current?.handleSave,
  }));

  useEffect(() => {
    if (modelName) {
      setModuleTitle(modelName);
    }
  }, [modelName]);

  const openDiscardConformationModal: boolean = useSelector(
    getOpenDiscardConformationModal
  );

  const viewDiscardPromptStatus = useSelector(getViewDiscardPromptStatus);

  useEffect(() => {
    const htmlTag = document.getElementsByTagName('html');
    if (isDropdownOpen) htmlTag[0].setAttribute('class', `bulkEdit__open`);
  }, [isDropdownOpen]);

  // useLayoutEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //     const htmlElemTag = document.getElementsByTagName('html')[0];
  //     if (htmlElemTag.classList.contains('bulkEdit__open')) {
  //       htmlElemTag.removeAttribute('class');
  //     }
  //   };
  // }, []);

  const onChangeSave = async () => {
    setDiscardSaveLoading(true);
    // do not remove await below 'coz onSave is async function but is passed from parent as ()=>void,if we remove await then we won't able to show loader in view Discard modal -JD.
    await leadDealRef?.current?.handleSave();
    setDiscardSaveLoading(false);
    setOpenDiscardModal(false);
    toggleDropdown();
    setIsSaveChangeModelOpen(false);
    const htmlElemTag = document.getElementsByTagName('html')[0];
    if (htmlElemTag.classList.contains('bulkEdit__open')) {
      htmlElemTag.removeAttribute('class');
    }
  };

  const closeDiscardModal = async () => {
    setDiscardSaveLoading(false);
    setOpenDiscardModal(false);
    toggleDropdown();
    setIsSaveChangeModelOpen(false);
    refreshTable();
    const htmlElemTag = document.getElementsByTagName('html')[0];
    if (htmlElemTag.classList.contains('bulkEdit__open')) {
      htmlElemTag.removeAttribute('class');
    }
  };

  return (
    <>
      <div
        className="bulkEdit__wrapper fixed top-0 right-0 h-screen w-[470px] shadow-[0px_3px_6px_0px_#7467b74d] bg-[#ffffff] z-[99] translate-x-[110%] rounded-l-[12px] duration-300"
        ref={dropdownRef}
      >
        <div ref={slideRef} className="">
          <div className="bulkEdit__header flex items-center py-[15px] px-[20px]">
            <div
              className='w-[30px] h-[30px] relative top-[-2px] rounded-[50%] cursor-pointer before:content-[""] before:absolute before:top-[14px] before:left-[9px] before:w-[12px] before:h-[2px] before:bg-[#000000] after:content-[""] after:absolute after:w-[8px] after:h-[8px] after:border-l-[2px] after:border-b-[2px] after:border-l-[#000000] after:border-b-[#000000] after:top-[11px] after:left-[10px] after:rotate-45 hover:bg-ip__Grey__hoverDark'
              onClick={() => {
                if (isViewUpdate) {
                  setOpenDiscardModal(true);
                } else {
                  toggleDropdown();
                  setIsSaveChangeModelOpen(false);
                  const htmlElemTag = document.getElementsByTagName('html')[0];
                  if (htmlElemTag.classList.contains('bulkEdit__open')) {
                    htmlElemTag.removeAttribute('class');
                  }
                }
              }}
            />
            <h2 className="text-[16px] font-biotif__Medium text-[#2E3234] pl-[6px]">
              Bulk Edit ({modelName})
            </h2>
          </div>
          {modelName === 'Lead' && (
            <LeadDeal
              modelName={moduleTitle}
              selectedIds={selectedIds}
              refreshTable={refreshTable}
              ref={leadDealRef}
              setIsSaveChangeModelOpen={setIsSaveChangeModelOpen}
              toggleDropdown={toggleDropdown}
              handleClickOutside={handleClickOutside}
              setIsViewUpdate={setIsViewUpdate}
              isViewUpdate={isViewUpdate}
              setOpenDiscardModal={setOpenDiscardModal}
            />
          )}
          {modelName === 'Deal' && (
            <LeadDeal
              modelName={moduleTitle}
              selectedIds={selectedIds}
              refreshTable={refreshTable}
              ref={leadDealRef}
              setIsSaveChangeModelOpen={setIsSaveChangeModelOpen}
              toggleDropdown={toggleDropdown}
              handleClickOutside={handleClickOutside}
              setIsViewUpdate={setIsViewUpdate}
              isViewUpdate={isViewUpdate}
              setOpenDiscardModal={setOpenDiscardModal}
            />
          )}
          {modelName === 'Account' && (
            <AccountBulkEdit
              selectedIds={selectedIds}
              refreshTable={refreshTable}
              ref={leadDealRef}
              setIsSaveChangeModelOpen={setIsSaveChangeModelOpen}
              toggleDropdown={toggleDropdown}
              handleClickOutside={handleClickOutside}
              setIsViewUpdate={setIsViewUpdate}
              isViewUpdate={isViewUpdate}
              setOpenDiscardModal={setOpenDiscardModal}
            />
          )}
          {modelName === 'Activity' && (
            <ActivityBulkEdit
              selectedIds={selectedIds}
              refreshTable={refreshTable}
              ref={leadDealRef}
              setIsSaveChangeModelOpen={setIsSaveChangeModelOpen}
              toggleDropdown={toggleDropdown}
              handleClickOutside={handleClickOutside}
              setIsViewUpdate={setIsViewUpdate}
              isViewUpdate={isViewUpdate}
              setOpenDiscardModal={setOpenDiscardModal}
            />
          )}
          {modelName === 'linkedin' && (
            <ActivityBulkEdit
              selectedIds={selectedIds}
              refreshTable={refreshTable}
              ref={leadDealRef}
              setIsSaveChangeModelOpen={setIsSaveChangeModelOpen}
              toggleDropdown={toggleDropdown}
              handleClickOutside={handleClickOutside}
              setIsViewUpdate={setIsViewUpdate}
              isViewUpdate={isViewUpdate}
              setOpenDiscardModal={setOpenDiscardModal}
            />
          )}
          {modelName === 'Contact' && (
            <ContactBulkEdit
              modelName={moduleTitle}
              selectedIds={selectedIds}
              refreshTable={refreshTable}
              ref={leadDealRef}
              setIsSaveChangeModelOpen={setIsSaveChangeModelOpen}
              toggleDropdown={toggleDropdown}
              handleClickOutside={handleClickOutside}
              setIsViewUpdate={setIsViewUpdate}
              isViewUpdate={isViewUpdate}
              setOpenDiscardModal={setOpenDiscardModal}
            />
          )}
          {modelName === 'Lead To Deal' && (
            <LeadToDealEdit
              modelName={moduleTitle}
              selectedIds={selectedIds}
              refreshTable={refreshTable}
              ref={leadDealRef}
              setIsSaveChangeModelOpen={setIsSaveChangeModelOpen}
              toggleDropdown={toggleDropdown}
              handleClickOutside={handleClickOutside}
              setIsViewUpdate={setIsViewUpdate}
              isViewUpdate={isViewUpdate}
              setOpenDiscardModal={setOpenDiscardModal}
            />
          )}
          {modelName === 'Deal To Lead' && (
            <LeadToDealEdit
              modelName={moduleTitle}
              selectedIds={selectedIds}
              refreshTable={refreshTable}
              ref={leadDealRef}
              setIsSaveChangeModelOpen={setIsSaveChangeModelOpen}
              toggleDropdown={toggleDropdown}
              handleClickOutside={handleClickOutside}
              setIsViewUpdate={setIsViewUpdate}
              isViewUpdate={isViewUpdate}
              setOpenDiscardModal={setOpenDiscardModal}
            />
          )}
        </div>
      </div>
      {(openDiscardModal || openDiscardConformationModal) && (
        <DiscardConfirmationModal
          onDiscard={closeDiscardModal}
          isOpen={openDiscardModal || openDiscardConformationModal}
          onSave={onChangeSave}
          closeModal={() => setOpenDiscardModal(false)}
          saveBtnLoading={discardSaveLoading}
        />
      )}

      <RouteChangeConformationModal
        isDirtyCondition={!!viewDiscardPromptStatus && isViewUpdate}
        onSave={onChangeSave}
        saveBtnLoading={discardSaveLoading}
        promptMessage="The changes you have made might not be saved, do you want to Discard ?"
        submitButtonText="Discard"
      />
    </>
  );
});

export default BulkEditToggle;
