from django.contrib import admin
from .models import Country, Post, Comment

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'creator')
    search_fields = ('name', 'description', 'creator__username')

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'author', 'country', 'created_at')
    search_fields = ('title', 'content', 'author__username', 'country__name')
    list_filter = ('country', 'author', 'created_at')
    readonly_fields = ('created_at',)

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'author', 'text', 'created_at')
    search_fields = ('post__title', 'author__username', 'text')
    list_filter = ('post', 'author', 'created_at')
    readonly_fields = ('created_at',)