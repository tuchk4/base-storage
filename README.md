# Base storage

Provide easy way to get / set and check keys existing at objects
 
### How to use
```js
import BaseStorage from 'base-storage';


const storage = new BaseStorage({
  a: {
    b: {
      c: {
        d: 1,
        e: 2
      }
    }
  },
  f: 2
});

// has method
expect(storage.has('a')).to.be.equal(true);
expect(storage.has('A')).to.be.equal(false);

// get method
expect(storage.get('f')).to.be.equal(2);
expect(storage.get('a.b.c.d')).to.be.equal(1);
expect(storage.get('a.b.c')).to.be.equal({
    d: 1,
    e: 2
});

// set method

storage.set('x.y.z', 100500);
expect(storage.get('x')).to.be.equal({
  y: {
    z: 100500
  }
});
```

### Extends

```js
import BaseStorage from 'base-storage';

class CustomStorage extends BaseStorage {
  constructor(config) {
    super(config);
  }
  
  set() {
    throw new Error('"set" method is denied')
  }
}
```


### Community
You are always welcome for ideas and pull requests :)
