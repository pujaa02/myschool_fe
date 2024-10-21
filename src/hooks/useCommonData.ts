import { REACT_APP_API_URL } from 'config';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCities,
  setCountries,
  setState,
} from 'redux-toolkit/slices/countryJsonSlice';
import {
  AllLanguages,
  setAllLanguage,
  setDefaultLanguage,
  setLanguage,
  useLanguage,
} from 'redux-toolkit/slices/languageSlice';
import { useAxiosGet } from './useAxios';

export const getCountriesJsonAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();
  const dispatch = useDispatch();
  const getCountriesJson = async (data: object = {}) => {
    const resp = callApi(`${REACT_APP_API_URL}/getCountriesJson`, data).then(
      (resp) => {
        if (
          resp?.data &&
          resp?.data?.countries?.length > 0 &&
          resp?.data?.states?.length > 0 &&
          resp?.data?.cities?.length > 0
        ) {
          dispatch(setCountries(resp.data.countries));
          dispatch(setState(resp.data.states));
          dispatch(setCities(resp.data.cities));
        }
      }
    );
    return resp;
  };

  return { getCountriesJson, isError, isLoading, isSuccess };
};

export const getLanguagesHook = () => {
  const dispatch = useDispatch();
  const storeLang = useSelector(useLanguage);

  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();
  const getLanguages = async (data: object = {}) => {
    const resp = await callApi(`${REACT_APP_API_URL}/getLanguages`, data);
    if (resp?.data) {
      const defaultLanguage = resp?.data?.find(
        (lang: AllLanguages) => lang.is_default
      )?.short_name;

      dispatch(
        setDefaultLanguage({
          defaultLanguage,
        })
      );
      dispatch(
        setLanguage({
          language: storeLang?.language ? storeLang?.language : defaultLanguage,
        })
      );
      dispatch(
        setAllLanguage({
          allLanguages: resp?.data,
        })
      );
    }

    return resp;
  };

  return { getLanguages, isError, isLoading, isSuccess };
};
