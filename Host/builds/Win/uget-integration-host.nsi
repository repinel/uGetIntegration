; uget-integration-host.nsi
;
; The uGet Integration Host NSIS script. It will install the host application
; that is used by the uGet Integration extension from Chromium based browsers.

Name "uGet Integration Host"

; The file to write
OutFile "uget-integration-host-v1.0.1.exe"

; The default installation directory
InstallDir "$PROGRAMFILES\uGetIntegrationHost"

; Request application privileges for Windows Vista
RequestExecutionLevel admin

; Registry key to check for directory (so if you install again, it will
; overwrite the old one automatically)
InstallDirRegKey HKLM "SOFTWARE\uGetIntegrationHost" "Install_Dir"

;--------------------------------

;Version Information

VIProductVersion "1.0.1.0"
VIAddVersionKey "ProductName" "uGet Integration Host"
VIAddVersionKey "LegalCopyright" "uGet Integration Host"
VIAddVersionKey "FileDescription" "uGet Integration Host"
VIAddVersionKey "FileVersion" "1.0.1.0"

;--------------------------------

; Pages

Page directory
Page instfiles

UninstPage uninstConfirm
UninstPage instfiles

;--------------------------------

Section "uGetIntegrationHost (required)"

  ; Set output path to the installation directory.
  SetOutPath $INSTDIR

  ; Put file there
  File ..\..\src\uget-integration-host.exe
  File ..\..\src\com.ugetdm.integration.json

  ; Write the installation path into the registry
  WriteRegStr HKLM "SOFTWARE\uGetIntegrationHost" "Install_Dir" "$INSTDIR"

  ; Write the JSON host path into the registry
  WriteRegStr HKLM "SOFTWARE\Google\Chrome\NativeMessagingHosts\com.ugetdm.integration" "" '$INSTDIR\com.ugetdm.integration.json'

  ; Write the uninstall keys for Windows
  WriteRegStr HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\uGetIntegrationHost" "DisplayName" "uGet Integration Host"
  WriteRegStr HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\uGetIntegrationHost" "UninstallString" '"$INSTDIR\uninstall.exe"'
  WriteRegDWORD HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\uGetIntegrationHost" "NoModify" 1
  WriteRegDWORD HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\uGetIntegrationHost" "NoRepair" 1
  WriteUninstaller "uninstall.exe"

SectionEnd

Section "Uninstall"

  ; Remove registry keys
  DeleteRegKey HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\uGetIntegrationHost"
  DeleteRegKey HKLM "SOFTWARE\uGetIntegrationHost"
  DeleteRegKey HKLM "SOFTWARE\Google\Chrome\NativeMessagingHosts\com.ugetdm.integration"

  ; Remove files and uninstaller
  Delete $INSTDIR\uget-integration-host.exe
  Delete $INSTDIR\com.ugetdm.integration.json
  Delete $INSTDIR\uninstall.exe

  ; Remove directories used
  RMDir "$INSTDIR"

SectionEnd

