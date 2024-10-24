/* eslint-disable @typescript-eslint/no-unused-vars */
import { Suspense, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getLanguagesHook, getCountriesJsonAPI } from './hooks/useCommonData';
import { getActiveUserDataApi } from './modules/Auth/services';
// import { useLanguage } from './redux-toolkit/slices/languageSlice';
// import { currentPageCount } from './redux-toolkit/slices/paginationSlice';
// import { ActiveSelector } from './redux-toolkit/slices/sidebarSlice';
import { getAuthToken } from './redux-toolkit/slices/tokenSlice';
import { RootStateType } from './redux-toolkit/store';
import { PUBLIC_NAVIGATION } from './constants/navigation.constant';
import HandleAuth from './modules/Auth/components/FuttureInCloud/HandleAuth';
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { useRolePermission } from './hooks/useRolePermission';
import Loaders from './components/Loaders';
// import RequiresAuth from './modules/Auth/components/RequiresAuth';
import React from 'react';
import AuthenticationRoutes from './modules/Auth/routes';
import PageLoader from './components/Loaders/PageLoader';

const applySuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: <Suspense fallback={<PageLoader />}>{route.element}</Suspense>,
  }));
};

// ** Auth Routes
const RequiresUnAuth = React.lazy(
  () => import('./modules/Auth/components/RequiresUnAuth')
);

// ** Not-Found Routes
const NotFound = React.lazy(() => import('./modules/Auth/pages/NotFound'));

// ** Dashboard Routes
// const Dashboard = React.lazy(() => import('./modules/DashBoard'));

// ** Types **
export type RouteObjType = {
  path?: string;
  element: JSX.Element;
  children?: RouteObject[];
  errorElement?: JSX.Element;
  feature?: string;
  permission?: string;
};

// export const applyRequiresAuth = (routes: RouteObjType[]): RouteObjType[] => {
//   return routes.map((route) => ({
//     ...route,
//     element: <RequiresAuth>{route.element}</RequiresAuth>,
//   }));
// };

const Routes = () => {
  const authData = useSelector((state: RootStateType) => state.auth);
  // const { i18n } = useTranslation();
  const { getLanguages, isLoading: isLanguageLoading } = getLanguagesHook();
  const { getCountriesJson, isLoading: isCountryLoading } =
    getCountriesJsonAPI();
  const { getActiveUser, isLoading: isAcitveUserLoading } =
    getActiveUserDataApi();
  // const storeLang = useSelector(useLanguage);
  const { token } = useSelector(getAuthToken);
  // const activeSideBar = useSelector(ActiveSelector);

  // const dispatch = useDispatch();

  const { isAuthenticated } = authData;

  const getUserData = async () => {
    if (
      token &&
      !isAuthenticated &&
      !window.location.href.includes(PUBLIC_NAVIGATION.somethingWentWrong)
    ) {
      await getActiveUser();
    }
  };
  useEffect(() => {
    getUserData();
    getCountriesJson();
    getLanguages();
  });
  // ** Not Logged In **

  if (
    !isAuthenticated &&
    token == null &&
    ![...Object.values(PUBLIC_NAVIGATION)].includes(window.location.pathname)
  ) {
    window.location.pathname = PUBLIC_NAVIGATION.login;
  }
  // ** Un-Auth
  const routesForNotAuthenticatedOnly: RouteObjType[] = applySuspense([
    {
      element: <RequiresUnAuth />,
      children: AuthenticationRoutes,
    },
  ]);

  const routesForPublic: RouteObjType[] = [
    {
      path: '/auth',
      element: <HandleAuth />,
    },
  ];
  const notFound: RouteObjType[] = [
    {
      path: '*',
      element: (
        <Suspense fallback={<Loaders type="SiteLoader" />}>
          {isCountryLoading || isAcitveUserLoading ? (
            <Loaders type="SiteLoader" />
          ) : (
            <NotFound />
          )}
        </Suspense>
      ),
    },
  ];
  // const routesForAuthenticatedOnly: RouteObjType[] = applyRequiresAuth([
  //   {
  //     path: PRIVATE_NAVIGATION.notFoundPage,
  //     element: <NotFound />,
  //   },
  //   {
  //     path: PRIVATE_NAVIGATION.dashboard.view.path,
  //     element: <Dashboard />,
  //   },
  // ]);
  let finalRoutes = [
    ...routesForPublic,
    ...notFound,
    // ...routesForAuthenticatedOnly,
    ...routesForNotAuthenticatedOnly,
  ];
  finalRoutes = finalRoutes.filter((route) => {
    if (route?.feature && route?.permission)
      return useRolePermission(route.feature, route.permission);
    return true;
  });
  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter(finalRoutes);
  if (isLanguageLoading) {
    return <Loaders type="SiteLoader" />;
  }

  return <RouterProvider router={router} />;
};

export default Routes;
