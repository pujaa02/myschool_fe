// import Routes from './routes';

// const App = () => {
//   return <Routes />;
// };

// export default App;

import Routes from './routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App = () => {
  const router = createBrowserRouter(Routes());
  return <RouterProvider router={router} />;
};

export default App;
