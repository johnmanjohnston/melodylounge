from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser): 
    pass

# Song:
    # - "author": User
    # - "title": string
    # - "explicit": bool

    # Song file path will be settings.MEDIA_ROOT + "songs/" + the ID of the instance of the song just created

class Song(models.Model):
    author = models.ForeignKey(User, models.CASCADE)
    title = models.CharField(max_length=64)
    explicit = models.BooleanField()

# Playlist:
    # - "author": User
    # - "title": string
    # - "description": string
    # - "songs": ManyToManyField(Song)
