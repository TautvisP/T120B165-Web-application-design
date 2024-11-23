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

def home(request):
    return HttpResponse("Sveiki atvykę į mano Django svetainę!")

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=True, methods=['get', 'post'])
    def posts(self, request, pk=None):
        country = self.get_object()
        if request.method == 'POST':
            if not request.user.is_authenticated:
                return Response({"error": "You must be logged in to create a post."}, status=401)
            data = request.data.copy()
            data['country'] = country.id
            data['author'] = request.user.username
            serializer = PostSerializer(data=data)
            if serializer.is_valid():
                serializer.save(country=country)
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

    @action(detail=True, methods=['get', 'post'])
    def comments(self, request, pk=None):
        post = self.get_object()
        if request.method == 'POST':
            if not request.user.is_authenticated:
                return Response({"error": "You must be logged in to post a comment."}, status=401)
            data = request.data.copy()
            data['post'] = post.id
            data['author'] = request.user.username
            serializer = CommentSerializer(data=data)
            if serializer.is_valid():
                serializer.save(post=post)
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
        if username and password:
            user = User(username=username)
            user.set_password(password)
            user.save()
            return Response({'msg': 'User registered successfully'}, status=status.HTTP_201_CREATED)
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