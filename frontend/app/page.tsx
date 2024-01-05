
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SearchTermForm from "@/components/SearchYoutube/SearchTermForm";
import TableTwo from "@/components/Tables/TableTwo";



export const metadata: Metadata = {
  title: "TailAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function Home() {

  return (
    <>
      {/* <ECommerce /> */}

      <Breadcrumb pageName="Search Youtube Shorts" />
      <SearchTermForm/>


    </>
  );
}
