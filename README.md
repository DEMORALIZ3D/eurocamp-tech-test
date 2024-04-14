# Eurocamp Tech Test

Here is my Eurocamp tech test.

This test consumes an API provided by Eurocamp here: https://github.com/ECliamb/engineering-test.

This project isnt containerised - mostly due to time. Although I can use docker, and I can create a container to run everything in, as im not doing this daily and once a year or so, it would take too much time out of my 2 hrs alotment.

You can run the project by running `npm i && npm run dev`.

## Q&A

#### Review the eurocamp_api database and make notes on the current structure and state of the database. How would you improve it using relational database best practices? We're mainly interested in how you would improve the database theoretically

I would keey the ID secret by also adding a UUID field, allowing each entry for bookings/parcs and users to use UUIDs to stop users easily guessing ID numbers in API requests.

For example its easy to determine if im calling /api/v1/users/1 to grab the second users details is to just change the API's URI to match, opposed to `/api/v1/users/5dd46d22-435f-4c04-b5e2-5d18e48f5419` for example.

Bookings can be linked with foreign keys to both a Parc and a User in a one to one relationship. (one booking to link with one user and one parc)

I would also look in to indexing for better querybility however Ill be honest, im not up to date on indexing, only ever worked on existing DBs with indexing, or worked on Dbs in a hobbiest fashion and never needed to do it myself. But I am aware of it and its performance gains.

Also I have noticed the dataTypes for all the the columns are varchar which is both bad practice and less secure.

booking table example:
id should be set to Int,
user and parc should be set to the index of the entry in their respective tables and be int.
varchars such as comments should have limits. e.g. varchar(250)

#### Brief explanation of the latest practices in your respective field of expertise.

The latest practices in the FE space are forever changing and currently it seems the frontend space is heading down the serverless space and monolithic/microservice hybrid in that edge functions and lambdas running on "FE" frameworks such as Next.js and Vercels offerings seem to be gaining traction. The ability to fetch data and have the speed of BE generated components/HTML like the proedural PHP days of old.

TypeScript as far as im concerned is the best practice and generally is a widely adopted opinion.

Technologies such as NoSQL, GraphQL, Websockets/WebRTC have become more use as realtime communications becomes more prevelent. The ability to have FE devs query the BE/DBs with GraphQL also allows BE to focus more on business logic over FE intergration.

## Timeline

12:10 - installed docker
12:20 - docker up - force recreate
–decided while pulling, the FE will be separate and not part of the docker sequence for simplicity
12:26 - swagger running
12:41 created github repository - will now plan for 20 mins what ill be making.

`npm i -S @mui/material @emotion/styled @emotion/react jest @testing-library/react axios react-redux @reduxjs/toolkit prettier`

Idea:
“Product” list, with filter
product page (20 min)

Tests:
No tests, run out of time. I can write tests.

I write tests using jest and react-testing library.

Notes:
`@mui/material @emotion/styles @emotion/react` - this is used for speed, in order to complete in time with part done components.
`jest @testing-library/react` - used for testing function, could also install hooks testing library but no time.
`axios` - for easier data fetching, I could use SWR or RTK but wanted to demonstrate redux skills.
`react-redux @reduxjs/toolkit` - global storage - overkill for this app, but just to demonstate
`prettier` - easier refactoring

13:10 - idea done, all packages installed, first commit - blank slate.

15:10 - stopped where I had finished.

Next Day - added tests (40 mins extra)

## Conclusion

After the 2 hour mark, I stopped where I was. I wanted to build a whole booking part too, which i just didnt get time for.

In the end, I just did a product list page and product view page. I wanted to show I can interact with the API but didnt get time to interact with it fully as I wanted to create a user/booking not just consume data via GET.

I didnt get change to really play with the errors/api due to trying to build the FE - but always happy to discuss it further.

I didnt get change to write too much TS, and ended up spending more time on the DOM and catching up on APIs for packages than anything else.

I have added tests, however these were added after the 2 hour mark!
