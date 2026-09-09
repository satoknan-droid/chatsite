"use client";

import { useState } from "react";

import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import bcrypt from "bcryptjs";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [password, setPassword] =
    useState("");

  const createRoom = async () => {
    if (
      !name ||
      !room ||
      !password
    ) {
      alert(
        "すべて入力してください"
      );
      return;
    }

    const passwordHash =
      await bcrypt.hash(
        password,
        10
      );

    await addDoc(
      collection(db, "rooms"),
      {
        owner: name,
        roomName: room,
        passwordHash,
        createdAt: Date.now(),
      }
    );

    alert("部屋を作成しました");

    setName("");
    setRoom("");
    setPassword("");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h1>部屋作成</h1>

        <input
          placeholder="名前"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          }}
        />

        <input
          placeholder="部屋名"
          value={room}
          onChange={(e) =>
            setRoom(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          }}
        />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          }}
        />

        <button
          onClick={createRoom}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          作成
        </button>
      </div>
    </main>
  );
}
