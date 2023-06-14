import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useEffect } from "react";

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
    Component.layout === "web" ? (
      <Component {...pageProps} />
    ) : (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    );
  return <SessionProvider session={session}>{getLayout}</SessionProvider>;
}
