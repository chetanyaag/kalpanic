'use client'
import { useState } from "react"
import KalpanicApi from "@/kalpanic/kalpanic"
import Danger from "../Alert/Danger"
import Success from "../Alert/Success"
const CreateAccount = ({submitRefresh}:{submitRefresh:any}) => {

  const kalpanic  = new KalpanicApi()

    const [name, setName] = useState('')
    const [token, setToken] = useState('')
    const [image, setImage] = useState('')
    const [platform, setPlatform] = useState(2)
    const [meta_account_id, setMeta_account_id] = useState('')

    const [ platforms, setPlatforms] = useState([ 
      {
        "id": 1,
        "name": "Facebook",
        "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FnhsPPZWsAM1P7a1NgGX0yRRJjBoxuEpDQ&usqp=CAU",
        "created_at": "2024-01-11T21:14:44.351739Z",
        "updated_at": "2024-01-11T21:14:44.351846Z"
      }, {
        "id": 2,
        "name": "Instagram",
        "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FnhsPPZWsAM1P7a1NgGX0yRRJjBoxuEpDQ&usqp=CAU",
        "created_at": "2024-01-11T21:14:44.351739Z",
        "updated_at": "2024-01-11T21:14:44.351846Z"
      }
    ])


    const [showerror, setShowerror] = useState(false)
    const [alert, setAlert] = useState('')
  
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('Edited the Account')


    const handleChangeName = (event:any) => {
        setName(event.target.value)

    }
    const handleChangeToken = (event:any) => {
        setToken(event.target.value)
    }
    const handleChangeImage = (event:any) => {
        setImage(event.target.value)
    }
    const handleChangePlatform = (event:any) => {
        setPlatform(event.target.value)
    }

    const handleChangeMetaAccountId = (event:any) => {
      setMeta_account_id(event.target.value)
    }




    const handleOnClick = async(event:any) =>{
        event.preventDefault();


        const payload = {
          "platform":platform,
          "name": name,
          "image": image,
          "token": token,
          "meta_account_id":meta_account_id
        }

        try{
          const data = await kalpanic.create_a_account( payload)

          setName('')
          setToken('')
          setImage('')
          setPlatform(1)
          setMeta_account_id('')
          
        }catch(error){
          console.log(error)
        }




        submitRefresh(true)

    }

    const handleError = async(bool:boolean)=>{
      setShowerror(false)
    }
    const handleSuccess = async(bool:boolean)=>{
      setShowSuccess(false)
    }





return(<>

<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {showerror ? (<Danger message={alert} submit_error={handleError} />) : (<></>)}
              {showSuccess? (<Success message={successMessage} submit_error={handleSuccess}  />):(<></>)}
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Account
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter  Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={name}
                    onChange={handleChangeName}
                 />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Platform Name
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
              <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                      fill="#637381"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                      fill="#637381"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                      fill="#637381"
                    ></path>
                  </g>
                </svg>
              </span>
              <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input" value={platform} onChange={handleChangePlatform}>
                {platforms.map((platform1: any, key: number) => (
                  <option key={key} value={platform1.id}>
                    {platform1.name}
                  </option>
                ))}


              </select>
              <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill="#637381"
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Image
                  </label>
                  <input
                    type="text"
                    placeholder="Enter  Image Url"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={image}
                    onChange={handleChangeImage}
                  />
                </div>
                <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Account ID
            </label>
            <input
              type="text"
              placeholder="Enter password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              value={meta_account_id}
              onChange={handleChangeMetaAccountId}
            />
          </div>
                <div>
                  <label className="mb-2.5 block text-black dark:text-white">
                    Token
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={token}
                    onChange={handleChangeToken}
                 />
                </div>

                <div className="mt-5 mb-5.5 flex items-center justify-between">

                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"  onClick={handleOnClick}>
                  Create
                </button>
              </div>
            </form>
          </div>

</>)

}

export default CreateAccount