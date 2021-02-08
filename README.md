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

Hey Guys. So after a full weekend of working on this I've decided to turn it in as is. The front end is not complete. I allowed myself to get carried away with ambition on the back end. I decided for some reason to learn Koa which I've never used, and built out a full database with authentication. Very basic Authentication mind you, but I took what was supposed to be a small easy project and really made it much more complex then it needed to be, so for that I apologize. I think it's safe to say here lesson learned.

The API currently works, I've been using postman to make API calls, so I will list the routes if you want to have a look at them. The Front end is another matter, you are able to send messages if you navigate to new message, and the login system does work. You can also view messages that come in on the home route. vuex store has a property called activeConvo, when that variable is set to the phone number of your conversation(convo_id in the postgres db), it will display. This is the part I did not have time to finish. Your conversations are supposed to be added to the navigation, but I was running into bugs and they display sometimes but not others. I intend to fix this later this week, and implement the message sending system while in a conversation.

Although the project is not complete, it does technically meet the requirements of sending and receiving a message. The user experience is just pretty horrible lol. I did get the submit on enter button working though at least for whatever that's worth lol. There is certainly some thrown together "janky" code here, but I also hope you see that there is some really well written code as well.

I hope that CityGro still has an interest in me. If you hire me I may not be your most experienced developer, but I can assure you I will be your most driven. I think I obviously need to sometimes temper that drive at times, this being a prime example of overzealousness. I will be completing this app, I have enjoyed it greatly so far, I just need a bit of extra time.

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
