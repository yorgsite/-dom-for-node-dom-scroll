# dom-scroll
 
Component 'dom-scroll' share model handler public attr & methods.
 
<hr/>
 
## <a name='main_menu'></a> Menu
+ [dom-scroll](#dom-scroll)
+ [DomScrollModel](#DomScrollModel)
	+ [domScrollModel.value](#value)
	+ [domScrollModel.outerSize](#outerSize)
	+ [domScrollModel.innerSize](#innerSize)
	+ [domScrollModel.direction](#direction)
	+ [domScrollModel.target](#target)
	+ [domScrollModel.size](#size)
	+ [domScrollModel.incr()](#incr)
	+ [domScrollModel.setOffset( **value** )](#setOffset)
 
<hr/>
 
<hr/>
 
## <a name="dom-scroll"></a> model **dom-scroll**
 
Component 'dom-scroll' share model handler public attr & methods.
 
**use** : _dom( **'dom-scroll'** , **config** , **className** )
 
  + **param** : config `object(onChange:function,direction:0|1=1,)` <br/>...
 
  + **param** : className `string` <br/>Use a custom css class (exemple can be taken on .dom-scroll_default).
 
 
[▲](#main_menu)
<hr/>
 
<hr/>
 
## <a name="DomScrollModel"></a> class **DomScrollModel**
 
Component 'dom-scroll' model handler.
 
**use** : new DomScrollModel()
 
<hr/>
 
+ ### <a name="value"></a> attr **value**
 
current scroll value
 
**use** : domScrollModel.value `number` 
 
 
<hr/>
 
+ ### <a name="outerSize"></a> attr **outerSize**
 
the container size
 
**use** : domScrollModel.outerSize `number` 
 
 
<hr/>
 
+ ### <a name="innerSize"></a> attr **innerSize**
 
the content size
 
**use** : domScrollModel.innerSize `number` 
 
 
<hr/>
 
+ ### <a name="direction"></a> attr **direction**
 
horizontal=0 vertical=1
 
**use** : domScrollModel.direction `number=0|1` 
 
 
<hr/>
 
+ ### <a name="target"></a> attr **target**
 
attached element to fit scrollbar size
 
**use** : domScrollModel.target `HTMLElement` 
 
 
<hr/>
 
+ ### <a name="size"></a> attr **size**
 
scrollbar size (px)
 
**use** : domScrollModel.size `number` 
 
 
<hr/>
 
+ ### <a name="incr"></a> method **incr**
 
increment value by 1 step
 
**use** : domScrollModel.incr()
 
 
<hr/>
 
+ ### <a name="setOffset"></a> method **setOffset**
 

 
**use** : domScrollModel.setOffset( **value** )
 
   + **param** : value `*` <br/>the new offset value
 
 
 
[▲](#main_menu)
<hr/>
 