#!/bin/bash
project_root="`cd $(dirname ${BASH_SOURCE[0]}); pwd`"
mount_path="/Volumes/Users"
dest="$mount_path/Public/remote-open-chrome"
src="$project_root"

smb_result="`smbutil statshares -m \"$mount_path\"`"
if ! [[ $? = 0 ]]; then
    echo "need to do things"
    echo "$smb_result"
    exit 1
fi

set -x
mkdir -p "$dest"
rsync -rv \
    --exclude "node_modules" \
    --exclude ".git" \
    "$src/" "$dest"
