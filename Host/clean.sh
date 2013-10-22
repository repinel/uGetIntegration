#!/bin/sh

rm -vf Makefile config.h config.log config.status stamp-h1
rm -vRf autom4te.cache

rm -vf *~

rm -vf uget-integration-*.tar.gz uget-integration-*.deb uget-integration-*.rpm

rm -vRf src/.deps
rm -vf src/Makefile src/ugetdm-integration src/ugetdm-integration.exe src/ugetdm-integration.o src/com.ugetdm.integration.json
