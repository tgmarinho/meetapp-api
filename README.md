![Thiago Marinho](https://pbs.twimg.com/profile_banners/41742474/1490016588/1500x500)

# Meetapp Backend

In this challenge was built the backend with Node.js.

Created an application from scratch using Express and configured linting tools.

The application is a developer event aggregator called Meetapp (an acronym for Meetup + App).

## Application

Meetapp is a developer event aggregator. (an acronym for Meetup + App).

## Features

Below are the features added to application:


## Features

- [x] Create a file upload route that records the path and file name in a table and returns all data from the file.
- [x] The user can register meetups on the platform with meetup title, description, location, date and time and image (banner). All fields are required. Also add a user_id field that stores the user ID that organizes the event.
- [x] The user can register meetups on the platform with meetup title, description, location, date and time and image (banner). All fields are required. Also add a user_id field that stores the user ID that organizes the event.
- [x] It should not be possible to register meetups with dates that have passed.
- [x] The user should also be able to edit all meetup data from meetups that has not yet happened and that is hosted by the user.
- [x] Create a route to list meetups that are organized by the logged-in user.
- [x] The user should be able to cancel meetups organized by him that have not yet happened. The delete must remove the meetup from database.
- [x] The user must be able to subscribe for meetups that he does not organize.
- [x] User can not subscribe for meetups that have already happened.
- [x] The user can not subscribe for the same meetup twice.
- [x] The user can not join two meetups that happen at the same time.
- [x] Whenever a user subscribe for a meetup, send an email to host containing the data related to registered user.
- [x] Create a route to filter and list meetups by date (not by time), results from that listing should be paginated by 10 items per page. Below is an example call to the meetups listing route:

```
http://localhost:3333/meetups?date=2019-10-26&page=3
```

In this example, we will list page 3 of the meetups that will take place on October 26th.

In that list also return the organizer data.

- [x] Create a route to list the meetups the logged-in user is enrolled in.
- [x] List only meetups that have not yet happened and order closer meetups as the first on the list.

## How to Setup
## Getting Started

These instructions will get you a copy of the full project up and running on your local machine for development and testing purposes.

The project can be built with npm or yarn, so choose one of the approach bellow in case you don't have any installed on your system.

* **Npm** is distributed with Node.js which means that when you download Node.js, you automatically get npm installed on your computer. [Download Node.js](https://nodejs.org/en/download/)

* **Yarn** is a package manager built by Facebook Team and seems to be faster than npm in general.  [Download Yarn](https://yarnpkg.com/en/docs/install)

* **React Native CLI** is a package that contains tools and helpers for React Native projects in form of a command line tool.  [Download React Native CLI](https://facebook.github.io/react-native/docs/getting-started)

## Setting up Databases and Services

The project uses [PostgreSQL](https://www.postgresql.org), [MongoDB](https://www.mongodb.com) and [Redis](https://redis.io).

I recommend use [Docker](https://www.docker.com) to install and run the databases and services above.

## How to Install

### Backend (API)

* To download the project follow the instructions bellow:

```
1. git clone https://github.com/tgmarinho/meetapp-api.git
2. cd meetapp-api
```

* Install the dependencies and start the server:

```
3. yarn install
4. yarn dev
```

or

```
3. npm install
4. npm dev
```

Rename the file `.env.example` to `.env` and create yours environment variables and replace them. It's is very important for running the server.

Also, I'm sending the Insomnia file for call the API, download it [here](https://github.com/tgmarinho/meetapp/blob/master/Insomnia_2019-10-27.json).


## Insomnia's screenshoot 
![](https://raw.githubusercontent.com/tgmarinho/meetapp/master/screenshots/insomnia-api.png)


## Authors

| ![Thiago Marinho](https://avatars2.githubusercontent.com/u/380327?s=150&v=3)|
|:---------------------:|
|  [Thiago Marinho](https://github.com/tgmarinho/)   |


Thanks!
