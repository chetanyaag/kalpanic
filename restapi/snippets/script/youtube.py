import json

from googleapiclient.discovery import build


class YoutubeClass:
    def __init(self):
        pass

    def get_video_items(self, keyword_to_search: str):
        youtube = build(
            "youtube", "v3", developerKey="AIzaSyD5bZRMzYLh8JoMp2wjDN2ODftSl_SFhB8"
        )
        search_response = (
            youtube.search()
            .list(
                q=keyword_to_search,
                type="video",
                videoDuration="short",
                order="relevance",
                part="snippet",
                maxResults=10,
            )
            .execute()
        )
        return search_response["items"]
