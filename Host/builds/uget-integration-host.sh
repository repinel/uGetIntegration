#!/bin/bash

./configure && make && sudo checkinstall -D -y \
  --install=no \
  --fstrans=no \
  --reset-uids=yes \
  --pkgname="uget-integration-host" \
  --pkgversion=1.0.1 \
  --pkgrelease=1 \
  --pkggroup=utils \
  --arch=i386 \
  --pkglicense="Apache License, Version 2.0" \
  --maintainer="Roque Pinel" \
  --nodoc \
  --backup=no

#fakeroot alien -r uget-integration-host_*-*_i386.deb

