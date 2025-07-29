# LinkedIn Scraper & Logger Chrome Extension

A Chrome extension + Express/Sequelize backend that automatically opens LinkedIn profiles, scrapes key fields, logs them to a database, and displays a summary UI.

---


## Project Overview

Basically here i create chrome extension and which take 3 linkdin and fetch every profile name, location, bio, about, bio-line, followers and connectios and show in ui

## Tech Stack

- **Backend**: Node.js, Express, Sequelize, PostgreSQL, Docker  
- **Extension**: Chrome Manifest V3, background service worker, content scripts  
- **Frontend (Extension)**: Vanilla HTML/CSS/JS  

---

## Prerequisites
- npm
- Chrome browser (for the extension)  
- (Optional) Docker, if you containerize the backend  

  
### Backend Setup

1. Clone this repo  
2. `cd backend`  
3. `npm install`   
4. `npm run migrate` (if using migrations)  
5. `npm start`

PORT=3000
### Databse connection
     i use  Sequelize with postgres and i use docker to containarize postgres and use in my local system
### Docker Run Command
    docker run --name postgres-container -e POSTGRES_DB=SequelizeDB -e POSTGRES_USER=USER -e POSTGRES_PASSWORD=PAS -p 5432:5432 -d postgres:14.18
     
