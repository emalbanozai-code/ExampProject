import os

from django.core.management.base import BaseCommand
from django.db import IntegrityError, transaction

from accounts.models import User


class Command(BaseCommand):
    help = "Create a default superuser from environment variables if it doesn't exist."

    def handle(self, *args, **options):
        username = os.getenv("DJANGO_SUPERUSER_USERNAME")
        email = os.getenv("DJANGO_SUPERUSER_EMAIL")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD")
        role_name = os.getenv("DJANGO_SUPERUSER_ROLE", "admin")

        if not username or not email or not password:
            self.stdout.write(
                self.style.WARNING(
                    "Skipping default superuser creation. "
                    "Set DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL, "
                    "and DJANGO_SUPERUSER_PASSWORD."
                )
            )
            return

        try:
            with transaction.atomic():
                user, created = User.objects.get_or_create(
                    username=username,
                    defaults={
                        "email": email,
                        "role_name": role_name,
                        "is_staff": True,
                        "is_superuser": True,
                    },
                )

                if created:
                    user.set_password(password)
                    user.save(update_fields=["password"])
                    self.stdout.write(self.style.SUCCESS("Default superuser created."))
                else:
                    updated = False
                    if user.email != email:
                        user.email = email
                        updated = True
                    if user.role_name != role_name:
                        user.role_name = role_name
                        updated = True
                    if not user.is_staff or not user.is_superuser:
                        user.is_staff = True
                        user.is_superuser = True
                        updated = True
                    if updated:
                        user.save()
                    self.stdout.write(self.style.SUCCESS("Default superuser already exists."))
        except IntegrityError as exc:
            self.stderr.write(self.style.ERROR(f"Failed to create superuser: {exc}"))
