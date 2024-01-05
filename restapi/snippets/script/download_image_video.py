from pytube import YouTube as YT
import os
import requests

def youtube_video_download(video_url:str):
    yt_video = YT(video_url)
    file_path = r"download_temp/videos"
    strm = yt_video.streams.get_by_resolution("720p")
    strm.download(file_path, "file_name.mp4")



def download_image(url: str):
    destination = r"download_temp/images/image.jpg"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check for any errors in the HTTP response

        with open(destination, 'wb') as file:
            file.write(response.content)

        print(f"Image downloaded successfully to {destination}")
    except requests.exceptions.RequestException as e:
        print(f"Error downloading image: {e}")



def download_resources(image_url:str, video_url:str):
    youtube_video_download(video_url)
    download_image(image_url)
