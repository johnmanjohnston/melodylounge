from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("register", views.register, name="register"),
    path("logout", views.logout_user, name="logout"),
    path("login", views.log_in_user, name="login"),
    path("publish", views.publish, name="publish"),

    # APIs
    path("all_songs", views.all_songs, name="all_songs"),
    path("search_songs/<str:query>", views.search_songs, name="search_songs"),
    path("songs_by_author/<str:author_name>", views.songs_by_author, name="songs_by_author"),
    path("get_songs_by_playlist_id/<int:id>", views.get_songs_by_playlist_id, name="get_songs_by_playlist_id"),
    path("get_playlists_by_user/<str:username>", views.get_playlists_by_user, name="get_playlists_by_user"),
    path("add_song_to_playlist", views.add_song_to_playlist, name="add_song_to_playlist"),
    path("remove_song_from_playlist", views.remove_song_from_playlist, name="remove_song_from_playlist"),
    path("get_song_data_by_id/<int:id>", views.get_song_data_by_id, name="get_song_data_by_id"),

    path("rename_playlist", views.rename_playlist, name="rename_playlist"),
    path("new_playlist", views.new_playlist, name="new_plalist"),
    path("delete_playlist", views.delete_playlist, name="delete_playlist"),

    path("random_songs", views.random_songs, name="random_songs")
]

from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)