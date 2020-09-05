#! /usr/bin/env bash
mongoimport --db ticket --collection ticketdetail --file /docker-entrypoint-initdb.d/detail-v2.json