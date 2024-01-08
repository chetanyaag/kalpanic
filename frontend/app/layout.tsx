"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import { parseCookies ,setCookie } from 'nookies';
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation';
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Home1 from "@/components/Home1/home1";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  // useEffect(() => {

  //   const checkAuth = () => {

  //     const { authToken } = parseCookies();
  //     if (!authToken) {
  //       // router.push('/auth/signin')
  //       console.log(pathname)
  //     }
  //   };
  //   checkAuth()

  // }, []);
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            // <div className="flex h-screen overflow-hidden">
            //   {/* <!-- ===== Sidebar Start ===== --> */}
            //   <Sidebar
            //     sidebarOpen={sidebarOpen}
            //     setSidebarOpen={setSidebarOpen}
            //   />
            //   {/* <!-- ===== Sidebar End ===== --> */}

            //   {/* <!-- ===== Content Area Start ===== --> */}
            //   <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            //     {/* <!-- ===== Header Start ===== --> */}
            //     <Header
            //       sidebarOpen={sidebarOpen}
            //       setSidebarOpen={setSidebarOpen}
            //     />
            //     {/* <!-- ===== Header End ===== --> */}

            //     {/* <!-- ===== Main Content Start ===== --> */}
            //     <main>
            //       <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            //         {children}
            //       </div>
            //     </main>
            //     {/* <!-- ===== Main Content End ===== --> */}
            //   </div>
            //   {/* <!-- ===== Content Area End ===== --> */}
            // </div>
            <Home1 children={children} />
          )}
        </div>
      </body>
    </html>
  );
}
