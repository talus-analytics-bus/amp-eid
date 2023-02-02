#!/bin/bash

reset=0;
clean=0;

# parse params
while [[ "$#" > 0 ]];
  do case $1 in
    -r|--reset) reset=1; shift;;
    -c|--clean) clean=1; shift;;
    *) echo "Unknown parameter passed: $1"; exit 1 ;;
  esac
  shift
done

# fetch environment variables from secrets manager
export AIRTABLE_API_KEY=$(
  aws secretsmanager get-secret-value --secret-id airtable-api-key --region us-west-1 |\
  jq  -r .SecretString | jq -r .AIRTABLE_API_KEY\
)
export GATSBY_MAPBOX_API_KEY=$(
  aws secretsmanager get-secret-value --secret-id pharos-mapbox-api-key --region us-west-1 |\
  jq  -r .SecretString | jq -r .MAPBOX_API_KEY\
)

# make sure local fork of gatsby plugin is linked
cd plugins/gatsby-plugin-remote-images/;
yarn unlink;
yarn link;
cd ../../;
yarn link "gatsby-plugin-remote-images"

if [ "$reset" == "1" ]; then 
  bvm upgrade;
  yarn install;
  gatsby clean;
fi

if [ "$clean" == "1" ]; then 
  gatsby clean
fi

gatsby build;



