from django.utils.translation import gettext_lazy as _
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager , PermissionsMixin
# Create your models here.


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields ):
        if not email:
            raise ValueError("User must have an email.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email'), max_length=150, unique=True)
    name = models.CharField(max_length=150)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=150, null=True, blank=True)
    image = models.ImageField(null=True,blank=True, default='/no_image.png')
    brand = models.CharField(max_length=150, null=False, blank=False)
    category = models.CharField(max_length=150, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models. DecimalField(max_digits=8,decimal_places=2,null=True, blank=True)
    numreviews = models.IntegerField(null=True, blank=True)
    price = models. DecimalField(max_digits=8,decimal_places=2,null=True, blank=True)
    inStock = models.IntegerField(null=True, blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null =True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null =True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null = True, blank=True, default=0)
    comment = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)