Flow to retrieve next two NS trains to a destination, and print their departure times. Based on the Nederlandse Spoorwegen API. You have to obtain an API key for the Reisinformatie API. https://apiportal.ns.nl/

This flow consumes a JSON, like this:
```
{   "fromStation": "Asd",
    "toStation": "Hfd",
    "viaStation": "Ledn",
    "device": "wk1",
    "page": "ochtend",
    "displayitem": 41,
    "nsapikey":"abcd" ,
    "label": "Volgende treinen naar Hoofddorp"
}
```
Station codes from here: https://nl.wikipedia.org/wiki/Lijst_van_spoorwegstations_in_Nederland

page, displayitem and label are used for my specific case.

Output is something like this: "19:54 + 2, 20:09 + 6" which can be printed on the screen.

<img width="1106" alt="image" src="https://github.com/balk77/node-red-buttonplus-menu/assets/10166350/d9f9e4cd-e5f3-416f-8bf1-8f3b2b7856df">

