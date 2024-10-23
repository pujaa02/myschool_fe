// ** external packages **
import { useRef } from 'react';
import { Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { convertAtoB, convertBtoA } from 'utils/util';

// ** types **
import { FormFieldProps } from '../types/formField.types';

const RichTextEditorFormField = <TFormValues extends Record<string, unknown>>(
  fieldProps: FormFieldProps<TFormValues>
) => {
  const {
    id,
    label,
    required,
    name,
    error,
    icon,
    iconPosition,
    control,
    labelClass = '',
    placeholder,
    editorRef,
  } = fieldProps;

  const quillRef = useRef<ReactQuill | null>(null);

  return (
    <>
      <label htmlFor={id} className={`if__label ${labelClass}`}>
        {label}
        {required ? <span className="required__sign">*</span> : ''}
      </label>
      <div
        className={`${icon ? 'ipel__wrapper ip__form__hasIcon' : ''}
       ${iconPosition === 'right' ? 'ip__form__hasIcon__right' : ''} `}
      >
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => {
            // if (quillRef.current && value) {
            //   const editor = quillRef.current.getEditor(); // Access Quill editor instance
            //   editor.root.innerHTML = convertAtoB(value) as string; // Set the converted value
            // }

            return (
              <ReactQuill
                id="inlineRTE"
                ref={editorRef || quillRef}
                value={value ? convertAtoB(value) : ''}
                onChange={(content) =>
                  onChange(content ? convertBtoA(content) : '')
                }
                placeholder={placeholder}
                modules={{
                  toolbar: [
                    [{ font: [] }, { size: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ color: [] }, { background: [] }],
                    [{ script: 'sub' }, { script: 'super' }],
                    [
                      { header: '1' },
                      { header: '2' },
                      'blockquote',
                      'code-block',
                    ],
                    [
                      { list: 'ordered' },
                      { list: 'bullet' },
                      { indent: '-1' },
                      { indent: '+1' },
                    ],
                    [{ direction: 'rtl' }, { align: [] }],
                    ['link', 'image', 'video'],
                    ['clean'], // Remove formatting button
                    ['undo', 'redo'], // Undo/Redo
                  ],
                }}
                formats={[
                  'header',
                  'font',
                  'size',
                  'bold',
                  'italic',
                  'underline',
                  'strike',
                  'blockquote',
                  'list',
                  'bullet',
                  'indent',
                  'link',
                  'image',
                  'video',
                  'color',
                  'background',
                  'align',
                ]}
              />
            );
          }}
        />
      </div>
      {error && <p className="ip__Error">{error.message}</p>}
    </>
  );
};

export default RichTextEditorFormField;

// // ** external packages **
// import {
//   HtmlEditor,
//   Image,
//   Inject,
//   Link,
//   MarkdownEditor,
//   QuickToolbar,
//   RichTextEditorComponent,
//   Toolbar,
// } from '@syncfusion/ej2-react-richtexteditor';
// import { useRef } from 'react';
// import { Controller } from 'react-hook-form';
// import { convertAtoB, convertBtoA } from 'utils/util';

// // ** types **
// import { FormFieldProps } from '../types/formField.types';

// // this componet is replaced with file TempRichTextEditorFormField
// // not removing this component for now
// const RichTextEditorFormField = <TFormValues extends Record<string, unknown>>(
//   fieldProps: FormFieldProps<TFormValues>
// ) => {
//   const {
//     id,
//     label,
//     required,
//     name,
//     error,
//     icon,
//     iconPosition,
//     control,
//     labelClass = '',
//     placeholder,
//     editorRef,
//   } = fieldProps;

//   const ref = useRef<RichTextEditorComponent>(null);

//   return (
//     <>
//       <label htmlFor={id} className={`if__label ${labelClass}`}>
//         {label}
//         {required ? <span className="required__sign">*</span> : ''}
//       </label>
//       <div
//         className={`${icon ? 'ipel__wrapper ip__form__hasIcon' : ''}
//        ${iconPosition === 'right' ? 'ip__form__hasIcon__right' : ''} `}
//       >
//         <Controller
//           name={name}
//           control={control}
//           render={({ field: { onChange, value } }) => {
//             if (ref.current && value) {
//               ref.current.value = convertAtoB(value) as unknown as string;
//             }
//             return (
//               <>
//                 <RichTextEditorComponent
//                   placeholder={placeholder}
//                   id="inlineRTE"
//                   saveInterval={0}
//                   autoSaveOnIdle
//                   change={(e) => onChange(e.value ? convertBtoA(e.value) : '')}
//                   quickToolbarSettings={{ actionOnScroll: 'none' }}
//                   toolbarSettings={{
//                     items: [
//                       'Bold',
//                       'Italic',
//                       'Underline',
//                       'StrikeThrough',
//                       'FontName',
//                       'FontSize',
//                       'FontColor',
//                       'BackgroundColor',
//                       '-',
//                       'LowerCase',
//                       'UpperCase',
//                       'Formats',
//                       'Alignments',
//                       'NumberFormatList',
//                       'BulletFormatList',
//                       'Indent',
//                       'Outdent',
//                       '-',
//                       'CreateLink',
//                       'Image',
//                       'ClearFormat',
//                       'Print',
//                       'SourceCode',
//                       'FullScreen',
//                       'Undo',
//                       'Redo',
//                     ],
//                   }}
//                   format={{ width: 'auto' }}
//                   inlineMode={{
//                     enable: true,
//                     onSelection: true,
//                   }}
//                   insertImageSettings={{
//                     saveFormat: 'Base64',
//                   }}
//                   ref={ref || editorRef}
//                   name={name}
//                 >
//                   <Inject
//                     services={[
//                       Toolbar,
//                       Image,
//                       Link,
//                       HtmlEditor,
//                       QuickToolbar,
//                       MarkdownEditor,
//                     ]}
//                   />
//                 </RichTextEditorComponent>
//               </>
//             );
//           }}
//         />
//       </div>
//       {error && <p className="ip__Error">{error.message}</p>}
//     </>
//   );
// };
// export default RichTextEditorFormField;
