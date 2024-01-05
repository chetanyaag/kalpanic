'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from "next/image";

import Link from 'next/link';

export default function AllVideo() {
  const [loading, setLoading] = useState<boolean>(false);

  const apiUrl = process.env.API_URL || 'http://localhost:8000';

  const [searchTerm, setSearchTerm] = useState("")
  const externaImageLoader = ({ src }: { src: string }) => src;


  const [videos, setVideos] = useState([{
    id: 1,
    title: "तेरी मुरली की धुन सुनने मैं बरसाने से आई हूं। कृष्ण भजन। जया किशोरी।",
    url: "https://www.youtube.com/shorts/A4Uvao5e8pI",
    duration: "67",
    created_at: "2024-01-02T19:32:08.334417Z",
    updated_at: "2024-01-02T19:32:08.334506Z",
    image: "https://images.newindianexpress.com/uploads/user/imagelibrary/2022/1/8/w900X450/Narendra_Modi_PTI.jpg?w=400&dpr=2.6",
    status: "pending",
    search_term: 1
  }])



  useEffect(() => {

    const checkAuth = () => {
    axios.get(`${apiUrl}/videos/`)
    .then(response => {
      console.log(response.data)
      setVideos(response.data)
    })
    .catch(error => {

      console.error('Error:', error);
    });

    }
    checkAuth();
}, []);
 

  return (<>




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
                  loader={externaImageLoader}
                  src={product.image}
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


