"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  doc,
  getDoc
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import bcrypt from "bcryptjs";

export default function JoinRoom({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const joinRoom = async () => {
    const roomRef = doc(
      db,
      "rooms",
      params.id
    );

    const roomSnap =
      await getDoc(roomRef);

    if (!roomSnap.exists()) {
      alert("部屋がありません");
      return;
    }

    const roomData = roomSnap.data();

    const ok = await bcrypt.compare(
      password,
      roomData.passwordHash
    );

    if (!ok) {
      alert(
        "パスワードが違います"
      );
      return;
    }

    router.push(
      `/room/${params.id}`
    );
  };

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "20px",
          background: "#1e293b",
          borderRadius: "12px",
        }}
      >
        <h1>部屋へ入る</h1>

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
          onClick={joinRoom}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
          }}
        >
          入室
        </button>
      </div>
    </main>
  );
}
