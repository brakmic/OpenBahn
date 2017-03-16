### OpenLok :train:


  ![alt text](https://s32.postimg.org/jj6vsthth/ICE_Network.png "Germany's Rail Network")

---
A small project utilizing the [Deutsche Bahn API](http://www.bahn.de)

[Wikipedia entry](https://en.wikipedia.org/wiki/Deutsche_Bahn) on DB (*German Railway Corporation*)

Deutsche Bahn opened some of their APIs for public consumption and this project should serve as an API-playground.

For more detailed info on the API itself read [this article](http://www.heise.de/newsticker/meldung/Open-Data-Deutsche-Bahn-gibt-Schnittstelle-fuer-Fahrplandaten-frei-3118919.html) (in German)</a>

The Homepage of the API is located [here](http://data.deutschebahn.com/index.html).

The API Descriptions can be found [here](http://data.deutschebahn.com/apis/fahrplan/Fpl-API-Doku-Open-Data-BETA-0_81.pdf) (pdf, in German)</a>

##### Structure

The Frontend is built with [React.js](https://facebook.github.io/react/) and supports hot-reloading via [WebPack](https://webpack.github.io/). More info regarding hot-reloading of React components can be found [here](https://gaearon.github.io/react-hot-loader/getstarted/).

The Backend is based on [>Hapi.js](http://hapijs.com/) which is my favorite **node web server**. The Frontend uses this backend to avoid problems with CORS. Therefore, the App executes no direct calls against the real DB-API but instead against Hapi.js that is configured *to accept CORS*.

There's a special class called *BahnService** that's being used by both client and server to make API calls. *BahnService* runs either in _local_ or _remote_ mode. The Client runs on _local_ to dispatch the API calls to the local Hapi.js instance which in turn uses the _remote_ instance of *BahnService* to access the real [DB API](http://data.deutschebahn.com/).

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

##### Client

<img src="https://i.imgsafe.org/d788893fe5.png"/>

##### Local API Server

<img src="https://i.imgsafe.org/d4787bc983.png"/>

##### Current Status

The Client is rather primitive as it only contains a very bare-bones React component and a few <a href="http://getbootstrap.com/">Bootstrap</a> elements (button, input, panel etc.).

The Calendar Widgets are from [React Widgets Project](https://jquense.github.io/react-widgets/docs/#/datetime-picker).

The Server implements only the [Location.name API](http://data.deutschebahn.com/apis/fahrplan/) but soon they'll be more of them.

##### Building & Running

*Prerequisites*

```
npm install
```

*Client*

``` shell
npm run client
```

Client is located at [http://localhost:8080](http://localhost:8080/)

*Local API*

``` shell
npm run api
```

API-Server listens on [http://localhost:3000](http://localhost:3000/)

##### Testing

[Mocha](https://mochajs.org/) & [Chai](http://chaijs.com/) with ES6.

More info on testing ES6 code with Mocha can be found [here](http://jamesknelson.com/testing-in-es6-with-mocha-and-babel-6/).

``` shell
npm test
```

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

You can learn it [here](https://www.goethe.de/en/spr/kup.html) :smile:

- **Where to get the API-Key?**

To access the DB-API you'll need an API-Key. To get one use this email:  *dbopendata @ deutschebahn.com*

Then put it into *authKey* in *BahnService.js*

<img src="http://fs5.directupload.net/images/160229/fgxliqik.png"/>



#### License

[MIT](https://github.com/brakmic/OpenLok/blob/master/LICENSE)

**Deutsche Bahn®** is a registered trademark of **Deutsche Bahn AG** in Germany and/or other countries.
