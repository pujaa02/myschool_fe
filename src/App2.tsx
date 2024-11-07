// ** Import Packages **
import SiteLoader from 'components/Loaders/SiteLoader';
import { REACT_APP_API_BASE_URL } from 'config';
import useAuthGuard from 'hooks/useAuthGuard';
import { createContext, useEffect, useState } from 'react';
import RouteComponent from 'router/RouteComponent';
// import { useSelector } from 'react-redux';
// import { getAuth } from 'redux-toolkit/slices/authSlice';
import openSocket, { Socket } from 'socket.io-client';

// ** CSS **
import 'tippy.js/dist/tippy.css';

export const context = createContext<Socket | null | undefined>(null);

const App = () => {
  const { isLoading, isAuthInitialized } = useAuthGuard();
  //   const { user } = useSelector(getAuth);

  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    connectSocket();
  }, []);

  const connectSocket = async () => {
    const url: string = REACT_APP_API_BASE_URL || '';
    const socketTemp = openSocket(url, {
      forceNew: true,
      transports: ['websocket'],
      withCredentials: true,
    });
    setSocket(socketTemp);
    socketTemp.emit('join-room');
    socketTemp.emit('join-room-reload-data');
    socketTemp.on('disconnect', () => {
      socketTemp?.emit('leave-room');
      socketTemp.emit('leave-room-reload-data');
    });
    socketTemp.on('connected', () => {
      console.log('Connected.............');
    });
  };
  // isCSRFTokenFetching
  return isLoading || !isAuthInitialized ? (
    <SiteLoader />
  ) : (
    <>
      <context.Provider value={socket}>
        <RouteComponent />
      </context.Provider>
    </>
  );
};

export default App;
