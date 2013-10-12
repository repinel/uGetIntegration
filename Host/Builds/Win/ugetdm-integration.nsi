; ugetdm-integration.nsi
;
; The uGet Integration NSIS script. It will install the host application
; that is used by the uGet Integration extension from Chromium based browsers.

Name "uGet Integration"

; The file to write
OutFile "uGetIntegration-v1.0.exe"

; The default installation directory
InstallDir "$PROGRAMFILES\uGetIntegration"

; Request application privileges for Windows Vista
RequestExecutionLevel admin

; Registry key to check for directory (so if you install again, it will 
; overwrite the old one automatically)
InstallDirRegKey HKLM "SOFTWARE\uGetIntegration" "Install_Dir"

;--------------------------------

;Version Information

VIProductVersion "1.0.0.0"
VIAddVersionKey "ProductName" "uGet Integration"
VIAddVersionKey "LegalCopyright" "uGet Integration"
VIAddVersionKey "FileDescription" "uGet Integration"
VIAddVersionKey "FileVersion" "1.0.0.0"

;--------------------------------

; Pages

Page directory
Page instfiles

UninstPage uninstConfirm
UninstPage instfiles

;--------------------------------

Section "uGetIntegration (required)"

  ; Set output path to the installation directory.
  SetOutPath $INSTDIR
  
  ; Put file there
  File ..\..\Source\ugetdm-integration.exe
  File ..\..\Source\com.ugetdm.integration.json

  ; Write the installation path into the registry
  WriteRegStr HKLM "SOFTWARE\uGetIntegration" "Install_Dir" "$INSTDIR"

  ; Write the JSON host path into the registry
  WriteRegStr HKLM "SOFTWARE\Google\Chrome\NativeMessagingHosts\com.ugetdm.integration" "" '"$INSTDIR\com.ugetdm.integration.json"'
  
  ; Write the uninstall keys for Windows
  WriteRegStr HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\uGetIntegration" "DisplayName" "uGet Integration"
  WriteRegStr HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\uGetIntegration" "UninstallString" '"$INSTDIR\uninstall.exe"'
  WriteRegDWORD HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\uGetIntegration" "NoModify" 1
  WriteRegDWORD HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\uGetIntegration" "NoRepair" 1
  WriteUninstaller "uninstall.exe"
  
SectionEnd

Section "Uninstall"
  
  ; Remove registry keys
  DeleteRegKey HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\uGetIntegration"
  DeleteRegKey HKLM "SOFTWARE\uGetIntegration"
  DeleteRegKey HKLM "SOFTWARE\Google\Chrome\NativeMessagingHosts\com.ugetdm.integration"

  ; Remove files and uninstaller
  Delete $INSTDIR\ugetdm-integration.exe
  Delete $INSTDIR\com.ugetdm.integration.json
  Delete $INSTDIR\uninstall.exe

  ; Remove directories used
  RMDir "$INSTDIR"

SectionEnd

