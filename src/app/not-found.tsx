import Link from "next/link";

export default function NotFound() {
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
        }}
      >
        <h1
          style={{
            fontSize: "48px",
          }}
        >
          404
        </h1>

        <p>
          ページが見つかりません
        </p>

        <Link href  <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
            }}
          >
            ホームへ戻る
          </button>
        </Link>
      </div>
    </main>
  );
}
``
