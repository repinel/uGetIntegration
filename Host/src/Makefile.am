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

bin_SCRIPTS = ugetdm-integration-json

ugetdm-integration-json: com.ugetdm.integration.json.in
	case "$(host_os)" in \
		darwin*) \
			sed -e 's|HOST_PATH|'$(prefix)'\/ugetdm-integration|' < $(srcdir)/com.ugetdm.integration.json.in > com.ugetdm.integration.json ;; \
		linux) \
			sed -e 's|HOST_PATH|'$(prefix)'\/ugetdm-integration|' < $(srcdir)/com.ugetdm.integration.json.in > com.ugetdm.integration.json ;; \
		mingw32 | cygwin) \
			sed -e 's|HOST_PATH|ugetdm-integration.exe|' < $(srcdir)/com.ugetdm.integration.json.in > com.ugetdm.integration.json ;; \
		*) \
			echo "Your platform is not currently supported" ;; \
	esac;
