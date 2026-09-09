"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import bcrypt from "bcryptjs";

export default function JoinRoom({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const [password, setPassword] = useState("");

  const joinRoom = async () => {
    const roomRef = doc(db, "rooms", params.id);

    const roomSnap = await getDoc(roomRef);

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
      alert("パスワードが違います");
      return;
    }

    router.push(`/room/${params.id}`);
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
        <h1>部屋へ入室</h1>

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
            padding: "10px",
            marginTop: "10px",
          }}
        >
          入室
        </button>
      </div>
    </main>
  );
}
