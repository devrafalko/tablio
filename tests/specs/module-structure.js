/*global describe, it, expect */
describe('the module',function(){
  it('should be a [Function] constructor', function(){
    expect(typeof this.Tablio).toBe('function');
  });
});

describe('the new instance of a module',function(){
  it('should be a [Tablio] instance', function(){
    let tablio = new this.Tablio({
      columns:[
        {id:'index'}
      ]
    });
    expect(tablio.constructor.name).toBe('Tablio');
  });
});