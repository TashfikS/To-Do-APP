from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import Data_Serializer

from .models import to_do_app_db
# Create your views here.

@api_view(['GET'])
def view(request):

	objects = to_do_app_db.objects.all().order_by('-id')
	serializer = Data_Serializer(objects, many=True)

	return Response(serializer.data)

@api_view(['POST'])
def create(request):

	serializer = Data_Serializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['POST'])
def update(request, pk):

	update_object = to_do_app_db.objects.get(id=pk)
	serializer = Data_Serializer(instance=update_object, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)


@api_view(['DELETE'])
def delete(request, pk):

	update_object = to_do_app_db.objects.get(id=pk)
	update_object.delete()

	return Response('Selected Task has deleted')



