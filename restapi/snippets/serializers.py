from django.contrib.auth.models import User
from rest_framework import serializers

from snippets.models import SearchTerm, Video, GenrateVideo
from snippets.script.youtube import YoutubeClass
from pytube import YouTube as YT





class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = "__all__"


class SearchTermSerializer(serializers.ModelSerializer):
    videos = VideoSerializer(many=True, read_only=True)

    class Meta:
        model = SearchTerm
        fields = "__all__"

    def create(self, validated_data):
        term = validated_data["term"]
        status = validated_data.get("status", "pending")

        # Check if the SearchTerm with the given term already exists
        existing_search_term = SearchTerm.objects.filter(term=term).first()

        if existing_search_term:
            # Update the existing SearchTerm if it already exists
            existing_search_term.status = status
            existing_search_term.save()
            return existing_search_term
        else:
            # Create a new SearchTerm if it doesn't exist
            search_term = SearchTerm(term=term, status=status)
            search_term.save()
            youtube_instance = YoutubeClass()
            video_list = youtube_instance.get_video_items(search_term.term)
            for video_instance in video_list:
                video_url = (
                    r"https://www.youtube.com/shorts/" + video_instance["id"]["videoId"]
                )
                yt_video = YT(video_url)
                if yt_video.length > 90:
                    continue
                # video_duration = d if d:=video_instance["contentDetails"]["duration"] else ""
                video = Video(
                    search_term_id=search_term.id,
                    title=video_instance["snippet"]["title"],
                    url=video_url,
                    status="pending",
                    duration=str(yt_video.length),
                )
                video.save()
            
            return search_term

class GenrateVideoSearializer(serializers.ModelSerializer):
    class Meta:
        model = GenrateVideo
        fields = "__all__"
