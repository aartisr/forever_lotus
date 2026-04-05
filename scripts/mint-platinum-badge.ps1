# Mint a signed Awaricon Platinum badge URL for buddhi-align.forever.com
# Usage:
#   .\mint-platinum-badge.ps1
#   .\mint-platinum-badge.ps1 -AdminKey "your-admin-key"
#   .\mint-platinum-badge.ps1 -Host "https://buddhi-align.foreverlotus.com" -Site "buddhi-align.forever.com" -Days 30

param(
    [string]$Host  = "https://buddhi-align.foreverlotus.com",
    [string]$Site  = "buddhi-align.forever.com",
    [int]   $Days  = 30,
    [string]$AdminKey = ""
)

$encodedSite = [Uri]::EscapeDataString($Site)
$tokenUrl = "${Host}/api/awaricon/embed-token?tier=platinum&site=${encodedSite}&days=${Days}"

Write-Host "Requesting embed token from: $tokenUrl"

$headers = @{ "Accept" = "application/json" }
if ($AdminKey -ne "") {
    $headers["x-awaricon-admin-key"] = $AdminKey
}

try {
    $response = Invoke-WebRequest -Uri $tokenUrl -Headers $headers -UseBasicParsing -ErrorAction Stop
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Write-Error "HTTP $statusCode error from server."
    try {
        $body = $_.ErrorDetails.Message
        Write-Error "Response body: $body"
    } catch {}
    exit 1
}

if ($response.StatusCode -ne 200) {
    Write-Error "Unexpected status $($response.StatusCode): $($response.Content)"
    exit 1
}

try {
    $json = $response.Content | ConvertFrom-Json
} catch {
    Write-Error "Failed to parse JSON response: $($response.Content)"
    exit 1
}

$encodedReturnedSite = [Uri]::EscapeDataString($json.site)
$badgeUrl = "${Host}/api/awaricon/badge?tier=platinum&site=${encodedReturnedSite}&exp=$($json.exp)&sig=$($json.sig)"

Write-Host ""
Write-Host "===== FINAL BADGE URL =====" -ForegroundColor Green
Write-Host $badgeUrl
Write-Host "===========================" -ForegroundColor Green
Write-Host ""
Write-Host "Embed HTML:" -ForegroundColor Cyan
Write-Host @"
<a href="${Host}/awaricon/legal" target="_blank" rel="noopener noreferrer" aria-label="Awaricon Platinum compliance badge">
  <img src="$badgeUrl" alt="Awaricon Platinum compliance badge" width="180" height="180" loading="lazy" />
</a>
"@
