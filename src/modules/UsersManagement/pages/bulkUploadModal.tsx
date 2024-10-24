// /* eslint-disable no-await-in-loop */
// /* eslint-disable no-restricted-syntax */
// import Button from 'components/Button/Button';
// import DropZone from 'components/FormElement/DropZoneField';
// import ReactSelect from 'components/FormElement/ReactSelect';
// import { EnumFileType } from 'components/FormElement/enum';
// import { Option, fileInputEnum } from 'components/FormElement/types';
// import Image from 'components/Image';
// import { Modal } from 'components/Modal/Modal';
// import { BULK_UPLOAD_FORMATS } from 'constants/filesupport.constant';
// import ExcelJS from 'exceljs';
// import { Form, Formik, FormikValues } from 'formik';
// import _ from 'lodash';
// import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useDispatch } from 'react-redux';
// import { setToast } from 'redux-toolkit/slices/toastSlice';
// import { RoleFields } from 'types/common';
// import { customRandomNumberGenerator, useHandleExport } from 'utils';
// import { Modal as ModalTypes } from '../types';

// const BulkUploadModal = ({
//   modal,
//   formFields,
//   validationSchema,
//   defaultValue,
//   DynamicValueComponent,
//   handleBulkUploadSubmit,
//   allowFileUpload = true,
//   setAllowFilUpload,
//   isValidData,
//   exportFor,
//   currentRole,
//   notesForData,
// }: {
//   modal: ModalTypes;
//   formFields: Map<
//     string,
//     {
//       isRequired: boolean;
//       value: string;
//       name: string;
//       defaultValue?: unknown;
//     }
//   >;
//   validationSchema: any;
//   defaultValue?: { [key: string]: unknown };
//   DynamicValueComponent?: any;
//   handleBulkUploadSubmit: (data: FormikValues) => Promise<void>;
//   allowFileUpload?: boolean;
//   setAllowFilUpload?: (status: boolean) => void;
//   isValidData?: boolean;
//   exportFor: string;
//   currentRole?: RoleFields;
//   notesForData?: Array<string>;
// }) => {
//   const dispatch = useDispatch();
//   const workbook = new ExcelJS.Workbook();
//   const initialValues: Record<string, string> = {
//     ExcelUploadData: '',
//   };
//   const { t } = useTranslation();
//   const { exportDataFunc } = useHandleExport();

//   const [structure, setStructure] = useState<{ [key: number]: string }>({});
//   const [isRestructure, setIsRestructure] = useState<boolean>(false);
//   const [workbookData, setWorkbookData] = useState<ExcelJS.Worksheet>();
//   const [dropdownOptions, setDropdownOptions] = useState<unknown[]>([]);

//   useEffect(() => {
//     if (modal.isOpen) {
//       setIsRestructure(false);
//     }
//   }, [modal.isOpen]);

//   const validateJsonArray = async (jsonObject: { [key: string]: unknown }) => {
//     try {
//       await validationSchema.validate(jsonObject, { abortEarly: false });
//       return [];
//     } catch (error) {
//       return error || [];
//     }
//   };

//   const createNestedObject = (
//     keys: string,
//     value: unknown,
//     result: { [key: string]: any }
//   ) => {
//     const keyParts = keys.split('.');
//     let currentLevel = result;

//     for (let i = 0; i < keyParts.length; i++) {
//       const part = keyParts[i];
//       if (i === keyParts.length - 1) {
//         currentLevel[part] = value;
//       } else {
//         if (!currentLevel[part]) {
//           currentLevel[part] = {};
//         }
//         currentLevel = currentLevel[part];
//       }
//     }

//     return result;
//   };

