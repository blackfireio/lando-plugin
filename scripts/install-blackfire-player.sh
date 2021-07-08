#!/bin/bash
set -e

curl -LsS https://get.blackfire.io/blackfire-player.phar -o /tmp/blackfire-player
chmod +x /tmp/blackfire-player
mv /tmp/blackfire-player /usr/local/bin/blackfire-player
