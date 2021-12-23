module.exports=function(_dom){
	"use strict";
	if(_dom.has('dom-scroll'))return;
	const {Listener}=require('@dom-for-node/tools/src/core/Listener');
	/**
	Component 'dom-scroll' share model handler public attr & methods.
	@param {object(onChange:function,direction:0|1=1,)} config : ...
	@param {string} [className] : Use a custom css class (exemple can be taken on .dom-scroll_default).
	*/
	_dom.model('dom-scroll',function(tagName,config,className){
		let doms={};
		let handler=new DomScrollModel(this,doms).init(config,className);
		return doms.root;
		
	},{
		'.dom-scroll':{
			display	:"inline-block",

			"&>div"	:{
				display	:"flex",
				"&>.prev"	:{
				},
				"&>.bar-content"	:{
					flexGrow	:"1",
					position	:"relative",
					"&>.bar"	:{
						position	:"absolute",
						height	:"100%",
						width	:"100%",
					},
					"&>.cursor"	:{
						position	:"absolute",
						maxHeight	:"100%",
						maxWidth	:"100%",
					}
				},
				"&>.next"	:{
					cursor	:"pointer"
				}
			},
			'&.horizontal>div':{
				flexDirection	:"row",
				"&>.bar-content"	:{
					"&>.cursor"	:{
						height	:"100%",
						minWidth	:"10%"
					}
				},
			},
			'&.vertical>div':{
				flexDirection	:"column",
				"&>.bar-content"	:{
					"&>.cursor"	:{
						minHeight	:"10%",
						width	:"100%"
					}
				},
			},
		},
		'.dom-scroll_default':{
			display	:"inline-block",
			"&>div"	:{
				backgroundColor	:"rgba(0,0,0,0.1)",
				boxShadow:'inset 0px 0px 2px rgba(0,0,0,0.5),inset 2px 2px 4px rgba(0,0,0,0.3)',
				"&>.prev,>.next"	:{
					cursor	:"pointer",
					userSelect: 'none',
					fontSize:'12px',
					padding:'2px',
					textShadow:'rgba(0, 0, 0, 0.8) 2px 2px 4px',
					transition:'color ease 0.7s',
					'&:hover':{
						color:'#fff'
					},
					'&.down':{
						color:'#fff',
						textShadow:'rgba(0, 0, 0, 0.8) 0px 0px 2px',
						padding:'3px 1px 1px 3px',
					},
				},
				"&>.prev"	:{
				},
				// "&>.prev::before" :{
				// 	content: "b"
				// },
				"&>.bar-content"	:{
					"&>.bar"	:{
					},
					"&>.cursor"	:{
						backgroundColor	:"rgba(0,0,0,0.5)",
						transition:'background-color ease 0.7s',
						cursor	:"pointer",
						boxShadow:'0px 0px 2px rgba(0,0,0,0.2),3px 3px 5px rgba(0,0,0,0.3)',
						userSelect: 'none',
						"&:hover"	:{
							backgroundColor	:"rgb(255, 255, 255)",
						},
						'&.down':{
							backgroundColor	:"rgb(255, 255, 255)",
							boxShadow:'inset 0px 0px 2px rgba(0,0,0,0.5),inset 2px 2px 4px rgba(0,0,0,0.3)',
						},
					}
				},
				"&>.next"	:{
				}
			},
			'&.horizontal>div':{
			},
			'&.vertical>div':{
			},
		}
	},false);

	/**
	Component 'dom-scroll' model handler.
	@constructor
	*/
	class DomScrollModel{
		constructor(scope,doms){
			
			this.tagName='dom-scroll';
			this.scope=scope;
			this.doms=doms;//horizontal,vertical
			this.dir=1;
			this._size=100;
			this._outerSize=100;
			this._innerSize=1000;
			this._value=0;
			this.step=1;
			this.swiftAnim=true;
			this.swiftValue=false;
			this._target=null;
			this._observer=null;
			this._listener=new Listener(['change']);
			this.ref={
				css:['horizontal','vertical'],
				xy:['x','y'],
				wh:['width','height'],
				evt:['pageX','pageY'],
				rect:[['left','right'],['top','bottom']],
			};
			this.chars={
				left:'&#9664;',
				right:'&#9654;',
				top:'&#9650;',
				bottom:'&#9660;',
			};
			this.onMouseWheel=evt=>this.mouseWheel(evt);
			this.rects={};
		}
		// --------- init
		init(config,className){
			this.config	= config;
			this.className	= className;
			this.initDom();
			this.initIo();
			this.initEvts();
			this.direction=config.direction;

			return this;
		}

		initDom(){
			let doms=this.doms;
			doms.prev	= _dom('span',{className:"prev"},[
				""
			]);
			doms.bar	= _dom('div',{className:"bar"},[
				_dom('div',{})
			]);
			doms.cursor	= _dom('div',{className:"cursor"});
			doms.barContent	= _dom('span',{className:"bar-content"},[
				doms.bar,
				doms.cursor
			]);
			doms.next	= _dom('span',{className:"next"},[
				">"
			]);
			doms.content	= _dom('div',{},[
				doms.prev,
				doms.barContent,
				doms.next
			]);
			doms.root	= _dom('div',{className:'dom-scroll '+(this.className?this.className:'dom-scroll_default')},[
				doms.content
			]);
		}		
		initIo(){
			Object.defineProperty(this.doms.root,'doms',{get:()=>this.doms});			
			[	'setListSize',
				'setSliceSize',
				'setOffset',
				'enable',
				'on',
				'off'
			].forEach(k=>{
				this.doms.root[k]=(...args)=>this[k](...args);
			});
			[	'direction',
				'target',
				'size',
				'value',
				'outerSize',
				'innerSize'
			].forEach(k=>{
				Object.defineProperty(this.doms.root,k,{
					get:()=>this[k],
					set:v=>{this[k]=v;}
				});
			});
			let charReg=/^&#{0,1}[A-Za-z0-9-]+;/g;
			for(let k in this.chars){
				Object.defineProperty(this.doms.root,k+'Char',{
					get:()=>this.chars[k],
					set:v=>{
						this.chars[k]=charReg.test(v+'')?v:(v+' ').charAt(0);
						let id;
						if((id=this.ref.rect[this.dir].includes(k))>-1){
							let domk=(['prev','next'])[id];
							this.doms[domk].innerHTML=this.chars[k];
							this.refreshView();
						}
					}
				});
			}
		}
		initEvts(){
			let down=null;
			this.doms.prev.addEventListener('mousedown',evt=>{
				this.doms.prev.classList.add('down');
				this.decr();
			});
			this.doms.next.addEventListener('mousedown',evt=>{
				this.doms.next.classList.add('down');
				this.incr();
			});
			
			this.doms.cursor.addEventListener('mousedown',evt=>{
				down={
					dv:this._value,
					dp:this.val2pix(this._value),
					dm:evt[this.ref.evt[this.dir]]
				};
				down.v=down.dv;
				down.m=down.dm;
				this.doms.cursor.classList.add('down');
			});
			window.addEventListener('mouseup',evt=>{
				down=null;
				this.doms.cursor.classList.remove('down');
				this.doms.prev.classList.remove('down');
				this.doms.next.classList.remove('down');
			});
			window.addEventListener('mousemove',evt=>{
				if(down){			
					let m=evt[this.ref.evt[this.dir]];
					down.dp+=(m-down.m);
					down.m=m;
					this.tryChange(this.pix2val(down.dp));
				}
			});
			this._observer=new ResizeObserver(entries => {
				for (let entry of entries) {
					if(entry.contentRect) {
						this.size=entry.contentRect[this.ref.wh[this.dir]];
						break;
					}
				}
			});
		}
		// --------- io
		/**@attr {number} current scroll value */
		get value(){
			return this._value;
		}
		set value(v){
			this._value=v;
			this.refreshValue();
			this.refreshView();
		}
		/**@attr {number} the container size */
		get outerSize(){
			return this._outerSize;
		}
		set outerSize(v){
			this._outerSize=v;
			this.refreshValue();
			this.refreshView();
		}
		/**@attr {number} the content size */
		get innerSize(){
			return this._outerSize;
		}
		set innerSize(v){
			this._innerSize=v;
			this.refreshValue();
			this.refreshView();
		}
		
		/**@attr {number=0|1} horizontal=0 vertical=1 */
		get direction(){
			return this.dir;
		}
		set direction(v){
			if(typeof(v)==='number'){
				this.dir=v;
			}else if(this.ref.xy.includes(v)){
				this.dir=this.ref.xy.inexOf(v);
			}else if(this.ref.css.includes(v)){
				this.dir=this.ref.css.inexOf(v);
			}
			this.doms.root.classList.remove(this.ref.css[(this.dir+1)%2]);
			this.doms.root.classList.add(this.ref.css[this.dir]);
			this.doms.content.style[this.ref.wh[(this.dir+1)%2]]='';
			this.doms.content.style[this.ref.wh[this.dir]]=this._size+'px';
			['prev','next'].forEach((domk,id)=>{
				this.doms[domk].innerHTML=this.chars[this.ref.rect[this.dir][id]];
			});
			requestAnimationFrame(()=>this.refreshView());
		}
		/**@attr {HTMLElement} attached element to fit scrollbar size */
		get target(){
			return this._target;
		}
		set target(v){
			if(this._target){
				this._observer.unobserve(this._target);
				this._target.removeEventListener('wheel',this.onMouseWheel);
				this._target=null;
			}
			if(v instanceof HTMLElement){
				this._target=v;
				this._target.addEventListener('wheel',this.onMouseWheel);
				this._observer.observe(this._target);
			}
		}
		/**@attr {number} scrollbar size (px) */
		get size(){
			return this._size;
		}
		set size(v){
			if(typeof(v)==='number'){
				this._size=Math.max(40,v);
				this.doms.content.style[this.ref.wh[this.dir]]=this._size+'px';
			}
		}
		// --------- tools
		pix2perc(v){
			let dk=this.ref.wh[this.dir];
			return Math.max(0,Math.min(1,v/Math.max(1,this.rects.bar[dk]-this.rects.cur[dk])));
		}
		perc2pix(perc){
			let dk=this.ref.wh[this.dir];
			return Math.round(perc*(this.rects.bar[dk]-this.rects.cur[dk]));
		}
		val2perc(value){
			return Math.max(0,Math.min(1,value/Math.max(1,this._innerSize-this._outerSize)));
		}
		perc2val(perc){
			let v=perc*(this._innerSize-this._outerSize);
			if(this.step){
				v=this.step*Math.round(v/this.step);
			}
			return v;
		}
		val2pix(value){
			return this.perc2pix(this.val2perc(value));
		}
		pix2val(v){
			return this.perc2val(this.pix2perc(v));
		}

		refreshView(){
			this.rects.bar=this.doms.barContent.getBoundingClientRect();
			this.rects.cur=this.doms.cursor.getBoundingClientRect();
			if(this.dir){
				this.doms.cursor.style.margin=this.val2pix(this._value)+'px 0 0 0';
			}
		}
		refreshValue(){
			this._value=this.correctValue(this._value);
		}
		correctValue(value){
			return Math.max(0,Math.min(this._innerSize-this._outerSize,value));
		}

		tryChange(newValue){
			newValue=this.correctValue(newValue);
			if(this._value!==newValue){
				this._value=newValue;
				this.refreshView();
				this._listener.flush('change',this);
				if(this.config.onChange){
					this.config.onChange(this);
				}
			}
		}
		mouseWheel(evt){
			console.log('wheel',evt.deltaY);
			
			this.tryChange(this._value+(this.step||1)*(evt.deltaY>0?1:-1));
		}

		// --------- publics
		/**
		 * increment value by 1 step
		 * @returns current value;
		*/
		incr(){
			this.tryChange(this._value+(this.step||1));
			return this._value;
		}
		/**
		 * decrement value by 1 step
		 * @returns current value;
		*/
		decr(){
			this.tryChange(this._value-(this.step||1));
			return this._value;
		}
		setListSize(){
		}
		setSliceSize(){
		}
		/**
		 * 
		 * @param {*} value the new offset value
		 */
		setOffset(value){
			this.tryChange(value);
		}
		enable(){
		}
		on(type,callback,prepend=false){
			this._listener.on(type,callback,prepend);
			return this;
		}
		off(type,callback){
			return this._listener.off(type,callback);
		}
	};

};
