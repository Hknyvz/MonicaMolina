import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import AdminLayout from "@/components/layouts/AdminLayout";
import WebLayout from "@/components/layouts/WebLayout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout =
    Component.layout === "web" ? (
      <WebLayout>
        <Component {...pageProps} />
      </WebLayout>
    ) : (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    );
  return <SessionProvider session={session}>{getLayout}</SessionProvider>;
}
