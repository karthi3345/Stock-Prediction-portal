
from django.urls import path
# from api.views import api
from accounts import views as UserViews
urlpatterns = [
  
    
    #BASE API ENDPOINT
    
    path("register/",UserViews.RegisterView.as_view()),
]