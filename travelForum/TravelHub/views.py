from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Country, Post, Comment
from .serializers import CountrySerializer, PostSerializer, CommentSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

def home(request):
    return HttpResponse("Sveiki atvykę į mano Django svetainę!")

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

    @action(detail=True, methods=['get'])
    def posts(self, request, pk=None):
        country = self.get_object()
        posts = country.posts.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    # Nested action to list comments for a specific post of a country
    @action(detail=True, methods=['get'], url_path='posts/(?P<post_pk>[^/.]+)/comments')
    def post_comments(self, request, pk=None, post_pk=None):
        country = self.get_object()
        try:
            post = country.posts.get(pk=post_pk)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=404)
        comments = post.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        post = self.get_object()
        comments = post.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
