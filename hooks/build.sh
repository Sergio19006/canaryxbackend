#!/bin/bash
docker build -t sergio19006/nodexperience --build-arg ATLAS_PASSWORD=$ATLAS_PASSWORD--build-arg MAIL_PASSWORD=$MAIL_PASSWORD --build-arg PHOTO_SERVICE=$PHOTO_SERVICE  .