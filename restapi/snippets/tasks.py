from celery import shared_task
from snippets.src.roop import core
from snippets.script.download_image_video import download_resources 

@shared_task
def genrate_a_video(source_image:str, source_video:str):
    print(f"image: {source_image} \n\n video : {source_video}")
    try:
        download_resources(source_image, source_video)
        core.run()
    except Exception as e:
        print(e)
    # core.run()
