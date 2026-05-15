param(
    [string]$Message = "Update deployment",
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$CodexDir = Join-Path $Root ".codex-submit-test"
$PublishWorktree = Join-Path $CodexDir "publish-worktree"
$TokenFile = Join-Path $CodexDir "github-token.txt"
$AskPassFile = Join-Path $CodexDir "git-askpass.cmd"

function Write-Step {
    param([string]$Text)
    Write-Host "[codex-submit] $Text"
}

function Ensure-CodexDir {
    if (-not (Test-Path -LiteralPath $CodexDir)) {
        New-Item -ItemType Directory -Path $CodexDir | Out-Null
    }
}

function Ensure-AskPass {
    Ensure-CodexDir

    $askPass = @'
@echo off
setlocal
echo %~1 | findstr /I "username" >nul
if %errorlevel%==0 (
  echo x-access-token
  exit /b 0
)
type "%~dp0github-token.txt"
'@

    Set-Content -LiteralPath $AskPassFile -Value $askPass -Encoding ASCII

    if (Test-Path -LiteralPath $TokenFile) {
        $env:GIT_ASKPASS = $AskPassFile
        $env:GIT_TERMINAL_PROMPT = "0"
        $env:SSH_ASKPASS = $AskPassFile
    }
}

function Invoke-GitRaw {
    param(
        [string]$WorkDir,
        [string[]]$Arguments,
        [switch]$UseOpenSsl
    )

    $gitArgs = @("-C", $WorkDir)
    if ($UseOpenSsl) {
        $gitArgs += @("-c", "http.sslBackend=openssl")
    }
    $gitArgs += $Arguments

    $previousErrorActionPreference = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    try {
        $output = & git @gitArgs 2>&1
    } finally {
        $ErrorActionPreference = $previousErrorActionPreference
    }
    $text = ($output | Out-String).TrimEnd()

    [pscustomobject]@{
        Code = $LASTEXITCODE
        Text = $text
    }
}

function Add-SafeDirectory {
    param([string]$WorkDir)

    $resolved = (Resolve-Path -LiteralPath $WorkDir).Path
    & git config --global --add safe.directory $resolved | Out-Null
}

function Invoke-Git {
    param(
        [string]$WorkDir,
        [string[]]$Arguments
    )

    $result = Invoke-GitRaw -WorkDir $WorkDir -Arguments $Arguments
    if ($result.Code -eq 0) {
        return $result.Text
    }

    if ($result.Text -match "dubious ownership|safe\.directory") {
        Write-Step "Adding safe.directory for $WorkDir"
        Add-SafeDirectory -WorkDir $WorkDir
        $result = Invoke-GitRaw -WorkDir $WorkDir -Arguments $Arguments
        if ($result.Code -eq 0) {
            return $result.Text
        }
    }

    if ($result.Text -match "SSL|schannel|certificate|TLS|http\.sslBackend|gnutls|unable to access 'https://") {
        Write-Step "Retrying Git with OpenSSL HTTPS backend"
        $result = Invoke-GitRaw -WorkDir $WorkDir -Arguments $Arguments -UseOpenSsl
        if ($result.Code -eq 0) {
            return $result.Text
        }
    }

    if ((Test-Path -LiteralPath $TokenFile) -and ($result.Text -match "Authentication failed|could not read Username|could not read Password|terminal prompts disabled|Repository not found")) {
        Write-Step "Retrying Git with token askpass"
        Ensure-AskPass
        $result = Invoke-GitRaw -WorkDir $WorkDir -Arguments $Arguments
        if ($result.Code -eq 0) {
            return $result.Text
        }

        $result = Invoke-GitRaw -WorkDir $WorkDir -Arguments $Arguments -UseOpenSsl
        if ($result.Code -eq 0) {
            return $result.Text
        }
    }

    throw "Git failed in ${WorkDir}: git $($Arguments -join ' ')`n$result.Text"
}

function Test-GitDirWritable {
    param([string]$WorkDir)

    $gitDirText = Invoke-Git -WorkDir $WorkDir -Arguments @("rev-parse", "--git-dir")
    $gitDir = $gitDirText.Trim()
    if (-not [System.IO.Path]::IsPathRooted($gitDir)) {
        $gitDir = Join-Path $WorkDir $gitDir
    }

    $testPath = Join-Path $gitDir "codex-write-test.$PID.tmp"
    Set-Content -LiteralPath $testPath -Value "ok" -NoNewline -Encoding ASCII
    Remove-Item -LiteralPath $testPath -Force
}

function Test-DirectPath {
    Write-Step "Checking direct git add / commit / push path"
    Test-GitDirWritable -WorkDir $Root
    Invoke-Git -WorkDir $Root -Arguments @("add", "--dry-run", "-A") | Out-Null
    Invoke-Git -WorkDir $Root -Arguments @("push", "--dry-run", "origin", "HEAD:main") | Out-Null

    $commitCheck = Invoke-GitRaw -WorkDir $Root -Arguments @("commit", "--dry-run", "--short")
    if ($commitCheck.Code -ne 0 -and $commitCheck.Text -match "Unable to create|Permission denied|index\.lock|not a git repository|dubious ownership|safe\.directory") {
        throw $commitCheck.Text
    }
}

function Has-StagedChanges {
    param([string]$WorkDir)

    $result = Invoke-GitRaw -WorkDir $WorkDir -Arguments @("diff", "--cached", "--quiet")
    if ($result.Code -eq 0) {
        return $false
    }
    if ($result.Code -eq 1) {
        return $true
    }

    throw "Git failed in ${WorkDir}: git diff --cached --quiet`n$result.Text"
}

function Submit-InDirectory {
    param(
        [string]$WorkDir,
        [string]$Label
    )

    Write-Step "Submitting from $Label"
    Invoke-Git -WorkDir $WorkDir -Arguments @("add", "-A") | Out-Null

    if (Has-StagedChanges -WorkDir $WorkDir) {
        Invoke-Git -WorkDir $WorkDir -Arguments @("commit", "-m", $Message) | Out-Null
    } else {
        Write-Step "No file changes to commit"
    }

    Invoke-Git -WorkDir $WorkDir -Arguments @("push", "origin", "HEAD:main") | Out-Null
}

function Get-OriginUrl {
    $origin = Invoke-Git -WorkDir $Root -Arguments @("remote", "get-url", "origin")
    return $origin.Trim()
}

function Copy-GitIdentity {
    param([string]$WorkDir)

    $name = Invoke-GitRaw -WorkDir $Root -Arguments @("config", "--get", "user.name")
    $email = Invoke-GitRaw -WorkDir $Root -Arguments @("config", "--get", "user.email")

    if ($name.Code -eq 0 -and $name.Text) {
        Invoke-Git -WorkDir $WorkDir -Arguments @("config", "user.name", $name.Text.Trim()) | Out-Null
    }
    if ($email.Code -eq 0 -and $email.Text) {
        Invoke-Git -WorkDir $WorkDir -Arguments @("config", "user.email", $email.Text.Trim()) | Out-Null
    }
}

function Ensure-PublishWorktree {
    Ensure-CodexDir

    if (-not (Test-Path -LiteralPath $PublishWorktree)) {
        New-Item -ItemType Directory -Path $PublishWorktree | Out-Null
    }

    if (-not (Test-Path -LiteralPath (Join-Path $PublishWorktree ".git"))) {
        $init = Invoke-GitRaw -WorkDir $PublishWorktree -Arguments @("init", "-b", "main")
        if ($init.Code -ne 0) {
            Invoke-Git -WorkDir $PublishWorktree -Arguments @("init") | Out-Null
            Invoke-Git -WorkDir $PublishWorktree -Arguments @("checkout", "-B", "main") | Out-Null
        }
    }

    Add-SafeDirectory -WorkDir $PublishWorktree

    $origin = Get-OriginUrl
    $remoteCheck = Invoke-GitRaw -WorkDir $PublishWorktree -Arguments @("remote", "get-url", "origin")
    if ($remoteCheck.Code -eq 0) {
        Invoke-Git -WorkDir $PublishWorktree -Arguments @("remote", "set-url", "origin", $origin) | Out-Null
    } else {
        Invoke-Git -WorkDir $PublishWorktree -Arguments @("remote", "add", "origin", $origin) | Out-Null
    }

    Copy-GitIdentity -WorkDir $PublishWorktree

    $fetchedOriginMain = $false
    try {
        Invoke-Git -WorkDir $PublishWorktree -Arguments @("fetch", "origin", "main") | Out-Null
        $fetchedOriginMain = $true
    } catch {
        Write-Step "Could not fetch origin/main before sync: $($_.Exception.Message)"
    }

    if ($fetchedOriginMain) {
        Invoke-Git -WorkDir $PublishWorktree -Arguments @("checkout", "-B", "main", "origin/main") | Out-Null
    } else {
        Invoke-Git -WorkDir $PublishWorktree -Arguments @("checkout", "-B", "main") | Out-Null
    }
}

function Assert-PublishPath {
    $codexFull = [System.IO.Path]::GetFullPath($CodexDir)
    $publishFull = [System.IO.Path]::GetFullPath($PublishWorktree)
    if (-not $publishFull.StartsWith($codexFull, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Publish worktree is outside .codex-submit-test"
    }
}

function Sync-ToPublishWorktree {
    Assert-PublishPath
    Write-Step "Syncing files to .codex-submit-test/publish-worktree"

    $args = @(
        $Root,
        $PublishWorktree,
        "/MIR",
        "/XD",
        ".git",
        ".codex-submit-test"
    )

    & robocopy @args | Out-Null
    $code = $LASTEXITCODE
    if ($code -ge 8) {
        throw "Robocopy failed with exit code $code"
    }
}

function Submit-FromPublishWorktree {
    Write-Step "Using publish worktree fallback"
    Ensure-PublishWorktree
    Sync-ToPublishWorktree
    Submit-InDirectory -WorkDir $PublishWorktree -Label ".codex-submit-test/publish-worktree"
}

Ensure-AskPass

if ($DryRun) {
    Test-DirectPath
    Write-Step "Dry run passed"
    exit 0
}

try {
    Test-DirectPath
    Submit-InDirectory -WorkDir $Root -Label "project root"
} catch {
    Write-Step "Direct submit failed: $($_.Exception.Message)"
    Submit-FromPublishWorktree
}

Write-Step "Done"
