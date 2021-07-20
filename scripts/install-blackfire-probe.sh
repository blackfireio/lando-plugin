#!/bin/bash
set -e

PHP_VERSION=$(php -v | sed -nE "s/^PHP (.+) \(cli\).+/\1/p" | sed -nE "s/^([^.]+)\.([^.]+)\..+/\1\2/p")
EXTENSION_DIR=$(php -i | grep "^extension_dir =>" | sed -nE "s/extension_dir => ([^ =>]+).+/\1/p")

echo "Installing Blackfire Probe for PHP"
(cd /tmp && wget -nv -N "https://blackfire.io/api/v1/releases/probe/php/linux/amd64/$PHP_VERSION")
tar -xzf /tmp/$PHP_VERSION -C $EXTENSION_DIR/
mv $EXTENSION_DIR/blackfire-*.so $EXTENSION_DIR/blackfire.so
rm $EXTENSION_DIR/blackfire-*.sha

if [[ -z $(php -v | grep blackfire) ]]; then
  echo "Activating the Blackfire Probe for PHP."
  INI_DIR=$(php --ini | grep "additional \.ini files" | sed -sE "s/^Scan for additional \.ini files in: (\/.+)$/\1/")
  cat << EOF > $INI_DIR/blackfire.ini
[blackfire]
extension=blackfire.so
EOF
else
  echo "The Blackfire Probe is already configured."
fi
