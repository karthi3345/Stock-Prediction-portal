from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True , min_length=8, style={ 'input_type':"password"}) #password get from post not form get 
    #should not retrive the password / get the password
    class Meta:
        model=User
        fields=["username", "email","password"]
        
        
    def create(self, validated_data): #automatically validate the data
        
        user= User.objects.create_user(**validated_data) #fields validate pannum
        
        return user