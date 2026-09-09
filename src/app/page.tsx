import Link from "next/link";

export default function Home() {
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
          textAlign: "center",
          background: "#1e293b",
          padding: "40px",
          borderRadius: "20px",
          width: "400px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "20px",
          }}
        >
          Chat App
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          パスワード付きチャットサイト
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          /create
            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: "#2563eb",
                color: "white",
              }}
            >
              部屋を作成
            </button>
          </Link>

          /rooms
            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: "#16a34a",
                color: "white",
              }}
            >
              部屋一覧
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
