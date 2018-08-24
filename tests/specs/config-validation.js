/*global describe, beforeAll, it, expect */

beforeAll(function () {
  this.argumentErrorMessage = (index, actual, expected) => `Invalid argument [${index}]. The [${actual}] argument has been passed, while the argument of type [${expected}] is expected.`;
  this.propertyErrorMessage = (property, actual, expected) => `Invalid property ["${property}"]. The [${actual}] value has been assigned, while the value of type [${expected}] is expected.`;
  this.columnPropertyError = (index, property, actual, expected) => `Invalid config.columns[${index}]["${property}"] property type. The [${actual}] value has been assigned, while the value of type [${expected}] is expected.`;
});

describe('When the new [Tablio] instance is created', function () {
  describe('without any argument passed', function () {
    it('the error should be thrown, that the [Object] config argument is expected.', function () {
      expect(() => new this.Tablio()).toThrowError();
    });
  });
  describe('with the argument passed but of incorrect type', function () {
    it('the error should be thrown, that the [Object] config argument is expected.', function () {
      this.loop({
        except: ['object'],
        callback: (value, type) => {
          expect(() => new this.Tablio(value)).toThrowError(TypeError, this.argumentErrorMessage(0, type, 'Object'));
        }
      });
    });
  });
  describe('with the correct [Object] type config argument passed', function () {
    describe('but empty', function () {
      it('the error should be thrown, that the [Array] ["columns"] property must be defined.', function () {
        expect(() => new this.Tablio({})).toThrowError(TypeError, this.propertyErrorMessage('columns', 'undefined', 'Array'));
      });
    });
    describe('with the ["columns"] property', function () {
      describe('not defined', function () {
        it('the error should be thrown, that the [Array] ["columns"] property must be defined.', function () {
          let config = {
            style: 'tablio-modern',
            header: true
          };
          expect(() => new this.Tablio(config)).toThrowError(TypeError, this.propertyErrorMessage('columns', 'undefined', 'Array'));
        });
      });
      describe('defined, but of incorrect type', function () {
        it('the error should be thrown, that the [Array] ["columns"] property must be defined.', function () {
          this.loop({
            except: ['array'],
            callback: (value, type) => {
              expect(() => new this.Tablio({ columns: value })).toThrowError(TypeError, this.propertyErrorMessage('columns', type, 'Array'));
            }
          });
        });
      });
      describe('defined with correct [Array] type', function () {
        describe('but empty', function () {
          it('the error should be thrown, that the [Array] config.columns should contain at least 1 item.', function () {
            expect(() => new this.Tablio({ columns: [] })).toThrowError(Error, 'The [Array] config.columns should contain at least 1 item.');
          });
        });
        describe('with some items but at least one of incorrect type', function () {
          it('the error should be thrown, that each item of [Array] config.columns must be of [Object] type.', function () {
            this.loop({
              except: ['object'],
              callback: (value) => {
                let config = { columns: [{}, {}, value, {}] };
                expect(() => new this.Tablio(config)).toThrowError(Error, 'Invalid [2] column type. Each item of [Array] config.columns must be of [Object] type.');
              }
            });
          });
        });
        describe('with all items of correct [Object] type', function () {
          describe('but empty', function () {
            it('the error should be thrown, that the [String] ["id"] property must be defined.', function () {
              let config = { columns: [{}, {}, {}, {}] };
              expect(() => new this.Tablio(config)).toThrowError(Error, 'Invalid config.columns[0]["id"] property type. The [undefined] value has been assigned, while the value of type [String] is expected.');
            });
          });
          describe('but without ["id"] property defined', function () {
            it('the error should be thrown, that the [String] ["id"] property must be defined.', function () {
              let config = { columns: [{ name: 'income', search: true }] };
              expect(() => new this.Tablio(config)).toThrowError(Error, 'Invalid config.columns[0]["id"] property type. The [undefined] value has been assigned, while the value of type [String] is expected.');
            });
          });
          describe('and with [String]["id"] property defined', function () {
            it('none error should be thrown.', function () {
              let config = {
                columns: [
                  { id: 'names' },
                  { id: 'age' },
                  { id: 'income' }
                ]
              };
              expect(() => new this.Tablio(config)).not.toThrowError();
            });
          });
        });
      });
    });
    describe('with the ["style"] property', function () {
      describe('not defined', function () {
        it('none error should be thrown.', function () {
          let config = {
            header: true,
            data: [],
            columns: [{ id: 'names' }]
          };
          expect(() => new this.Tablio(config)).not.toThrowError();
        });
      });
      describe('defined, but of incorrect type', function () {
        it('the error should be thrown, that the ["style"] property must be of [String|null|undefined] type.', function () {
          this.loop({
            except: ['string', 'null', 'undefined'],
            callback: (value, type) => {
              let config = {
                style: value,
                columns: [{ id: 'names' }]
              };
              expect(() => new this.Tablio(config)).toThrowError(TypeError, this.propertyErrorMessage('style', type, 'String|null|undefined'));
            }
          });
        });
      });
      describe('defined with correct [null] type', function () {
        it('none error should be thrown.', function () {
          let config = {
            style: null,
            columns: [{ id: 'names' }]
          };
          expect(() => new this.Tablio(config)).not.toThrowError();
        });
      });
      describe('defined with correct [String] type', function () {
        describe('but with the value other than one of the default tablio styles', function () {
          it('the error should be thrown, that the [String] ["style"] property must be one of the default tablio styles values.', function () {
            let config = {
              style: 'some-value',
              columns: [{ id: 'names' }]
            };
            expect(() => new this.Tablio(config)).toThrowError(Error, 'The [String] config.style property must be: "tablio-modern", "tablio-minimal", "tablio-stripes" or "tablio-classic".');
          });
        });
        describe('and with the one of the default tablio styles values', function () {
          it('none error should be thrown.', function () {
            this.loop({
              values: ['tablio-modern', 'tablio-minimal', 'tablio-stripes', 'tablio-classic'],
              callback: (value) => {
                let config = {
                  style: value,
                  columns: [{ id: 'names' }]
                };
                expect(() => new this.Tablio(config)).not.toThrowError();
              }
            });
          });
        });
      });
    });
    describe('with the ["data"] property', function () {
      describe('not defined', function () {
        it('none error should be thrown.', function () {
          let config = { columns: [{ id: 'names' }] };
          expect(() => new this.Tablio(config)).not.toThrowError();
        });
      });
      describe('defined, but of incorrect type', function () {
        it('the error should be thrown, that the ["data"] property must be of [Array|undefined] type.', function () {
          this.loop({
            except: ['array', 'undefined'],
            callback: (value, type) => {
              let config = {
                data: value,
                columns: [{ id: 'names' }]
              };
              expect(() => new this.Tablio(config)).toThrowError(TypeError, this.propertyErrorMessage('data', type, 'Array|undefined'));
            }
          });
        });
      });
      describe('defined with correct [Array] type', function () {
        describe('but empty', function () {
          it('none error should be thrown.', function () {
            let config = {
              data: [],
              columns: [{ id: 'names' }]
            };
            expect(() => new this.Tablio(config)).not.toThrowError();
          });
        });
        describe('with some items but at least one of incorrect type', function () {
          it('the error should be thrown, that each item of [Array] config.data must be of [Object] type.', function () {
            this.loop({
              except: ['object'],
              callback: (value) => {
                let config = {
                  data: [{}, {}, {}, value, {}],
                  columns: [{ id: 'names' }]
                };
                expect(() => new this.Tablio(config)).toThrowError(TypeError, 'Invalid [3] record type. Each item of [Array] config.data must be of [Object] type.');
              }
            });
          });
        });
        describe('with all items of correct [Object] type', function () {
          describe('but empty', function () {
            it('none error should be thrown.', function () {
              let config = {
                data: [{}, {}, {}, {}],
                columns: [{ id: 'names' }]
              };
              expect(() => new this.Tablio(config)).not.toThrowError();
            });
          });
          describe('but with some properties defined with other than [String], [Number], [Boolean] or [HTMLElement] value', function () {
            it('none error should be thrown.', function () {
              this.loop({
                except: ['object'],
                callback: (value) => {
                  let config = {
                    data: [{ name: value }],
                    columns: [{ id: 'names' }]
                  };
                  expect(() => new this.Tablio(config)).not.toThrowError();
                }
              });
            });
          });
        });
      });
    });
    describe('with the ["pageRows"] property', function () {
      describe('not defined', function () {
        it('none error should be thrown.', function () {
          let config = { columns: [{ id: 'names' }] };
          expect(() => new this.Tablio(config)).not.toThrowError();
        });
      });
      describe('defined, but of incorrect type', function () {
        it('the error should be thrown, that the ["pageRows"] property must be of [Array|null|undefined] type.', function () {
          this.loop({
            except: ['array', 'null', 'undefined'],
            callback: (value, type) => {
              let config = {
                pageRows: value,
                columns: [{ id: 'names' }]
              };
              expect(() => new this.Tablio(config)).toThrowError(TypeError, this.propertyErrorMessage('pageRows', type, 'Array|null|undefined'));
            }
          });
        });
      });
      describe('defined with correct [null] type', function () {
        it('none error should be thrown.', function () {
          let config = {
            pageRows: null,
            columns: [{ id: 'names' }]
          };
          expect(() => new this.Tablio(config)).not.toThrowError();
        });
      });
      describe('defined with correct [Array] type', function () {
        describe('but empty', function () {
          it('none error should be thrown.', function () {
            let config = {
              pageRows: [],
              columns: [{ id: 'names' }]
            };
            expect(() => new this.Tablio(config)).not.toThrowError();
          });
        });
        describe('with some items but at least one of incorrect type', function () {
          it('the error should be thrown, that each item of [Array] config.pageRows must be a [Number] positive integer.', function () {
            this.loop({
              except: ['integer'],
              callback: (value) => {
                let config = {
                  pageRows: [5, 25, value, 100],
                  columns: [{ id: 'names' }]
                };
                expect(() => new this.Tablio(config)).toThrowError(TypeError, 'Invalid [2] row tile value. Each item of [Array] config.pageRows must be a [Number] positive integer.');
              }
            });
          });
        });
        describe('with all [Number] values', function () {
          describe('but with some negative values, decimals, NaN, Infinity or -Inifinity', function () {
            it('the error should be thrown, that each item of [Array] config.pageRows must be a [Number] positive integer.', function () {
              this.loop({
                only: ['-integer', 'decimal', '-decimal', 'NaN', 'infinity', '-infinity'],
                callback: (value) => {
                  let config = {
                    pageRows: [5, 25, value, 100],
                    columns: [{ id: 'names' }]
                  };
                  expect(() => new this.Tablio(config)).toThrowError(TypeError, 'Invalid [2] row tile value. Each item of [Array] config.pageRows must be a [Number] positive integer.');
                }
              });
            });
          });
          describe('but with some repeated values', function () {
            it('none error should be thrown.', function () {
              let config = {
                pageRows: [5, 5, 5, 5],
                columns: [{ id: 'names' }]
              };
              expect(() => new this.Tablio(config)).not.toThrowError();
            });
          });
          describe('but with some values bigger than 5000', function () {
            it('the error should be thrown, that the maximal acceptable value is 5000.', function () {
              let config = {
                pageRows: [5, 25, 50, 100, 5001],
                columns: [{ id: 'names' }]
              };
              expect(() => new this.Tablio(config)).toThrowError(Error, 'Invalid [4] row tile value. The maximal acceptable value of [Array] config.pageRows [Number] item is 5000.');
            });
          });
          describe('but have more than 10 different values', function () {
            it('the error should be thrown, that [Array] config.pageRows should contain at most 10 items.', function () {
              let config = {
                pageRows: [5, 10, 15, 25, 50, 100, 150, 200, 300, 400, 500, 1000, 2000, 3000, 4000],
                columns: [{ id: 'names' }]
              };
              expect(() => new this.Tablio(config)).toThrowError(Error, 'The [Array] config.pageRows should contain at most 10 items.');
            });
          });
          describe('but have more than 10 all values (and eventually more than 10 different values)', function () {
            it('the error should be thrown, that [Array] config.pageRows should contain at most 10 items.', function () {
              let config = {
                pageRows: [5, 5, 10, 10, 15, 15, 25, 25, 50, 50, 100, 100, 150, 200, 300, 400, 500, 1000, 2000, 3000, 4000],
                columns: [{ id: 'names' }]
              };
              expect(() => new this.Tablio(config)).toThrowError(Error, 'The [Array] config.pageRows should contain at most 10 items.');
            });
          });
          describe('but have more than 10 all values (but eventually less than 10 different values)', function () {
            it('none error should be thrown.', function () {
              let config = {
                pageRows: [5, 5, 10, 5, 10, 10, 25, 5, 25, 10, 50, 10, 50, 50, 100, 50, 100, 5, 10, 25, 100],
                columns: [{ id: 'names' }]
              };
              expect(() => new this.Tablio(config)).not.toThrowError();
            });
          });
        });
      });
    });
    describe('with the ["pageTiles"] property', function () {
      describe('not defined', function () {
        it('none error should be thrown.', function () {
          let config = {
            columns: [{ id: 'names' }]
          };
          expect(() => new this.Tablio(config)).not.toThrowError();
        });
      });
      describe('defined, but of incorrect type', function () {
        it('the error should be thrown, that the ["pageTiles"] property must be of [Number|undefined] type.', function () {
          this.loop({
            except: ['integer', '-integer', 'decimal', '-decimal', 'NaN', 'infinity', '-infinity', 'undefined'],
            callback: (value, type) => {
              let config = {
                pageTiles: value,
                columns: [{ id: 'names' }]
              };
              expect(() => new this.Tablio(config)).toThrowError(TypeError, this.propertyErrorMessage('pageTiles', type, 'Number|undefined'));
            }
          });
        });
      });
      describe('defined with correct [Number] type', function () {
        describe('but as the negative value, decimal, NaN, Infinity or -Inifinity', function () {
          it('the error should be thrown, that the config.pageTiles must be a [Number] positive integer.', function () {
            this.loop({
              only: ['-integer', 'decimal', '-decimal', 'NaN', 'infinity', '-infinity'],
              callback: (value) => {
                let config = {
                  pageTiles: value,
                  columns: [{ id: 'names' }]
                };
                expect(() => new this.Tablio(config)).toThrowError(Error, 'The config.pageTiles property must be a [Number] positive integer value between 2 and 25.');
              }
            });
          });
        });
        describe('but bigger than 25', function () {
          it('the error should be thrown, that the config.pageTiles must be a value between 2 and 25.', function () {
            this.loop({
              values: [26.1, 26.5, 27, 50, 100, 500, Infinity],
              callback: (value) => {
                let config = {
                  pageTiles: value,
                  columns: [{ id: 'names' }]
                };
                expect(() => new this.Tablio(config)).toThrowError(Error, 'The config.pageTiles property must be a [Number] positive integer value between 2 and 25.');
              }
            });
          });
        });
        describe('but lower than 2', function () {
          it('the error should be thrown, that the config.pageTiles must be a value between 2 and 25.', function () {
            this.loop({
              values: [-Infinity, -500, -100.25, -1, 0, 1, 1.99],
              callback: (value) => {
                let config = {
                  pageTiles: value,
                  columns: [{ id: 'names' }]
                };
                expect(() => new this.Tablio(config)).toThrowError(Error, 'The config.pageTiles property must be a [Number] positive integer value between 2 and 25.');
              }
            });
          });
        });
        describe('and between 2 and 25', function () {
          it('none error should be thrown.', function () {
            this.loop({
              values: [2, 3, 4, 10, 20, 25],
              callback: (value) => {
                let config = {
                  pageTiles: value,
                  columns: [{ id: 'names' }]
                };
                expect(() => new this.Tablio(config)).not.toThrowError();
              }
            });
          });
        });
      });
    });
    describe('with the ["header"] property', function () {
      describe('not defined', function () {
        it('none error should be thrown.', function () {
          let config = {
            columns: [{ id: 'names' }]
          };
          expect(() => new this.Tablio(config)).not.toThrowError();
        });
      });
      describe('defined, but of incorrect type', function () {
        it('the error should be thrown, that the ["header"] property must be of [Boolean|undefined] type.', function () {
          this.loop({
            except: ['boolean', 'undefined'],
            callback: (value, type) => {
              let config = {
                header: value,
                columns: [{ id: 'names' }]
              };
              expect(() => new this.Tablio(config)).toThrowError(TypeError, this.propertyErrorMessage('header', type, 'Boolean|undefined'));
            }
          });
        });
      });
      describe('defined with correct [Boolean] type', function () {
        it('none error should be thrown.', function () {
          this.loop({
            values: [true, false],
            callback: (value) => {
              let config = {
                header: value,
                columns: [{ id: 'names' }]
              };
              expect(() => new this.Tablio(config)).not.toThrowError();
            }
          });
        });
      });
    });
    describe('with the ["ready"] property', function () {
      describe('not defined', function () {
        it('none error should be thrown.', function () {
          let config = {
            columns: [{ id: 'names' }]
          };
          expect(() => new this.Tablio(config)).not.toThrowError();
        });
      });
      describe('defined, but of incorrect type', function () {
        it('the error should be thrown, that the ["ready"] property must be of [Function|undefined] type.', function () {
          this.loop({
            except: ['function', 'undefined'],
            callback: (value, type) => {
              let config = {
                ready: value,
                columns: [{ id: 'names' }]
              };
              expect(() => new this.Tablio(config)).toThrowError(TypeError, this.propertyErrorMessage('ready', type, 'Function|undefined'));
            }
          });
        });
      });
      describe('defined with correct [Function] type', function () {
        it('none error should be thrown.', function () {
          let config = {
            ready: () => { },
            columns: [{ id: 'names' }]
          };
          expect(() => new this.Tablio(config)).not.toThrowError();
        });
      });
    });
  });
});

