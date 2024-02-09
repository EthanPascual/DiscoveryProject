Setup:
You need to install everything into the correct directories.
In client directory, 
                     npm install 
                     npm install react
                     npm install react-dom
                     npm install react-router-dom
                     npm install axios

In server directory, 
                     npm install 
                     npm install exress
                     npm install nodemon
                     npm install mongoose
                     npm install cors


run command: mongod   in default directory for this project
this should connect you to that database
Clear MongoDB of any Discovery Folder

To run,
in server directory, run command: nodemon server.js
then, in client directory, run command: npm start

To update your branch to the most recent changes do the following:
(Do this before starting to work on your branch)

# Switches to main branch.
$ git checkout main
# Pulls current code in main branch.
$ git pull
# Switches to own_branch
$ git checkout own_branch
# merges own_branch with main branch - Merge conflicts could happen.
$ git merge main

TO PUSH CHANGES:

1. push and commit to your branch
2. create and submit a pull request to merge your branch into main -> should be a button on github
3. resolve any merge conflicts if there are any
4. main should be updated with your changes

