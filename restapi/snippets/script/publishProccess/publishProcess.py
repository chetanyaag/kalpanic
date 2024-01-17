from snippets.script.download_image_video import youtube_video_download
import requests
import boto3
import os

class PublishProcess:
    def __init__(self, id):
        self.id = id

    def get_video_download(self, video_url: str, filename: str):
        youtube_video_download(video_url, filename)

    def delete_file_after_upload(self, file_name_with_file_path):
        os.remove(file_name_with_file_path)

    def upload_to_s3_bucket(self, file_name):
        s3_object = boto3.client(
            "s3",
            aws_access_key_id="AKIARG3UQKCMZAXUXG76",
            aws_secret_access_key="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",
            region_name="us-west-1",
        )
        bucket_name = 'instagram-video'
        video_folder = r"download_temp/videos"
        file_path = os.path.join(video_folder, file_name)
        s3_object.upload_file(file_path, bucket_name, file_name)
        self.delete_file_after_upload(file_path)






    def post_video(self, video_url="", caption="", meta_account_id="", access_token="", title=""):
        # https://developers.facebook.com/docs/graph-api/reference/page/videos#parameters-2
        url = f"https://graph.facebook.com/v18.0/{meta_account_id}/videos"  # ?access_token={access_token}&file_url={video_url}'
        param = dict()
        param["access_token"] = access_token
        param['title'] = title
        param["file_url"] = video_url
        # param['media_type'] = 'VIDEO'
        # param['thumb_offset'] = '10'
        response = requests.post(url, params=param)
        response = response.json()
        print(response)
        return response

    def create_a_facebook_video_post(self, file_name,instagram_id, token, title):
        print("video upload intiated")
        # instagram_id = "1679861588898947"
        # token = "EAAIVsGm9rBwBO3QvfaQyLwvx0fwAIHcDkVnWjZA09EMH8ZCJThFM0pzJmM3j25CE7atFuOYoxawjMi70EpEbbOzSxzhhvLZAyP4pZA4ZApG7CjgjqFTsBJlK1ZA0poJ8od5kslNyVd9ORWsHBZAqIy4nNoY3pXaCywPbhdb0t3vTH4u3sTQisVWNSP1fZBqXMJJp"
        # title = "age restricted videos test"
        # video_url_s3 = r"https://instagram-video.s3.ap-south-1.amazonaws.com/" + file_name
        video_url = f"https://instagram-video.s3.ap-south-1.amazonaws.com/{file_name}"
        print("wait video is psoting....")
        post_video_response = self.post_video(video_url, title, instagram_id, token)
        print(post_video_response)
        creation_id = post_video_response["id"]

        print(creation_id)

    def create_a_instagram_post(self):
        pass
