#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE lootopia_db;
    CREATE DATABASE location_db;
EOSQL