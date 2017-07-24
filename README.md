# Base storage

[![Greenkeeper badge](https://badges.greenkeeper.io/tuchk4/base-storage.svg)](https://greenkeeper.io/)

Provides easy way to get / set and check the existence of a paths in the objects

`npm install --save base-storage`

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

Very useful for using as config storage with presets (shortcuts)

```js
import BaseStorage from 'base-storage';

class AppConfig extends BaseStorage {
  
  routing: {
    add: (path, action) => {
      let routes = this.get('routing.actions', []);
      routes.push({path, action});
      
      this.set('routing.actions', routes);
    },
    
    enableHistoryApi: () => {
      this.set('routing.isHistoryApiEnabled', true);
    },
    
    disableHistoryApi: () => {
      this.set('routing.isHistoryApiEnabled', false);
    }
  };
  
  exceptions: {
    handler: (handler) => {
      let handlers = this.get('exceptions.handlers', []);
      handlers.push(handler);
      
      this.set('exceptions.handlers', handlers);
    }
  };
  
  api: {
    setHost: host => this.set('api.host', host),
    setPort: port => this.set('api.port', port),
    setPrefix: prefix => this.set('api.prefix', prefix),
  };
  
  google: {
    setAuthClientId: clientId => this.set('google.auth.clientId', clientId),
    getAuthClientId: () => this.get('google.auth.clientId'),
    
    setAnalyticsId: analyticsId => this.set('google.analyticsId.id', analyticsId),
  }
  
  constructor(config) {
    super(config);
  }
}

let config = new AppConfig();

// ....

config.google.setAuthClientId('xxx');
config.google.setAnalyticsId('zzz');

expect(config.get('google')).to.be.equal({
  auth: {
    clientId: 'xxx',
  },
  analyticsId: {
    id: 'zzz'
  }
});


expect(config.get('google.auth.clientId')).to.be.equal('xxx');
expect(config.getAuthClientId()).to.be.equal('xxx');
```

### Available methods

- `constructor(object)` - constructor takes **object** with which  get / set / has methods will work

- `get(path, defaultValue)` - gets the value at path of object. If the resolved value is undefined the defaultValue is used in its place. ([lodash/get](https://lodash.com/docs#get))
- `set(path, value)` - sets the value at path of object. ([lodash/set](https://lodash.com/docs#set)) 
- `has(path)` - returns **true** is path exists and **false** - if not. ([lodash/has](https://lodash.com/docs#has))

### Community
You are always welcome for ideas and pull requests :)


### TODO

- [ ] Feature request: freeze (make immutable) whole stored object and its parts
- [ ] Feature request: Support data structures. (likely to use [tcomb](https://github.com/gcanti/tcomb)) 
