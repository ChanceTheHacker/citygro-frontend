```
npm install
```

```
npm run serve
```

```
npm run build
```

front end url - https://citygro-frontend.herokuapp.com/#/

LOGIN INFO
email - citygro@gmail.com
password - just input anything you like here, authneticate is bypassed on server. front end requires 8 characters

Hey Guys. So after a full weekend of working on this I've decided to turn it in as is. The front end is not complete. I allowed myself to get carried away with ambition on the back end. It looks very ugly, because I have done basically zero styling to it. I decided for some reason to learn Koa which I've never used, and built out a full database with authentication. Very basic Authentication mind you, but I made lots of small decisions to add complexity and "improve" the app. I am very excited about working for CityGro so I really wanted to go all out. I think it's safe to say here lesson learned, stick with the MVP.

The API currently works, I've been using postman to make API calls, so I will list the routes if you want to have a look at them. The Front end is another matter, you are able to send messages if you navigate to new message, and the login system does work. You can also view messages that come in or that you send. vuex store has a property called activeConvo, when that variable is set to the phone number of your conversation(convo_id in the postgres db), it will display. In my sleep deprived haze last night, I couldn't fix the issue. Today after work it took me only a few moments to realize I should have been using a computed property rather than data. I was up until 2 am trying to finish this, and at some point along the way my brain stopped working I guess.

Although the project is not complete, it does technically meet the requirements of sending and receiving a message. The user experience is just pretty horrible lol. I did get the submit on enter button working though for whatever that's worth lol. There is certainly some thrown together "janky" code here, but there is also quite a lot of code I'm very proud of.

I hope that CityGro still has an interest in me. If you hire me I may not be your most experienced developer, but I can assure you I will be your most driven. I think I need to learn to better temper that drive at times, this project being a prime example of overzealousness. I will be completing the UI of this app, I have enjoyed it greatly so far. If nothing else I just want to thank CityGro for giving me such an enjoyable experience to learn and Gro.

below you can find the routing and require params if you want to make api calls with postman

<!-- This returns every message sorted into objects by "convo_id" -->

https://chat-demo-db.herokuapp.com/messages/update/initialize
{
"id": "9049ba9f-8004-4f29-b038-757e463eab03"
}

<!-- signs in, just returns a user id -->

https://chat-demo-db.herokuapp.com/signin
{
"email": "citygro@gmail.com",
"password": "put anything you want here"
}

<!-- this syncs only unchecked messages, returns messages you haven't seen yet -->

https://chat-demo-db.herokuapp.com/messages/update/sync
{
"id": "9049ba9f-8004-4f29-b038-757e463eab03",
"tracking" : "put a number here and it only returns messages with a tracking number higher"
}

<!-- this is how you get a message -->

https://chat-demo-db.herokuapp.com/messages/receive
{
"id": "9049ba9f-8004-4f29-b038-757e463eab03",
"from": "enter from phone number",
"nickname": "give the phone number a nickname, defaults to the number",
"message": "the message"
}

<!-- send a message -->

https://chat-demo-db.herokuapp.com/messages/send
{
"id": "9049ba9f-8004-4f29-b038-757e463eab03",
"to": "phone number to send to",
"nickname": "what is the nickname?",
"message": "any ol message will do"
}

<!-- registers a new user, however api is built to handle multiples -->

https://chat-demo-db.herokuapp.com/register
{
"email": "citygro@gmail.com",
"password": "put anything you want here"
}
