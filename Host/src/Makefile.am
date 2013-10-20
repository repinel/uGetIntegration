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

CFLAGS = --pedantic -Wall -std=c99 -O2

bin_PROGRAMS = ugetdm-integration

ugetdm_integration_SOURCES = ugetdm-integration.cpp

bin_SCRIPTS = com.ugetdm.integration.json

com.ugetdm.integration.json: com.ugetdm.integration.json.in
	@case "$(host_os)" in \
		darwin*) \
			echo "sed -e 's|HOST_PATH|'$(prefix)'\/ugetdm-integration|' < '$(srcdir)/com.ugetdm.integration.json.in' > com.ugetdm.integration.json" ; \
			sed -e 's|HOST_PATH|'$(prefix)'\/ugetdm-integration|' < "$(srcdir)/com.ugetdm.integration.json.in" > com.ugetdm.integration.json ;; \
		linux) \
			echo "sed -e 's|HOST_PATH|'$(prefix)'\/ugetdm-integration|' < '$(srcdir)/com.ugetdm.integration.json.in' > com.ugetdm.integration.json" ; \
			sed -e 's|HOST_PATH|'$(prefix)'\/ugetdm-integration|' < $(srcdir)/com.ugetdm.integration.json.in > com.ugetdm.integration.json ;; \
		mingw32 | cygwin) \
			echo "sed -e 's|HOST_PATH|'$(prefix)'\/ugetdm-integration.exe|' < '$(srcdir)/com.ugetdm.integration.json.in' > com.ugetdm.integration.json" ; \
			sed -e 's|HOST_PATH|ugetdm-integration.exe|' < $(srcdir)/com.ugetdm.integration.json.in > com.ugetdm.integration.json ;; \
		*) \
			echo "Your platform is not currently supported" ; exit 1 ;; \
	esac;

install-binSCRIPTS: $(bin_SCRIPTS)
	@$(NORMAL_INSTALL)
	@case "$(host_os)" in \
		darwin*) \
			JSON_DIRS=( '/Library/Google/Chrome/NativeMessagingHosts' ) ;; \
		linux) \
			JSON_DIRS=( '/etc/opt/chrome/native-messaging-hosts' '/etc/chromium/native-messaging-hosts' ) ;; \
		*) \
			echo "Your platform is not currently supported for installation" ; exit 1 ;; \
	esac; \
	for json_dir in "$${JSON_DIRS[@]}"; do \
		echo " $(MKDIR_P) '$$json_dir'"; \
		$(MKDIR_P) "$$json_dir" || exit 1; \
		echo " $(INSTALL_PROGRAM_ENV) $(INSTALL_PROGRAM) 'com.ugetdm.integration.json' '$$json_dir'"; \
		$(INSTALL_SCRIPT_ENV) $(INSTALL_PROGRAM) "com.ugetdm.integration.json" "$$json_dir" || exit $$?; \
    done;

