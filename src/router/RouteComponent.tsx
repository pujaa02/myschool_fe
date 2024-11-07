import {
  BasicPermissionTypes,
  ModuleNames,
} from 'constants/permisssion.constant';
import { Route, Routes } from 'react-router-dom';
import {
  generalRoutes,
  privateRoutes,
  publicRoutes,
} from './routes/crm.routes';
import SiteLoader from 'components/Loaders/SiteLoader';
import { Suspense } from 'react';
import RequiresUnAuth from 'modules/Auth/components/RequiresUnAuth';
import RequiresAuth from 'modules/Auth/components/RequiresAuth';
import PageLoader from 'components/Loaders/PageLoader';
import NotFound from 'modules/Auth/pages/NotFound';
import DashBoardLayout from 'modules/DashBoard/components/DashBoardLayout';
export interface RouteAttribute {
  path: string;
  component: JSX.Element;
  name?: string;
  module?: ModuleNames;
  type?: BasicPermissionTypes;
}

const RouteComponent = () => {
  // const location = useLocation();
  // const { getAndSetCSRFtoken } = useGetAndSetCSRFtoken();
  // const csrfExpiryTime = useSelector(getCSRFExpiryTime);
  // useEffect(() => {
  //   const date = csrfExpiryTime || new Date();
  //   const shouldCall = new Date(date).getTime() - new Date().getTime() <= 0;

  //   if (shouldCall) {
  //     getAndSetCSRFtoken();
  //   }
  // }, [location.pathname]);
  return (
    <Routes>
      {generalRoutes &&
        generalRoutes.length > 0 &&
        generalRoutes.map((route: RouteAttribute) => {
          return route.component ? (
            <Route
              key={route.path}
              path={route.path}
              element={
                // <TwoFactorProvider pathName={route.path}>
                <Suspense fallback={<SiteLoader />}>{route.component}</Suspense>
                // </TwoFactorProvider>
              }
            />
          ) : null;
        })}

      {publicRoutes &&
        publicRoutes.length > 0 &&
        publicRoutes.map((route: RouteAttribute) => {
          return route.component ? (
            <Route
              key={route.path}
              path={route.path}
              element={
                <RequiresUnAuth>
                  <Suspense fallback={<SiteLoader />}>
                    {route.component}
                  </Suspense>
                </RequiresUnAuth>
              }
            />
          ) : null;
        })}

      {privateRoutes &&
        privateRoutes.length > 0 &&
        privateRoutes.map((route: RouteAttribute) => {
          return route.component ? (
            <Route
              key={route.path}
              path={route.path}
              element={
                <RequiresAuth module={route.module} type={route.type}>
                  <DashBoardLayout
                    headerTitle={route.name || 'Welcome EsparkBiz!'}
                  >
                    <Suspense fallback={<PageLoader />}>
                      {route.component}
                    </Suspense>
                  </DashBoardLayout>
                </RequiresAuth>
              }
            />
          ) : null;
        })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteComponent;
