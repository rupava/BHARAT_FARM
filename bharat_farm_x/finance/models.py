from django.db import models

class FinanceInstitutions(models.Model):
    image_link = models.CharField(max_length=150,blank=False)
    site_link = models.CharField(max_length=150,blank=False)
    description = models.CharField(max_length=150,blank=False)
