import React, { useState, useRef, useEffect, useCallback } from "react";

const AppWs = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      const webSocket = new WebSocket("ws://localhost:8888/"); // создаем ws соединение
      if (!webSocket) {
        console.error("ws.current is NULL");
        return;
      }
      ws.current = webSocket;
      ws.current.onopen = () => {
        setStatus("Соединение открыто");
        ws.current.send(JSON.stringify({ user: "big" }));
      };
      ws.current.onclose = () => setStatus("Соединение закрыто"); // callback на ивент закрытия соединения

      gettingData();
    }

    return () => ws.current.close(); // кода меняется isPaused - соединение закрывается
  }, [ws, isPaused]);

  const gettingData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e: any) => {
      //подписка на получение данных по вебсокету
      if (isPaused) return;
      const message = e.data;
      setData(message);
    };
  }, [isPaused]);

  console.log(data);
  return (
    <div style={{ color: "black" }}>
      {status}, {"" + data}
    </div>
  );
};

export default AppWs;
