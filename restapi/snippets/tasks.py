from celery import shared_task

from snippets.script.download_image_video import download_resources
from snippets.src.roop import core
from snippets.script.publishProccess.publishProcess import PublishProcess
from snippets.models import Publish
import time 

@shared_task
def genrate_a_video(source_image: str, source_video: str):
    print(f"image: {source_image} \n\n video : {source_video}")
    try:
        download_resources(source_image, source_video)
        core.run()
    except Exception as e:
        print(e)
    # core.run()


@shared_task
def publish_a_video(id):
    publish_object = Publish.objects.get(pk=id)
    try:
        publish_instance = PublishProcess(id)

        # pass video and filename
        filename = (publish_object.video.url).split("/")[
            -1
        ] + ".mp4"  # replace with video id
        publish_instance.get_video_download(publish_object.video.url, filename)

        publish_object.status = "Downloaded"
        publish_object.save()

        # push value to s3
        publish_instance.upload_to_s3_bucket(file_name=filename)
        publish_object.status = "InQueue"
        publish_object.save()
        # publish video on facebook page

        publish_instance.create_a_facebook_video_post(file_name=filename, instagram_id=publish_object.account.meta_account_id, token=publish_object.account.token, title=publish_object.title )
        publish_object.status = "Complete"
        publish_object.save()
        # publish_instance.create_a_instagram_container()
    except Exception as e:
        print(e)
        publish_object.status = "ERROR"
        publish_object.save()
