#!/bin/bash

###############################################################################
# MACH-I Website — Dr. D's Mac Studio Installer Download Script
#
# Run this script to pre-download all installers needed for Dr. D's Mac Studio
# setup. They'll be SCP'd to Dr. D's Mac Studio via Tailscale during setup.
#
# Alternative: These can alternatively be downloaded directly on Dr. D's machine
# if bandwidth is good — the SCP approach just saves time during the 6-hour
# setup session.
#
# Usage:
#   chmod +x download-installers.sh
#   ./download-installers.sh
#
###############################################################################

set -e

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

INSTALLERS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/installers"

echo -e "${BLUE}=== MACH-I Mac Studio Installer Downloader ===${NC}\n"

# Create installers directory
echo -e "${BLUE}Creating installers directory...${NC}"
mkdir -p "$INSTALLERS_DIR"
echo -e "${GREEN}✓ Directory: $INSTALLERS_DIR${NC}\n"

# Define downloads
declare -a DOWNLOADS=(
  "https://desktop.docker.com/mac/main/arm64/Docker.dmg|Docker Desktop for Mac (Apple Silicon)|Docker.dmg"
  "https://pkgs.tailscale.com/stable/Tailscale-latest-macos.zip|Tailscale for Mac (or use App Store)|Tailscale-latest-macos.zip"
  "https://nodejs.org/dist/v22.14.0/node-v22.14.0.pkg|Node.js LTS for Mac ARM64 (v22.14.0)|node-v22.14.0.pkg"
)

# Download each installer
echo -e "${BLUE}Downloading installers...${NC}\n"

for download in "${DOWNLOADS[@]}"; do
  IFS='|' read -r url description filename <<< "$download"
  filepath="$INSTALLERS_DIR/$filename"

  echo -e "${BLUE}→ $description${NC}"
  echo "  URL: $url"
  echo "  Destination: $filepath"

  if [ -f "$filepath" ]; then
    echo -e "${GREEN}  ✓ Already exists (skipping)${NC}\n"
  else
    echo "  Status: downloading..."
    if curl -L -o "$filepath" "$url" 2>/dev/null; then
      echo -e "${GREEN}  ✓ Downloaded successfully${NC}\n"
    else
      echo -e "${RED}  ✗ Download failed${NC}\n"
      exit 1
    fi
  fi
done

# Show directory size
echo -e "${BLUE}=== Download Summary ===${NC}\n"
TOTAL_SIZE=$(du -sh "$INSTALLERS_DIR" 2>/dev/null | cut -f1)
echo -e "Total size of installers directory: ${GREEN}$TOTAL_SIZE${NC}"
echo -e "Location: ${GREEN}$INSTALLERS_DIR${NC}\n"

# List all files
echo -e "${BLUE}Files in installers/:${NC}"
ls -lh "$INSTALLERS_DIR" | tail -n +2 | awk '{printf "  %s  %s\n", $5, $9}'

echo -e "\n${GREEN}✓ All installers ready for SCP transfer to Dr. D's Mac Studio${NC}\n"

###############################################################################
# Notes:
#
# - Docker.dmg will need to be opened and dragged to Applications folder
# - Tailscale can be downloaded via App Store alternatively (easier)
# - Node.js .pkg runs standard macOS installer
# - Verify Node.js LTS version at: https://nodejs.org/
# - To transfer to Mac Studio: scp -r installers/ [user]@[machine]:~/Desktop/
#   (requires Tailscale network access)
#
###############################################################################
