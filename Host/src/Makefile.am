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

#
# Host JSON
#

HOST_JSON = com.ugetdm.integration.json.in
HOST_JSON_OUTPUT = com.ugetdm.integration.json

HOST_OS_JSON_DIRS = \
	case "$(host_os)" in \
		darwin*) \
			JSON_DIRS=( '/Library/Google/Chrome/NativeMessagingHosts' ) ;; \
		linux) \
			JSON_DIRS=( '/etc/opt/chrome/native-messaging-hosts' '/etc/chromium/native-messaging-hosts' ) ;; \
		*) \
			echo "Your platform is not currently supported for installation" ; exit 1 ;; \
	esac;

# necessary to export the file with the distribution
EXTRA_DIST = $(HOST_JSON)

bin_SCRIPTS = $(HOST_JSON_OUTPUT)

$(HOST_JSON_OUTPUT): $(HOST_JSON)
	@case "$(host_os)" in \
		darwin*) \
			echo "sed -e 's|HOST_PATH|'$(prefix)'\/ugetdm-integration|' < '$(srcdir)/$(HOST_JSON)' > '$(HOST_JSON_OUTPUT)'" ; \
			sed -e 's|HOST_PATH|'$(prefix)'\/ugetdm-integration|' < "$(srcdir)/$(HOST_JSON)" > "$(HOST_JSON_OUTPUT)" ;; \
		linux) \
			echo "sed -e 's|HOST_PATH|'$(prefix)'\/ugetdm-integration|' < '$(srcdir)/$(HOST_JSON)' > '$(HOST_JSON_OUTPUT)'" ; \
			sed -e 's|HOST_PATH|'$(prefix)'\/ugetdm-integration|' < "$(srcdir)/$(HOST_JSON)" > "$(HOST_JSON_OUTPUT)" ;; \
		mingw32 | cygwin) \
			echo "sed -e 's|HOST_PATH|'$(prefix)'\/ugetdm-integration.exe|' < '$(srcdir)/$(HOST_JSON)' > '$(HOST_JSON_OUTPUT)'" ; \
			sed -e 's|HOST_PATH|ugetdm-integration.exe|' < "$(srcdir)/$(HOST_JSON)" > "$(HOST_JSON_OUTPUT)" ;; \
		*) \
			echo "Your platform is not currently supported: $(host_os)" ; exit 1 ;; \
	esac;

install-binSCRIPTS: $(bin_SCRIPTS)
	@$(NORMAL_INSTALL)
	@$(HOST_OS_JSON_DIRS) \
	for json_dir in "$${JSON_DIRS[@]}"; do \
		echo " $(MKDIR_P) '$$json_dir'"; \
		$(MKDIR_P) "$$json_dir" || exit 1; \
		echo " $(INSTALL_PROGRAM_ENV) $(INSTALL_PROGRAM) '$(HOST_JSON_OUTPUT)' '$$json_dir'"; \
		$(INSTALL_SCRIPT_ENV) $(INSTALL_PROGRAM) "$(HOST_JSON_OUTPUT)" "$$json_dir" || exit $$?; \
	done;

uninstall-binSCRIPTS:
	@$(NORMAL_UNINSTALL)
	@$(HOST_OS_JSON_DIRS) \
	list='$(bin_SCRIPTS)'; test -n "$(bindir)" || exit 0; \
	files=`for p in $$list; do echo "$$p"; done | \
			sed -e 's,.*/,,;$(transform)'`; \
	for json_dir in "$${JSON_DIRS[@]}"; do \
		dir="$$json_dir"; $(am__uninstall_files_from_dir) \
	done;

clean-binSCRIPTS:
	-test -z "$(bin_SCRIPTS)" || rm -f $(bin_SCRIPTS)

clean-generic: clean-binSCRIPTS