//   const newFunction = (
//     temp: { [key: string]: unknown },
//     value: unknown,
//     columnKey: string
//   ) => {
//     if (columnKey?.includes('.')) {
//       let result: { [key: string]: unknown } = {};
//       if (temp[columnKey.split('.')[0]]) {
//         result = {
//           [columnKey.split('.')[0]]: temp[columnKey.split('.')[0]],
//         };
//       }
//       result = createNestedObject(columnKey, value, result);
//       temp[columnKey.split('.')[0]] = result[columnKey.split('.')[0]];
//     } else {
//       temp[columnKey] = value;
//     }
//   };

//   const generateResponse = async (
//     worksheet: ExcelJS.Worksheet,
//     excelStructure: { [key: number]: string }
//   ) => {
//     const restructuredData: { [key: string]: string } = {};
//     let isSuccess = true;
//     Array.from(formFields.keys()).forEach((data) => {
//       if (formFields.get(data)?.value) {
//         restructuredData[String(formFields.get(data)?.value)] = String(data);
//       }
//     });
//     const responseArray: FormikValues[] = [];
//     if (worksheet) {
//       const allData = worksheet.getSheetValues();
//       for (const rowIndex in allData) {
//         if (
//           allData?.[rowIndex] &&
//           rowIndex !== '1' &&
//           isSuccess &&
//           !_.isEmpty(allData?.[rowIndex])
//         ) {
//           const row: any = allData[rowIndex];
//           const temp: { [key: string]: unknown } = {};
//           Array.from(formFields.keys()).forEach((data) => {
//             if (!data.includes('.')) {
//               temp[String(data)] = '';
//             }
//           });
//           for (const colNumber in row) {
//             if (String(row[colNumber])) {
//               if (restructuredData[excelStructure[Number(colNumber)]]) {
//                 newFunction(
//                   temp,
//                   row[colNumber],
//                   restructuredData[excelStructure[Number(colNumber)]]
//                 );
//               }
//             }
//           }

//           if (defaultValue) {
//             Object.keys(defaultValue).forEach((key: string) => {
//               newFunction(temp, defaultValue[key], key);
//             });
//           }

//           const resp: { errors?: string[] } = await validateJsonArray(temp);

//           if (resp?.errors && resp?.errors?.length > 0) {
//             dispatch(
//               setToast({
//                 variant: 'Error',
//                 message: `${resp.errors[0]} on line ${rowIndex}`,
//                 type: 'error',
//                 id: customRandomNumberGenerator(),
//               })
//             );
//             isSuccess = false;
//           }
//           responseArray.push(temp);
//         }
//       }
//     }

//     if (isSuccess) {
//       await handleBulkUploadSubmit(responseArray);
//     }
//   };

//   const handleDataStructure = (
//     worksheet: ExcelJS.Worksheet,
//     excelStructure: { [key: number]: string }
//   ) => {
//     if (
//       compareArrays(
//         Array.from(formFields.values())
//           .filter((data) => data.isRequired)
//           .map((data) => data.value)
//           .sort((a, b) => a.localeCompare(b)),
//         Object.values(excelStructure).sort((a, b) => a.localeCompare(b))
//       )
//     ) {
//       Array.from(formFields.keys()).forEach((data) => {
//         if (formFields?.get(data) && !formFields?.get(data)?.defaultValue) {
//           formFields.set(data, {
//             isRequired: formFields.get(data)?.isRequired ?? false,
//             value: formFields.get(data)?.name ?? '',
//             name: formFields.get(data)?.name ?? '',
//           });
//         }
//       });
//       generateResponse(worksheet, excelStructure);
//     } else {
//       setIsRestructure(true);
//     }
//   };

