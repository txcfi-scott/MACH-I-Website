#!/bin/bash

################################################################################
# MACH-I Auto-Push Safety Net Script
# ===================================
#
# This script automatically commits and pushes any pending changes in specified
# repositories every hour (via launchd). It serves as a safety net to ensure
# Dr. D's work is backed up to GitHub without manual intervention.
#
# How it works:
#  1. Defines an array of repository paths to monitor
#  2. For each repo, checks if there are uncommitted changes
#  3. If changes exist: stages all changes, commits with timestamp, and pushes
#  4. If no changes: skips silently
#  5. All actions are logged with timestamps
#  6. Errors in one repo don't stop processing other repos
#
# Installation:
#  1. Make this script executable: chmod +x ~/Scripts/machi-autopush.sh
#  2. Copy the launchd plist to ~/Library/LaunchAgents/
#  3. Load the launchd agent: launchctl load ~/Library/LaunchAgents/com.machi.autopush.plist
#
# Manual testing:
#  ~/Scripts/machi-autopush.sh
#
# Viewing logs:
#  tail -f ~/Library/Logs/machi-autopush.log
#
################################################################################

# Set PATH to include locations where git and other tools might be installed
# This is especially important for Apple Silicon Macs (homebrew in /opt/homebrew/bin)
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:$PATH"

# Log file location
LOG_FILE="$HOME/Library/Logs/machi-autopush.log"

# Function to log messages with timestamp
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Initialize log session
log_message "========================================="
log_message "Auto-push cycle started"
log_message "========================================="

# Define array of repositories to monitor and auto-push
# Add or remove repositories as needed
declare -a REPOS=(
    "$HOME/Projects/mach-i-website"
    "$HOME/Projects/openclaw-config"
)

# Process each repository
for REPO in "${REPOS[@]}"; do
    # Check if the repository directory exists
    if [ ! -d "$REPO" ]; then
        log_message "WARNING: Repository does not exist: $REPO"
        continue
    fi

    # Change into the repository directory
    cd "$REPO" || {
        log_message "ERROR: Could not cd into $REPO"
        continue
    }

    # Get the current branch name for logging
    BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")

    # Check if there are any uncommitted changes using git status --porcelain
    # This returns an empty string if there are no changes, or a list of modified files
    CHANGES=$(git status --porcelain 2>/dev/null)

    if [ -z "$CHANGES" ]; then
        # No changes detected in this repo
        log_message "No changes in $REPO ($BRANCH) - skipping"
    else
        # Changes detected - commit and push
        log_message "Changes detected in $REPO ($BRANCH) - committing..."

        # Stage all changes (new, modified, and deleted files)
        if ! git add -A 2>&1 | while read line; do log_message "  git add: $line"; done; then
            log_message "ERROR: git add failed in $REPO"
            continue
        fi

        # Create a commit with a timestamp message
        COMMIT_MSG="auto-save $(date '+%Y-%m-%d %H:%M')"
        if ! git commit -m "$COMMIT_MSG" 2>&1 | while read line; do log_message "  commit: $line"; done; then
            log_message "ERROR: git commit failed in $REPO"
            continue
        fi

        # Push the commit to the remote repository
        if ! git push 2>&1 | while read line; do log_message "  push: $line"; done; then
            log_message "ERROR: git push failed in $REPO - changes committed locally but not pushed"
            continue
        fi

        log_message "Successfully pushed changes from $REPO"
    fi
done

# End of cycle
log_message "Auto-push cycle completed"
log_message ""
