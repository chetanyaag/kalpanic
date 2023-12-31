import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tutorial.settings')
app = Celery("tutorial")
app.config_from_object("django.conf:settings", namespace="CELERY")

@app.task
def add_numbers():
    print("this task was called")
    return

app.autodiscover_tasks()