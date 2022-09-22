from django.db import models

# Create your models here.

class to_do_app_db(models.Model):

  task_name = models.CharField(max_length=50)
  status = models.BooleanField(default=False, blank=True, null=True)
      
  def __str__(self):
    return self.title