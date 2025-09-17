#!/bin/bash
set -e

echo "Starting Django setup..."

VENV_PATH="venv"

PORT=8000

OS="$(uname -s | tr '[:upper:]' '[:lower:]')"

echo "Detecting operating system..."
case "$OS" in
    linux*)   PLATFORM="Linux" ;;
    darwin*)  PLATFORM="MacOS" ;;
    msys*|cygwin*|mingw*) PLATFORM="Windows" ;;
    *)        PLATFORM="Unknown" ;;
esac
echo "Running on: $PLATFORM"

if [ ! -d "$VENV_PATH" ]; then
    echo "Creating virtual environment at $VENV_PATH..."
    python -m venv "$VENV_PATH"
fi

echo "Activating virtual environment..."
if [ "$PLATFORM" = "Windows" ]; then
    source "$VENV_PATH/Scripts/activate"
else
    source "$VENV_PATH/bin/activate"
fi

if [ -f "requirements.txt" ]; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
fi

echo "Running migrations..."
python manage.py makemigrations app
python manage.py migrate

echo "👤 Checking for superuser..."
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin')
    print('Superuser created: admin / admin')
else:
    print('Superuser already exists')
"
echo "Running mock"
python manage.py loaddata mock_data.json

echo "Starting server at http://127.0.0.1:$PORT ..."
python manage.py runserver
