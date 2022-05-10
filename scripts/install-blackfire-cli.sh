#!/bin/bash
set -e

if [[ ! -e /usr/local/bin/blackfire ]]; then
  echo "Installing the latest version of Blackfire CLI"
  cd /tmp
  ARCHITECTURE=$(uname -m)
  wget -nv -O blackfire.tar.gz -L "https://blackfire.io/api/v1/releases/cli/linux/$ARCHITECTURE"
  tar -xzf blackfire.tar.gz
  chmod +x blackfire
  cp blackfire /usr/local/bin/blackfire
  rm blackfire.tar.gz blackfire blackfire.sha1
fi

blackfire version
