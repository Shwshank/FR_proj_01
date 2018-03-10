#!/bin/bash

TIMESTAMP=`TZ=IST-5:30 date +%F-%H%M`

GITHUB_LINK="https://github.com/Shwshank/QCI-Collect-frontend.git"

DOCKERNAME="Collect-Frontend"

IMAGENAME="qci-collect-front"

REPONAME="collect-frontend-pipeline"


git clone $GITHUB_LINK

mv /var/lib/jenkins/workspace/collect-frontend/dist/ /home/ubuntu/dist_backups/collect/dist_$TIMESTAMP

mv /var/lib/jenkins/workspace/collect-frontend-pipeline/dist /var/lib/jenkins/workspace/collect-frontend/

docker stop $DOCKERNAME

docker rm $DOCKERNAME

docker rmi $IMAGENAME

docker build -t $IMAGENAME /var/lib/jenkins/workspace/collect-frontend/.

docker run -dt --name $DOCKERNAME $IMAGENAME
