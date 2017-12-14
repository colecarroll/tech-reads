# ReadMe for TECH READS

## Deployed URL: https://tech-reads.herokuapp.com/

Tech Reads is a full-stack CRUD Express application that allows users to not only find but also enter 'how-to' tech and programming books and their authors into an online catalogue. 

### Technologies used:
* Node.js
* Express.js
* Knex.js
* Handlebars.js
* Heroku for Deployment
* SASS and custom CSS for styling

### Features: 
* add authors 
* add books
* add multiple books for an author
* add multiple authors for a book
* edit/update author information
* edit/update book information
* delete authors and books
* link to multiple books from an authors page
* link to multiple authors from a books page


### If you would like to contribute to this repository

* Fork this repository
* Use the clone link to clone the repository down into a local directory on your machine
  * make sure you are in the root directory on your local machine
  * run command 'git init'
  * run command 'git clone *github clone link url*'
* Run 'npm install' command on the command line, this will update your cloned project with all dependecies
* You will need to create a postgresql database on your local machine named 'tech-reads', or you can change the development database name in the knexfile.js to reflect whatever you decide to name it.
* Run command 'knex migrate:latest'
* Run command 'knex seed:run'
* This should allow you to work on the project in local development
* Next you will need to run command 'npm install --save dotenv'
* Then run command 'touch .env' in your root directory, this will create a .env file where you can securely store your production database URL
* In your .env file, create a variable called DATABASE_URL and set it equal to your heroku postgres database url or whichever deployment database process you choose.
* Now the 'process.env.DATABASE_URL' in the knexfile.js will use your database url for all production code. 
* Assuming you have set up your production database and site url. You can deploy the seeds and migrations for knex to production.
* Run command 'knex migrate:latest --env production'
* Run command 'knex seed:run --env production'
* Deploy your to your production server

### Once you have changes you want to commit to the main branch
* Git add, commit, and push changes, and then issue a pull request and the changes will be reviewed.