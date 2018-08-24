/*global beforeAll */
import type from 'of-type';

beforeAll(function () {
  const types = [
    { type: 'String', name: 'string', value: 'hello world' },
    { type: 'Number', name: 'integer', value: 10 },
    { type: 'Number', name: '-integer', value: -10 },
    { type: 'Number', name: 'decimal', value: 5.5 },
    { type: 'Number', name: '-decimal', value: -5.5 },
    { type: 'Number', name: 'NaN', value: NaN },
    { type: 'Number', name: 'infinity', value: Infinity },
    { type: 'Number', name: '-infinity', value: -Infinity },
    { type: 'Boolean', name: 'boolean', value: true },
    { type: 'Date', name: 'date', value: new Date() },
    { type: 'Function', name: 'function', value: function () { } },
    { type: 'null', name: 'null', value: null },
    { type: 'undefined', name: 'undefined', value: undefined },
    { type: 'Object', name: 'object', value: {} },
    { type: 'Array', name: 'array', value: [] },
    { type: 'RegExp', name: 'regExp', value: /hello/g },
    { type: 'Names', name: 'instance', value: new (class Names { })() },
    { type: 'HTMLDivElement', name:'div', value: document.createElement('DIV')}
  ];

  this.loop = ({ only, except, values, callback }) => {
    if (type(only, Array) && type(except, Array)) throw new Error('Invalid loop jasmine helper. Either ["only"] or ["except"] property can be defined at once.');
    const isValuesDefined = type(values, Array);
    const isOnlyDefined = type(only, Array);
    const isExceptDefined = type(except, Array);
    if (isValuesDefined) {
      values.forEach((value) => callback(value));
    } else {
      types.forEach(({ type, name, value }) => {
        if (isOnlyDefined) {
          if (only.some((onlyValue) => onlyValue === name)) callback(value, type);
        } else if (isExceptDefined) {
          if (!except.some((exceptValue) => exceptValue === name)) callback(value, type);
        } else {
          callback(value);
        }
      });
    }
  };
});