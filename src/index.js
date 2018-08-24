import Columns from './class-columns';
import Rows from './class-row';
import Row from './class-row';
import Cell from './class-cell';
import Validator from './class-config-validation';
import Elements from './class-elements';

module.exports = class Tablio {
  constructor(config) {
    this.data = {};
    this.validator = new Validator();
    this.elements = new Elements();
    this.instances = {
      columns: new Columns(),
      rows: new Rows(),
      row: new Row(),
      cell: new Cell(),
    };
    return _public(this,arguments);
  }

  get methods() {
    return Object.defineProperties({}, {
      column: {
        value: this.column.bind(this)
      },
      row: {
        value: this.row.bind(this)
      },
      cell: {
        value: this.cell.bind(this)
      },
      columns: {
        get: () => this.columns
      },
      rows: {
        get: () => this.rows
      }
    });
  }

  get columns() {
    this.render(this.instances.columns);
    return this.instances.columns;
  }

  get rows() {
    this.render(this.instances.rows);
    return this.instances.rows;
  }

  init(userConfig) {
    this.validator.validate(userConfig, (finalConfig) => this.data.config = finalConfig);
  }

  row(RowIndicator) {
    this.render(this.instances.row);
    return this.instances.row;
  }

  cell(ColumnIndicator, RowIndicator) {
    this.render(this.instances.cell);
    return this.instances.cell;
  }

  controlCollection() {}
  render(instance) {}
  column(ColumnIndicator) {}

};

function _public(_this, _arguments){
  class Tablio {
    constructor(config) {
      _this.init(config);
      this.dom = _this.elements;
      this.control = _this.controlCollection();
    }
    get data() {
      _this.scope = 'data';
      return _this.methods;
    }
    get table() {
      _this.scope = 'table';
      return _this.methods;
    }
    get page() {
      _this.scope = 'page';
      return _this.methods;
    }
  }
  return new Tablio(..._arguments);
}