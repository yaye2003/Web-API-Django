from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Produit
from .serializers import ProduitSerializer


class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer