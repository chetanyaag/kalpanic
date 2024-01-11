
"use client"

import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableI from "@/components/Influencer/tableI";
import EditAccount from "@/components/Influencer/editAccount";
import CreateAccount from "@/components/Influencer/createAccount";
import { useEffect, useState } from "react";
import { useAmp } from "next/amp";

import KalpanicApi from "@/kalpanic/kalpanic";


// export const metadata: Metadata = {
//   title: "TailAdmin | Next.js E-commerce Dashboard Template",
//   description: "This is Home Blog page for TailAdmin Next.js",
//   // other metadata
// };

const Accounts: React.FC = () => {

  const kalpanicApi = new KalpanicApi();
/*
id: 1
​​
image: "some url"
​​
name: "some name"
​​
platform: 1
​​
status: "Pending"
​​
token: "some token"
​​
updated_at: "2024-01-08T19:29:44.851361Z"
​​
user: 1



*/
  const [refresh, setRefreh] = useState<boolean>(true);
  const [accounts, setAccounts] = useState([ {
    id:4,
    logo: "/images/brand/brand-01.svg",
    name: "Google",
    image: "/images/brand/brand-01.svg",
    token: "5,768",
    status: 590,
    platform: 4.8,
  }])

  const [editAccount, setEditAccount] = useState( {
    id:4,
    logo: "/images/brand/brand-01.svg",
    name: "Google",
    image: "/images/brand/brand-01.svg",
    token: "5,768",
    status: 590,
    platform: 4.8,
  
  })

  const handleRefresh = async(bool:boolean)=>{

    try{
      const data:any = await kalpanicApi.get_all_accounts();
      // console.log(data)
      setAccounts(data)
    }
      catch(error) {
        console.error('Error:', error);
      };


  }


  const handleEditData = (data:any)=>{
    console.log(data)
    setEditAccount(data)
  }

    useEffect (() => {

    const checkAuth = async() => {
      try{
        const data:any = await kalpanicApi.get_all_accounts();
        // console.log(data)
        setAccounts(data)
      }
        catch(error) {
          console.error('Error:', error);
        };

    }
    checkAuth();
  }, []);

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