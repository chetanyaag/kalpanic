from django.db import models
from pygments import highlight
from pygments.formatters.html import HtmlFormatter
from pygments.lexers import get_all_lexers, get_lexer_by_name
from pygments.styles import get_all_styles
from django.contrib.auth.models import User

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())


class SearchTerm(models.Model):
    STATUS_CHOICES = (

        ("Pending", "Pending"),
        ("CanUse", "CanShare"),
        ("CanNotUse", "CanNotUse"),
        ("InQueue", "InQueue"),
        ("Downloaded", "Downloaded"),
        ("complete", "Complete"),
        ("error", "Error"),
    )

    term = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="search_terms", null=True)

    def __str__(self):
        return self.term


class Video(models.Model):
    search_term = models.ForeignKey(
        SearchTerm, on_delete=models.CASCADE, related_name="videos"
    )
    user =  models.ForeignKey(User, on_delete=models.CASCADE, related_name="videos")
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=2044, null=True)
    video_id = models.CharField(max_length=255, null=True)
    url = models.URLField()
    duration = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=SearchTerm.STATUS_CHOICES, default="Pending")
    image = models.CharField(
        max_length=2048,
        null=True,
        default="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Xn0QdJbIsUFnXi5EfoovLlk4pqnfPAWpsFMDx4YP0rvhfT0DoOw5wbf6gWUY-V6-9cE&usqp=CAU",
    )
    error = models.CharField(max_length=2044)

class Platform(models.Model):
    name = models.CharField(max_length=255)
    logo = models.CharField(max_length=2044)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Accounts(models.Model):
    user =  models.ForeignKey(User, on_delete=models.CASCADE, related_name="accounts")
    platform =  models.ForeignKey(Platform, on_delete=models.CASCADE, related_name="accounts")
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=2044)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=SearchTerm.STATUS_CHOICES, default="Pending")


class Publish(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name="publish_videos")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="publish_videos")
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=2044)
    shedule_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=SearchTerm.STATUS_CHOICES, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)




class GenrateVideo(models.Model):
    genrated_video_url = models.URLField(null=True, default="")
    image_link = models.CharField(max_length=2088)
    source_video_link = models.URLField()
    user =  models.ForeignKey(User, on_delete=models.CASCADE, related_name="genrated_videos")
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name="genrated_videos")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=SearchTerm.STATUS_CHOICES, default="Pending")