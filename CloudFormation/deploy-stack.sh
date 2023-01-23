aws cloudformation deploy \
  --stack-name amp-eid \
  --template-file build-stack.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --tags Project=IDEA \
         Project:Detail=AMPEID \
