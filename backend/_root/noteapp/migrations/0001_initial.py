# Generated by Django 3.0.2 on 2020-01-25 05:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='LNote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('desc', models.CharField(max_length=1000)),
                ('language', models.CharField(max_length=7)),
                ('created_on', models.DateField()),
                ('is_draft', models.BooleanField(default=False)),
                ('image', models.FileField(null=True, upload_to='images')),
            ],
        ),
    ]
