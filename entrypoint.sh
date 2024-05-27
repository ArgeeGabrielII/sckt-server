#!/bin/sh
# entrypoint.sh

# Start the Nest.js application with the argument passed
exec npm run start:prod "$@"
