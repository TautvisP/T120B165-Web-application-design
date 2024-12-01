from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .models import *
from .serializers import *
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework.permissions import IsAuthenticated, AllowAny

import logging
logger = logging.getLogger(__name__)

def home(request):
    return HttpResponse("Sveiki atvykę į mano Django svetainę!")

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [AllowAny()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def update(self, request, *args, **kwargs):
        country = self.get_object()
        if country.creator != request.user:
            return Response({'error': 'You do not have permission to edit this country.'}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        country = self.get_object()
        if country.creator != request.user:
            return Response({'error': 'You do not have permission to delete this country.'}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)

    @action(detail=True, methods=['get', 'post'])
    def posts(self, request, pk=None):
        country = self.get_object()
        if request.method == 'POST':
            if not request.user.is_authenticated:
                return Response({"error": "You must be logged in to create a post."}, status=401)
            data = request.data.copy()
            data['country'] = country.id
            serializer = PostSerializer(data=data)
            if serializer.is_valid():
                serializer.save(author=request.user, country=country)
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
        posts = country.posts.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

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

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [AllowAny()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def update(self, request, *args, **kwargs):
        post = self.get_object()
        if post.author != request.user:
            return Response({'error': 'You do not have permission to edit this post.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        post = self.get_object()
        if post.author != request.user:
            return Response({'error': 'You do not have permission to delete this post.'}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)

    @action(detail=True, methods=['get', 'post'])
    def comments(self, request, pk=None):
        post = self.get_object()
        if request.method == 'POST':
            if not request.user.is_authenticated:
                return Response({"error": "You must be logged in to post a comment."}, status=401)
            data = request.data.copy()
            data['post'] = post.id
            serializer = CommentSerializer(data=data)
            if serializer.is_valid():
                serializer.save(author=request.user, post=post)
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
        comments = post.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [AllowAny()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def update(self, request, *args, **kwargs):
        comment = self.get_object()
        if comment.author != request.user:
            return Response({'error': 'You do not have permission to edit this comment.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = CommentSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        comment = self.get_object()
        if comment.author != request.user:
            return Response({'error': 'You do not have permission to delete this comment.'}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        token = response.data['access']
        payload = self.get_payload_from_token(token)

        response.data['message'] = 'Login successful! Welcome back, {}!'.format(payload['username'])
        response.data['role'] = payload['role']  # Add role to the response

        return response

    def get_payload_from_token(self, token):
        """
        This helper method will decode the token to get the payload data.
        """
        try:
            untyped_token = UntypedToken(token)
            return untyped_token.payload
        except Exception as e:
            return {}



class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        logger.info('Received registration request for username: %s', username)
        
        if username and password:
            user = User(username=username)
            user.set_password(password)
            user.save()

            logger.info('User registered successfully: %s', username)
            return Response({'msg': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        
        logger.warning('Invalid input for registration')
        return Response({'msg': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)
    
class ProfileViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user
        serializer = ProfileSerializer(user)
        return Response(serializer.data)

    @action(detail=False, methods=['put'], url_path='update-profile')
    def update_profile(self, request):
        user = request.user
        serializer = ProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            current_password = request.data.get('current_password')
            new_password = request.data.get('new_password')
            if current_password and new_password:
                if not user.check_password(current_password):
                    return Response({'error': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
                user.set_password(new_password)
                user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)