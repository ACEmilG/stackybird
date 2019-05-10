#!/bin/bash

pip install -r requirements.txt

GOOGLE_APPLICATION_CREDENTIALS="/usr/local/google/home/acemil/stackybird.json"

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

export FLASK_APP=main.py
flask run
