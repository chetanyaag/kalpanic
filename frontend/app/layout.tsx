"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect, Children } from "react";
import Loader from "@/components/common/Loader";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Home1 from "@/components/Home1/home1";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  // useEffect(() => {
  //   const checkAuth = () => {

  //     const { authToken } = parseCookies();
  //     if (authToken) {
  //       // router.push('/auth/signin')
  //     }
  //   };

  //   checkAuth();
  // }, []);


  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <Home1 children={children} />

          )}
        </div>
      </body>
    </html>
  );
}
