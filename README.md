# Box Man

[Box Man out of Body](https://davvidbaker.github.io/BoxMan/about/)

# Local Dev
```
npm install

npm run dev
# then open `https://<your-ip-address>:9000`
```
# ⚠️ As you'll see in party-machine.js, even in development, we are actually just using signaling server `https://boxman-signaling-server.now.sh` (some times)


```
npm install

npm start
```

# Deploy

Couldn't figure out websockets exactly with now v2.0, so I'm still using v1 for that part of the app. I haven't seemed to run into any problems with websocket connections closing unexpectedly.

## Deploy signaling server

```
cd signaling-server

now

# and then alias to boxman-signaling-server
now alias
```

## Deploy static react app

```
npm run client:build

cd dist

now

now alias <url-on-clipboard> boxman
```
