from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
import os

class User(AbstractUser): 
    def serialize(self):
        return {
            "username": self.username,
            "id": self.id,
            "songs_released": len(Song.objects.all().filter(author=self))
        }

# Song:
    # - "author": User
    # - "title": string
    # - "explicit": bool

class Song(models.Model):
    author = models.ForeignKey(User, models.CASCADE)
    title = models.CharField(max_length=64)
    explicit = models.BooleanField()

    def delete(self, *args, **kwargs):
        os.remove(settings.SONG_DESTINATION_DIR + str(self.id) + ".wav")
        return super().delete(*args, **kwargs)
    
    def serialize(self):
        return {
            "id": self.id,
            "author": self.author.serialize(),
            "title": self.title,
            "explicit": self.explicit
        }

# Playlist:
    # - "author": User
    # - "title": string
    # - "description": string
    # - "songs": ManyToManyField(Song)
class Playlist(models.Model):
    author = models.ForeignKey(User, models.CASCADE)
    title = models.CharField(max_length=64)
    songs = models.ManyToManyField("Song", blank=True)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "song_count": len(self.songs.all())
        }