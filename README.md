Setup:
You need to install everything into the correct directories.
In client directory, npm install axios
                     npm install react
                     npm install react-dom

In server directory, npm install cors
                     npm install exress
                     npm install nodemon
                     npm install mongoose

in MongoCompass, delete any databases from 316 (cuz we used the same database id number)
create a new one and name it discovery
run command: mongod   in default directory for this project
this should connect you to that database

To run,
in server directory, run command: nodemon server.js
then, in client directory, run command: npm start