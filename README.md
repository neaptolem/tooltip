# tooltip
```sh
$ npm i
$ gulp
```
Create tooltips colection
```js
var colection = new TOOLTIPS_COLECTION();
```
Create tooltip

JS code
```js
var tooltip1 = colection.create('div1', {
            position: 'top',
            text: 'div1 top',
            event: 'mouseover',
            hide: 'click'
        });

        var tooltip2 = colection.create('div2', {
            position: 'right',
            text: 'div2 right',
            event: 'mouseover',
            delay: 3000
        });
```
HTML code
```html
<div id="div1" class="test-item">
    <h2>top</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
</div>
<div id="div2" class="test-item">
    <h2>right</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
</div>
```

Output DOM


```html
<div class="test1">
    <div id="div1" class="test-item object-for-tooltip">
        <div id="div1_tooltip" class="tooltip" style="top: 0%; left: 50%; transform: translate(-50%, -100%);">div1 top
        </div>
    </div>
    <div id="div2" class="test-item object-for-tooltip">
        <div id="div2_tooltip" class="tooltip" style="top: 50%; right: 0px; transform: translate(100%, -50%);">div2 right
        </div>
    </div>
</div>
```
## Properties
|Name |Type|Default|Description|
|-----|----|-------|-----------|
|position|string|'top'|How to position the tooltip - ['top','bottom','left','right']|
|text|string|'undefined'|Set text of tooltip|
|event|string|'mouseover'| Set event for show tooltip ['click', 'dbclick', 'mouseover']|
|delay|number|1000|Set time of show tooltip|
|hide|string|'time'|Set type of hiding tooltip

## Methods
### tooltip
|Name|Description|
|-|-|
|options()|get options of tooltip|
|hide()|hide tooltip|
|getId()|get id of tooltip|
### tooltip colection
|Name|Description|
|-|-|
|create()|create new tooltip in colection|
|getTooltips()|get all tooltips from colection|


