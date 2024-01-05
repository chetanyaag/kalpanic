'use client';
import axios from 'axios';
import { useState } from 'react';
import Image from "next/image";
import { Product } from "@/types/product";
import { SearchTerm } from '@/types/searchTerm';
import { Video } from '@/types/video';
// import Loader from "@/components/common/Loader";
import Link from 'next/link';

export default function SearchTermForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const apiUrl = process.env.API_URL || 'http://localhost:8000';

  const [searchTerm, setSearchTerm] = useState("")



  const [videos, setVideos] = useState([{
    id: 1,
    title: "तेरी मुरली की धुन सुनने मैं बरसाने से आई हूं। कृष्ण भजन। जया किशोरी।",
    url: "https://www.youtube.com/shorts/A4Uvao5e8pI",
    duration: "67",
    created_at: "2024-01-02T19:32:08.334417Z",
    updated_at: "2024-01-02T19:32:08.334506Z",
    status: "pending",
    search_term: 1
  }])
  const on_change_searchterm = (event: any) => {
    setSearchTerm(event.target.value)
  }

  const handle_on_click = async (event: any) => {
    event.preventDefault();
    if (searchTerm !== "") {
      setLoading(true)
      const formData = {
        "term": searchTerm,
        "status": "pending"
      }
      try {
        const response = await axios.post(`${apiUrl}/searchterms/`, formData);
        console.log('Response:', response.data);
        setVideos(response.data["videos"])
        setLoading(false)
      } catch (error) {
        console.error('Error:', error);
      }
    }

  }

  return (<>

    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Search YouTube Shorts
            </h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Search Term
                </label>
                <input
                  type="text"
                  placeholder="Enter a single search term"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={searchTerm}
                  onChange={on_change_searchterm}
                />
              </div>
              {loading ? (
                <div className="flex h items-center justify-center bg-white">
                  <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                </div>
              ) : (
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray" onClick={handle_on_click}>
                  Please Search
                </button>)}
            </div>
          </form>
        </div>
      </div>



    </div>

    <br />

    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Youtube Shorts
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Shorts</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Urls</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Duration</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Views</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">SearchTerm</p>
        </div>
      </div>

      {videos.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src="/images/product/product-01.png"
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.title}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              <Link href={product.url} passHref={true} legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                  {product.url}
                </a>
              </Link>

            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.duration} Seconds
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.duration} </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{searchTerm}</p>
          </div>
        </div>
      ))}
    </div>

  </>)
}



//     axios.get(`${apiUrl}/searchterms/`)
//   .then(response => {
//     // Handle the successful response here
//     console.log(response.data);
//   })
//   .catch(error => {
//     // Handle errors here
//     console.error('Error:', error);
//   });


