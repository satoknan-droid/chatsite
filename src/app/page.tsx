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
          width: "400px",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <h1>Chat App</h1>

        <p>パスワード付きチャットサイト</p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          /create
            <button
              style={{
                width: "100%",
                padding: "10px",
              }}
            >
              部屋を作成
            </button>
          </Link>

          /rooms
            <button
              style={{
                width: "100%",
                padding: "10px",
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
