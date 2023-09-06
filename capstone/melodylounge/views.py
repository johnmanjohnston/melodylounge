from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect, HttpResponseForbidden
from django.db import IntegrityError
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
import django.forms
from django.conf import settings
import json

from django.contrib.auth import login, logout, authenticate

from .models import *

# Create your views here.

@login_required(login_url="/login")
def index(request): 
    return render(request, "melodylounge/index.html", {
        "hide_music_player": False
    })

def logout_user(request):
    logout(request)
    return HttpResponseRedirect(reverse("login"))

def log_in_user(request):
    if str(request.method).lower() == "post":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid login credentials."
            })
    else:
        return render(request, "melodylounge/login.html")

def register(request):
    if str(request.method).lower() == "post":
        username = request.POST["username"]
        email = request.POST["email"]

        password = request.POST["password"]
        confirm_password = request.POST["confirmation"]

        if password != confirm_password: 
            return render(request, "melodylounge/register.html", {
                "Make sure the password and the confirmation match!"
            })
        
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))

    else:
        return render(request, "melodylounge/register.html")

class SongUploadForm(django.forms.Form):
    title = django.forms.CharField(max_length=64)
    song_file = django.forms.FileField()

# Utility function, this function is NOT for a route.
def save_audio_file(user_id, song_title, explicit, f):
    author = User.objects.get(id=user_id)
    song = Song(author=author, title=song_title, explicit=explicit)
    song.save()

    with open(settings.SONG_DESTINATION_DIR + str(song.id) + ".wav", "wb+") as destination:
    #with open("{settings.SONG_DESTINATION_DIR}{song.id}.wav", "wb+") as destination:
        for chunk in f.chunks():
            destination.write(chunk)

def publish(request):
    if str(request.method).lower() == "post":
        
        form = SongUploadForm(request.POST, request.FILES)
        if form.is_valid():
            explicit = request.POST.get("explicit") is not None
            save_audio_file(user_id=request.user.id, song_title=request.POST["title"], explicit=explicit, f=request.FILES["song_file"])
            return HttpResponse("Song saved")
        return HttpResponse("post request recieved")
    else:
        return render(request, "melodylounge/publish.html", {
            "hide_music_player": True
        })
    
def search(request):
    return render(request, "melodylounge/search.html") 


# APIs
def all_songs(request):
    songs = ([song.serialize() for song in Song.objects.all()])
    return JsonResponse(songs, safe=False)

def search_songs(request, query):
    songs = []
    query = str(query).lower()

    for song in Song.objects.all():
        if query == song.title.lower() or query in song.title.lower():
            songs.append(song)

    return JsonResponse([song.serialize() for song in songs], safe=False)

def songs_by_author(request, author_name):
    try:
        user = User.objects.all().filter(username=author_name)[0]
        songs = Song.objects.all().filter(author=user)

        return JsonResponse([song.serialize() for song in songs], safe=False)
    except IndexError: return JsonResponse([], safe=False)

def get_song_data_by_id(request, id):
    song = Song.objects.get(id=id)
    return JsonResponse([song.serialize()], safe=False)

# Playlist APIs
def get_songs_by_playlist_id(request, id):
    playlist = Playlist(id=id)
    songs = playlist.songs.all()

    return JsonResponse([song.serialize() for song in songs], safe=False)

def get_playlists_by_user(request, username):
    try:
        user = User.objects.all().filter(username=username)[0]
        playlists = Playlist.objects.all().filter(author=user)
        return JsonResponse([playlist.serialize() for playlist in playlists], safe=False)
    except IndexError:
        return JsonResponse([], safe=False)

def add_song_to_playlist(request):
    json_data = json.loads(request.body)

    song_id =     int(json_data["song_id"])
    playlist_id = int(json_data["playlist_id"])

    playlist = Playlist.objects.all().filter(id=playlist_id)[0]

    if request.user.id != playlist.author.id:
        return HttpResponseForbidden()
    
    song = Song.objects.get(id=song_id)

    playlist.songs.add(song)
    return HttpResponse("Song added successfully")

def remove_song_from_playlist(request):
    json_data = json.loads(request.body)

    song_id =     int(json_data["song_id"])
    playlist_id = int(json_data["playlist_id"])

    playlist = Playlist.objects.all().filter(id=playlist_id)[0]

    if request.user.id != playlist.author.id:
        return HttpResponseForbidden()
    
    song = Song.objects.get(id=song_id)

    playlist.songs.remove(song)
    return HttpResponse("Song removed successfully")

def rename_playlist(request):
    json_data = json.loads(request.body)

    playlist_id = int(json_data["playlist_id"])
    new_playlist_name = json_data["new_name"]

    playlist = Playlist.objects.get(id=playlist_id)

    if request.user.id != playlist.author.id:
        return HttpResponseForbidden()
    
    playlist.title = new_playlist_name
    playlist.save()

    return HttpResponse("Playlist renamed")

def new_playlist(request):
    user = User.objects.get(id=request.user.id)
    title = json.loads(request.body)["title"]

    playlist = Playlist(author=user, title=title)
    playlist.save()

    return HttpResponse("New playlist created.")

def delete_playlist(request):
    id = json.loads(request.body)["playlist_id"]
    playlist = Playlist.objects.get(id=id)

    if request.user.id != playlist.author.id: 
        return HttpResponseForbidden()

    playlist.delete()
    return HttpResponse("Playlist deleted")