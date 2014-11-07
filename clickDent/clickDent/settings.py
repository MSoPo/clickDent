"""
Django settings for clickDent project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'j@++g%&#@*ro_$7u6^noxg*cxv*f#zf=z+00&yzc^q4$x7niq^'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'social_auth',
    'rest_framework',
    'loginClick',
    'direccion',
    'catalogo',
    'medico',
    'paciente',
    'tratamiento',
    'cita',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'clickDent.urls'

WSGI_APPLICATION = 'clickDent.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'
RUTA_PROYECTO = 'D:/Docs/MASP/docm/mejorando.la/clickDent/clickDent/'

STATICFILES_DIRS = (
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(RUTA_PROYECTO,'static'),
)

#Social_Atuh
AUTHENTICATION_BACKENDS = (
    'social_auth.backends.twitter.TwitterBackend',
    'social_auth.backends.facebook.FacebookBackend',
    'django.contrib.auth.backends.ModelBackend',
)

SESSION_SERIALIZER='django.contrib.sessions.serializers.PickleSerializer'

TWITTER_CONSUMER_KEY         = 'kKQbNH375qpN89kyCnX8obBBn'
TWITTER_CONSUMER_SECRET      = 'E5dRGl3FL12ijAP5RvPNHs3m3kIBFVf6ZlkdT8XylQz5JGhtgu'
FACEBOOK_APP_ID              = '501411863320324'
FACEBOOK_API_SECRET          = '6a173ab67f215be9cd88e67a493f79a2'

FACEBOOK_EXTENDED_PERMISSIONS = ['email']
TWITTER_EXTENDED_PERMISSIONS = ['email']

LOGIN_REDIRECT_URL = '/sistemaDental'

#REST_FRAMEWORK
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ('rest_framework.filters.DjangoFilterBackend',),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
}
