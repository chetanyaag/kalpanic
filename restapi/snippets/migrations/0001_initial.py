# Generated by Django 5.0.1 on 2024-01-11 21:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Platform",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("logo", models.CharField(max_length=2044)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name="Accounts",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("image", models.CharField(max_length=2044)),
                ("token", models.CharField(max_length=255)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Pending", "Pending"),
                            ("CanUse", "CanShare"),
                            ("CanNotUse", "CanNotUse"),
                            ("InQueue", "InQueue"),
                            ("Downloaded", "Downloaded"),
                            ("complete", "Complete"),
                            ("error", "Error"),
                        ],
                        default="Pending",
                        max_length=20,
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="accounts",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "platform",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="accounts",
                        to="snippets.platform",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="SearchTerm",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("term", models.CharField(max_length=255)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Pending", "Pending"),
                            ("CanUse", "CanShare"),
                            ("CanNotUse", "CanNotUse"),
                            ("InQueue", "InQueue"),
                            ("Downloaded", "Downloaded"),
                            ("complete", "Complete"),
                            ("error", "Error"),
                        ],
                        default="Pending",
                        max_length=20,
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="search_terms",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Video",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("description", models.CharField(max_length=2044, null=True)),
                ("video_id", models.CharField(max_length=255, null=True)),
                ("url", models.URLField()),
                ("duration", models.CharField(max_length=255, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Pending", "Pending"),
                            ("CanUse", "CanShare"),
                            ("CanNotUse", "CanNotUse"),
                            ("InQueue", "InQueue"),
                            ("Downloaded", "Downloaded"),
                            ("complete", "Complete"),
                            ("error", "Error"),
                        ],
                        default="Pending",
                        max_length=20,
                    ),
                ),
                (
                    "image",
                    models.CharField(
                        default="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Xn0QdJbIsUFnXi5EfoovLlk4pqnfPAWpsFMDx4YP0rvhfT0DoOw5wbf6gWUY-V6-9cE&usqp=CAU",
                        max_length=2048,
                        null=True,
                    ),
                ),
                ("error", models.CharField(max_length=2044)),
                (
                    "search_term",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="videos",
                        to="snippets.searchterm",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="videos",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Publish",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("description", models.CharField(max_length=2044)),
                ("shedule_date", models.DateTimeField()),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Pending", "Pending"),
                            ("CanUse", "CanShare"),
                            ("CanNotUse", "CanNotUse"),
                            ("InQueue", "InQueue"),
                            ("Downloaded", "Downloaded"),
                            ("complete", "Complete"),
                            ("error", "Error"),
                        ],
                        default="Pending",
                        max_length=20,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "account",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="publish_videos",
                        to="snippets.accounts",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="publish_videos",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "video",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="publish_videos",
                        to="snippets.video",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="GenrateVideo",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("genrated_video_url", models.URLField(default="", null=True)),
                ("image_link", models.CharField(max_length=2088)),
                ("source_video_link", models.URLField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Pending", "Pending"),
                            ("CanUse", "CanShare"),
                            ("CanNotUse", "CanNotUse"),
                            ("InQueue", "InQueue"),
                            ("Downloaded", "Downloaded"),
                            ("complete", "Complete"),
                            ("error", "Error"),
                        ],
                        default="Pending",
                        max_length=20,
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="genrated_videos",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "video",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="genrated_videos",
                        to="snippets.video",
                    ),
                ),
            ],
        ),
    ]
