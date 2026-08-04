$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) {
    $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
}
if (-not (Test-Path $chrome)) {
    $chrome = "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
}
if (-not (Test-Path $chrome)) {
    # Fallback to msedge
    $chrome = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
}

Write-Host "Opening Chrome from: $chrome"

# Open Desktop Window on Left
Start-Process $chrome -ArgumentList "--user-data-dir=C:\tmp\chrome_desktop", "--new-window", "http://localhost:3000", "--window-position=0,0", "--window-size=1200,950"

# Open Mobile Window on Right
Start-Process $chrome -ArgumentList "--user-data-dir=C:\tmp\chrome_mobile", "--new-window", "http://localhost:3000", "--window-position=1210,0", "--window-size=450,950"
