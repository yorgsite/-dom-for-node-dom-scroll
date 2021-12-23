# @dom-for-node/dom-scroll
a customisable bindable scrollbar with _dom.js.


install 
```
npm install @dom-for-node/dom-scroll
```

import
```
const _dom=require('dom-for-node');

// Model declaration must strictly use the same dom-for-node instance.
require('@dom-for-node/dom-scroll')(_dom);

```

use
```
const _dom=require('dom-for-node');


let bar = _dom('dom-scroll',config,className);

```

See more in [Model documentation](./dom-scroll.model.md);