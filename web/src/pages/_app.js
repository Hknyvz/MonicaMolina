import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useEffect } from "react";
import WebLayout from "@/components/layouts/WebLayout";
import { LoadingProvider } from "@/components/contexts/LoadingContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const getLayout =
    Component.layout === "admin" ? (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    ) : Component.layout === "web" ? (
      <WebLayout>
        <Component {...pageProps} />
      </WebLayout>
    ) : (
      <Component {...pageProps} />
    );
  return (
    <LoadingProvider>
      <SessionProvider session={session}>{getLayout}</SessionProvider>
    </LoadingProvider>
  );
}
