import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useContext, useEffect } from "react";
import WebLayout from "@/components/layouts/WebLayout";
import {
  LoadingContext,
  LoadingProvider,
} from "@/components/contexts/LoadingContext";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

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
    ) : (
      <WebLayout>
        <Component {...pageProps} />
      </WebLayout>
    );
  return (
    <LoadingProvider>
      <SessionProvider session={session}>{getLayout}</SessionProvider>
    </LoadingProvider>
  );
}
