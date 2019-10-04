#!/bin/bash
set -e

echo "repo name:$CIRCLE_PROJECT_REPONAME";
echo "repo username:$CIRCLE_PROJECT_USERNAME";
echo "commit sha:$CIRCLE_SHA1";

NETLIFY_LOG=netlify.log

if [[ -z "$CIRCLE_PROJECT_REPONAME" ]] || [[ -z "$CIRCLE_PROJECT_USERNAME" ]] || [[ -z "$CIRCLE_SHA1" ]]; then
    echo "Missing repo slug or PR sha, will not notify status";
else
    if [ -f "$NETLIFY_LOG" ]; then
        echo "Netlify Log file found.";
        previewurl=$(grep -oP '(?<=Live Draft URL: ).*' netlify.log | egrep -o 'https?://[^ ]+' || true); # the || true expression to avoid script exit when not found.
        if [ -z "$previewurl" ]; then
            echo "But previewurl not found. Skipping.";
        else
            echo "Gonna notify...";
            curl -i -H "Content-Type: application/json" \
            -d '{"state": "success", "target_url": "'"$previewurl"'", "description": "Preview is ready!", "context": "ci/preview"}' \
            -u "malcolm-kee:$GITHUB_TOKEN" \
            -X POST "https://api.github.com/repos/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/statuses/$CIRCLE_SHA1";
        fi
    else
        echo "Netlify Log file not found. We not gonna make any notification";
    fi
fi