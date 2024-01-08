from django.contrib.auth.models import User
from pytube import YouTube as YT
from rest_framework import serializers
from django.contrib.auth.models import User
from snippets.models import GenrateVideo, SearchTerm, Video, Platform, Accounts, Publish
from snippets.script.youtube import YoutubeClass



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id'] 


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
        user = validated_data['user']
        existing_search_term = SearchTerm.objects.filter(term=term).first()

        if existing_search_term:
            existing_search_term.status = status
            existing_search_term.save()
            return existing_search_term
        else:
            search_term = SearchTerm(term=term, status=status, user_id=user_data['id'])
            
            search_term.save()
            youtube_instance = YoutubeClass()
            video_list = youtube_instance.get_video_items(search_term.term)
            print(len(video_list))
            for video_instance in video_list:
                video_url = (
                    r"https://www.youtube.com/shorts/" + video_instance["id"]["videoId"]
                )
                yt_video = YT(video_url)
                if yt_video.length > 90:
                    continue
                image_link = video_instance["snippet"]["thumbnails"]["default"]["url"]
                
                video = Video(
                    search_term_id=search_term.id,
                    title=video_instance["snippet"]["title"],
                    url=video_url,
                    status="pending",
                    duration=str(yt_video.length),
                    image=image_link,
                    user_id=user_data['id'],
                    error=""
                )
                video.save()

            return search_term



class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = "__all__"

class AccountsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Accounts
        fields = "__all__"

    def create(self, validated_data):

        name = validated_data["name"]
        image = validated_data["image"]
        token = validated_data["token"]
        platform = validated_data['platform']
        user = validated_data['user']
        account = Accounts(name=name, image=image, user_id=user.id, token=token, platform_id=platform.id)
        account.save()
        
        return account

class PublishSerializer(serializers.ModelSerializer):
    video = VideoSerializer(write_only=True)
    user = UserSerializer(write_only=True)
    class Meta:
        model = Publish
        fields = "__all__"

    def create(self, validated_data):
        title = validated_data["title"]
        description = validated_data["description"]
        shedule_date = validated_data["shedule_date"]
        platform_id = validated_data['platform']['id']

        user_data = self.context.get('request').data.get('user', {})
        publish = Publish(name=name, image=image, user_id=user_data['id'], token=token, platform_id=platform_id)
        publish.save()
        
        return search_term



class GenrateVideoSearializer(serializers.ModelSerializer):
    class Meta:
        model = GenrateVideo
        fields = "__all__"



