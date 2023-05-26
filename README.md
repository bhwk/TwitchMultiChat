# Twitch Chat V2

Second iteration of the multi-chat connector. Main purpose is just so that you can be in multiple channel chats at once.

## Can I use my account?

No. Twitch still wants to use IRC for chatbots (which is what this technically is), and if you do want to use your account, you'll have to provide your twitch oauth token, which obviously isn't a very good idea because I have no idea how to handle that securely.

I'm just going to leave it like this, no accounts.

# Multi stream

It's a very naive implementation of multiple video players on one page, so it's a little scuffed. I didn't intend to include this, but I thought it might enhance the experience in some way.

# Limitations

7Tv still hasn't published their API (please do it soon) so I can't render all those custom emotes chatters might be used to.

# To-do

- [x] Add video player
- [ ] Differentiate streamer names
- [ ] Render twitch emotes in chat
