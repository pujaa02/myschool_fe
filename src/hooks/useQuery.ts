import { useQuery } from '@tanstack/react-query';
import { AxiosHeaderValue } from 'axios';
import { REACT_APP_API_URL } from 'config';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLanguage } from 'redux-toolkit/slices/languageSlice';
import { QueryOptions } from 'types/common';
import { useAxiosGet } from './useAxios';

export const useQueryGetFunction = (
  url: string,
  options?: QueryOptions,
  header?: { [key: string]: AxiosHeaderValue },
  disableRecallLang?: boolean
) => {
  const { page, limit, search, sort, role, option } = options ?? {};
  const [getRequest, { isLoading, isError, isSuccess }] = useAxiosGet();
  const storeLang = useSelector(useLanguage);
  const config = header ? { headers: { ...header } } : {};
  const queryKey = [url, page, limit, search, sort, role, option].filter(Boolean);
  const obj = {
    ...(page !== undefined && page !== null && { page }),
    ...(limit !== undefined && limit !== null && { limit }),
    ...(search !== undefined && search !== null && search !== '' && { search }),
    ...(sort !== undefined && sort !== null && { sort }),
    ...(role !== undefined && role !== null && { role }),
  };

  useEffect(() => {
    if (!disableRecallLang) {
      refetch();
    }
  }, [storeLang.language]);

  const headers = {
    params: {
      ...obj,
      ...option,
    },
    ...config,
  };

  const { status, data, error, refetch } = useQuery({
    queryKey,
    queryFn: () => getRequest(REACT_APP_API_URL + url, headers),
    refetchOnWindowFocus: false,
  });
  return {
    status,
    error,
    refetch,
    response: data,
    isLoading,
    isError,
    isSuccess,
  };
};
