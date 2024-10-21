// ** constants **
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

// ** hooks **
import { useAxiosPost } from 'hooks/useAxios';
import { useQueryGetFunction } from 'hooks/useQuery';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HandleAuth = () => {
  const navigate = useNavigate();
  const [resetPasswordApi] = useAxiosPost();
  const { response } = useQueryGetFunction('/futture-in-cloud/oauth');

  useEffect(() => {
    if (response?.data) {
      const query = response?.data?.url;
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code') ?? null;
      if (code == null) {
        window.location.href = query;
      } else {
        getData(code);
        navigate(PUBLIC_NAVIGATION.login);
      }
    }
  }, [response]);

  const getData = async (code: string) => {
    await resetPasswordApi('/futture-in-cloud/verifyToken', { code });
  };

  return <></>;
};

export default HandleAuth;
