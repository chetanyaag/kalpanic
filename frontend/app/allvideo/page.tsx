
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AllVideo from "@/components/SearchYoutube/AllVideo";




export const metadata: Metadata = {
  title: "TailAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

const Allvideo: React.FC = () => {

  return (
    <>
      {/* <ECommerce /> */}

      <Breadcrumb pageName="All Your Youtube Shorts" />
      <AllVideo/>


    </>
  );
}

export default Allvideo;