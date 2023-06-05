import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout =
    Component.layout === "web" ? (
      <Component {...pageProps} />
    ) : (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    );
  return <SessionProvider session={session}>{getLayout}</SessionProvider>;
}
