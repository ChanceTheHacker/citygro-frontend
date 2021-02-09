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

Hey Guys. So after a full weekend of working on this I've decided to turn it in as is. The front end is not complete. I allowed myself to get carried away with ambition on the back end. It looks very ugly, because I have done basically zero styling to it. I decided for some reason to learn Koa which I've never used, and built out a full database with authentication. Very basic Authentication mind you, but I made lots of small decisions to add complexity and "improve" the app. I am very excited about the potential of working for CityGro. I really wanted to go all out and impress you as much as possible. I think it's safe to say here lesson learned, stick with the MVP first, extend later...

You can send messages by typing them in at the bottom of the screen and hitting enter. You can also view messages that come in or that you send by selecting a convo from the app drawer. It pulls out from left on mobile.

Although the project has a very poor UI, it does meet the requirements of sending and receiving a message. The user experience is just pretty horrible lol. I did get the submit on enter button working though for whatever that's worth lol. There is certainly some thrown together "janky" code here, but there is also quite a lot of code I'm very proud of.

I hope that CityGro understands that although this UI is bad, I do have the ability to develop very good UI's, and can provide some other sites as examples if interested. I do think I need to learn to better temper my drive at times, this project being a prime example of overzealousness. However I really think it was worth it because I've learned so much. I am so excited to use Koa in my next app, I really think I prefer it now over express. I will be completing the UI of this app, I have enjoyed it greatly so far. If nothing else I just want to thank CityGro for giving me such an awesome opportunity to learn and Gro.

below you can find the routing and require params if you want to make api calls with postman

<!-- This returns every message sorted into objects by "convo_id" -->

https://chat-demo-db.herokuapp.com/messages/update/initialize
{
"id": "b8f38d98-14ae-4c93-a422-0539de0f02cf"
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
"id": "b8f38d98-14ae-4c93-a422-0539de0f02cf",
"tracking" : "put a number here and it only returns messages with a tracking number higher"
}

<!-- this is how you get a message -->

https://chat-demo-db.herokuapp.com/messages/receive
{
"id": "b8f38d98-14ae-4c93-a422-0539de0f02cf",
"From": "enter from phone number",
"nickname": "give the phone number a nickname, defaults to the number",
"Body": "the message"
}

<!-- send a message -->

https://chat-demo-db.herokuapp.com/messages/send
{
"id": "b8f38d98-14ae-4c93-a422-0539de0f02cf",
"to": "phone number to send to",
"nickname": "what is the nickname?",
"message": "any ol message will do"
}

<!-- registers a new user, however api is not built to handle multiples -->

https://chat-demo-db.herokuapp.com/register
{
"email": "citygro@gmail.com",
"password": "put anything you want here"
}
