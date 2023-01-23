aws cloudformation update-stack \
  --stack-name amp-eid \
  --template-body file://build-stack.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --tags Key=Project,value=IDEA \
         Key=ProjectDetail,value=AMPEID \
