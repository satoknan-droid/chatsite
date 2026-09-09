"use client";

import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../../firebase/config";

export default function RoomPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const roomId = "ROOM_ID";

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("roomId", "==", roomId)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  const sendMessage = async () => {
    if (!message) return;

    await addDoc(collection(db, "messages"), {
      roomId,
      user: name,
      text: message,
      createdAt: Date.now(),
    });

    setMessage("");
  };

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>チャットルーム</h1>

      <input
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <div
        style={{
          height: "500px",
          overflowY: "auto",
          background: "#1e293b",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              marginBottom: "10px",
            }}
          >
            <b>{msg.user}</b>

            <div>{msg.text}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="メッセージを入力"
          style={{
            flex: 1,
            padding: "10px",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
          }}
        >
          送信
        </button>
      </div>
    </main>
  );
}
