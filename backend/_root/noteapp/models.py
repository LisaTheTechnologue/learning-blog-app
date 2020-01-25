from django.db import models

class LNote(models.Model):
    title = models.CharField(max_length = 50)
    desc = models.CharField(max_length=1000)
    language = models.CharField(max_length=7)
    created_on = models.DateField()
    is_draft = models.BooleanField(default=False)
    image = models.FileField(upload_to='images',null=True)
    def __str__(self):
        return self.body

class File(models.Model):
    file = models.FileField(blank=False, null=False)
    def __str__(self):
        return self.file.name