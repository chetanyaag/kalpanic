'use client'
import { useEffect, useState } from "react"


const EditAccount = ({submitRefresh, accounts_data}) => {

    const [name, setName] = useState('')
    const [token, setToken] = useState('')
    const [image, setImage] = useState('')
    const [platform, setPlatform] = useState('')


    useEffect(() => {
        // Update local state when the parent's data changes
        setName(accounts_data.name)
        setImage(accounts_data.image)
        setPlatform(accounts_data.image)
        setToken(accounts_data.token)
      }, [accounts_data]);



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


    const handleOnClick = (event:any) =>{
        event.preventDefault();
        // api call so save the data
        submitRefresh(true)

    }
    return(<>
<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Edit In Account
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
                  <input
                    type="text"
                    placeholder="Enter  Platform"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={platform}
                    onChange={handleChangePlatform}
                 />
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
                  Edit
                </button>
              </div>
            </form>
          </div>
    
    </>)
    
    }
    
    export default EditAccount