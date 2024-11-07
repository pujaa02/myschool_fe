import Button from 'components/Button/Button';
import 'components/Layout/components/style/topHeader.css';
import { languageConstant } from 'constants/common.constant';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LanguageType,
  setLanguage,
  useLanguage,
} from 'redux-toolkit/slices/languageSlice';
import { customRandomNumberGenerator } from 'utils';

type langProps = {
  isCommon?: boolean;
};
export const LanguagesDropdown = ({ isCommon = false }: langProps) => {
  const dispatch = useDispatch();
  const activeLanguage: LanguageType = useSelector(useLanguage);
  const [allLanguages, setAllLanguages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (activeLanguage?.allLanguages) {
      const returnActiveLanguages = activeLanguage.allLanguages.reduce(
        (acc, item) => ({
          ...acc,
          [item.short_name.toUpperCase()]: item.short_name,
        }),
        {}
      );

      setAllLanguages(returnActiveLanguages);
    }
  }, [activeLanguage?.allLanguages]);

  const languageChange = (currLang: string) => {
    dispatch(setLanguage({ language: currLang }));
  };
  return (
    <div className=" relative group">
      <div
        className={`w-12 h-12 cursor-pointer ${
          isCommon === true ? 'bg-secondary/10' : 'bg-black/5'
        } text-primary rounded-lg flex items-center justify-center font-semibold`}
      >
        {activeLanguage?.language?.toLocaleUpperCase()}
      </div>
      {/* LANGUAGE MENU */}
      <div className="translate-y-4 opacity-0 pointer-events-none group-hover:-translate-y-px group-hover:opacity-100 group-hover:pointer-events-auto  absolute top-full flex flex-col gap-y-1 bg-white min-w-[150px] right-0 p-2 rounded-lg shadow-xl border border-solid border-gray-200 transition-all duration-500 after:absolute after:w-full after:h-4 after:bottom-full after:right-0">
        {Object.keys(allLanguages).map((data: string) => (
          <Button
            key={customRandomNumberGenerator()}
            onClickHandler={() =>
              languageChange(allLanguages[data] || languageConstant.it)
            }
            className="flex hover:bg-primary hover:text-white py-2 px-2 rounded-md text-sm font-semibold cursor-pointer transition-all duration-300 w-full"
          >
            <span className="block">{data}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
