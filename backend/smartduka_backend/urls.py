from django.contrib import admin
from django.urls import path, include, re_path
from ussd import views as ussd_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('ussd/', include('ussd.urls')),
    re_path(r'^ussd/?$', ussd_views.ussd_entry, name='ussd_no_slash'),  # Support /ussd without slash
]
