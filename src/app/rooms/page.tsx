"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../firebase/config";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    const loadRooms = async () => {
      const snapshot = await getDocs(
        collection(db, "rooms")
      );

      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    loadRooms();
  }, []);

  return (
    <main
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1>部屋一覧</h1>

      {rooms.map((room) => (
        <div
          key={room.id}
          style={{
            background: "#1e293b",
            padding: "15px",
            borderRadius: "10px",
            marginTop: "10px",
          }}
        >
          <h3>{room.roomName}</h3>

          <p>
            作成者: {room.owner}
          </p>

          {`/join/${room.id}`}
            <button
              style={{
                padding: "10px",
              }}
            >
              入室
            </button>
          </Link>
        </div>
      ))}
    </main>
  );
}
