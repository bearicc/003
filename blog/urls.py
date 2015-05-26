from django.conf.urls import patterns, include, url
from django.contrib import admin
from . import views


admin.site.site_header = 'Login in'

urlpatterns = patterns('',
    url(r'^$', views.post_list),
    url(r'^admin/', include(admin.site.urls)),
)
