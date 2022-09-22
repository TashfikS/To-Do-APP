from rest_framework import serializers
from .models import to_do_app_db

class Data_Serializer(serializers.ModelSerializer):

	class Meta:
		model = to_do_app_db
		fields ='__all__'