from base.models import User, Product, Review
from base.serializers import  UserSerializerWithToken, ProductSerializer, ReviewsSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import  IsAdminUser, IsAuthenticated

from django.contrib.auth.hashers import make_password
from rest_framework import status


# Create your views here.


# User login logic
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# User Sihnup logic
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            email=data['email'],
            name= data['name'],
            password = make_password(data['password'])
        )
        # print(user)
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        return Response({'message':'Email already exist'})


''' 
    Product related all 
        logic written below ...
        
        '''

@api_view(['GET'])
def allproductViews(request):
    products = Product.objects.all()

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def productView(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createReview(request, pk):
    user = request.user
    product =Product.objects.get(_id=pk)
    data = request.data

    # already exist
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        msg = {'message':'product review already exist'}
        return Response(msg, status=status.HTTP_400_BAD_REQUEST)

    # no rating
    elif data['rating'] == 0:
        msg = {'message':'Please rating'}
        return Response(msg, status=status.HTTP_400_BAD_REQUEST)
    
    # create review
    else:
        review =Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )

        reviews = product.review_set.all()
        product.numreviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating
        
        product.rating = total / len(reviews)
        product.save()
        return Response('Review added')



''' Below all logic related to admin user '''

@api_view(['Delete'])
@permission_classes([IsAdminUser])
def deleteproduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    
    return Response('Product deleted')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='sample name',
        price=0,
        brand='sample brand',
        inStock=0,
        category='sample category',
        description= 'sample dis'
    )
    serializer = ProductSerializer(product, many=False)
    
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data=request.data
    product = Product.objects.get(_id=pk)
    product.name=data['name']
    product.price=data['price']
    product.brand=data['brand']
    product.category=data['category']
    product.description=data['description']
    product.inStock = data['inStock']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([IsAdminUser])
# @csrf_exempt
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product= Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()
    return Response('Image uploaded') 




