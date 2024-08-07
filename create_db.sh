#!/bin/bash

# Define environment variables
DB_NAME="TODOLISTDB"
DB_USER="SONPIPE"
DB_PASSWORD="ADMIN"
CONTAINER_NAME="TODOLISTDB"
VOLUME_NAME="pgdata"

# Create a Docker volume for data persistence
docker volume create $VOLUME_NAME

# Run the PostgreSQL container
docker run --name $CONTAINER_NAME \
           -e POSTGRES_DB=$DB_NAME \
           -e POSTGRES_USER=$DB_USER \
           -e POSTGRES_PASSWORD=$DB_PASSWORD \
           -p 5432:5432 \
           -v $VOLUME_NAME:/var/lib/postgresql/data \
           -d postgres

