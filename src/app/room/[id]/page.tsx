"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "../../../firebase/config";

export default function RoomPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [lastSend, setLastSend] = useState(0);

  const params = useParams();

  const roomId = params.id as string;

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("roomId", "==", roomId),
      orderBy("createdAt", "asc")
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
  }, [roomId]);

  const sendMessage = async () => {
    if (!name || !message) return;

    const now = Date.now();

    if (now - lastSend < 3000) {
      alert("3秒待ってから送信してください");
      return;
    }

    setLastSend(now);

    await addDoc(collection(db, "messages"), {
      roomId,
      user: name,
      text: message,
      createdAt: now,
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
              marginBottom: "15px",
              paddingBottom: "10px",
              borderBottom: "1px solid #334155",
            }}
          >
            <b>{msg.user}</b>

            <div>{msg.text}</div>

            <small
              style={{
                color: "#94a3b8",
              }}
            >
              {new Date(msg.createdAt).toLocaleString(
                "ja-JP"
              )}
            </small>
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
