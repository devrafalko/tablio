import props from 'typeof-properties';
import args from 'typeof-arguments';
import type from 'of-type';
import joinArray from 'join-array';
import Style from './class-style';
import Column from './class-column';
import {isPositiveInteger} from './utils';

export default class Validator {
  constructor() {
    this.data = {};
    this.data.defaults = {};
  }
  validate(config, callback) {
    this.hasConfigPassed(config);
    this.validateConfig();
    this.addDefaultConfigValues();
    this.validateConfigStyle();
    this.validateConfigData();
    this.validateConfigPageRows();
    this.validateConfigPageTiles();
    this.validateConfigColumns();
    this.validateColumnProperties();
    callback(this.data.config);
  }

  get styleList() {
    return joinArray({
      array: Style.list,
      separator: ', ',
      last: ' or ',
      each: (value) => `"${value}"`
    });
  }

  get errors() {
    return {
      incorrectStyleValue: () => new Error(`The [String] config.style property must be: ${this.styleList}.`),
      invalidRecordType: (index) => new TypeError(`Invalid [${index}] record type. Each item of [Array] config.data must be of [Object] type.`),
      invalidPageRowsItem: (index) => new TypeError(`Invalid [${index}] row tile value. Each item of [Array] config.pageRows must be a [Number] positive integer.`),
      outOfRangePageRowsItem: (index) => new Error(`Invalid [${index}] row tile value. The maximal acceptable value of [Array] config.pageRows [Number] item is 5000.`),
      outOfLengthPageRows: () => new Error('The [Array] config.pageRows should contain at most 10 items.'),
      tilesPageTilesValue: () => new Error('The config.pageTiles property must be a [Number] positive integer value between 2 and 25.'),
      emptyColumnsArray: () => new Error('The [Array] config.columns should contain at least 1 item.'),
      invalidColumnType: (index) => new TypeError(`Invalid [${index}] column type. Each item of [Array] config.columns must be of [Object] type.`)
    };
  }

  get defaultConfigTypes() {
    return {
      style: [String, null, undefined],
      data: [Array, undefined],
      pageRows: [Array, null, undefined],
      pageTiles: [Number, undefined],
      header: [Boolean, undefined],
      columns: [Array],
      ready: [Function, undefined]
    };
  }

  get defaultConfigValues() {
    return {
      style: Style.defaultStyle,
      data: [],
      pageRows: {
        default: 0,
        set: [10, 25, 50, 150]
      },
      pageTiles: 5,
      header: true,
      ready: undefined
    };
  }

  hasConfigPassed(userConfig) {
    args(arguments, [[Object]]);
    this.data.userConfig = userConfig;
  }

  validateConfig() {
    props(this.data.userConfig, this.defaultConfigTypes);
  }

  addDefaultConfigValues() {
    const config = Object.assign({}, this.data.userConfig);
    const defaults = this.defaultConfigValues;
    for (let property in defaults) {
      if (config.hasOwnProperty(property)) continue;
      config[property] = defaults[property];
      this.data.defaults[property] = true;
    }
    this.data.config = config;
  }

  validateConfigStyle() {
    if (this.data.defaults['style'] || !type(this.data.config.style, String)) return;
    if (Style.list.some((style) => style === this.data.config.style)) return;
    throw this.errors.incorrectStyleValue();
  }

  validateConfigData() {
    if (this.data.defaults['data']) return;
    for (let i = 0; i < this.data.config.data.length; i++) {
      let record = this.data.config.data[i];
      if (!type(record, Object)) throw this.errors.invalidRecordType(i);
    }
  }

  validateConfigPageRows() {
    const rows = this.data.config.pageRows;
    const rowsMap = new Map();
    const rowsSet = [];

    if (this.data.defaults['pageRows'] || !type(rows, Array)) return;
    if (!rows.length) return this.data.config.pageRows = null;

    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      if (!isPositiveInteger(row)) throw this.errors.invalidPageRowsItem(i);
      if (row > 5000) throw this.errors.outOfRangePageRowsItem(i);
      rowsMap.set(row, i === 0);
    }
    if (rowsMap.size > 10) throw this.errors.outOfLengthPageRows();
    rowsMap.forEach((val, prop) => rowsSet.push(prop));
    rowsSet.sort((a, b) => a - b);
    this.data.config.pageRows = {
      default: rowsSet.indexOf(rows[0]),
      set: rowsSet
    };
  }

  validateConfigPageTiles() {
    if (this.data.defaults['pageTiles']) return;
    const tiles = this.data.config.pageTiles;
    if (!isPositiveInteger(tiles) || tiles > 25 || tiles < 2) throw this.errors.tilesPageTilesValue();
  }

  validateConfigColumns() {
    const columns = this.data.config.columns;
    if (!columns.length) throw this.errors.emptyColumnsArray();
    for (let i = 0; i < columns.length; i++) {
      let column = columns[i];
      if (!type(column, Object)) throw this.errors.invalidColumnType(i);
    }
  }

  validateColumnProperties() {
    const columns = this.data.config.columns;
    const columnCollection = [];
    for (let i = 0; i < columns.length; i++) {
      let column = columns[i];
      columnCollection.push(new Column({
        userData:column, 
        columnIndex:i, 
        columnCollection:columnCollection,
        headerDefined:this.data.config.header
      }));
    }
    this.data.config.columns = columnCollection;
  }
}