#!/bin/bash

port=${1:-8080}

cd backend
gunicorn -b :$port app:app

