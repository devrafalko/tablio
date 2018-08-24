/*global jasmine, DOMCustomMatchers, karmaHTML, xdescribe, beforeAll, expect, it */

xdescribe('The table element',function(){

  beforeAll(function(done){
    jasmine.addMatchers(DOMCustomMatchers);
    karmaHTML.index.open();
    karmaHTML.index.onstatechange = ()=>{
      this.document = karmaHTML.index.document;
      this.table = this.document.getElementById('tablio');
      this.header = this.table.children[0];
      this.body = this.table.children[1];
      done();
    };
  });

  it('should have the "tablio-modern" class',function(){
    expect(this.table).toHaveClass('tablio-modern');
  });

  it('should have one heder row and two body rows',function(){
    expect(this.header).toHaveChildren(1);
    expect(this.body).toHaveChildren(2);
  });
});