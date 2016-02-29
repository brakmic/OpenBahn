### OpenLok :train:

<p align="center">
  <img src="http://fs5.directupload.net/images/160229/fg2frgk9.png" title="Germany's Rail Network"/>
</p>
---
A small project utilizing the <a href="http://www.bahn.de">Deutsche Bahn</a> **API** (<a href="https://en.wikipedia.org/wiki/Deutsche_Bahn">German Railway Corporation</a>)

Deutsche Bahn opened some of their APIs for public consumption and this project should serve as an API-playground.

For more detailed info on the API itself read this <a href="http://www.heise.de/newsticker/meldung/Open-Data-Deutsche-Bahn-gibt-Schnittstelle-fuer-Fahrplandaten-frei-3118919.html">article (in German)</a>

The Homepage of the API is located <a href=""http://data.deutschebahn.com/index.html>here</a>.

The API Descriptions can be found <a href="http://data.deutschebahn.com/apis/fahrplan/Fpl-API-Doku-Open-Data-BETA-0_81.pdf">here (pdf, in German)</a>

##### Structure

The Frontend is built with <a href="https://facebook.github.io/react/">React.js</a> and supports hot-reloading via <a href="https://webpack.github.io/">WebPack</a>. More info regarding hot-reloading of React components can be found <a href="https://gaearon.github.io/react-hot-loader/getstarted/">here</a>.

The Backend is based on <a href="http://hapijs.com/">Hapi.js</a> which is my favorite node server. The Frontend uses this backend to avoid problems with CORS. Therefore, the App executes no direct calls against the real DB-API but instead against Hapi.js that is configured *to accept CORS*.

There's a special class called *BahnService** that's being used by both client and server to make API calls. *BahnService* runs either in _local_ or _remote_ mode. The Client runs on _local_ to dispatch the API calls to the local Hapi.js instance which in turn uses the _remote_ instance of *BahnService* to access the real <a href="http://data.deutschebahn.com/">DB-API</a>.

This may sound unnecessarily complex but the strategy is rather simple: *a Client only wants to have a direct access to 'some API' without fiddling around with CORS etc.* Therefore, Hapi.js takes care of providing us an easy to use, **RESTful API** that returns plain JSONs.

The advantage is obvious: you can mock and test your API without dealing with CORS or any other implementation details.

For example, the client could send a GET request querying the location 'Cologne':

``` shell
http://localhost:3000/locations/Cologne
```
which on Hapi.js side would then be translated into a server-side GET request:
``` shell
https://open-api.bahn.de/bin/rest.exe/location.name?authKey=YOUR_AUTH_KEY&lang=de&input=Cologne&format=json
```

Finally, you'd receive a plain JSON-structure containing the location data. The JSON-structure remains unchanged as Hapi.js only forwards the responses back to the client.

##### Screenshot (Client)

<img src="http://fs5.directupload.net/images/160229/kon4be4f.png"/>

##### Screenshot (Backend)

<img src="http://fs5.directupload.net/images/160229/9qf4oyqq.png"/>

##### Current Status

The Client is rather primitive as it only contains a very bare-bones React component and a few Bootstrap elements (button, input, panel etc.).

The Server implements only the <a href="http://data.deutschebahn.com/apis/fahrplan/">Location.name</a> API but soon they'll be more of them.

##### Building & Running

*Client*

``` shell
npm run client
```

Client is located at <a href="http://localhost:8080/">http://localhost:8080/</a>

*Local API*

``` shell
npm run api
```

API-Server listens on <a href="http://localhost:3000/">http://localhost:3000/</a>

##### FAQ

- **What do 'BahnService' and 'OpenLok' mean?**

*Bahn* is a German word and heavily context-dependent. In this case it means 'Train'.

However, you can find it in a number of different locations, for example:

- Auto*bahn*    = motorway
- Flug*bahn*    = trajectory
- Straßen*bahn* = tram (Br.), streetcar (Am.)

and many others.

*Lok* is an abbreviation of 'Lokomotive' which means `locomotive`.

There's also a similar English abbreviation `loco`.

Building compound words is very easy in German. :speech_balloon:

You can learn it <a href="https://www.goethe.de/en/spr/kup.html">here</a>, for example :smile:

- **Where to get the API-Key?**

To access the DB-API you'll need an API-Key. To get one use this email:  *dbopendata @ deutschebahn.com*

Then put it into *authKey* in *BahnService.js*

<img src="http://fs5.directupload.net/images/160229/fgxliqik.png"/>



#### License

<a href="https://github.com/brakmic/OpenLok/blob/master/LICENSE">MIT</a>

Deutsche Bahn® is a registered trademark of **Deutsche Bahn AG**. in Germany and/or other countries.