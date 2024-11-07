import Button from 'components/Button/Button';
import 'components/Layout/components/style/topHeader.css';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import {
  CompanyType,
  setCompany,
  useCompany,
} from 'redux-toolkit/slices/companySlice';
import { customRandomNumberGenerator } from 'utils';

export interface CompanyDropdownProps {
  id: string | undefined;
  name: string | undefined;
  slug: string | undefined;
}

export const CompanyDropdown = () => {
  const CurrentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const activeCompany: CompanyType = useSelector(useCompany);

  const [allCompanies, setAllCompanies] = useState<
    { id?: string; name?: string; slug?: string }[]
  >([]);

  useEffect(() => {
    if (
      Array.isArray(CurrentUser?.manager?.company_manager) &&
      CurrentUser?.manager?.company_manager &&
      CurrentUser?.manager?.company_manager?.length > 0
    ) {
      const companiesArray = CurrentUser?.manager?.company_manager
        .map((item) => {
          if (item.company !== null) {
            return {
              id: item?.company?.id,
              name: item?.company?.name,
              slug: item?.company?.slug,
            };
          }
          return null;
        })
        .filter((data) => data !== null);
      if (_.isEmpty(activeCompany?.company)) {
        dispatch(setCompany({ company: companiesArray[0] }));
      }
      if (Array.isArray(companiesArray) && companiesArray.length > 0) {
        setAllCompanies(companiesArray as CompanyDropdownProps[]);
      }
    }
  }, [CurrentUser?.manager?.company_manager]);
  const companyChange = (currCompany: {
    id?: string;
    name?: string;
    slug?: string;
  }) => {
    dispatch(setCompany({ company: currCompany }));
  };

  return (
    <div className="relative group">
      <div className="company-dropdown-title !w-auto px-3 z-10 relative">
        {allCompanies.length > 0 ? activeCompany?.company?.name : 'No Company Found'}
      </div>
      {allCompanies.length > 0 && (
        <div
          className={`company-dropdown-card ${
            allCompanies.length > 1 && 'has-values'
          }`}
        >
          {allCompanies.map((data: { id?: string; name?: string }) => (
            <Button
              key={customRandomNumberGenerator()}
              onClickHandler={() => companyChange(data)}
              className="company-card-button"
            >
              <span className="block">{data?.name}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
