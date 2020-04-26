# MyRecipe app

# Problem

As a college student, getting a healthy but delicious meal at an affordable price has always been a problem.
However, the most possible healthy meal is found by cooking the meal by yourself which also reduces the cost used for buying meals by a significant amount.

# Problems Related to Cooking

* Most students don’t have the time to cook
* Most students don’t know how to cook
* Some also find it boring and lonely when they do it
* Most chefs are also eager to share their cooking culinary expertise
* Marketing firms are looking for a media platform to advertise food products

# Solution

Make a web app that can provide

* Recipes that are easy to follow, that uses easily accessible ingredients and that helps the user prepare delicious and healthy meal

* A platform where a user is able to enter their own signature for food recipes providing an opportunity to benefit the communit, follow food experts and hobbyists and build relationships with them and also an apportunity to be followed by others and create a fame.

            
            
# Key Features of the Web App

* Search bar - to allow users to enter ingredients and provide with the list of possible recipes for making different dishes.
* Feedbacks and rating - to give users a change to review the recipes that they used. 
* User registration and authentication 
* ChatBox 
* View  and edit Profiles
* Live comment and follow users 
* Provide video streaming of cooking sessions 


# List of Teammates and their roles

*  Rediet Negash - Project Manager
*  CogitaterSigauke - Lead programmer
*  Merry Mekonnen - Product Owner
*  Pyungkang Hong - Designer
# Link to where the website is deployed 
```
https://frontend-my-recipe-web-app.azurewebsites.net/

```
# How To Use This Software

* Clone the repository by using the following command in your terminal:
```
     git clone https://github.com/CogitaterSigauke/foodwebapp.git
```
* Or download and unizip the repository on your local machine 

# Setup Database

* You can use any mongodb database but in this project we will be using 
Azure's Cosmos DB for Mongodb API
* Create account on Microsoft Azure and log into your portal
* Search for Cosmos DB and choose Mongodb API when setting up the configurations
* Choose or create a new resource group, name your database, select location
and fill out the rest of the settings
* After creating the database go to the settings and copy the "connection string" - a string that allows you connect to the database- and the username

# Backend Configurations and Setup

* Cd into foodweb_backend/src/main/resources folder
* Open and edit the application.properties as follows
spring.data.mongodb.database=<username>
spring.data.mongodb.uri=<primarySonnectionString>
(replacing <username> and <primaryConnectionString> with the database username and primary connection string you just copied earlier respectively)

* If you are using your local mongodb replace the above lines with:

spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017

# Testing Your Backend

* Open your teminal and cd into the foobweb_backend folder
* Run your backend on your local machine:
```
 ./mvnw spring-boot:run

```

* If you did not get any errors you can go on and test it
* We will use postman application to test the backend server
* Install (if you don't have it already) and run postman
* Sent a post request to http://localhost:8080/app/signup with the following payload:
```
{
    "name" : "myName",
    "userName" : "myUserName",
    "familyName" : "myFamilyName",
    "pictureURl" : "myPictureUrl",
    "email" : "myEmail"
}
``` 
* On success, you should have a response of the same object but with an ID added
* The backend is now working and you are ready to deploy

# Deploying Your Backend

* You can use any hosting service of your choice but in this project we will use azure

* First make sure you have Azure CLI and Maven installed on your machine
* open your bash terminal and cd into your foodweb_backend folder
* login to azure:
```
 az login
```
* Build your jar file
```
 mvn clean package
```
* After the web app has been created, start the web app using Maven
```
 mvn spring-boot:run
```
* If you successfully run the command, you can test the build application using postman 
* open foodweb_backend/pom.xml and make sure you have the right version of azure
* The following code has already been configured in this project which you clonned, however, if you couldn't find it, go ahead and add the following plugins to pom.xml file which is found in foodweb_backend/pom.xml directory
```
<--------------pom.xml-------------/>
<plugin>
    <groupId>com.microsoft.azure</groupId>
    <artifactId>azure-webapp-maven-plugin</artifactId>
    <version>1.9.0</version>
</plugin>
```

* Configure your azure
```
 mvn azure-webapp:config
```
* Choose linux as your operating system
* Choose java11 for your running environment

* Now you're ready to deploy
```
 mvn clean package
```
* On success, you can either deploy using option one or option two

* *Option 1) Deploy Using Azure App Services*
```
 mvn azure-webapp:deploy
```
* On success, you can go to your Azure app services in your portal and see your application deployed

* *Option 2) Deploy Using Azure Spring Cloud*
On terminal in the backend directory, run the following commands one by one to proceed with deployment
```
az extension add --name spring-cloud
az account list -o table
az account set --subscription <Name or ID of subscription from the last step>
az group create --location eastus --name <resource group name>
*You can choose a different location*
az spring-cloud create -n <service instance name> -g <resource group name>
az configure --defaults group=<resource group name>
az configure --defaults spring-cloud=<service instance name>
az spring-cloud config-server git set -n <service instance name> --uri https://github.com/Azure-Samples/piggymetrics-config
az spring-cloud app create --name <foodweb>
```

 * after clean package, a jar file has been created in the target folder
 * copy the path of the jar file and use it in the next step
```
 az spring-cloud app deploy -n <foodweb> --jar-path <./target/foodweb-0.0.1-SNAPSHOT.jar.jar>
```
# Frontend Configurations and Setup

* To setup your application cd into foobweb_frontend
* Run the following commands to install all the dependencies
```
npm install
```
* This will install all the dependencies
* Set the url endpoint of your backend server by editing the foodweb_frontend/package.json file.

```
//package.json

"proxy": "https://backendserver.azuremicroservices.io/app"

```
*Replace the url with the url of your backend server. You can find it your resource in azure*

* Also edit foodweb_frontend/App.js as follows

```
//App.js
axios.defaults.baseURL = 'https://backendserver.azuremicroservices.io/app';

```
*Replace the url with the url of your backend server. You can find it your resource in azure*

* Setup Google Authentication and coppy your client ID
* Follow instruction https://developers.google.com/identity/sign-in/web/sign-in

* Open and edit the *Login.js replacing the clientID with your google ClientId
```
<GoogleLogin

    clientId="mygoogleclientID.apps.googleusercontent.com"
    buttonText="Sign in with Google"
    scope='profile email'
    width='240'
    height='50'
    longtitle='true'
    theme='dark'
    onSuccess={handleGoogleResponse}
    onFailure={handleGoogleResponse}
    cookiePolicy={"single_host_origin"}
/>

```
* To test this, run the frontend application as follows:
```
npm start
```
* If you still have errors regarding missing dependencies
* Install them manually as
```
npm install <NameOfMissingDependency>
```
Example
```
npm install axios
```
* Now everything should be working. You can test it again 

# Test your frontend

* Make sure you have live-server installed
* You can install it as follows
```
npm install -g live-server
```
* Build your application for production
```
npm run build
```
* Cd into your build folder
* Fully test the production build application by running it locally 
* run live-server
```
live-server
``` 
* Your application will start running on http://localhost:3000 

# Deploy your Application

* Again we will use azure for the deployment

```
az login
az webapp up --name <web-app-name> \
--plan <web-app-service-plan> --resource-group \
<your-azure-resource-group> --location <uscetral> --html

```

* On success, your website url will be printed in the terminal
* You can also see the url in your azure portal under App Services
# You can now use your website
