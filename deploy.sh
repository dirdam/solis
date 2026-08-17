#!/bin/bash

echo "Deploying to server..."
ssh root@46.225.104.62 'cd /opt/dirdam/solis && git pull && systemctl restart solis'
echo "✓ Deployment complete!"
