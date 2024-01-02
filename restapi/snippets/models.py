from django.db import models
from pygments import highlight
from pygments.formatters.html import HtmlFormatter
from pygments.lexers import get_all_lexers, get_lexer_by_name
from pygments.styles import get_all_styles

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())


class SearchTerm(models.Model):
    STATUS_CHOICES = (
        ("complete", "Complete"),
        ("pending", "Pending Progress"),
        ("error", "Error"),
    )

    term = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return self.term


class Video(models.Model):
    search_term = models.ForeignKey(
        SearchTerm, on_delete=models.CASCADE, related_name="videos"
    )
    title = models.CharField(max_length=255)
    url = models.URLField()
    duration = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=SearchTerm.STATUS_CHOICES)
