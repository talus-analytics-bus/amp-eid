aws cloudformation deploy \
  --stack-name [projectname] \
  --template-file build-stack.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --tags Key=Project,value=[projectgroup] \
         Key=ProjectDetail,value=[projectname] \