//   const compareArrays = (arr1: string[], arr2: string[]): boolean => {
//     for (let i = 0; i < arr1.length; i++) {
//       if (arr1[i] !== arr2[i]) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const OnSubmit = async (excelData: FormikValues) => {
//     let isSuccess = true;
//     if (excelData) {
//       await workbook.xlsx.load(excelData.ExcelUploadData);
//       const worksheet = workbook.getWorksheet(1);
//       const excelStructure: { [key: number]: string } = {};
//       if (worksheet) {
//         setWorkbookData(worksheet);
//         const rowData: any = worksheet.getRow(1).values;
//         if (rowData) {
//           rowData?.forEach((data: string, rowIndex: number) => {
//             excelStructure[Number(rowIndex)] = String(data);
//           });
//           const dropDownOpts: unknown[] = [];
//           rowData.forEach((field: string) => {
//             Array.from(formFields.keys()).forEach((data) => {
//               if (
//                 formFields.get(data) &&
//                 !formFields.get(data)?.defaultValue &&
//                 formFields.get(data)?.name === field
//               ) {
//                 formFields.set(data, {
//                   isRequired: Boolean(formFields.get(data)?.isRequired),
//                   value: field,
//                   name: String(formFields.get(data)?.name),
//                 });
//               }
//               if (dropDownOpts.indexOf(field) === -1) {
//                 dropDownOpts.push(field);
//               }
//             });
//           });
//           Array.from(formFields.keys()).forEach((field) => {
//             const index = dropDownOpts.indexOf(formFields.get(field)?.value);
//             if (index !== -1) {
//               dropDownOpts.splice(index, 1);
//             }
//           });
//           setDropdownOptions(dropDownOpts);
//           const checkLength = Array.from(formFields.values()).filter(
//             (data) => data.isRequired
//           )?.length;

//           setStructure(excelStructure);
//           if (Number(Object.values(excelStructure).length) < Number(checkLength)) {
//             isSuccess = false;
//             dispatch(
//               setToast({
//                 variant: 'Error',
//                 message: 'Please enter columns as the minimum required fields.',
//                 type: 'error',
//                 id: customRandomNumberGenerator(),
//               })
//             );
//           }
//           if (isSuccess) {
//             handleDataStructure(worksheet, excelStructure);
//           }
//         }
//       }
//     }
//   };

