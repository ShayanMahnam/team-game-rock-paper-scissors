import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState({});
  const [room, setRoom] = useState({});
  const [player_1, setPlayer_1] = useState("");
  const [player_2, setPlayer_2] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io("https://test-socket-server.glitch.me/");
    setSocket(socket);

    socket.on("room:get", (payload) => {
      console.log(payload);
      setRoom(payload);
      let play_1 = Object.keys(payload.players)[0];
      let play_2 = Object.keys(payload.players)[1];

      if (play_1 === socket.id) {
        setPlayer_1(play_1);
        setPlayer_2(play_2);
      } else {
        setPlayer_1(play_2);
        setPlayer_2(play_1);
      }
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        room,
        setRoom,
        player_1,
        player_2,
        navigate,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider, SocketContext };
