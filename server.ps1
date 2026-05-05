$ErrorActionPreference = "Stop"

$Root = if ($PSScriptRoot) {
  $PSScriptRoot
}
elseif ($MyInvocation.MyCommand.Path) {
  Split-Path -Parent $MyInvocation.MyCommand.Path
}
else {
  (Get-Location).Path
}

$Port = 4173
$Address = [System.Net.IPAddress]::Parse("127.0.0.1")
$Listener = [System.Net.Sockets.TcpListener]::new($Address, $Port)

function Get-ContentType {
  param([string]$Path)

  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".js" { "text/javascript; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    ".svg" { "image/svg+xml" }
    default { "application/octet-stream" }
  }
}

function Send-Response {
  param(
    [System.Net.Sockets.NetworkStream]$Stream,
    [int]$Status,
    [string]$Reason,
    [byte[]]$Body,
    [string]$ContentType
  )

  $Header = "HTTP/1.1 $Status $Reason`r`nContent-Type: $ContentType`r`nContent-Length: $($Body.Length)`r`nConnection: close`r`n`r`n"
  $HeaderBytes = [System.Text.Encoding]::ASCII.GetBytes($Header)
  $Stream.Write($HeaderBytes, 0, $HeaderBytes.Length)
  $Stream.Write($Body, 0, $Body.Length)
}

$Listener.Start()
Write-Host "AkademiPort: http://127.0.0.1:$Port"

while ($true) {
  $Client = $Listener.AcceptTcpClient()

  try {
    $Stream = $Client.GetStream()
    $Client.ReceiveTimeout = 3000
    $Buffer = New-Object byte[] 8192
    $Read = $Stream.Read($Buffer, 0, $Buffer.Length)

    if ($Read -le 0) {
      continue
    }

    $RequestText = [System.Text.Encoding]::ASCII.GetString($Buffer, 0, $Read)
    $RequestLine = ($RequestText -split "`r?`n")[0]

    if ([string]::IsNullOrWhiteSpace($RequestLine)) {
      continue
    }

    $Parts = $RequestLine.Split(" ")
    $RequestPath = $Parts[1].Split("?")[0]

    if ($RequestPath -eq "/") {
      $RequestPath = "/index.html"
    }

    $RelativePath = [Uri]::UnescapeDataString($RequestPath.TrimStart("/"))
    $FilePath = [System.IO.Path]::GetFullPath((Join-Path $Root $RelativePath))

    if (-not $FilePath.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
      $Body = [System.Text.Encoding]::UTF8.GetBytes("Forbidden")
      Send-Response -Stream $Stream -Status 403 -Reason "Forbidden" -Body $Body -ContentType "text/plain; charset=utf-8"
      continue
    }

    if (-not (Test-Path -LiteralPath $FilePath -PathType Leaf)) {
      $Body = [System.Text.Encoding]::UTF8.GetBytes("Not found")
      Send-Response -Stream $Stream -Status 404 -Reason "Not Found" -Body $Body -ContentType "text/plain; charset=utf-8"
      continue
    }

    $Bytes = [System.IO.File]::ReadAllBytes($FilePath)
    Send-Response -Stream $Stream -Status 200 -Reason "OK" -Body $Bytes -ContentType (Get-ContentType -Path $FilePath)
  }
  catch {
    $Body = [System.Text.Encoding]::UTF8.GetBytes("Server error")
    Send-Response -Stream $Stream -Status 500 -Reason "Internal Server Error" -Body $Body -ContentType "text/plain; charset=utf-8"
  }
  finally {
    $Client.Close()
  }

  if ($env:AKADEMIPORT_ONCE -eq "1") {
    break
  }
}

$Listener.Stop()
