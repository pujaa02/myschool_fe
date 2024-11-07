import { REACT_APP_API_BASE_URL } from 'config';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSocket,
  socketSelector,
} from '../../redux-toolkit/slices/socketSlice';
import { getAuthToken } from 'redux-toolkit/slices/tokenSlice';
import openSocket from 'socket.io-client';

// ** constants **
import { socketName } from 'constants/common.constant';
import { PUBLIC_NAVIGATION } from 'constants/navigation.constant';

const SocketComponent = () => {
  const dispatch = useDispatch();
  const socket = useSelector(socketSelector);
  const token = useSelector(getAuthToken);

  socket?.on(socketName.NEW_ROOM, (data) => {
    socket.emit(socketName.JOIN_ROOM, data);
  });

  const connectSocket = async () => {
    const url = REACT_APP_API_BASE_URL;
    const socketTemp = openSocket(url as string, {
      forceNew: true,
      transports: ['websocket'],
      query: {
        ...token,
      },
    });
    dispatch(setSocket(socketTemp));
  };

  useEffect(() => {
    if (
      token &&
      !window.location.href.includes(PUBLIC_NAVIGATION.somethingWentWrong)
    ) {
      connectSocket();
    }
  }, []);

  return <></>;
};
export default SocketComponent;
