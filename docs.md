## Functions

<dl>
<dt><a href="#trackEvent">trackEvent(category, category, category, category)</a></dt>
<dd><p>tracks a custom event in Matomo</p>
</dd>
<dt><a href="#trackPageView">trackPageView(loadTime)</a></dt>
<dd><p>tracks a custom page view in Matomo. Useful for single page
apps in Datawrapper, such as the locator maps UI. The page title
and URL are automatically detected using the window object.</p>
</dd>
<dt><a href="#loadScript">loadScript(src, callback)</a></dt>
<dd><p>injects a <script> element to the page to load a new JS script</p>
</dd>
<dt><a href="#loadStylesheet">loadStylesheet(src, callback)</a></dt>
<dd><p>injects a <link> element to the page to load a new stylesheet</p>
</dd>
<dt><a href="#__">__(key, scope)</a> ⇒ <code>string</code></dt>
<dd><p>translates a message key. translations are originally stored in a
Google spreadsheet that we&#39;re pulling into Datawrapper using the
<code>scripts/update-translations</code> script, which stores them as <code>:locale.json</code>
files in the /locale folders (both in core as well as inside plugin folders)</p>
<p>for the client-side translation to work we are also storing the translations
in the global <code>window.dw.backend.__messages</code> object. plugins that need
client-side translations must set <code>&quot;svelte&quot;: true</code> in their plugin.json</p>
</dd>
<dt><a href="#purifyHTML">purifyHTML(input, allowed)</a> ⇒ <code>string</code></dt>
<dd><p>Remove all html tags from the given string</p>
</dd>
<dt><a href="#tailLength">tailLength(value)</a> ⇒ <code>number</code></dt>
<dd><p>returns the length of the &quot;tail&quot; of a number, meaning the
number of meaningful decimal places</p>
</dd>
</dl>

<a name="trackEvent"></a>

## trackEvent(category, category, category, category)
tracks a custom event in Matomo


| Param | Type | Description |
| --- | --- | --- |
| category | <code>string</code> | the event category |
| category | <code>string</code> | the event action |
| category | <code>string</code> | the event name |
| category | <code>string</code> \| <code>number</code> | the event value, optional |

<a name="trackPageView"></a>

## trackPageView(loadTime)
tracks a custom page view in Matomo. Useful for single page
apps in Datawrapper, such as the locator maps UI. The page title
and URL are automatically detected using the window object.


| Param | Type | Description |
| --- | --- | --- |
| loadTime | <code>number</code> | optional page load time, has to be measured    manually |

<a name="loadScript"></a>

## loadScript(src, callback)
injects a <script> element to the page to load a new JS script


| Param | Type |
| --- | --- |
| src | <code>string</code> | 
| callback | <code>function</code> | 

<a name="loadStylesheet"></a>

## loadStylesheet(src, callback)
injects a <link> element to the page to load a new stylesheet


| Param | Type |
| --- | --- |
| src | <code>string</code> | 
| callback | <code>function</code> | 

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

## purifyHTML(input, allowed) ⇒ <code>string</code>
Remove all html tags from the given string

**Returns**: <code>string</code> - - the cleaned html output  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | dirty html input |
| allowed | <code>string</code> | list of allowed tags, defaults to `<a><b><br><br/><i><strong><sup><sub><strike><u><em><tt>` |

<a name="tailLength"></a>

## tailLength(value) ⇒ <code>number</code>
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
