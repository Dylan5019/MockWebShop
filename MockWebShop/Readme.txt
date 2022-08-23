Project Name: Dylan's Shop WebApp
Project version": 0.4
Project description: The goal of this project is to provide a user the ability to use a localy hosted Web App to 
generate and view product data. The webshop currently allows the user to generate product data that will be stored
in a local MongoDB Server. Currently the webapp supports shopping carts, user logins, and viewing/Reviewing of past orders. 

Requirements To Use:
- Node.js Installed
- MongoDB Installed

Steps To use: 
1. Launch MongoDB
2. Unzip the contents of the project folder
3. Open the Project Folder in a Terminal and Type "npm Install"
4. After Dependencys have finished installing type "node index.js"
5. Open a web browser and visit "http://localhost:3000/login" or "http://localhost:3000/"
6. Use the Generate Data Button to Create Data
7. Now the rest of the website can be used


New Features:
- Added the Ability to Review Past Orders
- Now Displays Review Information on the product screen


Notes:
 - Due to Changes in this update that were made to add reviews, you may run into an error with Past Orders. To fix this you will need to go into MongoDB 
and Drop the "orders" Collection from the "webshopApp" db. This issue will only occur if the orders Collection contains
orders that were made before this update. 

- The Review System will round reviews to the latest threshold that was passed. For Example if the average score is "4.9" 
it would display 4.5 as that was the last threshold that was passed.

