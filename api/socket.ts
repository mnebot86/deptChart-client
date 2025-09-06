import { io, Socket } from 'socket.io-client';

const SERVER_URL = process.env.EXPO_PUBLIC_SOCKET_BASE_URL;

let socket: Socket;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SERVER_URL, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('✅ Connected to Socket.IO');
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from Socket.IO');
    });
  }

  return socket;
};