//   return (
//     <Modal
//       headerTitle={t('BulkUploadModal.title')}
//       modal={modal}
//       closeOnOutsideClick
//     >
//       {allowFileUpload ? (
//         <Formik
//           enableReinitialize
//           initialValues={initialValues}
//           // validationSchema={CategoryValidation()}
//           onSubmit={(values) => OnSubmit(values)}
//         >
//           {({ values, setFieldValue }) => (
//             <Form>
//               <div className="bg-[#F9FAFD] py-6 px-5">
//                 <ul className="list-decimal pl-3">
//                   <li className="text-[#111111] text-sm mb-1">
//                     {t('BulkUpload.sample.text')}
//                   </li>
//                   <li className="text-[#111111] text-sm">
//                     {t('BulkUpload.sample.subtext')}
//                   </li>
//                 </ul>
//                 <Button
//                   className="min-w-[90px] w-fit mt-5"
//                   variants="grayOutline"
//                   onClickHandler={() => {
//                     if (currentRole || exportFor) {
//                       exportDataFunc({
//                         currentRole,
//                         exportFor,
//                       });
//                     }
//                   }}
//                 >
//                   <div className="flex">
//                     <Image
//                       iconName="downloadFile"
//                       iconClassName="stroke-current w-5 h-5 mr-2"
//                       width={24}
//                       height={24}
//                     />
//                     {t('BulkUpload.sample.downloadText')}
//                   </div>
//                 </Button>
//               </div>
//               {!isRestructure ? (
//                 <DropZone
//                   variant={fileInputEnum.FileInputXLS}
//                   parentClass="mt-3"
//                   acceptTypes={BULK_UPLOAD_FORMATS.toString()}
//                   value={values.ExcelUploadData}
//                   label={t('BulkUploadModal.title')}
//                   SubTitle={t('BulkUploadModal.desc')}
//                   name="ExcelUploadData"
//                   setValue={setFieldValue}
//                   fileType={EnumFileType.Document}
//                   isCompulsory
//                   // parentClass="mt-4"
//                   fileInputIcon="fileIcon"
//                 />
//               ) : (
//                 ''
//               )}
//               {isRestructure ? (
//                 <>
//                   {Array.from(formFields.keys())
//                     .filter((data) => !formFields.get(data)?.defaultValue)
//                     .map((data) => (
//                       <div key={customRandomNumberGenerator()}>
//                         <div className="p-1">
//                           <ReactSelect
//                             label={formFields.get(data)?.name}
//                             isMulti={false}
//                             options={
//                               dropdownOptions?.length > 0
//                                 ? dropdownOptions.map((data) => ({
//                                     label: String(data),
//                                     value: String(data),
//                                   }))
//                                 : []
//                             }
//                             placeholder={String(formFields.get(data)?.value)}
//                             onChange={(value) => {
//                               const temp = [...dropdownOptions];
//                               temp.push(formFields.get(data)?.value);
//                               if (
//                                 formFields.get(data) &&
//                                 !formFields.get(data)?.defaultValue
//                               ) {
//                                 formFields.set(data, {
//                                   isRequired:
//                                     formFields.get(data)?.isRequired ?? false,
//                                   value: String((value as Option).value),
//                                   name: formFields.get(data)?.name ?? '',
//                                 });
//                                 setDropdownOptions(
//                                   temp.filter(
//                                     (item) => item !== (value as Option).value
//                                   )
//                                 );
//                               }
//                             }}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                 </>
//               ) : (
//                 ''
//               )}
//               <div className="grid grid-cols-1 768:grid-cols-2 gap-y-2.5 mt-5">
//                 {notesForData &&
//                   notesForData?.map((notes, index) => (
//                     <div
//                       className="flex gap-1 items-center"
//                       key={`notes_${index + 1}`}
//                     >
//                       <Image
//                         iconName="checkRoundIcon2"
//                         iconClassName="w-4 h-4 text-grayText"
//                       />
//                       <Button className="text-xs text-dark font-medium">
//                         {notes}
//                       </Button>
//                     </div>
//                   ))}
//               </div>
//               <div className="flex justify-end gap-4 col-span-2 mt-3">
//                 <Button
//                   className="min-w-[90px]"
//                   variants="whiteBordered"
//                   onClickHandler={() => {
//                     setAllowFilUpload?.(false);
//                     modal.closeModal();
//                   }}
//                 >
//                   {t('Button.cancelButton')}
//                 </Button>

//                 {isRestructure ? (
//                   <Button
//                     className="min-w-[90px]"
//                     type="button"
//                     variants="primary"
//                     onClickHandler={() => {
//                       generateResponse(workbookData as ExcelJS.Worksheet, structure);
//                     }}
//                   >
//                     {t('Button.submit')}
//                   </Button>
//                 ) : (
//                   <Button className="min-w-[90px]" type="submit" variants="primary">
//                     {t('Button.submit')}
//                   </Button>
//                 )}
//               </div>
//             </Form>
//           )}
//         </Formik>
//       ) : (
//         <>
//           <DynamicValueComponent />
//           <div className="flex justify-center gap-4 col-span-2 mt-3">
//             <Button
//               className="mt-4 min-w-[120px]"
//               variants="primary"
//               onClickHandler={() => {
//                 if (isValidData) {
//                   setAllowFilUpload?.(true);
//                 } else {
//                   dispatch(
//                     setToast({
//                       variant: 'Error',
//                       message: t('bulkUploadValidation.SelectRequiredFields'),
//                       type: 'error',
//                       id: customRandomNumberGenerator(),
//                     })
//                   );
//                 }
//               }}
//             >
//               {t('Auth.RegisterCommon.nextButtonText')}
//             </Button>
//           </div>
//         </>
//       )}
//     </Modal>
//   );
// };

const BulkUploadModal = () => {
  return <h1>hello</h1>;
};

export default BulkUploadModal;
