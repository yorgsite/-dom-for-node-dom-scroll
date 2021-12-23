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
	+ [domScrollModel.decr()](#decr)
	+ [domScrollModel.setOffset( **value** )](#setOffset)
 
<hr/>
 
<hr/>
 
## <a name="dom-scroll"></a> model **dom-scroll**
 

 
**use** : _dom( **'dom-scroll'** , **config** , **className** )
 
  + **param** : config `object(onChange:function,direction:0|1=1,)` <br/>...
 
  + **param** : className `string` <br/>Use a custom css class (exemple can be taken on .dom-scroll_default).
 
 
[▲](#main_menu)
<hr/>
 
<hr/>
 
## <a name="DomScrollModel"></a> class **DomScrollModel**
 

 
**use** : new DomScrollModel()
 
<hr/>
 
+ ### <a name="value"></a> attr **value**<br/><br/>**use** : domScrollModel.value `number` 
<hr/>
 
+ ### <a name="outerSize"></a> attr **outerSize**<br/><br/>**use** : domScrollModel.outerSize `number` 
<hr/>
 
+ ### <a name="innerSize"></a> attr **innerSize**<br/><br/>**use** : domScrollModel.innerSize `number` 
<hr/>
 
+ ### <a name="direction"></a> attr **direction**<br/><br/>**use** : domScrollModel.direction `number=0|1` 
<hr/>
 
+ ### <a name="target"></a> attr **target**<br/><br/>**use** : domScrollModel.target `HTMLElement` 
<hr/>
 
+ ### <a name="size"></a> attr **size**<br/><br/>**use** : domScrollModel.size `number` 
<hr/>
 
+ ### <a name="incr"></a> method **incr**<br/><br/>**use** : domScrollModel.incr()
<hr/>
 
+ ### <a name="decr"></a> method **decr**<br/><br/>**use** : domScrollModel.decr()
<hr/>
 
+ ### <a name="setOffset"></a> method **setOffset**<br/><br/>**use** : domScrollModel.setOffset( **value** )<br/> <br/>   + **param** : value `*` <br/>the new offset value
 
[▲](#main_menu)
<hr/>
 