# Food-web app

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

* A platform where a user is able to enter their own signature for food recipes providing an opportunity to benefit the communit, get rewards by collect points based off of the rates given by the community, follow food experts and hobbyists and build relationships with them and also an apportunity to be followed by others and create a fame.

            
            
# Key Features of the Web App

* Search bar - to allow users to enter ingredients and provide with the list of possible recipes for making different dishes.
* Feedbacks and rating - to give users a change to review the recipes that they used. 
* User registration and authentication 
* Chatbot 
* Point counting system
* View  and edit Profiles
* Live comment and follow users 
* Provide video streaming of cooking sessions 


# List of Teammates and their roles

*  Rediet Negash - Project Manager
*  CogitaterSigauke - Lead programmer
*  Merry Mekonnen - Product Owner
*  Pyungkang Hong - Desginer

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
* After creating the database go to the settings -> connection string, and copy your primary connection string and username

# Backend Configurations and Setup

* Cd into foodweb_backend/src/main/resources folder
* Open the the application.properties as follows
spring.data.mongodb.database=<username>
spring.data.mongodb.uri=<primarySonnectionString>
(replacing <username> and <primarySonnectionString> with the database username and primary connection string you copied elier respectively)

* If you are using your local mongodb replace the above lines with:
```
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
```
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
* On success you should have a response of the same object but with an ID added
* The backend is now working and your're ready to deploy

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
* When the web app has been created, start the web app using Maven
```
 mvn spring-boot:run
```
* if successifull you can test again using postman
* open foodweb_backend/pom.xml and make sure you have the right version of azure

```
<--------------pom.xml-------------/>
<plugin>
    <groupId>com.microsoft.azure</groupId>
    <artifactId>azure-webapp-maven-plugin</artifactId>
    <version>1.9.0</version>
</plugin>
```

* Configure your auzure
```
 mvn azure-webapp:config
```
* Choose linux as your oprating system
* Choose java11 for your running environment

* Now you're ready to deploy
```
 mvn clean package
```
* On success run

* *1) Deploy Using Azure App Services*
```
 mvn azure-webapp:deploy
```
* On success you can go to your Azure app services in your portal and see your application deployed

* *2) Deploy Using Azure Spring Cloud*
```
az extension add --name spring-cloud
az account list -o table
az account set --subscription <Name or ID of subscription from the last step>
az group create --location eastus --name <resource group name>
```
*You can choose a different location*
```
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

