release: python manage.py collectstatic --noinput
web: npm run build && gunicorn product_comparison.wsgi --log-file -