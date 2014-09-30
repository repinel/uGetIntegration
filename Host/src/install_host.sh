#!/bin/bash
# Copyright 2013 uGet Integration.
#
# This file is part of uGet Integration.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http:#www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e

DIR="$( cd "$( dirname "$0" )" && pwd )"
if [ $(uname -s) == 'Darwin' ]; then
    TARGET_DIRS=( '/Library/Google/Chrome/NativeMessagingHosts' )
else
    TARGET_DIRS=( '/etc/opt/chrome/native-messaging-hosts' '/etc/chromium/native-messaging-hosts' )
fi

HOST_NAME=com.ugetdm.integration
HOST_PATH=$DIR/uget-integration-host

# Update host path in the manifest.
ESCAPED_HOST_PATH=${HOST_PATH////\\/}

for target_dir in "${TARGET_DIRS[@]}"
do
    mkdir -p $target_dir
    cp $DIR/${HOST_NAME}.json.in $target_dir/${HOST_NAME}.json

    sed -i -e "s/HOST_PATH/$ESCAPED_HOST_PATH/" ${target_dir}/${HOST_NAME}.json

    rm -f ${target_dir}/${HOST_NAME}.json-e

    # Set permissions for the manifest so that all users can read it.
    chmod o+r ${target_dir}/${HOST_NAME}.json
done

echo Native messaging host $HOST_NAME has been installed.

# EOF
