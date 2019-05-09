#!/bin/bash

pip install -r requirements.txt

GOOGLE_APPLICATION_CREDENTIALS="/usr/local/google/home/acemil/stackathon-2019-91ab2b263fb4.json"

if [[ -f ${GOOGLE_APPLICATION_CREDENTIALS} ]] ; then
  echo "Using ${GOOGLE_APPLICATION_CREDENTIALS} credentials"
else
  red='\033[0;31m'
  reset='\033[0m'
  echo -e "${red}WARNING${reset}: No credential file!! ${GOOGLE_APPLICATION_CREDENTIALS}"
fi

export GOOGLE_APPLICATION_CREDENTIALS

port=${1:-8080}
workers=${2:-1}

cd backend
export FLASK_APP=app.py
flask run