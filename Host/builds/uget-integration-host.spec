#
# spec file for package
#
# Copyright (c) 2014 SUSE LINUX Products GmbH, Nuernberg, Germany.
#
# All modifications and additions to the file contributed by third parties
# remain the property of their copyright owners, unless otherwise agreed
# upon. The license for this file, and modifications and additions to the
# file, is the same license as for the pristine package itself (unless the
# license for the pristine package is not an Open Source License, in which
# case the license is the MIT License). An "Open Source License" is a
# license that conforms to the Open Source Definition (Version 1.9)
# published by the Open Source Initiative.

# Please submit bugfixes or comments via http://bugs.opensuse.org/
#

Name:           uget-integration-host
Version:        1.0.1
Release:        1%{?dist}
License:        Apache License, Version 2.0
Summary:        uGet Integration
Url:            https://github.com/repinel/uGetIntegration
Group:          Applications/Internet
Source:         uget-integration-host-%{version}.tar.gz
#Patch:
BuildRequires:  gcc-c++, automake
#PreReq:
#Provides:
BuildRoot:      %{_tmppath}/%{name}-%{version}-build

%description

%prep
%setup -q

%build
%configure
make %{?_smp_mflags}

%install
%make_install

%post

%postun

%files
%defattr(-,root,root)
%doc README COPYING
%{_bindir}/uget-integration-host
%config %{_sysconfdir}/opt/chrome/native-messaging-hosts
%config %{_sysconfdir}/chromium/native-messaging-hosts

%changelog

