call node domDoc ./dom-scroll.model.js --tgt=./dom-scroll.model
call git add *
call git commit
call git push
call npm version patch
call npm publish
pause
