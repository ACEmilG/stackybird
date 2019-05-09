#!/bin/bash

pip install -r requirements.txt

port=${1:-8080}
workers=${2:-1}

cd backend
gunicorn -w $workers -b :$port app:app

