'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from "next/image";
import KalpanicApi from '@/kalpanic/kalpanic';
import Link from 'next/link';
import Danger from '../Alert/Danger';

export default function AllVideo() {

  const kalapi = new KalpanicApi()

  const [loading, setLoading] = useState<boolean>(false);

  const [showmessage, setShowmessage] = useState(false)
  const [alert, setAlert] = useState('')

  const apiUrl = process.env.API_URL || 'http://localhost:8000';

  const [searchTerm, setSearchTerm] = useState("")
  const externaImageLoader = ({ src }: { src: string }) => src;


  const [videos, setVideos] = useState([{
    "id": 2,
    "title": "How girls don’t care how much money you got only the followers 😂 #shorts",
    "description": null,
    "video_id": null,
    "url": "https://www.youtube.com/shorts/OzczqdGgA3c",
    "duration": "25",
    "created_at": "2024-01-07T20:18:11.060521Z",
    "updated_at": "2024-01-07T20:18:11.060586Z",
    "status": "pending",
    "image": "https://i.ytimg.com/vi/OzczqdGgA3c/default.jpg",
    "error": "",
    "search_term": 3,
    "user": 1
  }])

  const on_change_searchterm = (event: any) => {
    setSearchTerm(event.target.value)
  }


  const handleOnClickAdd = async (event: any, index: number) => {
    event.preventDefault();
    console.log(index)
    const updatedVideos = [...videos]
    const video_to_update = updatedVideos[index];
    if (index >= 0 && index < videos.length) {
      updatedVideos.splice(index, 1)
      setVideos(updatedVideos);
    } else {
      console.error('Invalid index to remove');
      setShowmessage(true)
      setAlert('Invalid index to remove')
    }

    try{
        const data = await kalapi.update_a_video( video_to_update.id, "CanUse")
    }
    catch(error){
      console.log(error)
    }
    // TODO: SHOW  Alert

  }




  useEffect(() => {

    const checkAuth = async() => {
      try{
        const data:any = await kalapi.get_all_videos("pending");
        setVideos(data);
      }
        catch(error) {
          console.error('Error:', error);
        };

    }
    checkAuth();
  }, []);


  return (<>


    {showmessage ? (<Danger message={alert} />) : (<></>)}

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
          <p className="font-medium">Action</p>
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
          <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-meta-3 py-3 px-8 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
            
              onClick={(e)=>handleOnClickAdd(e, key)}
            >
              ADD
            </Link>
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


