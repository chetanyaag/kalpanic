# Generated by Django 5.0.1 on 2024-01-14 10:15

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("snippets", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="accounts",
            name="meta_account_id",
            field=models.CharField(max_length=2044, null=True),
        ),
    ]
