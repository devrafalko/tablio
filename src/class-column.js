import type from 'of-type';
import args from 'typeof-arguments';
import joinArray from 'join-array';
import { isNumericalValue } from './utils';

export default class _Column {
  constructor({ userData, columnIndex, columnCollection, headerDefined }) {
    this.userData = userData;
    this.columnIndex = columnIndex;
    this.columnCollection = columnCollection;
    this.headerDefined = headerDefined;
    this.data = {};
    this.disabled = new Map();
    this.validate();
    this.public = _public(this);
  }

  get errors() {
    const header = `Invalid config.columns[${this.columnIndex}]`;
    return {
      invalidColumnPropertyType: (name, actual, expected) => new TypeError(`${header}["${name}"] property type. The [${actual}] value has been assigned, while the value of type [${expected}] is expected.`),
      invalidEmptyIdentifier: () => new Error(`${header}["id"] property value. The identifier cannot be an empty [String] value.`),
      duplicatedIdentifier: (previousIndex, identifier) => new Error(`${header}["id"] property value. The identifier "${identifier}" has already been used in the config.columns[${previousIndex}] item.`),
      invalidNumericalValue: (property) => new Error(`${header}["${property}"] property value. It must be a numerical value, other than Infinity, -Infinity and NaN.`),
      illegalStepZeroValue: () => new Error(`${header}["step"] property value. It cannot be equal to 0.`),
      invalidSortableValue: () => new Error(`${header}["sortable"] property value. The [String] ["sortable"] value must be: ${this.sortableList}.`)
    };
  }

  get sortableValues() {
    return ['string', 'number'];
  }

  get sortableList() {
    return joinArray({
      array: this.sortableValues,
      separator: ', ',
      last: ' or ',
      each: (value) => `"${value}"`
    });
  }

  validate() {
    const user = this.userData;
    this.hasIdDefined(user.id);
    this.hasDuplicatedId();
    this.hasOrdinalDefined(user.ordinal);
    this.hasNameDefined(user.name);
    this.hasContentDefined(user.content);
    this.hasHeaderDefined(user.header);
    this.hasStartDefined(user.start);
    this.hasStepDefined(user.step);
    this.hasFixedDefined(user.fixed);
    this.hasSearchDefined(user.search);
    this.hasSortableDefined(user.sortable);
    this.hasMatchDefined(user.match);
    this.hasCaseSensitiveDefined(user.caseSensitive);
    this.hasEditableDefined(user.editable);
  }

  hasIdDefined(id) {
    args(arguments, [String], ({ actual, expected }) => {
      throw this.errors.invalidColumnPropertyType('id', actual, expected);
    });
    if (!id.length) throw this.errors.invalidEmptyIdentifier();
    this.data.identifier = id;
  }

  hasDuplicatedId() {
    this.columnCollection.some((column, previousIndex) => {
      let duplicated = this.data.identifier === column.data.identifier;
      if (duplicated) throw this.errors.duplicatedIdentifier(previousIndex, this.data.identifier);
    });
  }

  hasOrdinalDefined(ordinal) {
    args(arguments, [[Boolean, undefined]], ({ actual, expected }) => {
      throw this.errors.invalidColumnPropertyType('ordinal', actual, expected);
    });
    this.data.ordinal = Boolean(ordinal);
  }

  hasNameDefined(name) {
    if (this.data.ordinal) return this.disabled.set('name', true);
    args(arguments, [[String, undefined]], ({ actual, expected }) => {
      throw this.errors.invalidColumnPropertyType('name', actual, expected);
    });
    this.data.name = name;
  }

  hasContentDefined(content) {
    args(arguments, [/(Function|String|HTML.+Element|undefined)/], ({ actual }) => {
      throw this.errors.invalidColumnPropertyType('content', actual, 'Function|String|HTMLElement|undefined');
    });
    this.data.content = !type(content, undefined) ? content : this.data.ordinal ? ({ ordinal }) => ordinal : ({ value }) => value;
  }

