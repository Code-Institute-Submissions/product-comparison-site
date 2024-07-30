release: python manage.py collectstatic --noinput
web: gunicorn product_comparison.wsgi:application