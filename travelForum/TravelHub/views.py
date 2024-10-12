from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Country, Post, Comment
from .serializers import CountrySerializer, PostSerializer, CommentSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

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


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # Call the original post method to get the response
        response = super().post(request, *args, **kwargs)

        # Here we need to add the role from the token, since the response is not directly
        # providing the role information unless we modify the serializer to return it
        token = response.data['access']
        payload = self.get_payload_from_token(token)  # You'll create this method

        # Add a success message to the response data
        response.data['message'] = 'Login successful! Welcome back, {}!'.format(payload['username'])
        response.data['role'] = payload['role']  # Add role to the response

        return response

    def get_payload_from_token(self, token):
        """
        This helper method will decode the token to get the payload data.
        """
        from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
        from rest_framework_simplejwt.tokens import UntypedToken

        try:
            untyped_token = UntypedToken(token)
            return untyped_token.payload  # returns the token payload
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
    
    def get(self, request):
        return Response({'msg': 'Register via POST request'}, status=status.HTTP_200_OK)
    