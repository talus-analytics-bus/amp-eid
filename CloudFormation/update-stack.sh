aws cloudformation update-stack \
  --stack-name [projectname] \
  --template-body file://build-stack.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --tags Key=Project,value=[projectgroup] \
         Key=ProjectDetail,value=[projectname] \
