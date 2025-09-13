from django.db import models

class SoftDeleteManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    objects = SoftDeleteManager()
    all_objects = models.Manager()
    def delete(self, *args, **kwargs):
        self.is_deleted = True
        self.save()

    class Meta:
        abstract = True