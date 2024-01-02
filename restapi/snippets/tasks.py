from celery import shared_task

from snippets.src.roop import core


@shared_task
def sharedtask():
    return


@shared_task
def createAvideo():
    pass
    # core.run()
