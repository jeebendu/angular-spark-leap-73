#!/bin/bash

printf "\n---------Nginx Webserver Setup Started---------\n"

CONFIG_FILE="www.clinichub.care.conf"
NGINX_SA=/etc/nginx/sites-available
NGINX_SE=/etc/nginx/sites-enabled

NGINX_SA_FILE=$NGINX_SA'/'$CONFIG_FILE
NGINX_SE_FILE=$NGINX_SE'/'$CONFIG_FILE

echo 'nginx virtual setup started for '$CONFIG_FILE

sudo cp $CONFIG_FILE $NGINX_SA

if [ -e  $NGINX_SE_FILE ]; then
    echo "FILE exists : ".$NGINX_SE_FILE
else
    echo "FILE does not exist, Installing...\n"
    sudo ln -s $NGINX_SA_FILE $NGINX_SE_FILE
fi

sudo service nginx restart
echo 'nginx restarted'

printf "\n---------Nginx Webserver Setup completed---------\n\n"