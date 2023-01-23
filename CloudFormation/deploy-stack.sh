aws cloudformation deploy \
  --stack-name amp-eid \
  --template-file build-stack.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --tags Key=Project,value=IDEA \
         Key=ProjectDetail,value=AMPEID \
