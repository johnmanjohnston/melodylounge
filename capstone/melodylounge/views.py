from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
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
    return render(request, "melodylounge/index.html")

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
        return render(request, "melodylounge/publish.html")
    
# APIs
def all_songs(request):
    songs = ([song.serialize() for song in Song.objects.all()])
    return JsonResponse(songs, safe=False)