# @datawrapper/shared
a set of shared methods that can be used throughout Datawrapper

Import single functions:

```js
import purifyHtml from '@datawrapper/shared/purifyHtml';
```

Import entire package:

```js
import shared from '@datawrapper/shared';
shared.purifyHtml();
shared.fetchJSON();
```

## API reference


* [__(key, scope)](#__) ⇒ <code>string</code>
* [area(vertices)](#area) ⇒ <code>number</code>
* [arrayToObject(o)](#arrayToObject) ⇒ <code>object</code>
* [autoTickFormat(column)](#autoTickFormat) ⇒ <code>string</code>
* [autoTickFormatDate(range, precision)](#autoTickFormatDate) ⇒ <code>string</code>
* [autoTickFormatNumber(range)](#autoTickFormatNumber) ⇒ <code>string</code>
* [Chart](docs/chart.md) ⇒ <code>class</code>
* [clone(object)](#clone) ⇒ <code>\*</code>
* [CodedError([string], [string])](#CodedError)
* [colorLightness(hexColor)](#colorLightness) ⇒ <code>number</code>
* [Column](docs/column.md) ⇒ <code>class</code>
* [columnNameToVariable(name)](#columnNameToVariable) ⇒ <code>string</code>
* [combinations(input)](#combinations) ⇒ <code>Array.&lt;array&gt;</code>
* [Dataset](docs/dataset.md) ⇒ <code>class</code>
* [deleteJSON(url, callback)](#deleteJSON) ⇒ <code>Promise</code>
* [equalish(a, b)](#equalish) ⇒ <code>boolean</code>
* [estimateTextWidth(text, fontSize)](#estimateTextWidth) ⇒ <code>number</code>
* [fetchJSON(url, method, credentials, body, callback)](#fetchJSON) ⇒ <code>Promise</code>
* [get(object, key, _default)](#get) ⇒
* [getJSON(url, credentials, callback)](#getJSON) ⇒ <code>Promise</code>
* [isValidUrl(input)](#isValidUrl) ⇒ <code>boolean</code>
* [loadScript(src, callback)](#loadScript)
* [loadStylesheet(src, callback)](#loadStylesheet)
* [observeFonts(fontsJSON, typographyJSON)](#observeFonts) ⇒ <code>Promise</code>
* [patchJSON(url, body, callback)](#patchJSON) ⇒ <code>Promise</code>
* [postEvent(chartId)](#postEvent) ⇒ <code>function</code>
* [postJSON(url, body, callback)](#postJSON) ⇒ <code>Promise</code>
* [purifyHTML(input, allowed)](#purifyHTML) ⇒ <code>string</code>
* [putJSON(url, body, callback)](#putJSON) ⇒ <code>Promise</code>
* [set(object, key, value)](#set) ⇒
* [tailLength(value)](#tailLength) ⇒ <code>number</code>
* [toFixed(value)](#toFixed) ⇒ <code>string</code>
* [trackEvent(category, category, category, category)](#trackEvent)
* [trackPageView(loadTime)](#trackPageView)


<a name="CodedError"></a>

## CodedError([string], [string])
A custom Error object that allows for storing both an error
code and an error message (the standard JS error only stores
a message). Feel free to use this error whenever you need to
cleanly separate error code from error message.


| Param | Description |
| --- | --- |
| [string] | code    a valid error code (depends on where it's being used). e.g. "notFound" |
| [string] | message  an optional plain english message with more details |

**Example**  
```js
import { CodedError } from '@datawrapper/shared';
throw new CodedError('notFound', 'the chart was not found');
```

* * *

<a name="__"></a>

## \_\_(key, scope) ⇒ <code>string</code>
translates a message key. translations are originally stored in a
Google spreadsheet that we're pulling into Datawrapper using the
`scripts/update-translations` script, which stores them as `:locale.json`
files in the /locale folders (both in core as well as inside plugin folders)

for the client-side translation to work we are also storing the translations
in the global `window.dw.backend.__messages` object. plugins that need
client-side translations must set `"svelte": true` in their plugin.json

**Returns**: <code>string</code> - -- the translated text  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | - the key to be translated, e.g. "signup / hed" |
| scope | <code>string</code> | <code>&quot;core&quot;</code> | - the translation scope, e.g. "core" or a plugin name |


* * *

<a name="area"></a>

### area(vertices) ⇒ <code>number</code>
Computes the area of a polygon

**Returns**: <code>number</code> - -- polygon area, might be negative  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>Array.&lt;array&gt;</code> | - polygon vertices as [[x,y], [x,y], ...] array |


* * *

<a name="arrayToObject"></a>

### arrayToObject(o) ⇒ <code>object</code>
This function fixes an uglyness when working with PHP backends.
in PHP, there is no distiction between arrays and objects, so
PHP converts an empty object {} to a empty array [].
When this empty array then ends up in client-side JS functions which
might start to assign values to the array using `arr.foo = "bar"`
which results in a data structure like this:


| Param | Type | Description |
| --- | --- | --- |
| o | <code>array</code> | the input |

**Example**  
```js
console.log(arr);
[]
  foo: "bar"
  length: 0
  <prototype>: Array []

console.log(arrayToObject(arr));
Object { foo: "bar" }
```

* * *

<a name="autoTickFormat"></a>

### autoTickFormat(column) ⇒ <code>string</code>
Convenient wrapper around autoTickFormatNumber and autoTickFormatDate.
Returns either a numeral.js or day.js format, depending on the column type.

**Returns**: <code>string</code> - -- a numeral|dayjs format string  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>object</code> | - dw.column instance that is displayed on the axis |


* * *

<a name="autoTickFormatDate"></a>

### autoTickFormatDate(range, precision) ⇒ <code>string</code>
auto-detects a nice default axis tick format for date
columns based on the input range and precision

**Returns**: <code>string</code> - - day.js compatible format string  

| Param | Type | Description |
| --- | --- | --- |
| range | <code>array</code> | [min, max] of the data |
| precision | <code>string</code> | the input data precision (year|quarter|month|week|day|...) |

**Example**  
```js
import {autoTickFormatDate} from '@datawrapper/shared/autoTickFormat';
autoTickFormatDate([new Date(2000,0,1), new Date(2002,0,1)], 'quarter'); // 'YYYY|[Q]Q'
```

* * *

<a name="autoTickFormatNumber"></a>

### autoTickFormatNumber(range) ⇒ <code>string</code>
auto-detects a nice default axis tick format for numeric
columns based on the input range

**Returns**: <code>string</code> - - numeral.js compatible format string  

| Param | Type | Description |
| --- | --- | --- |
| range | <code>array</code> | [min, max] of the data |

**Example**  
```js
import {autoTickFormatNumber} from '@datawrapper/shared/autoTickFormat';
autoTickFormatNumber([0,100]); // '0,0.[00]'
autoTickFormatNumber([0.2,0.7]); // '0,0.00[00]'
```

* * *

<a name="clone"></a>

### clone(object) ⇒ <code>\*</code>
Clones an object

**Returns**: <code>\*</code> - - the cloned thing  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>\*</code> | the thing that should be cloned |


* * *

<a name="colorLightness"></a>

### colorLightness(hexColor) ⇒ <code>number</code>
Returns the Lab lightness value of a given hexidecimal
RGB color. Uses chroma-js to convert from Hex to Lab, but
only adds a few hundreds bytes to your build.

To use this function, you have to manually install chroma-js using
`npm install chroma-js`.

**Returns**: <code>number</code> - - the L*a*b lightness, between 0 (black) and 100 (white)  

| Param | Type | Description |
| --- | --- | --- |
| hexColor | <code>string</code> | the RGB color as hexadecimal string, e.g. "#330066" |

**Example**  
```js
import colorLightness from '@datawrapper/shared/colorLightness';
colorLightness('#ff3399') // 57.9
```

* * *

<a name="columnNameToVariable"></a>

### columnNameToVariable(name) ⇒ <code>string</code>
converts a column name to a variable name that can be used in the custom
column editor. variable names can't contain spaces and special characters
and are also converted to lowercase.

**Returns**: <code>string</code> - -- variable name  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | - name of the column |

**Example**  
```js
import columnNameToVariable from '@datawrapper/shared/columnNameToVariable';

columnNameToVariable('GDP (per cap.)') // gdp_per_cap
```

* * *

<a name="combinations"></a>

### combinations(input) ⇒ <code>Array.&lt;array&gt;</code>
computes all combinations of input elements

**Returns**: <code>Array.&lt;array&gt;</code> - -- array of combinations  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Array.&lt;array&gt;</code> | - array of input objects, could be numbers, strings, etc |

**Example**  
```js
// returns [['a','b'], ['a'], ['b']]
combinations(['a', 'b']);
```
**Example**  
```js
// returns [[1,2,3], [1,2], [1,3], [1], [2,3], [2], [3]]
combinations([1,2,3])
```

* * *

<a name="deleteJSON"></a>

### deleteJSON(url, callback) ⇒ <code>Promise</code>
Download and parse a remote JSON endpoint via DELETE. credentials
are included automatically


| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| callback | <code>function</code> | 

**Example**  
```js
import { deleteJSON } from '@datawrapper/shared/fetch';

deleteJSON('http://api.example.org/chart/123').then(() => {
    console.log('deleted!')
});
```

* * *

<a name="equalish"></a>

### equalish(a, b) ⇒ <code>boolean</code>
returns true if two numeric values are close enough

**Export**:   

| Param | Type |
| --- | --- |
| a | <code>number</code> | 
| b | <code>number</code> | 

**Example**  
```js
// returns true
equalish(0.333333, 1/3)
```
**Example**  
```js
// returns false
equalish(0.333, 1/3)
```

* * *

<a name="estimateTextWidth"></a>

### estimateTextWidth(text, fontSize) ⇒ <code>number</code>
returns the estimated width of a given text in Roboto.
this method has proven to be a good compromise between pixel-perfect
but expensive text measuring methods using canvas or getClientBoundingRect
and just multiplying the number of characters with a fixed width.

be warned that this is just a rough estimate of the text width. the
character widths will vary from typeface to typeface and may be
off quite a bit for some fonts (like monospace fonts).

**Export**:   

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | the text to measure |
| fontSize | <code>number</code> | the output font size (optional, default is 14) |

**Example**  
```js
import estimateTextWidth from '@datawrapper/shared/estimateTextWidth';
// or import {estimateTextWidth} from '@datawrapper/shared';
const width = estimateTextWidth('my text', 12);
```

* * *

<a name="fetchJSON"></a>

### fetchJSON(url, method, credentials, body, callback) ⇒ <code>Promise</code>
Download and parse a remote JSON document


| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> |  |
| method | <code>string</code> | HTTP method, either GET, POST or PUT |
| credentials | <code>string</code> \| <code>undefined</code> | set to "include" if cookies should be passed along CORS requests |
| body | <code>string</code> |  |
| callback | <code>function</code> |  |

**Example**  
```js
import { fetchJSON } from '@datawrapper/shared/fetch';
fetchJSON('http://api.example.org', 'GET', 'include');
```

* * *

<a name="get"></a>

### get(object, key, _default) ⇒
Safely access object properties without throwing nasty
`cannot access X of undefined` errors if a property along the
way doesn't exist.

**Returns**: the value  

| Param | Type | Description |
| --- | --- | --- |
| object |  | the object which properties you want to acccess |
| key | <code>String</code> | dot-separated keys aka "path" to the property |
| _default | <code>\*</code> | the fallback value to be returned if key doesn't exist |

**Example**  
```js
import get from '@datawrapper/shared/get';
const someObject = { key: { list: ['a', 'b', 'c']}};
get(someObject, 'key.list[2]') // returns 'c'
get(someObject, 'missing.key') // returns undefined
get(someObject, 'missing.key', false) // returns false
```

* * *

<a name="getJSON"></a>

### getJSON(url, credentials, callback) ⇒ <code>Promise</code>
Download and parse a JSON document via GET


| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> |  |
| credentials | <code>string</code> \| <code>undefined</code> | optional, set to undefined to disable credentials |
| callback | <code>function</code> |  |

**Example**  
```js
import { getJSON } from '@datawrapper/shared/fetch';
// use it callback style
getJSON('http://api.example.org', 'include', function(data) {
    console.log(data);
});
// or promise-style
getJSON('http://api.example.org')
  .then(data => {
     console.log(data);
  });
```

* * *

<a name="isValidUrl"></a>

### isValidUrl(input) ⇒ <code>boolean</code>
checks if a given string is a valid URL


| Param | Type |
| --- | --- |
| input | <code>string</code> | 


* * *

<a name="loadScript"></a>

### loadScript(src, callback)
injects a `<script>` element to the page to load a new JS script


| Param | Type |
| --- | --- |
| src | <code>string</code> | 
| callback | <code>function</code> | 

**Example**  
```js
import { loadScript } from '@datawrapper/shared/fetch';

loadScript('/static/js/library.js', () => {
    console.log('library is loaded');
})
```

* * *

<a name="loadStylesheet"></a>

### loadStylesheet(src, callback)
injects a `<link>` element to the page to load a new stylesheet


| Param | Type |
| --- | --- |
| src | <code>string</code> | 
| callback | <code>function</code> | 

**Example**  
```js
import { loadStylesheet } from '@datawrapper/shared/fetch';

loadStylesheet('/static/css/library.css', () => {
    console.log('library styles are loaded');
})
```

* * *

<a name="observeFonts"></a>

### observeFonts(fontsJSON, typographyJSON) ⇒ <code>Promise</code>
Function that returns a promise, that resolves when all fonts,
specified in fontsJSON and typographyJSON have been loaded.


| Param | Type |
| --- | --- |
| fontsJSON | <code>Object</code> \| <code>Array</code> | 
| typographyJSON | <code>Object</code> | 


* * *

<a name="patchJSON"></a>

### patchJSON(url, body, callback) ⇒ <code>Promise</code>
Download and parse a remote JSON endpoint via PATCH. credentials
are included automatically


| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| body | <code>string</code> | 
| callback | <code>function</code> | 

**Example**  
```js
import { patchJSON } from '@datawrapper/shared/fetch';

patchJSON('http://api.example.org', JSON.stringify({
   query: 'foo',
   page: 12
}));
```

* * *

<a name="postEvent"></a>

### postEvent(chartId) ⇒ <code>function</code>
Use this function to post event messages out of Datawrapper iframe embeds
to the parent website.


| Param | Type | Description |
| --- | --- | --- |
| chartId | <code>string</code> | the chart id each message should be signed with |

**Example**  
```js
import genPostEvent from '@datawrapper/shared/postEvent';
const postEvent = genPostEvent(chart.get('id'));
postEvent('bar:hover', {value: 123});
```

* * *

<a name="postJSON"></a>

### postJSON(url, body, callback) ⇒ <code>Promise</code>
Download and parse a remote JSON endpoint via POST. credentials
are included automatically


| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| body | <code>string</code> | 
| callback | <code>function</code> | 

**Example**  
```js
import { postJSON } from '@datawrapper/shared/fetch';

postJSON('http://api.example.org', JSON.stringify({
   query: 'foo',
   page: 12
}));
```

* * *

<a name="purifyHTML"></a>

### purifyHTML(input, allowed) ⇒ <code>string</code>
Remove all non-whitelisted html tags from the given string

**Returns**: <code>string</code> - - the cleaned html output  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | dirty html input |
| allowed | <code>string</code> | list of allowed tags, defaults to `<a><b><br><br/><i><strong><sup><sub><strike><u><em><tt>` |


* * *

<a name="putJSON"></a>

### putJSON(url, body, callback) ⇒ <code>Promise</code>
Download and parse a remote JSON endpoint via PUT. credentials
are included automatically


| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| body | <code>string</code> | 
| callback | <code>function</code> | 

**Example**  
```js
import { putJSON } from '@datawrapper/shared/fetch';

putJSON('http://api.example.org', JSON.stringify({
   query: 'foo',
   page: 12
}));
```

* * *

<a name="set"></a>

### set(object, key, value) ⇒
safely set object properties without throwing nasty
`cannot access X of undefined` errors if a property along the
way doesn't exist.

**Returns**: the value  

| Param | Type | Description |
| --- | --- | --- |
| object |  | the object which properties you want to acccess |
| key | <code>String</code> | dot-separated keys aka "path" to the property |
| value | <code>\*</code> | the value to be set |


* * *

<a name="tailLength"></a>

### tailLength(value) ⇒ <code>number</code>
returns the length of the "tail" of a number, meaning the
number of meaningful decimal places


| Param | Type |
| --- | --- |
| value | <code>number</code> | 

**Example**  
```js
// returns 3
tailLength(3.123)
```
**Example**  
```js
// returns 2
tailLength(3.12999999)
```

* * *

<a name="toFixed"></a>

### toFixed(value) ⇒ <code>string</code>
Automatically converts a numeric value to a string. this is better
than the default number to string conversion in JS which sometimes
produces ugly strings like "3.999999998"


| Param | Type |
| --- | --- |
| value | <code>number</code> | 

**Example**  
```js
import toFixed from '@datawrapper/shared/toFixed';
// returns '3.1'
toFixed(3.100001)
```

* * *

<a name="trackEvent"></a>

### trackEvent(category, category, category, category)
tracks a custom event in Matomo


| Param | Type | Description |
| --- | --- | --- |
| category | <code>string</code> | the event category |
| category | <code>string</code> | the event action |
| category | <code>string</code> | the event name |
| category | <code>string</code> \| <code>number</code> | the event value, optional |


* * *

<a name="trackPageView"></a>

### trackPageView(loadTime)
tracks a custom page view in Matomo. Useful for single page
apps in Datawrapper, such as the locator maps UI. The page title
and URL are automatically detected using the window object.


| Param | Type | Description |
| --- | --- | --- |
| loadTime | <code>number</code> | optional page load time, has to be measured    manually |


* * *

