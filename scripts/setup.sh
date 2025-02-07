#!/usr/bin/env bash
echo "Setting up environment..."
touch .env
echo "PORT=3000" >> .env
npm install