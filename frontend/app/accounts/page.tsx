
"use client"

import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableI from "@/components/Influencer/tableI";
import EditAccount from "@/components/Influencer/editAccount";
import CreateAccount from "@/components/Influencer/createAccount";
import { useState } from "react";
import { useAmp } from "next/amp";




// export const metadata: Metadata = {
//   title: "TailAdmin | Next.js E-commerce Dashboard Template",
//   description: "This is Home Blog page for TailAdmin Next.js",
//   // other metadata
// };

const Accounts: React.FC = () => {

  const [refresh, setRefreh] = useState<boolean>(true);
  const [accounts, setAccounts] = useState([ {
    logo: "/images/brand/brand-01.svg",
    name: "Google",
    image: "/images/brand/brand-01.svg",
    token: "5,768",
    sales: 590,
    conversion: 4.8,
  }])

  const [editAccount, setEditAccount] = useState( {
    logo: "/images/brand/brand-01.svg",
    name: "",
    image: "",
    token: "",
    sales: 590,
    conversion: 4.8,
  })

  const handleRefresh = (bool:boolean)=>{

      const response_data =[ {
        logo: "/images/brand/brand-01.svg",
        name: "Google",
        image: "/images/brand/brand-01.svg",
        token: "5,768",
        sales: 590,
        conversion: 4.8,
      },
      {
        logo: "/images/brand/brand-01.svg",
        name: "facebook",
        image: "/images/brand/brand-01.svg",
        token: "5,768",
        sales: 590,
        conversion: 4.8,
      }]    
      setAccounts(response_data)


  }


  const handleEditData = (data)=>{
    console.log(data)
    setEditAccount(data)
  }

  return (
    <>


      <Breadcrumb pageName="Influnecer Accounts" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <EditAccount submitRefresh={handleRefresh}  accounts_data={editAccount}/>
      <div className="flex flex-col gap-9">
      <CreateAccount  submitRefresh={handleRefresh} /></div></div>
      <br/>
      <TableI accounts_data={accounts} sendData={handleEditData} />


    </>
  );
}

export default Accounts;