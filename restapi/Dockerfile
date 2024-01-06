# Use an official Python runtime as a parent image
FROM python:3.10

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/
RUN apt-get install -y apt-transport-https
# RUN apt-get update -y
RUN apt-get install ffmpeg -y
RUN apt-get install  libsm6 -y
RUN apt-get install libxext6  -y
# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY ./entrypoint.sh /app/entrypoint.sh
# Copy the current directory contents into the container at /app
COPY . /app/

# Collect static files
RUN python manage.py collectstatic --noinput

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define the command to run on container start
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "tutorial.wsgi"]
ENTRYPOINT ["bash", "/app/entrypoint.sh"]