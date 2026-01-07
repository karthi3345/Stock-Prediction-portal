from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated

class RegisterView(generics.CreateAPIView): #createing api objs in database
    queryset= User.objects.all()#getting data from database
    serializer_class=UserSerializer
    permission_classes=[AllowAny]#allowing permission

class ProtectView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self,request):
        response={
            'status':'request was permitted '
        }
        
        return Response(response)
    
    