#!/bin/bash
rsync -rvzP ./dist/ lukas@lw1.at:/var/www/parkzonen/ --fuzzy --delete-after -v
