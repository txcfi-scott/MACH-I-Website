#!/bin/bash

################################################################################
# MACH-I Auto-Push Installation Script
# ====================================
#
# This script installs the auto-push safety net on Dr. D's Mac Studio.
# It handles:
#  - Creating the ~/Scripts directory if it doesn't exist
#  - Copying the auto-push shell script to ~/Scripts/
#  - Making the shell script executable
#  - Copying the launchd plist to ~/Library/LaunchAgents/
#  - Loading the launchd agent to start the hourly cycle
#
# Usage:
#  bash install-autopush.sh
#
# After installation:
#  - The auto-push script will run automatically every hour
#  - Changes will be committed and pushed with timestamp messages
#  - Logs will be written to ~/Library/Logs/machi-autopush.log
#
################################################################################

set -e  # Exit if any command fails

echo "================================================"
echo "MACH-I Auto-Push Installation"
echo "================================================"
echo ""

# Paths for the scripts
SCRIPT_SRC="${SCRIPT_DIR}/machi-autopush.sh"
SCRIPT_DEST="$HOME/Scripts/machi-autopush.sh"
PLIST_SRC="${SCRIPT_DIR}/com.machi.autopush.plist"
PLIST_DEST="$HOME/Library/LaunchAgents/com.machi.autopush.plist"

# Create ~/Scripts directory if it doesn't exist
echo "Creating ~/Scripts directory if needed..."
mkdir -p "$HOME/Scripts"
echo "  ✓ ~/Scripts directory ready"

# Copy the auto-push shell script
echo "Installing auto-push script..."
if [ ! -f "$SCRIPT_SRC" ]; then
    echo "  ERROR: Could not find $SCRIPT_SRC"
    exit 1
fi
cp "$SCRIPT_SRC" "$SCRIPT_DEST"
echo "  ✓ Script copied to $SCRIPT_DEST"

# Make the script executable
chmod +x "$SCRIPT_DEST"
echo "  ✓ Script made executable"

# Create ~/Library/LaunchAgents if it doesn't exist
echo "Creating LaunchAgents directory if needed..."
mkdir -p "$HOME/Library/LaunchAgents"
echo "  ✓ LaunchAgents directory ready"

# Copy the launchd plist
echo "Installing launchd configuration..."
if [ ! -f "$PLIST_SRC" ]; then
    echo "  ERROR: Could not find $PLIST_SRC"
    exit 1
fi
cp "$PLIST_SRC" "$PLIST_DEST"
echo "  ✓ Plist copied to $PLIST_DEST"

# Load the launchd agent
echo "Loading launchd agent..."
launchctl load "$PLIST_DEST"
if launchctl list | grep -q "com.machi.autopush"; then
    echo "  ✓ Agent loaded successfully"
else
    echo "  WARNING: Could not verify agent load"
fi

echo ""
echo "================================================"
echo "Installation Complete!"
echo "================================================"
echo ""
echo "The auto-push safety net is now active."
echo ""
echo "Next steps:"
echo "  - Check the status: launchctl list | grep com.machi.autopush"
echo "  - View logs: tail -f ~/Library/Logs/machi-autopush.log"
echo "  - Test manually: ~/Scripts/machi-autopush.sh"
echo ""
echo "The script will automatically commit and push any changes"
echo "every hour from these repositories:"
echo "  - ~/Projects/mach-i-website"
echo "  - ~/Projects/openclaw-config"
echo ""
