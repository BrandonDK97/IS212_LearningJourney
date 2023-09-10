# is212_spm_g6

## Project Overiew

On the first release (Week 13), the following five core features should be addressed in the Learning Journey Planning System:
1. Users should be able to select a role they want and see a list of skills required
2. Users should be able to see the courses they can take to acquire those skills, and add/remove them on their learning journey
3. CRUD for roles
4. CRUD for skills
5. Assigning skills to roles; assigning skills to courses

Additional features:
1. LMS CSV Loader

## Set Up Guide

### Front End

The front end module of the project uses the React web framework

1. Setting Up React
- Install Node.js https://nodejs.org/en/download/

2. Run React
- cd to the is212_spm_g6
- Run "npm install" to install all dependencies in package.json
- Run "npm start" to start the React app

### Back End

The back end module of the product uses python flask and a MySQL server.

 1. Download Python Version 3.7.5
	- Install required python modules to run (refer to requirement.txt for list of modules and verison to install, recommended to create venv for this)
		- ./flask-main/requirements.txt
 2. Setting Up MySQL Server
	 - Install any form of MySQL Server (We used WAMP)
	 	 - Create Database (Name : LJPS_DB)
 3. Run Flask
	- cd to ./flask-main
	- run "python app.py"
		- Running the app.py will also create the schemas/table within the MySQL Data 

 4. Loading Data
	- You can choose to use mock data we have prepared or load data from CSV provided by the client
	- Mock Data
		- Run ./flask-main/mock_data/LoadSQL.sql
	- Load Data From CSV 
		- Perform a manual load
			- Send a get request to <backendserverurl>/import_csv
		- or, wait for the auto schedular to load it