describe('When the new [Tablio] instance is created with the [Array] config.columns property defined, that contains the [Object] column item', function () {
  describe('that has ["id"] property', function () {
    describe('not defined', function () {
      it('the error should be thrown for this item, that the [String] ["id"] property must be defined.', function () {
        let config = {
          columns: [{ id: 'names' }, {}, { id: 'income' }]
        };
        expect(() => new this.Tablio(config)).toThrowError(TypeError, this.columnPropertyError(1, 'id', 'undefined', 'String'));
      });
    });
    describe('defined, but of incorrect type', function () {
      it('the error should be thrown for this item, that the [String] property is required.', function () {
        this.loop({
          except: ['string'],
          callback: (value, type) => {
            let config = {
              columns: [{ id: 'names' }, { id: 'income' }, { id: value }]
            };
            expect(() => new this.Tablio(config)).toThrowError(TypeError, this.columnPropertyError(2, 'id', type, 'String'));
          }
        });
      });
    });
    describe('defined with correct [String] type', function () {
      describe('but while another column item has the ["id"] property defined with the same value', function () {
        it('the error should be thrown, that the ["id"] property must be unique.', function () {
          let configA = {
            columns: [{ id: 'names' }, { id: 'income' }, { id: 'names' }]
          };
          let configB = {
            columns: [{ id: 'names' }, { id: 'income' }, { id: 'age' }, { id: 'income' }]
          };
          expect(() => new this.Tablio(configA)).toThrowError(Error, 'Invalid config.columns[2]["id"] property value. The identifier "names" has already been used in the config.columns[0] item.');
          expect(() => new this.Tablio(configB)).toThrowError(Error, 'Invalid config.columns[3]["id"] property value. The identifier "income" has already been used in the config.columns[1] item.');
        });
      });
      describe('but empty value', function () {
        it('the error should be thrown, that the ["id"] property cannot be empty value.', function () {
          let config = {
            columns: [{ id: 'names' }, { id: '' }]
          };
          expect(() => new this.Tablio(config)).toThrowError(Error, 'Invalid config.columns[1]["id"] property value. The identifier cannot be an empty [String] value.');
        });
      });
      describe('that is unique', function () {
        it('none error should be thrown.', function () {
          let config = {
            columns: [{ id: 'names' }, { id: 'income' }, { id: 'age' }]
          };
          expect(() => new this.Tablio(config)).not.toThrowError();
        });
      });
    });
  });
  describe('that has ["ordinal"] property', function () {
    describe('not defined', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [{ id: 'names' }]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
    describe('defined, but of incorrect type', function () {
      it('the error should be thrown, that the ["ordinal"] property must be of [Boolean|undefined] type.', function () {
        this.loop({
          except: ['boolean', 'undefined'],
          callback: (value, type) => {
            let config = {
              columns: [{ id: 'names', ordinal: value }]
            };
            expect(() => new this.Tablio(config)).toThrowError(TypeError, this.columnPropertyError(0, 'ordinal', type, 'Boolean|undefined'));
          }
        });
      });
    });
    describe('defined with correct [Boolean] type', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [
            { id: 'names', ordinal: true },
            { id: 'income', ordinal: false }
          ]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
  });
  describe('that has ["name"] property', function () {
    describe('not defined', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [
            { id: 'names' },
            { id: 'income' }
          ]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
    describe('defined, but of incorrect type', function () {
      describe('when the ["ordinal"] is set to true', function () {
        it('none error should be thrown.', function () {
          this.loop({
            except: ['string', 'undefined'],
            callback: (value) => {
              let config = {
                columns: [{ id: 'names', ordinal: true, name: value }]
              };
              expect(() => new this.Tablio(config)).not.toThrowError();
            }
          });
        });
      });
      describe('when the ["ordinal"] is set to false', function () {
        it('the error should be thrown, that the ["name"] property must be of [String|undefined] type.', function () {
          this.loop({
            except: ['string', 'undefined'],
            callback: (value, type) => {
              let configA = {
                columns: [{ id: 'names', ordinal: false, name: value }]
              };
              let configB = {
                columns: [{ id: 'names', name: value }]
              };
              expect(() => new this.Tablio(configA)).toThrowError(TypeError, this.columnPropertyError(0, 'name', type, 'String|undefined'));
              expect(() => new this.Tablio(configB)).toThrowError(TypeError, this.columnPropertyError(0, 'name', type, 'String|undefined'));
            }
          });
        });
      });
    });
    describe('defined with correct [String] type', function () {
      describe('but empty value', function () {
        it('none error should be thrown.', function () {
          let config = {
            columns: [{ id: 'names', name: '' }]
          };
          expect(() => new this.Tablio(config)).not.toThrowError();
        });
      });
      describe('but while another column item has the ["name"] property defined with the same value', function () {
        it('none error should be thrown.', function () {
          let config = {
            columns: [
              { id: 'names', name: 'names' },
              { id: 'income', name: 'income' },
            ]
          };
          expect(() => new this.Tablio(config)).not.toThrowError();
        });
      });
    });
  });
  describe('that has ["content"] property', function () {
    describe('not defined', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [
            { id: 'names' },
          ]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
    describe('defined, but of incorrect type', function () {
      it('the error should be thrown, that the ["content"] property must be of [Function|String|HTMLElement|undefined] type.', function () {
        this.loop({
          except: ['function', 'string', 'div', 'undefined'],
          callback: (value, type) => {
            let config = {
              columns: [{ id: 'names', content: value }]
            };
            expect(() => new this.Tablio(config)).toThrowError(TypeError, this.columnPropertyError(0, 'content', type, 'Function|String|HTMLElement|undefined'));
          }
        });
      });
    });
    describe('defined with correct [Function] type', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [{ id: 'names', content: () => { } }]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
    describe('defined with correct [String] type', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [{ id: 'names', content: 'names' }]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
    describe('defined with correct [HTMLElement] type', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [
            { id: 'names', content: document.createElement('DIV') },
            { id: 'age', content: document.createElement('INPUT') },
            { id: 'income', content: document.createElement('SPAN') },
          ]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
  });
  describe('that has ["header"] property', function () {
    describe('not defined', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [{ id: 'names' }]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
    describe('defined, but of incorrect type', function () {
      describe('when the config.header is set to true', function () {
        it('the error should be thrown, that the ["header"] property must be of [String|undefined] type.', function () {
          this.loop({
            except: ['string', 'undefined'],
            callback: (value, type) => {
              let configA = {
                header: true,
                columns: [{ id: 'names', header: value }]
              };
              let configB = {
                columns: [{ id: 'names', header: value }]
              };
              expect(() => new this.Tablio(configA)).toThrowError(TypeError, this.columnPropertyError(0, 'header', type, 'String|undefined'));
              expect(() => new this.Tablio(configB)).toThrowError(TypeError, this.columnPropertyError(0, 'header', type, 'String|undefined'));
            }
          });
        });
      });
      describe('when the config.header is set to false', function () {
        it('none error should be thrown.', function () {
          this.loop({
            except: ['string', 'undefined'],
            callback: (value) => {
              let config = {
                header: false,
                columns: [{ id: 'names', header: value }]
              };
              expect(() => new this.Tablio(config)).not.toThrowError();
            }
          });
        });
      });
    });
    describe('defined with correct [String] type', function () {
      describe('but while another column item has the ["header"] property defined with the same value', function () {
        it('none error should be thrown.', function () {
          let config = {
            header: true,
            columns: [
              { id: 'names', header: 'names' },
              { id: 'income', header: 'names' }
            ]
          };
          expect(() => new this.Tablio(config)).not.toThrowError();
        });
      });
      describe('but empty value', function () {
        it('none error should be thrown.', function () {
          let config = {
            header: true,
            columns: [{ id: 'names', header: '' }]
          };
          expect(() => new this.Tablio(config)).not.toThrowError();

        });
      });
      describe('that is unique', function () {
        it('none error should be thrown.', function () {
          let config = {
            header: true,
            columns: [
              { id: 'names', header: 'names' },
              { id: 'income', header: 'income' }
            ]
          };
          expect(() => new this.Tablio(config)).not.toThrowError();
        });
      });
    });
  });
  describe('that has ["start"] property', function () {
    describe('not defined', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [{ id: 'names' }]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
    describe('defined, but of incorrect type', function () {
      describe('when the ["ordinal"] is set to true', function () {
        it('the error should be thrown, that the ["start"] property must be of [Number|undefined] type.', function () {
          this.loop({
            except: ['integer', '-integer', 'decimal', '-decimal', 'NaN', 'infinity', '-infinity', 'undefined'],
            callback: (value, type) => {
              let config = {
                columns: [{ id: 'names', ordinal: true, start: value }]
              };
              expect(() => new this.Tablio(config)).toThrowError(TypeError, this.columnPropertyError(0, 'start', type, 'Number|undefined'));
            }
          });
        });
      });
      describe('when the ["ordinal"] is set to false', function () {
        it('none error should be thrown.', function () {
          this.loop({
            except: ['integer', '-integer', 'decimal', '-decimal', 'NaN', 'infinity', '-infinity', 'undefined'],
            callback: (value) => {
              let configA = {
                columns: [{ id: 'names', ordinal: false, start: value }]
              };
              let configB = {
                columns: [{ id: 'names', start: value }]
              };
              expect(() => new this.Tablio(configA)).not.toThrowError();
              expect(() => new this.Tablio(configB)).not.toThrowError();
            }
          });
        });
      });
    });
    describe('defined with correct [Number] type', function () {
      describe('but with some  NaN, Infinity or -Inifinity', function () {
        describe('when the ["ordinal"] is set to true', function () {
          it('the error should be thrown, that the column ["start"] property must be a numerical value.', function () {
            this.loop({
              only: ['NaN', 'infinity', '-infinity'],
              callback: (value) => {
                let config = {
                  columns: [{ id: 'names', ordinal: true, start: value }]
                };
                expect(() => new this.Tablio(config)).toThrowError(Error, 'Invalid config.columns[0]["start"] property value. It must be a numerical value, other than Infinity, -Infinity and NaN.');
              }
            });
          });
        });
        describe('when the ["ordinal"] is set to false', function () {
          it('none error should be thrown.', function () {
            this.loop({
              only: ['NaN', 'infinity', '-infinity'],
              callback: (value) => {
                let configA = {
                  columns: [{ id: 'names', ordinal: false, start: value }]
                };
                let configB = {
                  columns: [{ id: 'names', start: value }]
                };
                expect(() => new this.Tablio(configA)).not.toThrowError();
                expect(() => new this.Tablio(configB)).not.toThrowError();
              }
            });
          });
        });
      });
      describe('with some negative value', function () {
        it('none error should be thrown.', function () {
          this.loop({
            values: [-100, -50, -5, -5.5, -1],
            callback: (value) => {
              let config = {
                columns: [{ id: 'names', ordinal: true, start: value }]
              };
              expect(() => new this.Tablio(config)).not.toThrowError();
            }
          });
        });
      });
      describe('with some decimal', function () {
        it('none error should be thrown.', function () {
          this.loop({
            values: [-34.56, -1.5, -.5, -5e-5, .33, 1.5, 100.55],
            callback: (value) => {
              let config = {
                columns: [{ id: 'names', ordinal: true, start: value }]
              };
              expect(() => new this.Tablio(config)).not.toThrowError();
            }
          });
        });
      });
      describe('with some integer', function () {
        it('none error should be thrown.', function () {
          this.loop({
            values: [-100, -33, -2, 1, 5, 55, 100],
            callback: (value) => {
              let config = {
                columns: [{ id: 'names', ordinal: true, start: value }]
              };
              expect(() => new this.Tablio(config)).not.toThrowError();
            }
          });
        });
      });
    });
  });
  describe('that has ["step"] property', function () {
    describe('not defined', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [{ id: 'names' }]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
    describe('defined, but of incorrect type', function () {
      describe('when the ["ordinal"] is set to true', function () {
        it('the error should be thrown, that the ["step"] property must be of [Number|undefined] type.', function () {
          this.loop({
            except: ['integer', '-integer', 'decimal', '-decimal', 'NaN', 'infinity', '-infinity', 'undefined'],
            callback: (value, type) => {
              let config = {
                columns: [{ id: 'names', ordinal: true, step: value }]
              };
              expect(() => new this.Tablio(config)).toThrowError(TypeError, this.columnPropertyError(0, 'step', type, 'Number|undefined'));
            }
          });
        });
      });
      describe('when the ["ordinal"] is set to false', function () {
        it('none error should be thrown.', function () {
          this.loop({
            except: ['integer', '-integer', 'decimal', '-decimal', 'NaN', 'infinity', '-infinity', 'undefined'],
            callback: (value) => {
              let configA = {
                columns: [{ id: 'names', ordinal: false, step: value }]
              };
              let configB = {
                columns: [{ id: 'names', step: value }]
              };
              expect(() => new this.Tablio(configA)).not.toThrowError();
              expect(() => new this.Tablio(configB)).not.toThrowError();
            }
          });
        });
      });
    });
    describe('defined with correct [Number] type', function () {
      describe('but equal to 0', function () {
        describe('when the ["ordinal"] is set to true', function () {
          it('the error should be thrown, that the column ["start"] property cannot be equal to 0.', function () {
            let config = {
              columns: [{ id: 'names', ordinal: true, step: 0 }]
            };
            expect(() => new this.Tablio(config)).toThrowError(Error, 'Invalid config.columns[0]["step"] property value. It cannot be equal to 0.');
          });
        });
        describe('when the ["ordinal"] is set to false', function () {
          it('none error should be thrown.', function () {
            let configA = {
              columns: [{ id: 'names', ordinal: false, step: 0 }]
            };
            let configB = {
              columns: [{ id: 'names', step: 0 }]
            };
            expect(() => new this.Tablio(configA)).not.toThrowError();
            expect(() => new this.Tablio(configB)).not.toThrowError();
          });
        });
      });
      describe('but with some  NaN, Infinity or -Inifinity', function () {
        describe('when the ["ordinal"] is set to true', function () {
          it('the error should be thrown, that the column ["step"] property must be a numerical value.', function () {
            this.loop({
              only: ['NaN', 'infinity', '-infinity'],
              callback: (value) => {
                let config = {
                  columns: [{ id: 'names', ordinal: true, step: value }]
                };
                expect(() => new this.Tablio(config)).toThrowError(Error, 'Invalid config.columns[0]["step"] property value. It must be a numerical value, other than Infinity, -Infinity and NaN.');
              }
            });
          });
        });
        describe('when the ["ordinal"] is set to false', function () {
          it('none error should be thrown.', function () {
            this.loop({
              only: ['NaN', 'infinity', '-infinity'],
              callback: (value) => {
                let configA = {
                  columns: [{ id: 'names', ordinal: false, step: value }]
                };
                let configB = {
                  columns: [{ id: 'names', step: value }]
                };
                expect(() => new this.Tablio(configA)).not.toThrowError();
                expect(() => new this.Tablio(configB)).not.toThrowError();
              }
            });
          });
        });
      });
      describe('with some negative value', function () {
        it('none error should be thrown.', function () {
          this.loop({
            values: [-100, -50, -5, -5.5, -1],
            callback: (value) => {
              let config = {
                columns: [{ id: 'names', ordinal: true, step: value }]
              };
              expect(() => new this.Tablio(config)).not.toThrowError();
            }
          });
        });
      });
      describe('with some decimal', function () {
        it('none error should be thrown.', function () {
          this.loop({
            values: [-34.56, -1.5, -.5, -5e-5, .33, 1.5, 100.55],
            callback: (value) => {
              let config = {
                columns: [{ id: 'names', ordinal: true, step: value }]
              };
              expect(() => new this.Tablio(config)).not.toThrowError();
            }
          });
        });
      });
      describe('with some integer', function () {
        it('none error should be thrown.', function () {
          this.loop({
            values: [-100, -33, -2, 1, 5, 55, 100],
            callback: (value) => {
              let config = {
                columns: [{ id: 'names', ordinal: true, step: value }]
              };
              expect(() => new this.Tablio(config)).not.toThrowError();
            }
          });
        });
      });
    });
  });
  describe('that has ["fixed"] property', function () {
    describe('not defined', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [{ id: 'names' }]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
    describe('defined, but of incorrect type', function () {
      describe('when the ["ordinal"] is set to true', function () {
        it('the error should be thrown, that the ["fixed"] property must be of [Boolean|undefined] type.', function () {
          this.loop({
            except: ['boolean', 'undefined'],
            callback: (value, type) => {
              let config = {
                columns: [{ id: 'names', ordinal: true, fixed: value }]
              };
              expect(() => new this.Tablio(config)).toThrowError(TypeError, this.columnPropertyError(0, 'fixed', type, 'Boolean|undefined'));
            }
          });
        });
      });
      describe('when the ["ordinal"] is set to false', function () {
        it('none error should be thrown.', function () {
          this.loop({
            except: ['boolean', 'undefined'],
            callback: (value) => {
              let configA = {
                columns: [{ id: 'names', ordinal: false, fixed: value }]
              };
              let configB = {
                columns: [{ id: 'names', fixed: value }]
              };
              expect(() => new this.Tablio(configA)).not.toThrowError();
              expect(() => new this.Tablio(configB)).not.toThrowError();
            }
          });
        });
      });
    });
    describe('defined with correct [Boolean] type', function () {
      it('none error should be thrown.', function () {
        this.loop({
          values: [true, false],
          callback: (value) => {
            let config = {
              columns: [{ id: 'names', ordinal: true, fixed: value }]
            };
            expect(() => new this.Tablio(config)).not.toThrowError();
          }
        });
      });
    });
  });
  describe('that has ["search"] property', function () {
    describe('not defined', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [{ id: 'names' }]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
    describe('defined, but of incorrect type', function () {
      it('the error should be thrown, that the ["search"] property must be of [Boolean|undefined] type.', function () {
        this.loop({
          except: ['boolean', 'undefined'],
          callback: (value, type) => {
            let config = {
              columns: [{ id: 'names', search: value }]
            };
            expect(() => new this.Tablio(config)).toThrowError(TypeError, this.columnPropertyError(0, 'search', type, 'Boolean|undefined'));
          }
        });
      });
    });
    describe('defined with correct [Boolean] type', function () {
      it('none error should be thrown.', function () {
        this.loop({
          values: [true, false],
          callback: (value) => {
            let config = {
              columns: [{ id: 'names', search: value }]
            };
            expect(() => new this.Tablio(config)).not.toThrowError();
          }
        });
      });
    });
  });
  describe('that has ["sortable"] property', function () {
    describe('not defined', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [{ id: 'names' }]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
    describe('defined, but of incorrect type', function () {
      describe('when the ["ordinal"] is set to true and ["fixed"] is set to true', function () {
        it('none error should be thrown.', function () {
          this.loop({
            except: ['boolean', 'string', 'undefined'],
            callback: (value) => {
              let configA = {
                columns: [{ id: 'names', ordinal: true, fixed: true, sortable: value }]
              };
              let configB = {
                columns: [{ id: 'names', ordinal: true, sortable: value }]
              };
              expect(() => new this.Tablio(configA)).not.toThrowError();
              expect(() => new this.Tablio(configB)).not.toThrowError();
            }
          });
        });
      });
      describe('when the ["ordinal"] is set to true and ["fixed"] is set to false', function () {
        it('the error should be thrown, that the ["sortable"] property must be of [Boolean|String|undefined] type.', function () {
          this.loop({
            except: ['boolean', 'string', 'undefined'],
            callback: (value, type) => {
              let config = {
                columns: [{ id: 'names', ordinal: true, fixed: false, sortable: value }]
              };
              expect(() => new this.Tablio(config)).toThrowError(TypeError, this.columnPropertyError(0, 'sortable', type, 'Boolean|String|undefined'));
            }
          });
        });
      });
      describe('when the ["ordinal"] is set to false and ["fixed"] is set to true', function () {
        it('the error should be thrown, that the ["sortable"] property must be of [Boolean|String|undefined] type.', function () {
          this.loop({
            except: ['boolean', 'string', 'undefined'],
            callback: (value, type) => {
              let configA = {
                columns: [{ id: 'names', ordinal: false, fixed: true, sortable: value }]
              };
              let configB = {
                columns: [{ id: 'names', ordinal: false, sortable: value }]
              };
              let configC = {
                columns: [{ id: 'names', fixed: true, sortable: value }]
              };
              let configD = {
                columns: [{ id: 'names', sortable: value }]
              };
              expect(() => new this.Tablio(configA)).toThrowError(TypeError, this.columnPropertyError(0, 'sortable', type, 'Boolean|String|undefined'));
              expect(() => new this.Tablio(configB)).toThrowError(TypeError, this.columnPropertyError(0, 'sortable', type, 'Boolean|String|undefined'));
              expect(() => new this.Tablio(configC)).toThrowError(TypeError, this.columnPropertyError(0, 'sortable', type, 'Boolean|String|undefined'));
              expect(() => new this.Tablio(configD)).toThrowError(TypeError, this.columnPropertyError(0, 'sortable', type, 'Boolean|String|undefined'));
            }
          });
        });
      });
      describe('when the ["ordinal"] is set to false and ["fixed"] is set to false', function () {
        it('the error should be thrown, that the ["sortable"] property must be of [Boolean|String|undefined] type.', function () {
          this.loop({
            except: ['boolean', 'string', 'undefined'],
            callback: (value, type) => {
              let configA = {
                columns: [{ id: 'names', ordinal: false, fixed: false, sortable: value }]
              };
              let configB = {
                columns: [{ id: 'names', fixed: false, sortable: value }]
              };
              expect(() => new this.Tablio(configA)).toThrowError(TypeError, this.columnPropertyError(0, 'sortable', type, 'Boolean|String|undefined'));
              expect(() => new this.Tablio(configB)).toThrowError(TypeError, this.columnPropertyError(0, 'sortable', type, 'Boolean|String|undefined'));
            }
          });
        });
      });
    });
    describe('defined with correct [Boolean] type', function () {
      it('none error should be thrown.', function () {
        this.loop({
          values: [true, false],
          callback: (value) => {
            let config = {
              columns: [{ id: 'names', sortable: value }]
            };
            expect(() => new this.Tablio(config)).not.toThrowError();
          }
        });
      });
    });
    describe('defined with correct [String] type', function () {
      describe('but with the value other than one of the default "string" or "number" values', function () {
        describe('when the ["ordinal"] is set to true and ["fixed"] is set to true', function () {
          it('none error should be thrown.', function () {
            this.loop({
              values: ['some', 'random', 'test', 'value'],
              callback: (value) => {
                let configA = {
                  columns: [{ id: 'names', ordinal: true, fixed: true, sortable: value }]
                };
                let configB = {
                  columns: [{ id: 'names', ordinal: true, sortable: value }]
                };
                expect(() => new this.Tablio(configA)).not.toThrowError();
                expect(() => new this.Tablio(configB)).not.toThrowError();
              }
            });
          });
        });
        describe('when the ["ordinal"] is set to true and ["fixed"] is set to false', function () {
          it('the error should be thrown, that the ["sortable"] property must be one of the default [String] values', function () {
            this.loop({
              values: ['some', 'random', 'test', 'value'],
              callback: (value) => {
                let config = {
                  columns: [{ id: 'names', ordinal: true, fixed: false, sortable: value }]
                };
                expect(() => new this.Tablio(config)).toThrowError(Error, 'Invalid config.columns[0]["sortable"] property value. The [String] ["sortable"] value must be: "string" or "number".');
              }
            });
          });
        });
        describe('when the ["ordinal"] is set to false and ["fixed"] is set to true', function () {
          it('the error should be thrown, that the ["sortable"] property must be one of the default [String] values.', function () {
            this.loop({
              values: ['some', 'random', 'test', 'value'],
              callback: (value) => {
                let configA = {
                  columns: [{ id: 'names', ordinal: false, fixed: true, sortable: value }]
                };
                let configB = {
                  columns: [{ id: 'names', ordinal: false, sortable: value }]
                };
                let configC = {
                  columns: [{ id: 'names', fixed: true, sortable: value }]
                };
                let configD = {
                  columns: [{ id: 'names', sortable: value }]
                };
                expect(() => new this.Tablio(configA)).toThrowError(Error, 'Invalid config.columns[0]["sortable"] property value. The [String] ["sortable"] value must be: "string" or "number".');
                expect(() => new this.Tablio(configB)).toThrowError(Error, 'Invalid config.columns[0]["sortable"] property value. The [String] ["sortable"] value must be: "string" or "number".');
                expect(() => new this.Tablio(configC)).toThrowError(Error, 'Invalid config.columns[0]["sortable"] property value. The [String] ["sortable"] value must be: "string" or "number".');
                expect(() => new this.Tablio(configD)).toThrowError(Error, 'Invalid config.columns[0]["sortable"] property value. The [String] ["sortable"] value must be: "string" or "number".');
              }
            });
          });
        });
        describe('when the ["ordinal"] is set to false and ["fixed"] is set to false', function () {
          it('the error should be thrown, that the ["sortable"] property must be one of the default [String] values.', function () {
            this.loop({
              values: ['some', 'random', 'test', 'value'],
              callback: (value) => {
                let configA = {
                  columns: [{ id: 'names', ordinal: false, fixed: false, sortable: value }]
                };
                let configB = {
                  columns: [{ id: 'names', fixed: false, sortable: value }]
                };
                expect(() => new this.Tablio(configA)).toThrowError(Error, 'Invalid config.columns[0]["sortable"] property value. The [String] ["sortable"] value must be: "string" or "number".');
                expect(() => new this.Tablio(configB)).toThrowError(Error, 'Invalid config.columns[0]["sortable"] property value. The [String] ["sortable"] value must be: "string" or "number".');
              }
            });
          });
        });
      });
      describe('and with the one of the default values', function () {
        it('none error should be thrown.', function () {
          this.loop({
            values: ['string', 'number'],
            callback: (value) => {
              let config = {
                columns: [{ id: 'names', sortable: value }]
              };
              expect(() => new this.Tablio(config)).not.toThrowError();
            }
          });
        });
      });
    });
  });
  describe('that has ["match"] property', function () {
    describe('not defined', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [{ id: 'names' }]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
    describe('defined, but of incorrect type', function () {
      describe('when the ["sortable"] is set to false and the ["search"] is set to false (or undefined)', function () {
        it('none error should be thrown.', function () {
          this.loop({
            except: ['function', 'undefined'],
            callback: (value) => {
              let configA = {
                columns: [{ id: 'names', sortable: false, search: false, match: value }]
              };
              let configB = {
                columns: [{ id: 'names', sortable: false, match: value }]
              };
              expect(() => new this.Tablio(configA)).not.toThrowError();
              expect(() => new this.Tablio(configB)).not.toThrowError();
            }
          });
        });
      });
      describe('when either ["sortable"] is defined or the ["search"] is set to true', function () {
        it('the error should be thrown, that the ["match"] property must be of [Function|undefined] type.', function () {
          this.loop({
            except: ['function', 'undefined'],
            callback: (value, type) => {
              let configA = {
                columns: [{ id: 'names', sortable: true, search: true, match: value }]
              };
              let configB = {
                columns: [{ id: 'names', search: true, match: value }]
              };
              let configC = {
                columns: [{ id: 'names', sortable: 'string', search: true, match: value }]
              };
              let configD = {
                columns: [{ id: 'names', sortable: 'number', search: true, match: value }]
              };
              let configE = {
                columns: [{ id: 'names', sortable: true, search: false, match: value }]
              };
              let configF = {
                columns: [{ id: 'names', sortable: 'string', search: false, match: value }]
              };
              let configG = {
                columns: [{ id: 'names', sortable: 'number', search: false, match: value }]
              };
              let configH = {
                columns: [{ id: 'names', search: false, match: value }]
              };
              let configI = {
                columns: [{ id: 'names', sortable: false, search: true, match: value }]
              };
              expect(() => new this.Tablio(configA)).toThrowError(TypeError, this.columnPropertyError(0, 'match', type, 'Function|undefined'));
              expect(() => new this.Tablio(configB)).toThrowError(TypeError, this.columnPropertyError(0, 'match', type, 'Function|undefined'));
              expect(() => new this.Tablio(configC)).toThrowError(TypeError, this.columnPropertyError(0, 'match', type, 'Function|undefined'));
              expect(() => new this.Tablio(configD)).toThrowError(TypeError, this.columnPropertyError(0, 'match', type, 'Function|undefined'));
              expect(() => new this.Tablio(configE)).toThrowError(TypeError, this.columnPropertyError(0, 'match', type, 'Function|undefined'));
              expect(() => new this.Tablio(configF)).toThrowError(TypeError, this.columnPropertyError(0, 'match', type, 'Function|undefined'));
              expect(() => new this.Tablio(configG)).toThrowError(TypeError, this.columnPropertyError(0, 'match', type, 'Function|undefined'));
              expect(() => new this.Tablio(configH)).toThrowError(TypeError, this.columnPropertyError(0, 'match', type, 'Function|undefined'));
              expect(() => new this.Tablio(configI)).toThrowError(TypeError, this.columnPropertyError(0, 'match', type, 'Function|undefined'));
            }
          });
        });
      });
    });
    describe('defined with correct [Function] type', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [{ id: 'names', match: () => { } }]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
  });
  describe('that has ["caseSensitive"] property', function () {
    describe('not defined', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [{ id: 'names' }]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
    describe('defined, but of incorrect type', function () {
      describe('when the ["search"] is not defined or set to false', function () {
        it('none error should be thrown.', function () {
          this.loop({
            except: ['boolean', 'undefined'],
            callback: (value) => {
              let configA = {
                columns: [{ id: 'names', caseSensitive: value }]
              };
              let configB = {
                columns: [{ id: 'names', search: false, caseSensitive: value }]
              };
              expect(() => new this.Tablio(configA)).not.toThrowError();
              expect(() => new this.Tablio(configB)).not.toThrowError();
            }
          });
        });
      });
      describe('when the ["search"] is set to true', function () {
        it('the error should be thrown, that the ["caseSensitive"] property must be of [Boolean|undefined] type.', function () {
          this.loop({
            except: ['boolean', 'undefined'],
            callback: (value, type) => {
              let config = {
                columns: [{ id: 'names', search: true, caseSensitive: value }]
              };
              expect(() => new this.Tablio(config)).toThrowError(TypeError, this.columnPropertyError(0, 'caseSensitive', type, 'Boolean|undefined'));
            }
          });
        });
      });
    });
    describe('defined with correct [Boolean] type', function () {
      it('none error should be thrown.', function () {
        this.loop({
          values: [true, false],
          callback: (value) => {
            let config = {
              columns: [{ id: 'names', search: true, caseSensitive: value }]
            };
            expect(() => new this.Tablio(config)).not.toThrowError();
          }
        });
      });
    });
  });
  describe('that has ["editable"] property', function () {
    describe('not defined', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [{ id: 'names' }]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
    describe('defined, but of incorrect type', function () {
      it('the error should be thrown, that the ["editable"] property must be of [Boolean|Function|undefined] type.', function () {
        this.loop({
          except: ['function', 'boolean', 'undefined'],
          callback: (value, type) => {
            let config = {
              columns: [{ id: 'names', editable: value }]
            };
            expect(() => new this.Tablio(config)).toThrowError(TypeError, this.columnPropertyError(0, 'editable', type, 'Function|Boolean|undefined'));
          }
        });
      });
    });
    describe('defined with correct [Boolean] type', function () {
      it('none error should be thrown.', function () {
        this.loop({
          values: [true, false],
          callback: (value) => {
            let config = {
              columns: [{ id: 'names', editable: value }]
            };
            expect(() => new this.Tablio(config)).not.toThrowError();
          }
        });
      });
    });
    describe('defined with correct [Function] type', function () {
      it('none error should be thrown.', function () {
        let config = {
          columns: [{ id: 'names', editable: ()=>{} }]
        };
        expect(() => new this.Tablio(config)).not.toThrowError();
      });
    });
  });
});