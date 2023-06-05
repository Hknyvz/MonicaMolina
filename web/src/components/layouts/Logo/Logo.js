import Link from "next/link";

export default function Logo({ collapsed }) {
  return (
    <div
      style={{
        height: 64,
        display: "block",
        padding: "8px 16px",
      }}
    >
      <Link
        style={{ height: "100%", width: "100%", display: "inline-block" }}
        href="/"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: "#69B1FF",
            color: "white",
            fontSize: "24px",
          }}
        >
          {!collapsed ? "MÓNICA MOLINA" : "MM"}
        </div>
      </Link>
    </div>
  );
}
