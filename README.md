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


* [trackEvent(category, category, category, category)](#trackEvent)
* [trackPageView(loadTime)](#trackPageView)
* [loadScript(src, callback)](#loadScript)
* [loadStylesheet(src, callback)](#loadStylesheet)
* [get(object, key, _default)](#get) ⇒
* [__(key, scope)](#__) ⇒ <code>string</code>
* [purifyHTML(input, allowed)](#purifyHTML) ⇒ <code>string</code>
* [toFixed(value)](#toFixed) ⇒ <code>string</code>

<a name="trackEvent"></a>

### trackEvent(category, category, category, category)
tracks a custom event in Matomo


| Param | Type | Description |
| --- | --- | --- |
| category | <code>string</code> | the event category |
| category | <code>string</code> | the event action |
| category | <code>string</code> | the event name |
| category | <code>string</code> \| <code>number</code> | the event value, optional |

<a name="trackPageView"></a>

### trackPageView(loadTime)
tracks a custom page view in Matomo. Useful for single page
apps in Datawrapper, such as the locator maps UI. The page title
and URL are automatically detected using the window object.


| Param | Type | Description |
| --- | --- | --- |
| loadTime | <code>number</code> | optional page load time, has to be measured    manually |

<a name="loadScript"></a>

### loadScript(src, callback)
injects a <script> element to the page to load a new JS script


| Param | Type |
| --- | --- |
| src | <code>string</code> | 
| callback | <code>function</code> | 

<a name="loadStylesheet"></a>

### loadStylesheet(src, callback)
injects a <link> element to the page to load a new stylesheet


| Param | Type |
| --- | --- |
| src | <code>string</code> | 
| callback | <code>function</code> | 

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
**Export**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | - the key to be translated, e.g. "signup / hed" |
| scope | <code>string</code> | <code>&quot;core&quot;</code> | - the translation scope, e.g. "core" or a plugin name |

<a name="purifyHTML"></a>

### purifyHTML(input, allowed) ⇒ <code>string</code>
Remove all html tags from the given string

**Returns**: <code>string</code> - - the cleaned html output  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | dirty html input |
| allowed | <code>string</code> | list of allowed tags, defaults to `<a><b><br><br/><i><strong><sup><sub><strike><u><em><tt>` |

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
