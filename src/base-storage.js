import getter from 'lodash/get';
import setter from 'lodash/set';
import has from 'lodash/has';

let _config = Symbol('config');

export default class Storage {
  constructor(config) {
    this[_config] = config;
  }

  get(key, defaultValue) {
    return getter(this[_config], key, defaultValue);
  }

  has(key) {
    return has(this[_config], key);
  }

  set(key, value) {
    setter(this[_config], key, value);
  }
}
