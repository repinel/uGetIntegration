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

AC_PREREQ([2.69])
AC_INIT(uGet Integration, 1.0, [], [uget-integration], [https://github.com/repinel/uGetIntegration])
AM_INIT_AUTOMAKE
AC_CONFIG_SRCDIR([src/ugetdm-integration.cpp])
AC_CONFIG_HEADERS([config.h])

# Check the host OS
AC_CANONICAL_HOST
case $host_os in
	darwin*)
		AC_DEFINE([OS_MACOSX], [], [Using OS X])
		;;
	linux*)
		AC_DEFINE([OS_LINUX], [], [Using Linux])
		;;
	mingw32 | cygwin)
		AC_DEFINE([OS_WINDOWS], [], [Using Windows])
		;;
	*)
		AC_MSG_ERROR([Your platform is not currently supported])
esac

# Checks for programs.
AC_PROG_CXX

# Checks for libraries.

# Checks for header files.

# Checks for typedefs, structures, and compiler characteristics.
AC_CHECK_HEADER_STDBOOL
AC_TYPE_INT32_T
AC_TYPE_SIZE_T

# Checks for library functions.
AC_CHECK_FUNCS([memset])

AC_CONFIG_FILES([Makefile src/Makefile])
AC_OUTPUT
