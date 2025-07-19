import { useEffect, useState } from "react";

export function useLiveUpdates() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/api/ws/live");
    ws.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };
    return () => ws.close();
  }, []);

  return data;
}
export function useLiveUpdatesWithToken(token) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/api/ws/live?token=${token}`);
    ws.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };
    return () => ws.close();
  }, [token]);

  return data;
}