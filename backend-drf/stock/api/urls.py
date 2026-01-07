
from django.urls import path
from accounts.views import ProtectView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# from api.views import api
from accounts import views as UserViews
urlpatterns = [
  
    
    #BASE API ENDPOINT
    
    path("register/",UserViews.RegisterView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("protected-view/",UserViews.ProtectView.as_view())
]