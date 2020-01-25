from django.db import models
from django.utils import timezone


class Vtype(models.Model):
    vtype_abrev = models.CharField(max_length=5)
    vtype_desc = models.CharField(max_length=100)
    is_draft = models.BooleanField(default=False)

    def __str__(self):
        return "%s" % (self.vtype_desc)

class Category(models.Model):
    category_abrev = models.CharField(max_length=50)
    category_desc = models.CharField(max_length=100)
    is_draft = models.BooleanField(default=False)

    def __str__(self):
        return "%s" % (self.category_abrev)

class Vocab(models.Model):
    #no ID col because it is default
    french = models.CharField(max_length=100, verbose_name="French")
    vtype = models.ForeignKey(Vtype, on_delete=models.CASCADE,related_name='vocabs') #CharField(max_length=100, choices=vtype_choices, default="UNK",verbose_name="Type") #check (noun feminine, noun masculine, verb group1…)
    pronunciation = models.CharField(max_length=100, verbose_name="Pronunciation")
    english = models.CharField(max_length=255, verbose_name="English")
    category =  models.ForeignKey(Category, on_delete=models.CASCADE,related_name='vocabs')
    example = models.CharField(max_length=255, verbose_name="Example")
    note = models.CharField(max_length=255, verbose_name="Note")
    is_draft = models.BooleanField(default=False)

    def __str__(self):
        return self.french