  hasHeaderDefined(header) {
    if (!this.headerDefined) return this.disabled.set('header', true);
    args(arguments, [[String, undefined]], ({ actual, expected }) => {
      throw this.errors.invalidColumnPropertyType('header', actual, expected);
    });
    this.data.header = !type(header, undefined) ? header : this.data.ordinal ? 'ind.' : '';
  }

  hasStartDefined(start) {
    if (!this.data.ordinal) return this.disabled.set('start', true);
    args(arguments, [[Number, undefined]], ({ actual, expected }) => {
      throw this.errors.invalidColumnPropertyType('start', actual, expected);
    });
    const isNumber = type(start, Number);
    if (isNumber && !isNumericalValue(start)) throw this.errors.invalidNumericalValue('start');
    this.data.start = isNumber ? start : 1;
  }

  hasStepDefined(step) {
    if (!this.data.ordinal) return this.disabled.set('step', true);
    args(arguments, [[Number, undefined]], ({ actual, expected }) => {
      throw this.errors.invalidColumnPropertyType('step', actual, expected);
    });
    const isNumber = type(step, Number);
    if (isNumber && !isNumericalValue(step)) throw this.errors.invalidNumericalValue('step');
    if (isNumber && step === 0) throw this.errors.illegalStepZeroValue();
    this.data.step = isNumber ? step : 1;
  }

  hasFixedDefined(fixed) {
    if (!this.data.ordinal) return this.disabled.set('fixed', true);
    args(arguments, [[Boolean, undefined]], ({ actual, expected }) => {
      throw this.errors.invalidColumnPropertyType('fixed', actual, expected);
    });
    this.data.fixed = type(fixed, Boolean) ? fixed : true;
  }

  hasSearchDefined(search) {
    args(arguments, [[Boolean, undefined]], ({ actual, expected }) => {
      throw this.errors.invalidColumnPropertyType('search', actual, expected);
    });
    this.data.search = Boolean(search);
  }

  hasSortableDefined(sortable) {
    if (this.data.ordinal && this.data.fixed) return this.disabled.set('sortable', true);
    args(arguments, [[Boolean, String, undefined]], ({ actual, expected }) => {
      throw this.errors.invalidColumnPropertyType('sortable', actual, expected);
    });
    const isString = type(sortable, String);
    if (isString && !this.sortableValues.some((value) => sortable === value)) throw this.errors.invalidSortableValue();
    this.data.sortable = isString ? sortable : sortable === true ? 'string' : sortable === false ? false : this.data.ordinal ? 'string' : 'number';
  }

  hasMatchDefined(match) {
    if (!this.data.search && !this.data.sortable) return this.disabled.set('match', true);
    args(arguments, [[Function, undefined]], ({ actual, expected }) => {
      throw this.errors.invalidColumnPropertyType('match', actual, expected);
    });
    this.data.match = type(match, Function) ? match : ({ textContent }) => textContent;
  }

  hasCaseSensitiveDefined(caseSensitive) {
    if (!this.data.search) return this.disabled.set('caseSensitive', true);
    args(arguments, [[Boolean, undefined]], ({ actual, expected }) => {
      throw this.errors.invalidColumnPropertyType('caseSensitive', actual, expected);
    });
    this.data.caseSensitive = Boolean(caseSensitive);
  }

  hasEditableDefined(editable) {
    args(arguments, [[Function, Boolean, undefined]], ({ actual, expected }) => {
      throw this.errors.invalidColumnPropertyType('editable', actual, expected);
    });
    this.data.editable = type(editable, Function) ? editable : Boolean(editable);
  }
}

function _public(_this) {
  class Column {
    constructor() {}
    get header() { }
    set header(value) { }
    get identifier() {}
    get values() { }
    get contents() { }
    get nodes() { }
    cell() { }
  }
  return new Column();
}