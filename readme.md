<blockquote class="warning">
<h1>Warning</h1>
The project is under production.<br/>
The <code>readme.md</code> description <strong>does not</strong> reflect the actual project features <em>(yet)</em>.
</blockquote>

<h5>Table of Contents</h5>
<ol>
  <li><a href="#main-description">Description</a></li>
  <li><a href="#main-implementation">Implementation</a></li>
  <li><a href="#main-tests">Tests</a></li>
  <li><a href="#main-samples">Samples</a></li>
  <li><a href="#main-usage">Usage</a></li>
  <li><a href="#main-config-parameters">config parameters</a></li>
  <li><a href="#main-return-value">Return value</a></li>
  <li><a href="#main-table-control">Table control</a>
    <ul>
    <li><a href="#instance-dom">navigation elements</a></li>
    <li><a href="#instance-cells-access">cells access</a></li>
    <li><a href="#instance-control">table control</a></li>
    </ul>
  </li>
</ol>

<h1 id="main-description">Description</h1>
<p>
  <code>tablio</code> is a html
  <code>&lt;table&gt;</code> generator, that creates the table based on the given contents data. You can:</p>
<ul>
  <li>set the columns order</li>
  <li>set the pagination and how many rows should be displayed on one page</li>
  <li>add the search input for each column</li>
  <li>sort columns</li>
  <li>control the table behaviour with js methods</li>
  <li>see the
    <a href="https://devrafalko.github.io/tablio/sample-1.html">Sample 1</a>,
    <a href="https://devrafalko.github.io/tablio/sample-2.html">Sample 2</a>,
    <a href="https://devrafalko.github.io/tablio/sample-3.html">Sample 3</a>
  </li>
</ul>
<ul>
  <li>Any bugs found? Give me to know on
    <a href="https://github.com/devrafalko/tablio">GitHub</a>
  </li>
</ul>
<h1 id="main-implementation">Implementation</h1>
<h3>with NodeJS</h3>
<p><code>npm install tablio --save</code></p>

```javascript
const Tablio = require('tablio');
const table = new Tablio({/* config params here */});
```

<h3>with Browser</h3>
<ol>
  <li>Get the <strong>library</strong> <code>tablio.min.js</code> and <strong>styles</strong> <code>tablio.min.css</code> from <code>./dist</code> directory</li>
  <li>Add these files to the <code>.html</code> file code</li>
  <li>Use <code>Tablio</code> <strong>window Object</strong> from <code>tablio.min.js</code>.</li>
</ol>

```html
<head>
  <link rel="stylesheet" href="./tablio.min.css"/>
  <script src="./tablio.min.js"></script>
  <script>
    var table = new Tablio({/* config params here */ });
  </script>
</head>
```

<h1 id="main-tests">Tests</h1>

```cmd
> git clone https://github.com/devrafalko/tablio.git
> cd tablio
> npm install
> npm test
```

<h1 id="main-samples">Samples</h1>
<a href="https://devrafalko.github.io/tablio/sample-1.html">Sample 1</a><br/>
<a href="https://devrafalko.github.io/tablio/sample-2.html">Sample 2</a><br/>
<a href="https://devrafalko.github.io/tablio/sample-3.html">Sample 3</a><br/>
<p>In order to study the samples' code, run:</p>

```cmd
> git clone https://github.com/devrafalko/tablio.git
> cd tablio/samples
```

<h1 id="main-usage">Usage</h1>
<p>The required <code>tablio</code> is a constructor.</p>
<p>Execute the constructor with the [Object] <code>config</code> object as an argument.</p>


```javascript
const Tablio = require('tablio');
const records = [
  { name: 'Jessica', age: 22, income: 3500 },
  { name: 'Albert', age: 35, income: 2800 },
  { name: 'Natalie', age: 26, income: 6400 }
];
const table = new Tablio({
  style: 'tablio-modern',
  data: records,
  rowsTiles: [5, 10, 20],
  pageTiles: 5,
  header: true,
  columns: [
    { id: "ordinal", ordinal: true, header: 'Ind.', content: (index) => `${index}.`, start: 1, step: 1, fixed: true },
    { id: "names", name: 'name', header: 'Name:', content: (value) => value, search: true, sortable: true },
    { id: "age", name: 'age', header: 'Age:', content: (value) => value, sortable: true },
    { id: "income", name: 'income', header: 'Income:', content: (value) => `${value}$`, sortable: true, editable: true }
  ],
  ready: (table, elements) => {
    elements.table.id = 'income-table';
    elements['search-income'].classList.add('navy-blue');
    document.body.appendChild(tableNode);
  }
});
```

<h4>The final table</h4>
<table>
  <tr><th>Ind.</th><th>Name:</th><th>Age:</th><th>Income:</th></tr>
  <tr><td>1.</td><td>Jessica</td><td>22</td><td>3500$</td></tr>
  <tr><td>2.</td><td>Albert</td><td>35</td><td>2800$</td></tr>
  <tr><td>3.</td><td>Natalie</td><td>26</td><td>6400$</td></tr>
</table>


<h1 id="main-config-parameters"><code>config</code> parameters</h1>
<p>The <code>Tablio</code> constructor takes <strong>one</strong> [Object] <code>config</code> argument.</p>
<p>The following <code>config</code> <strong>properties</strong> and <strong>methods</strong> are accessible:</p>

<ol>
  <li><a href="#config-style"><code>style</code></a></li>
  <li><a href="#config-data"><code>data</code></a></li>
  <li><a href="#config-pagerows"><code>pageRows</code></a></li>
  <li><a href="#config-pagetiles"><code>pageTiles</code></a></li>
  <li><a href="#config-header"><code>header</code></a></li>
  <li><a href="#config-columns"><code>columns</code></a>
    <ul>
      <li><a href="#config-column-id">column <code>id</code></a></li>
      <li><a href="#config-column-ordinal">column <code>ordinal</code></a></li>
      <li><a href="#config-column-name">column <code>name</code></a></li>
      <li><a href="#config-column-content">column <code>content</code></a></li>
      <li><a href="#config-column-header">column <code>header</code></a></li>
      <li><a href="#config-column-start">column <code>start</code></a></li>
      <li><a href="#config-column-step">column <code>step</code></a></li>
      <li><a href="#config-column-fixed">column <code>fixed</code></a></li>
      <li><a href="#config-column-search">column <code>search</code></a></li>
      <li><a href="#config-column-sortable">column <code>sortable</code></a></li>
      <li><a href="#config-column-match">column <code>match</code></a></li>
      <li><a href="#config-column-casesensitive">column <code>caseSensitive</code></a></li>
      <li><a href="#config-column-editable">column <code>editable</code></a></li>
    </ul>
  </li>
  <li><a href="#config-ready"><code>ready</code></a></li>
</ol>

<h3 id="config-style"><code>style</code> <em>(optional)</em></h3>
<strong>Type:</strong> [ String | null | undefined ]<br/>
<strong>Default:</strong> <code>"tablio-modern"</code><br/>
<strong>Description:</strong>
<ul>
  <li>it indicates the [String] CSS style mode that should be used for the created table</li>
  <li>it adds the class attribute to the <code>&lt;table&gt;</code> element to load the <code>tablio</code> CSS rules for the table</li>
  <li>the available style modes: <code>"tablio-modern"</code>, <code>"tablio-minimal"</code>,<code>"tablio-stripes"</code>,<code>"tablio-classic"</code></li>
  <li>if the <code>style</code> is omitted, the <strong>default</strong> <code>tablio-modern</code> style is used</li>
  <li>if the <code>style</code> is defined with <code>null</code>, any style is used</li>
</ul>
<h3 id="config-data"><code>data</code> <em>(optional)</em></h3>
<strong>Type:</strong> [ Array:Object | undefined ]<br/>
<strong>Default:</strong> <code>[]</code><br/>
<strong>Description:</strong>
<ul>
  <li>it indicates the [Array] collection of [Object] <strong>records</strong>, that will be parsed to the table</li>
  <li>each [Object] <strong>record</strong> is parsed to the <code>&lt;tr&gt;</code> <strong>row</strong> and each item's <strong>property</strong> is parsed to the <code>&lt;th&gt;</code> or <code>&lt;td&gt;</code> <strong>cell</strong></li>
  <li id="data-type-restrictions">the types of properties in the records are <strong>restricted</strong>:
    <ul>
      <li>each property must be of <code>String</code>, <code>Number</code>, <code>Boolean</code> or <code>HTMLElement</code> type</li>
      <li>the <code>HTMLElement</code> can be any <strong>DOM node</strong>, eg. <code>HTMLDivElement</code>, <code>HTMLLIElement</code>, <code>HTMLSpanElement</code>, etc.</li>
      <li>
        any other type will be <strong>ignored</strong> and the empty [String] value <code>""</code> will be used as the cell's content,<br/>
        <em>unless the <strong>columns</strong> <a href="#config-column-content"><code>content</code></a> property is defined, that allows to modify the final cell's content</em>
      </li>
    </ul>
  </li>
</ul>

```javascript
const data = [
  { id: 178, calories: 28, name:'beetroot', category:'vegetable', vegan:true },
  { id: 194, calories: 95, name:'banana', category:'fruit', vegan:true },
  { id: 263, calories: 61, name:'goat’s milk cheese', category:'dairy', vegan:false },
  { id: 1731, calories: 549, name:'chocolate', category:'sweets', vegan:false },
];
```

<h3 id="config-pagerows"><code>pageRows</code> <em>(optional)</em></h3>
<strong>Type:</strong> [ Array:Number | null | undefined ]<br/>
<strong>Default:</strong> <code>[10, 25, 50, 150]</code> <br/>
<strong>Description:</strong>
<ul>
  <li>the table is generated with some additional HTML elements to control the table behaviour</li>
  <li>the rows-per-page HTML <strong>tiles</strong> are generated according to the <code>pageRows</code> property</li>
  <li>the rows-per-page HTML <strong>tiles</strong> let to change the number of the rows that should be displayed on the table page</li>
  <li>the default <code>[10, 25, 50, 150]</code> value means, that the four tiles will be created with the value <code>10</code>, <code>25</code>, <code>50</code> and <code>150</code> and that the <strong>additional tile</strong> with the value <code>all</code> will be created as well:
    <ul>
      <li>eg. when the <code>25</code> tile is clicked, the table is re-rendered with the 25 rows displayed on the page</li>
      <li>eg. when the <code>all</code> tile is clicked, the table is re-rendered with <strong>all</strong> rows displayed on the <strong>one and only</strong> page</li>
    </ul>
  </li>
  <li>
    the <strong>first</strong> item of [Array] <code>pageRows</code> is used <strong>as default</strong> number of rows per page.<br/>
    <em>Use <a href="#control-rows"><code>tablio.control.rows</code></a> setter, to change the number or rows displayed on the page dynamically</em>
  </li>
  <li>each [Array] <code>pageRows</code> item must be a [Number] positive integer</li>
  <li>the [Array] <code>pageRows</code> accepts 10 items maximally</li>
  <li>if the <code>pageRows</code> is omitted, the <strong>default</strong> <code>[10, 25, 50, 150]</code> array is used</li>
  <li>if the <code>pageRows</code> is defined with <code>null</code>, any HTML tile is created and the table is rendered with <strong>all</strong> rows displayed on the <strong>one and only</strong> page</li>
</ul>

<h3 id="config-pagetiles"><code>pageTiles</code> <em>(optional)</em></h3>
<strong>Type:</strong> [ Number | undefined ]<br/>
<strong>Default:</strong> <code>5</code><br/>
<strong>Description:</strong>
<ul>
  <li>the table is generated with some additional HTML elements to control the table behaviour</li>
  <li>the pagination HTML <strong>tiles</strong> are generated according to the <code>pageTiles</code> property</li>
  <li>the <code>pageTiles</code> indicates the [Number] number of tiles that should be created to change the page number:
    <ul>
      <li>eg. for <code>3</code> value the <code><<</code>, <code><</code>, <code>[1]</code>, <code>[2]</code>, <code>[3]</code>, <code>></code>, <code>>></code> tiles are created to control the table pages</li>
      <li>eg. for <code>5</code> value the <code><<</code>, <code><</code>, <code>[1]</code>, <code>[2]</code>, <code>[3]</code>, <code>[4]</code>, <code>[5]</code>, <code>></code>, <code>>></code> tiles are created to control the table pages</li>
    </ul>
  </li>
  <li>the <code>pageTiles</code> must be a [Number] positive integer between <code>2</code> and <code>25</code></li>
  <li>if the <code>pageTiles</code> is omitted, the <strong>default</strong> <code>5</code> value is used</li>
</ul>

<h3 id="config-header"><code>header</code> <em>(optional)</em></h3>
<strong>Type:</strong> [ Boolean | undefined ]<br/>
<strong>Default:</strong> <code>true</code><br/>
<strong>Description:</strong>
<ul>
  <li>it indicates whether the <strong>header row</strong> should be added at the top of the table</li>
  <li>if it is set to <code>false</code>, the <strong>column</strong> <a href="#config-column-header"><code>header</code></a> property is ignored</li>
  <li>if the <code>header</code> is omitted, the <strong>default</strong> <code>true</code> value is used</li>
</ul>

<h3 id="config-columns"><code>columns</code> <em>(optional)</em></h3>
<strong>Type:</strong> [ Array:Object | undefined ]<br/>
<strong>Default:</strong> <code>[]</code><br/>
<strong>Description:</strong>
<ul>
  <li>this property lets to determine the columns of the new table</li>
  <li>it lets to create the <strong>two types of columns</strong>:
    <ol type="1" style="list-style-type:decimal">
      <li id="ordinal-column">
        <strong>ordinal number column</strong><br/>
        The ordinal number column is a column with numbered rows: <code>1</code>, <code>2</code>, <code>3</code>, etc.<br/>
        It takes the following properties:<br/>
          <a href="#config-column-id"><code>id</code></a>
          <a href="#config-column-ordinal"><code>ordinal</code></a>
          <a href="#config-column-content"><code>content</code></a>
          <a href="#config-column-header"><code>header</code></a>
          <a href="#config-column-start"><code>start</code></a>
          <a href="#config-column-step"><code>step</code></a>
          <a href="#config-column-fixed"><code>fixed</code></a>
          <a href="#config-column-search"><code>search</code></a>
          <a href="#config-column-sortable"><code>sortable</code></a>
          <a href="#config-column-match"><code>match</code></a>
          <a href="#config-column-casesensitive"><code>caseSensitive</code></a>
          <a href="#config-column-editable"><code>editable</code></a><br/>
        eg. <code>{ id:"index", ordinal:true, content:(index) => `${index}.`, start:1, step:0.1, fixed:false }</code>
      </li>
      <li id="content-column">
        <strong>content column</strong><br/>
        The content column retrieves the contents from the <a href="#config-data"><code>config.data</code></a> <strong>records</strong> collection.<br/>
        It takes the following properties:<br/>
          <a href="#config-column-id"><code>id</code></a>
          <a href="#config-column-name"><code>name</code></a>
          <a href="#config-column-content"><code>content</code></a>
          <a href="#config-column-header"><code>header</code></a>
          <a href="#config-column-search"><code>search</code></a>
          <a href="#config-column-sortable"><code>sortable</code></a>
          <a href="#config-column-match"><code>match</code></a>
          <a href="#config-column-casesensitive"><code>caseSensitive</code></a>
          <a href="#config-column-editable"><code>editable</code></a><br/>
        eg.
        <code>{ id:'employee', name:'person', header:'Employee:', search:true, sortable:true }</code>
      </li>
    </ol>
  </li>
  <li> the final <strong>columns order</strong> of the table corresponds with the [Array] <code>columns</code> <strong>items order</strong> </li>
</ul>

```javascript
columns: [
  { id: "ordinal", ordinal: true, header: 'Ind.', content: (index) => `${index}.`, start: 1, step: 1, fixed: true },
  { id: "names", name: 'name', header: 'Name:', content: (value) => value, search: true, sortable: true },
  { id: "age", name: 'age', header: 'Age:', content: (value) => value, sortable: true },
  { id: "income", name: 'income', header: 'Income:', content: (value) => `${value}$`, sortable: true, editable: true }
],
```

<h4 id="config-column-id">column <code>id</code></h4>
<strong>Type:</strong> [String]<br/>
<strong>Description:</strong>
<ul>
  <li>it must be defined with the [String] identifier for each column</li>
  <li>this identifier will be used to manipulate and control the table</li>
  <li>each column must have a different [String] <code>id</code></li>
</ul>

<h4 id="config-column-ordinal">column <code>ordinal</code> <em>(optional)</em></h4>
<strong>Type:</strong> [ Boolean | undefined ]<br/>
<strong>Default:</strong> <code>false</code><br/>
<strong>Description:</strong>
<ul>
  <li>
    if the <code>ordinal</code> property is set to <code>true</code>, it means, that it should be an <strong>ordinal number column</strong> <a href="#ordinal-column">[see above]</a>,<br/>
    then the <a href="#config-column-name"><code>name</code></a> property is ignored, and the <a href="#config-column-start"><code>start</code></a>, <a href="#config-column-step"><code>step</code></a> and <a href="#config-column-fixed"><code>fixed</code></a> properties are respected
  </li>
  <li>
    if the <code>ordinal</code> property is set to <code>false</code> <em>(default)</em>, it means, that it should be a <strong>content column</strong> <a href="#content-column">[see above]</a>,<br/>
    then the <a href="#config-column-start"><code>start</code></a>, <a href="#config-column-step"><code>step</code></a> and <a href="#config-column-fixed"><code>fixed</code></a> properties are ignored, and the <a href="#config-column-name"><code>name</code></a> property is respected
  </li>
</ul>

<h4 id="config-column-name">column <code>name</code> <em>(optional)</em></h4>
<strong>Type:</strong> [ String | undefined ]<br/>
<strong>Default:</strong> <code>undefined</code><br/>
<strong>Description:</strong>
<ul>
  <li>it indicates which <strong>values</strong> of <a href="#config-data"><code>config.data</code></a> <strong>records</strong> collection should be used as the contents of the cells in the column</li>
  <li>it should indicate the <strong>property name</strong> of the <strong>record</strong> of <a href="#config-data"><code>config.data</code></a> collection
    <ul>
      <li>eg. if the <a href="#config-data"><code>config.data</code></a> collection contains the records with the following properties: <code>{car:'Nissan', price:22500}</code> and the <code>name</code> property is set to <code>"car"</code>, the <code>"Nissan"</code> <strong>value</strong> will be used as the content of the cell in the column</li>
    </ul>
  </li>
  <li>if the <code>name</code> is <strong>not defined</strong> or indicates the <strong>non-existing</strong> property name in the <a href="#config-data"><code>config.data</code></a> <strong>record</strong>, the empty string <code>""</code> <strong>value</strong> is used as the cell's content by default</li>
  <li><em>also see the [Function] <strong>column</strong> <a href="#config-column-content"><code>content</code></a> property, that allows to modify the final cell's content.</em></li>
</ul>

<h4 id="config-column-content">column <code>content</code> <em>(optional)</em></h4>
<strong>Type:</strong> [ Function | String | HTMLElement | undefined ]<br/>
<strong>Default:</strong> <code>({ value }) => value</code><br/>
<strong>Description:</strong>
<p>
  It indicates the final <strong>content</strong> of the cells in the column.<br/>
  The <code>content</code>'s <strong>value type</strong> determines the final cell's content in a different way:
</p>
<h5><code>[undefined]</code></h5>
<p>The <strong>default content</strong> will be used:</p>
<ol type="a" style="list-style-type:lower-alpha">
  <li>
    the <code>1</code>, <code>2</code>, <code>3</code>, <code>4</code>, etc. indeces:<br/>
    for the <strong>ordinal number column</strong> <em>(it also depends on <a href="#config-column-step"><code>step</code></a> and <a href="#config-column-start"><code>start</code></a> properties)</em>
  </li>
  <li>
    the <strong>value</strong> of the <a href="#config-data"><code>config.data</code></a> record <strong>property</strong>:<br/>
    for the <strong>content column</strong>, if the <code>name</code> property indicates some <strong>property name</strong> of the records<br/>
  </li>
  <li>
    the empty string <code>""</code>:<br/>
    for the <strong>content column</strong>, if the <code>name</code> is not defined or indicates the <strong>non-existing</strong> <a href="#config-data"><code>config.data</code></a> record's property
  </li>
</ol>

<h5><code>[String]</code></h5>
<p>This [String]</strong> value is used as the content in <strong>all</strong> cells of the column.</p>
<ul>
  <li>the [String] value can be either some <strong>plain text</strong> or <strong>html template</strong>, that will be appended to the cells in the column</li>
  <li>eg. <code>content:'&lt;input type="radio"/&gt;'</code> </li>
</ul>

<h5><code>[HTMLElement]</code></h5>
This <strong>DOM node</strong> is appended to <strong>each</strong> cell of the column.

<h5><code>[Function]</code></h5>
<p>
  The [Function] callback is called for each cell of this column.<br/>
  The <strong>returned value</strong> of this [Function] callback is used as the column's cells' content.<br/>
  The <strong>returned value</strong> must be of <code>String</code>, <code>Number</code>, <code>Boolean</code> or <code>HTMLElement</code> type <a href="#data-type-restrictions">[see above]</a>.<br/>
  The [Function] <code>content</code> callback is called with <strong>the one</strong> [Object] <strong>argument</strong> with the following properties:
</p>
<ul>
  <li>
    <strong><code>ordinal</code></strong>: it is passed for the <a href="#ordinal-column">ordinal column</a><br/>
    If the <a href="#config-column-ordinal"><code>ordinal</code></a> property is set to <code>true</code>, it indicates the following [Number] ordinal.<br/>
    Otherwise it is <code>undefined</code>.
  </li>
  <li>
    <strong><code>value</code></strong>: it is passed for the <a href="#content-column">content column</a><br/>
    If the <a href="#config-column-ordinal"><code>ordinal</code></a> property is set to <code>true</code>, it is <code>undefined</code>.<br/>
    If the <a href="#config-column-name"><code>name</code></a> property indicates some <a href="#config-data"><code>config.data</code></a> records' property name, it is the value of this property.<br/>
    if the <a href="#config-column-name"><code>name</code></a> property is undefined or doesn't indicate <a href="#config-data"><code>config.data</code></a> records' property name, it's the empty string <code>""</code>.<br/>
    This value can be modified and then returned <em>(to be used as the final cell content)</em>.
  </li>
  <li><strong><code>record</code></strong>: the <strong>current</strong> [Object] <strong>record</strong> of the <a href="#config-data"><code>config.data</code></a> collection</li>
  <li><strong><code>index</code></strong>: the [Number] <strong>index</strong> of the current <strong>record</strong> item in the [Array] <a href="#config-data"><code>config.data</code></a> collection</li>
  <li><strong><code>data</code></strong>: the <a href="#config-data"><code>config.data</code></a> records collection</li>
  <li><strong><code>cell</code></strong>: the <code>&lt;td&gt;</code> <strong>DOM node</strong> of the <strong>current</strong> cell</li>
  <li><strong><code>row</code></strong>: the <code>&lt;tr&gt;</code> <strong>DOM node</strong> that the <strong>current</strong> cell belongs to</li>
</ul>

<h4 id="config-column-header">column <code>header</code> <em>(optional)</em></h4>
<strong>Type:</strong> [ String | undefined ]<br/>
<strong>Default:</strong><br/>
<p>
  If the <a href="#config-column-ordinal"><code>ordinal</code></a> property is set to <code>true</code>, the [String] <code>"ind."</code> value is used as the <code>header</code> by default.<br/>
  If the <a href="#config-column-name"><code>name</code></a> property is defined, this [String] value is used as the <code>header</code> by default.<br/>
  Otherwise the empty string <code>""</code> is used as the <code>header</code>.
</p>
<strong>Description:</strong>
<ul>
  <li>it indicates the [String] content of the <code>&lt;th&gt;</code> cell in the header row of the column</li>
  <li>if the <code>header</code> is omitted, the <strong>default</strong> value is used</li>
  <li><strong>mind</strong> that the <a href="#config-header"><code>config.header</code></a> property must be set to <code>true</code>, so the row with <code>&lt;th&gt;</code> headers was appended to the table</li>
</ul>

<h4 id="config-column-start">column <code>start</code> <em>(optional)</em></h4>
<strong>Type:</strong> [ Number | undefined ]<br/>
<strong>Default:</strong> <code>1</code><br/>
<strong>Description:</strong>
<ul>
  <li> it coheres with <a href="#config-column-ordinal"><code>ordinal</code></a> property set to <code>true</code> <em>(the <a href="#ordinal-column">ordinal number column</a>)</em>, otherwise the <code>start</code> property is ignored</li>
  <li> it indicates the ordinal that the table rows should <strong>start with</strong></li>
  <li> it can indicate positive and negative integers and decimals</li>
  <li> it cannot be a <code>NaN</code>, <code>Infinity</code> or <code>-Infinity</code></li>
  <li> if the <code>start</code> is omitted, the <strong>default</strong> <code>1</code> value is used</li>
</ul>

<h4 id="config-column-step">column <code>step</code> <em>(optional)</em></h4>
<strong>Type:</strong> [ Number | undefined ]<br/>
<strong>Default:</strong> <code>1</code><br/>
<strong>Description:</strong>
<ul>
  <li> it coheres with <a href="#config-column-ordinal"><code>ordinal</code></a> property set to <code>true</code> <em>(the <a href="#ordinal-column">ordinal number column</a>)</em>, otherwise the <code>step</code> property is ignored</li>
  <li> it indicates the <strong>step value</strong> of the sequential row in the ordinal number column</li>
  <li> it can indicate positive and negative integers and decimals</li>
  <li> it cannot be a <code>NaN</code>, <code>Infinity</code> or <code>-Infinity</code></li>
  <li> if the <code>step</code> is omitted, the <strong>default</strong> <code>1</code> value is used</li>
  <li> eg. if the <code>step</code> is defined with <code>0.1</code> and the <code>start</code> is defined with <code>0.1</code>, the cells with the following contents will be generated in the ordinal number column: <code>0.1</code>, <code>0.2</code>, <code>0.3</code>, <code>0.4</code>, etc.</li>
</ul>

<h4 id="config-column-fixed">column <code>fixed</code> <em>(optional)</em></h4>
<strong>Type:</strong> [ Boolean | undefined ]<br/>
<strong>Default:</strong> <code>true</code><br/>
<strong>Description:</strong>
<ul>
  <li>it coheres with <a href="#config-column-ordinal"><code>ordinal</code></a> property set to <code>true</code> <em>(the <a href="#ordinal-column">ordinal number column</a>)</em>, otherwise the <code>fixed</code> property is ignored</li>
  <li>it indicates the way how the ordinal number column behaves when the table is sorted</li>
  <li>if set to <code>true</code>, the indeces are <strong>not sorted</strong> along with other columns<br/><em>(the ordinal column remains steady during the table sorting)</em></li>
  <li>if set to <code>false</code>, the indeces <strong>are sorted</strong> along with other columns<br/><em>(the ordinal column cells stick to its original row during sorting)</em></li>
  <li>
    <strong>mind</strong> that if the <code>fixed</code> property is set to <code>true</code>, the <strong>column</strong> <a href="#config-column-sortable"><code>sortable</code></a> property is ignored for this ordinal column<br/>
    <em>(the fixed ordinal column cannot be sorted itself)</em>
  </li>
  <li>if the <code>fixed</code> is omitted, the <strong>default</strong> <code>true</code> value is used</li>
</ul>

<h4 id="config-column-search">column <code>search</code> <em>(optional)</em></h4>
<strong>Type:</strong> [ Boolean | undefined ]<br/>
<strong>Default:</strong> <code>false</code><br/>
<strong>Description:</strong>
<ul>
  <li>the table is generated with some additional HTML elements to control the table behaviour</li>
  <li>the <code>search</code> property set to <code>true</code> indicates, that the HTML <strong>search input</strong> element should be generated along with the table for this column</li>
  <li>the HTML <strong>search input</strong> element lets the user to <strong>filter</strong> the table rows according to the entered value</li>
  <li>in order to determine, which values should be considered during filtering the rows, define the <strong>column</strong> <a href="config-column-match"><code>match</code></a> property</li>
  <li>if the <code>search</code> is omitted, the <strong>default</strong> <code>false</code> value is used</li>
</ul>


<h4 id="config-column-sortable">column <code>sortable</code> <em>(optional)</em></h4>
<strong>Type:</strong> [ Boolean | undefined ]<br/>
<strong>Default:</strong> <code>true</code><br/>
<strong>Description:</strong>
<ul>
  <li>the table is generated with some additional HTML elements to control the table behaviour</li>
  <li>the <code>sortable</code> property set to <code>true</code> indicates, that the HTML <strong>sorting button</strong> element should be generated along with the table for this column</li>
  <li>HTML <strong>sorting button</strong> lets the user to <strong>sort</strong> <em>(toggle ascending and descending order)</em> the table according to this column's cells' values.</li>
  <li>in order to determine, which values should be considered during sorting the table rows, define the <a href="config-column-match"><code>match</code></a> property</li>
  <li>if the <code>sortable</code> is omitted, the <strong>default</strong> <code>true</code> value is used</li>
  <li>
    <strong>mind</strong> that it coheres with the <a href="#content-column"><strong>content column</strong></a> and with the <a href="#config-column-fixed"><strong>non-fixed</strong></a> <a href="#ordinal-column"><strong>ordinal column</strong></a> only<br/>
    <em>(if the <a href="#config-column-ordinal"><code>ordinal</code></a> and <a href="#config-column-fixed"><code>fixed</code></a> properties are set to <code>true</code>, the <code>sortable</code> property is ignored)</em>
  </li>
</ul>

<h4 id="config-column-match">column <code>match</code> <em>(optional)</em></h4>

<strong>Type:</strong> [ Function | undefined ]<br/>
<strong>Default:</strong> <code>({ textContent, innerHTML })=&gt; textContent</code><br/>
<strong>Description:</strong>
<ul>
  <li>it allows to determine the <strong>match</strong> value for the <a href="#config-column-search"><strong>search</strong><a/> and <a href="#config-column-sortable"><strong>sort</strong></a> action. Thus, the sorting and filtering value can be <strong>different</strong> than the value viewed in the <code>&lt;td&gt;</code> cell.</li>
  <li>The table will be sorted or filtered according to the <strong>match</strong> value rather than the actual <code>&lt;td&gt;</code> content</li>
  <li>it can be helpful, if the <code>&lt;td&gt;</code> cell contains some HTML elements except for the plain text; eg. the <strong>match</strong> value can indicate <code>"hello world"</code> value, while the actual <code>&lt;td&gt;</code> content is <code>&lt;span class="navy"&gt;hello world&lt;/span&gt;</code></li>
  <li><strong>by default</strong>, the plain text is retrieved from the <code>&lt;td&gt;</code> cell with the <code>element.textContent</code> <strong>JS DOM method</strong> and set as the <code>match</code> value; eg. <code>&lt;p&gt;Visit our &lt;a href=""&gt;website&lt;/a&gt;.&lt;/p&gt;</code> => <code>"Visit our website."</code></li>
  <li>if the <code>match</code> property is defined with [Function] callback, the <strong>returned value</strong> will be a <strong>match</strong> for sorting and searching</li>
  <li>the <code>match</code> callback <strong>returned value</strong> must be of <code>String</code>, <code>Number</code>, <code>Boolean</code> or <code>HTMLElement</code> type <a href="#data-type-restrictions">[see above]</a></li>
  <li>The [Function] <code>match</code> callback is called with <strong>the one</strong> [Object] <strong>argument</strong> with the following properties:
    <ul>
      <li><strong><code>textContent</code></strong>: the [String] plain text retrieved from the current cell; eg. <code>"hello world"</code></li>
      <li><strong><code>innerHTML</code></strong>: the [String] html content retrieved from the current cell; eg. <code>"&lt;p&gt;hello world&lt;/p&gt;"</code></li>
      <li><strong><code>record</code></strong>: the <strong>current</strong> [Object] <strong>record</strong> of the <a href="#config-data"><code>config.data</code></a> collection</li>
      <li><strong><code>index</code></strong>: the [Number] <strong>index</strong> of the current <strong>record</strong> item in the [Array] <a href="#config-data"><code>config.data</code></a> collection</li>
      <li><strong><code>data</code></strong>: the <a href="#config-data"><code>config.data</code></a> records collection</li>
      <li><strong><code>cell</code></strong>: the <code>&lt;td&gt;</code> <strong>DOM node</strong> of the <strong>current</strong> cell</li>
      <li><strong><code>row</code></strong>: the <code>&lt;tr&gt;</code> <strong>DOM node</strong> that the <strong>current</strong> cell belongs to</li>
    </ul>
  </li>
  <li>eg. <code>match:({ record }) => record.income</code><br/>will sort <em>(or filter)</em> the column according to the chosen values from <a href="#config-data"><code>config.data</code></a> records collection</li>
  <li>eg. <code>match:({ index }) => index</code><br/>will sort <em>(or filter)</em> the column according to the original rows order</li>
</ul>


<h4 id="config-column-casesensitive">column <code>caseSensitive</code> <em>(optional)</em></h4>
<strong>Type:</strong> [ Boolean | undefined ]<br/>
<strong>Default:</strong> <code>false</code><br/>
<strong>Description:</strong>
<ul>
  <li>it coheres with <a href="#config-column-search"><code>search</code></a> property set to <code>true</code>, otherwise the <code>caseSensitive</code> property is ignored</li>
  <li>if the <code>caseSensitive</code> is set to <code>true</code>, the upper case is distinguised from the lower case; <em><br/>eg. when the user enters the <code>"Vol"</code> in the search input, it matches <code>"Volvo"</code>, but does not match <code>"VOLVO"</code> and <code>"volvo"</code></em></li>
  <li>if the <code>caseSensitive</code> is set to <code>false</code>, the upper case is not distinguised from the lower case; <em><br/>eg. when the user enters the <code>"Vol"</code> in the search input, it matches <code>"Volvo"</code>, <code>"VOLVO"</code> and <code>"volvo"</code></em></li>
  <li>if the <code>caseSensitive</code> is omitted, the <strong>default</strong> <code>false</code> value is used</li>
</ul>


<h4 id="config-column-editable">column <code>editable</code> <em>(optional)</em></h4>
<strong>Type:</strong> [ Boolean | Function | undefined ]<br/>
<strong>Default:</strong> <code>false</code><br/>
<strong>Description:</strong>
<ul>
  <li>if the <code>editable</code> is defined, all the cells of the column can be modified by the user<br/><em>(the <code>contenteditable="true"</code> attribute is added to the <code>&lt;td&gt;</code> cells)</em></li>
  <li>when the user edits the cell, the table is re-rendered with the new cell's value <em>(it affects the <a href="#config-column-sortable">sorting</a> and <a href="#config-column-search">searching</a>)</em></li>
  <li>if the <code>editable</code> is defined with [Function] function, this function is called after the cell has been edited
    <ul>
      <li><em>it allows eg. to update the [Object] <a href="#config-data"><code>config.data</code></a> record, add some html attribute to the <code>&lt;td&gt;</code> element of the edited cell or send the new value or record to the server</em></li>
    </ul>
  </li>
  <li> the [Function] <code>editable</code> callback is called with <strong>the one</strong> [Object] <strong>argument</strong> with the following properties:
    <ul>
      <li><strong><code>textContent</code></strong>: the <strong>new</strong> [String] plain text retrieved from the current cell; eg. <code>"hello world"</code></li>
      <li><strong><code>innerHTML</code></strong>: the <strong>new</strong> [String] html content retrieved from the current cell; eg. <code>"&lt;p&gt;hello world&lt;/p&gt;"</code></li>
      <li><strong><code>record</code></strong>: the <strong>current</strong> [Object] <strong>record</strong> of the <a href="#config-data"><code>config.data</code></a> collection</li>
      <li><strong><code>index</code></strong>: the [Number] <strong>index</strong> of the current <strong>record</strong> item in the [Array] <a href="#config-data"><code>config.data</code></a> collection</li>
      <li><strong><code>data</code></strong>: the <a href="#config-data"><code>config.data</code></a> records collection</li>
      <li><strong><code>cell</code></strong>: the <code>&lt;td&gt;</code> <strong>DOM node</strong> of the <strong>current</strong> cell</li>
      <li><strong><code>row</code></strong>: the <code>&lt;tr&gt;</code> <strong>DOM node</strong> that the <strong>current</strong> cell belongs to</li>
    </ul>
  </li>
</ul>


<h3 id="config-ready"><code>ready</code> <em>(optional)</em></h3>

<strong>Type:</strong> [ Function | undefined ]<br/>
<strong>Default:</strong><code>undefined</code><br/>
<strong>Description:</strong>
<ul>
  <li>if <code>ready</code> is defined with [Function] callback, this callback is called right after the table is created and ready to be appended to the DOM tree</li>
  <li>The [Function] <code>ready</code> callback takes the following properties:
    <ul>
      <li>
        <code>[0]</code> <code>table</code>:<br/>
        It is the <strong>DOM node</strong> container that stores the table and all controller elements <em>(pagination tiles, search input, etc.)</em>.<br/>
        It is ready to be appended to the DOM tree; <em>eg. with <code>document.body.appendChild(table);</code></em>.<br/>
        The <code>table</code> DOM node is a <strong>default arrangement</strong> of the table layout. <a href="#main-samples">[See the samples]</a><br/>
        If you want to rearrange the table, compose your own layout using the <code>[1]</code> <code>elements</code> object with all table HTML elements.
      </li>
      <li>
        <code>[1]</code> <code>elements</code>:<br/>
        It is the [Object] list of all HTML elements that the table consists of.<br/>
        The HTML elements can be used to rearrange the table layout, to add some attributes, etc.<br/>
        <a href="#instance-dom">[See the list]</a> of <code>elements</code> properties that refer to the HTML elements.</li>
    </ul>
  </li>
</ul>


<h1 id="main-return-value">Return value</h1>
<p>
  The <code>new Tablio()</code> returns the <code>Tablio</code> instance that gives the access to the methods and properties.<br/>
  <strong>Mind</strong> that it does not return the <code>&lt;table&gt;&lt;/table&gt;</code> <strong>DOM node</strong> itself.
</p>


<h1 id="main-table-control">Instance properties and methods</h1>
<p>The instance <strong>properties</strong> and <strong>methods</strong> allow to:
<ul>
  <li>get the access to all table's controller <strong>DOM node</strong> elements <a href="#instance-dom">[see below]</a></li>
  <li>get the access to the chosen cell <em>(or cells collection)</em> by chaining the subsequent properties <a href="#instance-cells-access">[see below]</a></li>
  <li>control the table's behaviour <em>(immitate the DOM nodes controllers clicks via JavaScript methods)</em> <a href="#instance-control">[see below]</a></li>
</ul>

<h2 id="instance-dom"><code>tablio.dom</code> [Elements]</h2>
<p>
The <code>dom</code> is the [Elements] collection of all <strong>DOM nodes</strong> that the table consists of.<br/>
It gives the quick access to all DOM nodes via the <code>tablio.dom['node-identifier']</code>.<br/>
The following <code>tablio.dom</code> properties <strong>refer</strong> to the appropriate DOM nodes:
</p>

<table>
  <tr>
    <th>property name</th>
    <th style="width:75%">description</th>
  </tr>
  <tr>
    <td><code>container</code></td>
    <td>
      eg. <code>tablio.dom.container</code><br/>
      It refers to the DOM node that contains the <code>&lt;table&gt;</code> element and all controller elements
    </td>
  </tr>
  <tr>
    <td><code>table</code></td>
    <td>
      eg. <code>tablio.dom.table</code><br/>
      It refers to the <code>&lt;table&gt;&lt;/table&gt;</code> DOM node
    </td>
  </tr>
  <tr>
    <td><code>next</code>, <code>next-ten</code>, <code>previous</code>, <code>previous-ten</code></td>
    <td>
      eg. <code>tablio.dom.next</code>, <code>tablio.dom['previous-ten']</code><br/>
      It refers to the <strong>pagination tile</strong> DOM nodes
    </td>
  </tr>
  <tr>
    <td><code>page-a</code>, <code>page-b</code>, ..., <code>page-y</code></td>
    <td>
      eg. <code>tablio.dom['page-a']</code>, <code>tablio.dom['page-f']</code><br/>
      It refers to the <strong>pagination number tile</strong> DOM nodes<br/>
      <em>See the<a href="#config-pagetiles"> <code>pageTiles</code></a> config property</em>
    </td>
  </tr>
  <tr>
    <td><code>page-strap</code></td>
    <td>
      eg. <code>tablio.dom['page-strap']</code><br/>
      It refers to the DOM node <strong>container</strong> of <code>page-a</code>, <code>page-b</code>, ..., <code>page-y</code>
    </td>
  </tr>
  <tr>
    <td><code>page-tiles</code></td>
    <td>
      eg. <code>tablio.dom['page-tiles']</code><br/>
      It returns the [Array] collection of pagination number tiles: <code>page-a</code>, <code>page-b</code>, ..., <code>page-y</code>
    </td>
  </tr>
  <tr>
    <td><code>goto-input</code></td>
    <td>
      eg. <code>tablio.dom['goto-input']</code><br/>
      It refers to the <code>&lt;input/&gt;</code> DOM node where the user enter the table page number to move to
    </td>
  </tr>
  <tr>
    <td><code>goto-submit</code></td>
    <td>
      eg. <code>tablio.dom['goto-submit']</code><br/>
      It refers to the <code>&lt;input type="submit"/&gt;</code> DOM node that moves to the chosen table page
    </td>
  </tr>
  <tr>
    <td><code>row-[Number]</code>, <code>row-all</code></td>
    <td>
      eg. <code>tablio.dom['row-5']</code>, <code>tablio.dom['row-25']</code>, <code>tablio.dom['row-all']</code><br/>
      It refers to the <strong>rows-per-page tile</strong> DOM nodes<br/>
      <em>See the <a href="#config-pagerows"><code>pageRows</code></a> config property</em>
    </td>
  </tr>
  <tr>
    <td><code>row-strap</code></td>
    <td>
      eg. <code>tablio.dom['row-strap']</code><br/>
      It refers to the DOM node <strong>container</strong> of <code>row-[Number]</code>, <code>row-all</code></td>
  </tr>
  <tr>
    <td><code>row-tiles</code></td>
    <td>
      eg. <code>tablio.dom['row-tiles']</code><br/>
      It returns the [Array] collection of rows-per-page tile: <code>row-[Number]</code>, <code>row-all</code>
    </td>
  </tr>
  <tr>
    <td><code>search-[id]</code></td>
    <td>
      eg. <code>tablio.dom['search-names']</code>, <code>tablio.dom['search-incomes']</code><br/>
      It refers to the <strong>search</strong> <code>&lt;input/&gt;</code> DOM node for the column of <code>[id]</code> <a href="#config-column-id">identifier</a>
    </td>
  </tr>
  <tr>
    <td><code>sort-[id]</code></td>
    <td>
      eg. <code>tablio.dom['sort-names']</code>, <code>tablio.dom['sort-incomes']</code><br/>
      It refers to the <strong>sort tile</strong> DOM node for the column of <code>[id]</code> <a href="#config-column-id">identifier</a>
    </td>
  </tr>
  <tr>
    <td><code>header-[id]</code></td>
    <td>
      eg. <code>tablio.dom['header-names']</code>, <code>tablio.dom['header-incomes']</code><br/>
      It refers to the <code>&lt;th&gt;</code> DOM node for the column of <code>[id]</code> <a href="#config-column-id">identifier</a>
    </td>
  </tr>
</table>

<h2 id="instance-control"><code>tablio.control</code> [Object]</h2>

<p>The [Object] <code>control</code> property contains:
  <ul>
    <li><strong>properties</strong> that allow to get the <strong>current state</strong> of the table</li>
    <li><strong>methods</strong> that allow to <strong>control</strong> the table's <strong>behaviour</strong></li>
  </ul>
</p>

<h3><code>tablio.control.currentPage</code> <em>(getter)</em></h3>
<p><strong>Get</strong> the [Number] <strong>current page number</strong> of the table.</p>
<blockquote>
  <strong>Mind</strong> that the page numbering starts at <strong><code>1</code></strong> rather than <strong><code>0</code></strong> <em>(it is coherent to the way how the pages' numbers are displayed in the pagination tiles)</em>
</blockquote>

<h3><code>tablio.control.lastPage</code> <em>(getter)</em></h3>
<p><strong>Get</strong> the [Number] number of the <strong>last page</strong> of the table <em>(the <code>lastPage</code> property also indicates the number of all pages in the table)</em></p>
<blockquote>
  <strong>Mind</strong> that the page numbering starts at <strong><code>1</code></strong> rather than <strong><code>0</code></strong> <em>(it is coherent to the way how the pages' numbers are displayed in the pagination tiles)</em>
</blockquote>

<h3><code>tablio.control.tableRows</code> <em>(getter)</em></h3>

<p><strong>Get</strong> the [Number] <strong>actual rows number</strong> in the <strong>table</strong>.</p>

<h3><code>tablio.control.pageRows</code> <em>(getter)</em></h3>

<p><strong>Get</strong> the [Number] <strong>actual rows number</strong> of the <strong>current page</strong> of the table.</p>

<h3 id="control-rows"><code>tablio.control.rows</code> <em>(getter)</em></h3>

<p><strong>Get</strong> the current [Number] <strong>number of rows</strong> that should be <strong>displayed on the page</strong>, according to the <a href="#config-pagerows"><code>config.pageRows</code></a> setting.</p>

<h3><code>tablio.control.rows</code> <em>(setter)</em></h3>

<ul>
  <li><strong>set</strong> the <strong>number of rows</strong> that should be <strong>displayed on the page</strong></li>
  <li>it imitates the <strong>rows-per-page tile</strong> DOM node click <em>(see the <a href="#config-pagerows">pageRows</a> config property)</em></li>
  <li>it re-renders the table with the new number of rows displayed on the page</li>
  <li>the <code>setter</code> value must be a [Number] positive integer</li>
  <li>eg. <code>tablio.control.rows = 12;</code></li>
</ul>

<h3><code>tablio.control.next([pages])</code></h3>

<ul>
  <li>it imitates the <strong>next pagination tile</strong> DOM node click</li>
  <li>it re-renders the table with the next page</li>
  <li>
    the <code>pages</code> argument is optional.<br/>
    It is <code>1</code> by default.<br/>
    It indicates the number of pages, that the table should be <strong>fasten-forward</strong>.<br/>
    If defined, it must be a [Number] positive integer.</li>
  <li>if the <code>tablio.control.next</code> call is <strong>out of</strong> pages <strong>range</strong>, the table is re-rendered with the <strong>last</strong> page</li>
  <li>eg. <code>table.control.next(2);</code></li>
</ul>

<h3><code>tablio.control.previous([pages])</code></h3>

<ul>
  <li>it imitates the <strong>previous pagination tile</strong> DOM node click</li>
  <li>it re-renders the table with the previous page</li>
  <li>
    the <code>pages</code> argument is optional.<br/>
    It is <code>1</code> by default.<br/>
    It indicates the number of pages, that the table should be <strong>rewound</strong>.<br/>
    If defined, it must be a [Number] positive integer.</li>
  </li>
  <li>if the <code>tablio.control.previous</code> call is <strong>out of</strong> pages <strong>range</strong>, the table is re-rendered with the <strong>first</strong> page</li>
  <li>eg. <code>table.control.previous(2);</code></li>
</ul>

<h3><code>tablio.control.goto(page)</code></h3>

<ul>
  <li>it imitates the <strong>go-to button</strong> DOM node click</li>
  <li>the <code>page</code> argument indicates the page number, that the table should be re-rendered with</li>
  <li>the <code>page</code> must be a [Number] integer</li>
  <li>if the <code>tablio.control.goto</code> call is <strong>out of</strong> pages <strong>range</strong>, the table is re-rendered with the last <em>(or first)</em> page</li>
  <li>eg. <code>tablio.control.goto(17);</code></li>
</ul>

<blockquote>
  <strong>Mind</strong> that the page numbering starts at <strong><code>1</code></strong> rather than <strong><code>0</code></strong> <em>(it is coherent to the way how the pages' numbers are displayed in the pagination tiles)</em>
</blockquote>

<h3><code>tablio.control.sort(ColumnIndicator[, order])</code></h3>

<ul>
  <li>it imitates the <strong>sort tile</strong> DOM node click for the chosen column</li>
  <li>it re-renders the table with the new rows order according to the sorted column</li>
  <li>the <a href="#column-indicator"><code>ColumnIndicator</code></a> argument must be any value <em>(or object)</em> that indicates the desired column</li>
  <li>the <code>order</code> argument:
    <ul>
      <li>when omitted <em>(default)</em> - it sorts <em>(toggles)</em> the table in ascending and descending order <strong>alternately</strong></li>
      <li>when [Boolean] <code>true</code> - it sorts the table in <strong>ascending</strong> order</li>
      <li>when [Boolean] <code>false</code> - it sorts the table in <strong>descending</strong> order</li>
    </ul>
  </li>
</ul>

<h3 id="control-search"><code>tablio.control.search(ColumnIndicator, value)</code></h3>

<ul>
  <li>it imitates the <strong>search input</strong> DOM node for the chosen column</li>
  <li>it re-renders the table with the filtered rows <em>(that match the <code>value</code>)</em></li>
  <li>the <a href="#column-indicator"><code>ColumnIndicator</code></a> argument must be any value <em>(or object)</em> that indicates the desired column</li>
  <li>the [String] <code>value</code> should indicate the <strong>search value</strong></li>
  <li>for <strong>multiple column</strong> searching use <strong>one</strong> [Array] <strong>argument</strong> with [Object | Array] <code>column:<em>value</em></code> pairs:
</ul>

```javascript
tablio.control.search([
  { id:'names', value:'A' },
  [ 'income', '3' ]
]);
```

<h3><code>tablio.control.filter(ColumnIndicator, callback)</code></h3>

<ul>
  <li>it works alike <a href="#control-search"><code>tablio.control.search</code></a>, but takes [Function] callback rather than [String] value as an argument</li>
  <li>it loops through the chosen column cells and lets to determine in the <code>callback</code>, either the cell should be displayed or not</li>
  <li>the <a href="#column-indicator"><code>ColumnIndicator</code></a> argument must be any value <em>(or object)</em> that indicates the desired column</li>
  <li>the <code>callback</code> function should return:
    <ul>
      <li><code>true</code> <em>(or any truthy value)</em>: then the row containing the iterated cell is displayed</li>
      <li><code>false</code> <em>(or any falsy value)</em>: then the row containing the iterated cell is not displayed</li>
    </ul>
  </li>
  <li> the <code>callback</code> is called with <strong>the one</strong> [Object] <strong>argument</strong> with the following properties:
    <ul>
      <li><strong><code>textContent</code></strong>: the [String] plain text retrieved from the current cell; eg. <code>"hello world"</code></li>
      <li><strong><code>innerHTML</code></strong>: the [String] html content retrieved from the current cell; eg. <code>"&lt;p&gt;hello world&lt;/p&gt;"</code></li>
      <li><strong><code>record</code></strong>: the <strong>current</strong> [Object] <strong>record</strong> of the <a href="#config-data"><code>config.data</code></a> collection</li>
      <li><strong><code>index</code></strong>: the [Number] <strong>index</strong> of the current <strong>record</strong> item in the [Array] <a href="#config-data"><code>config.data</code></a> collection</li>
      <li><strong><code>data</code></strong>: the <a href="#config-data"><code>config.data</code></a> records collection</li>
      <li><strong><code>cell</code></strong>: the <code>&lt;td&gt;</code> <strong>DOM node</strong> of the <strong>current</strong> cell</li>
      <li><strong><code>row</code></strong>: the <code>&lt;tr&gt;</code> <strong>DOM node</strong> that the <strong>current</strong> cell belongs to</li>
    </ul>
  </li>
</ul>

```javascript
tablio.control.filter('names', ({ index }) => index > 50 && index <= 100);
tablio.control.filter('names', ({ textContent }) => (/^[C-F].+$/).test(textContent));
tablio.control.filter('income', ({ record }) => Number(record.income) > 3000 );
```

<h2 id="instance-cells-access">Cells access</h2>
Set the properties and methods chain to get the access to the desired cell <em>(or cells collection)</em>:
<ul>
  <li>to <strong><code>get</code></strong> their <code>&lt;td&gt;</code> or <code>&lt;tr&gt;</code> <strong>DOM node</strong> element, value or html content</li>
  <li>to <strong><code>set</code></strong> the new values</li>
</ul>

<table>
  <tr><td>instance</td><td>rows range</td><td>cells range</td></tr>
  <tr><td><code>tablio</code></td><td><code>.page</code></td><td><code><a href="#instance-columns">.columns</a></code></td></tr>
  <tr><td></td><td><code>.table</code></td><td><code><a href="#instance-rows">.rows</a></code></td></tr>
  <tr><td></td><td><code>.data</code></td><td><code><a href="#instance-column-method">.column(ColumnIndicator)</a></code></td></tr>
  <tr><td></td><td></td><td><code><a href="#instance-row-method">.row(RowIndicator)<a/></code></td></tr>
  <tr><td></td><td></td><td><a href="#instance-cell-method"><code>.cell(ColumnIndicator, RowIndicator)</code><a/></td></tr>
</table>

<p>
  <code>tablio.page</code> - limits the cells collection to the <strong>current page</strong><br/>
  <code>tablio.table</code> - limits the cells collection to the <strong>rendered table</strong> <em>(of all pages)</em><br/>
  <code>tablio.data</code> - returns the cells collection according to <strong><a href="#config-data"><code>config.data</code></a> records</strong><br/>
</p>
<p>
  <a href="#instance-columns"><code>.columns</code></a> - returns the cells collection arranged according to the columns layout<br/>
  <a href="#instance-rows"><code>.rows</code></a> - returns the cells collection arranged according to the rows layout<br/>
  <a href="#instance-column-method"><code>.column(ColumnIndicator)</code></a> - returns the cells collection of the chosen column<br/>
  <a href="#instance-row-method"><code>.row(RowIndicator)</code></a> - returns the cells collection of the chosen row<br/>
  <a href="#instance-cell-method"><code>.cell(ColumnIndicator, RowIndicator)</code></a> - returns the particular cell<br/>
</p>

<h6>Samples:</h6>

```javascript
tablio.page.columns;
tablio.data.cell('names', 10);
tablio.page.row(0);
tablio.table.row(tablio.control.tableRows - 1);
```

<h2 id="instance-columns"><code>columns</code> [Columns]</h2>
<p>The <code>columns</code> property gets the access to the <code>[Columns]</code> instance, that contain the cells collection arranged according to the columns layout. The <code>columns</code> property is accessible via:</p>

<ul>
  <li><code>tablio.data.columns</code></li>
  <li><code>tablio.table.columns</code></li>
  <li><code>tablio.page.columns</code></li>
</ul>

<h3>The returned <code>[Columns]</code> <strong>properties</strong> and <strong>methods</strong>:</h3>

```console
Columns {
  0: [Column],
  1: [Column],
  2: [Column],
  [...],
  __proto__: {
    get headers: f(),
    get identifiers: f(),
    get values: f(),
    get contents: f(),
    get nodes: f(),
    forEach: f()
  }
}
```

<h3><code>[Columns]</code> indeces:</h3>
<ul>
  <li>the <code>columns[0]</code>, <code>columns[1]</code>, etc. indeces refer to the <a href="#instance-column"><code>[Column]</code></a> instances for each column in the table</li>
  <li>the <a href="#instance-column"><code>[Column]</code></a> instance contains the collection of the column's cells <em>(and another methods and properties)</em>
    <ul>
      <li>eg. <code>tablio.page.columns[0].identifier;</code><br/></li>
      <li>eg. <code>tablio.table.columns[3].values;</code><br/></li>
    </ul>
  </li>
</ul>

<h3><code>headers</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Array] collection of all <strong>headers</strong> for each column in the table<br/><em>(according to the <strong>column</strong> <a href="#config-column-header"><code>header</code></a> property settings)</em></li>
  <li>it works alike for <code>tablio.data.columns.headers</code>, <code>tablio.table.columns.headers</code> and <code>tablio.page.columns.headers</code></li>
</ul>

<h3><code>identifiers</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Array] list of all <strong>identifiers</strong> for each column in the table<br/><em>(according to the <strong>column</strong><a href="#config-column-id"><code>id</code></a> property settings)</em></li>
  <li>it works alike for <code>tablio.data.columns.identifiers</code>, <code>tablio.table.columns.identifiers</code>, <code>tablio.page.columns.identifiers</code></li>
</ul>

<h3 id="instance-columns-values"><code>values</code> <em>(getter)</em></h3>
<table id="columns-layout">
  <tr><th>Ind.</th><th>Name:</th><th>Age:</th><th>Income:</th></tr>
  <tr><td>1.</td><td>Jessica</td><td>22</td><td>3500$</td></tr>
  <tr><td>2.</td><td>Albert</td><td>35</td><td>2800$</td></tr>
  <tr><td>3.</td><td>Natalie</td><td>26</td><td>6400$</td></tr>
</table>
<ul>
  <li>it returns the [Array] collection of the cells' <strong>values</strong> from the <a href="#config-data"><code>config.data</code></a> records collection<br/><em>(arranged according to the columns layout)</em></li>
  <li>for the table sample <a href="#columns-layout">above</a>, the <code>columns.values</code> property returns the cells collection in the following arrangement:</li>
</ul>


```javascript
[
  [ 1, 2, 3 ],
  [ "Jessica", "Albert", "Natalie" ],
  [ 22, 35, 26 ],
  [ 3500, 2800, 6400 ]
]
```

<h3><code>contents</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Array] collection of the [String] cells' <strong>html contents</strong> from the <code>&lt;td&gt;</code> DOM nodes<br/><em>(arranged according to the columns layout)</em></li>
  <li>for the table sample <a href="#columns-layout">above</a>, the <code>columns.contents</code> property returns the cells collection in the following arrangement:</li>
</ul>


```javascript
[
  [ "1.", "2.", "3." ],
  [ "Jessica", "Albert", "Natalie" ],
  [ "22", "35", "26" ],
  [ "3500$", "2800$", "6400$" ]
]
```

<h3><code>nodes</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Array] collection of the cells' [HTMLTableCellElement] <code>&lt;td&gt;</code> <strong>DOM nodes</strong><br/><em>(arranged according to the columns layout)</em></li>
  <li><a href="#instance-columns-values">see above</a> how the items are arranged in the returned <code>columns.nodes</code> [Array] object</li>
</ul>

<h3><code>forEach(collection, callback)</code> [Function]</h3>

<ul>
  <li>the [Function] <code>forEach</code> method loops through <strong>all items</strong> of the given collection</li>
  <li>the <code>collection</code> argument must be an [Array] <code>columns.values</code>, <code>columns.contents</code> or <code>columns.nodes</code></li>
  <li>it loops through the <strong>two levels</strong> <em>(column and cell)</em> of [Array] items in the given <code>collection</code>:
    <ul>
      <li>eg. <code>[0][0]</code>, <code>[0][1]</code>, <code>[0][2]</code>, <code>[1][0]</code>, <code>[1][1]</code>, <code>[1][2]</code>, <code>[2][0]</code>, <code>[2][1]</code>, <code>[2][2]</code>, <code>[3][0]</code>, etc.</li>
    </ul>
  </li>
  <li> the <code>callback</code> is called with <strong>the one</strong> [Object] <strong>argument</strong> with the following properties:
    <ul>
      <li><strong><code>item</code></strong>: the collection's item</li>
      <li><strong><code>rowIndex</code></strong>: the [Number] index of the row, that the current cell belongs to</li>
      <li><strong><code>columnIndex</code></strong>: the [Number] index of the column, that the current cell belongs to</li>
      <li><strong><code>totalIndex</code></strong>: the [Number] index of loop repetition</li>
      <li><strong><code>row</code></strong>: the <code>[Row]</code> instance of the row, that the current cell belongs to</li>
      <li><strong><code>column</code></strong>: the <code>[Column]</code> instance of the column, that the current cell belongs to</li>
      <li><strong><code>cell</code></strong>: the <code>[Cell]</code> instance of the current cell</li>
    </ul>
  </li>
</ul>


<h2 id="instance-column-method"><code>column(ColumnIndicator)</code> [Function]</h2>
<ul>
  <li>the [Function] <code>column</code> method gets the access to the <a href="#instance-column"><code>[Column]</code></a> instance of the desired column, that contain the cells collection of this column</li>
  <li>the <a href="#column-indicator"><code>ColumnIndicator</code></a> argument must be any value <em>(or object)</em> that indicates the desired column</li>
  <li>eg. <code>tablio.data.column('names')</code>, <code>tablio.page.column('income')</code></li>
</ul>


<p>The [Function] <code>column</code> method is accessible via:</p>

<ul>
  <li><code>tablio.data.column(ColumnIndicator)</code></li>
  <li><code>tablio.table.column(ColumnIndicator)</code></li>
  <li><code>tablio.page.colum(ColumnIndicator)</code></li>
</ul>

<h3 id="instance-column">The returned <code>[Column]</code> properties and methods:</h3>

```console
Column {
  0: [Cell],
  1: [Cell],
  2: [Cell],
  [...],
  __proto__: {
    get header: f(),
    set header: f(),
    get identifier: f(),
    get values: f(),
    get contents: f(),
    get nodes: f(),
    cell: f()
  }
}
```


<h3><code>[Column]</code> indeces:</h3>
<ul>
  <li>the <code>[0]</code>, <code>[1]</code>, etc. indeces refer to the <a href="#instance-cell"><code>[Cell]</code></a> instances of the cells of this column
    <ul>
      <li>eg. <code>tablio.page.column('names')[0].value;</code><br/></li>
      <li>eg. <code>tablio.table.column('income')[2].update(6400);</code><br/></li>
    </ul>
  </li>
</ul>

<h3><code>header</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [String] <strong>header</strong> of the column <em>(according to the <strong>column</strong> <a href="#config-column-header"><code>header</code></a> property settings)</em></li>
  <li>it works alike for <code>tablio.data.column().header</code>, <code>tablio.table.column().header</code> and <code>tablio.page.column().header</code></li>
</ul>

<h3><code>header</code> <em>(setter)</em></h3>
<ul>
  <li>it <strong>sets</strong> the new [String] <strong>header</strong> of the column</li>
  <li>the new value must meet the <strong>column</strong> <a href="#config-column-header"><code>header</code></a> property types requirements</li>
</ul>

<h3><code>identifier</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [String] <strong>identifier</strong> of the column <em>(according to the <strong>column</strong><a href="#config-column-id"><code>id</code></a> property settings)</em></li>
  <li>it works alike for <code>tablio.data.column().identifier</code>, <code>tablio.table.column().identifier</code>, <code>tablio.page.column().identifier</code></li>
</ul>

<h3><code>values</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Array] list of cells' <strong>values</strong> <em>(the cells of this column)</em> from the <a href="#config-data"><code>config.data</code></a> records collection</li>
  <li>eg. <code>["Jessica", "Albert", "Natalie"]</code>, <code>[3500, 2800, 6400]</code></li>
</ul>

<h3><code>contents</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Array] list of the [String] cells' <strong>html contents</strong> <em>(the cells of this column)</em> from the <code>&lt;td&gt;</code> DOM nodes</li>
  <li>eg. <code>["1.", "2.", "3."]</code>, <code>["3500$", "2800$", "6400$"]</code></li>
</ul>

<h3><code>nodes</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Array] list of the cells' [HTMLTableCellElement] <code>&lt;td&gt;</code> <strong>DOM nodes</strong> <em>(the cells of this column)</em></li>
</ul>

<h3><code>cell(RowIndicator)</code> [Function]</h3>
<ul>
  <li>it returns the <a href="#instance-cell"> <code>[Cell]</code> </a> instance reference for the selected cell of the column</li>
  <li>The <a href="#row-indicator"> <code>RowIndicator</code> </a> argument must be any value <em>(or object)</em> that indicates the row that the desired cell belongs to</li>
  <li>eg. <code>tablio.page.column('names').cell(0)</code>, <code>tablio.data.column('income').cell(5)</code></li>
</ul>


<h2 id="instance-rows"><code>rows</code> [Rows]</h2>
<p>The <code>rows</code> property gets the access to the <code>[Rows]</code> instance, that contain the cells collection arranged according to the rows layout. The <code>rows</code> property is accessible via:</p>

<ul>
  <li><code>tablio.data.rows</code></li>
  <li><code>tablio.table.rows</code></li>
  <li><code>tablio.page.rows</code></li>
</ul>

<h3>The returned <code>[Rows]</code> <strong>properties</strong> and <strong>methods</strong>:</h3>

```console
Rows {
  0: [Row],
  1: [Row],
  2: [Row],
  [...],
  __proto__: {
    get records: f(),
    get values: f(),
    get contents: f(),
    get nodes: f(),
    forEach: f(),
    remove: f(),
    add: f()
  }
}
```

<h3><code>[Rows]</code> indeces:</h3>
<ul>
  <li>the <code>rows[0]</code>, <code>rows[1]</code>, etc. indeces refer to the <a href="#instance-column"><code>[Row]</code></a> instances for each row in the table</li>
  <li>the <a href="#instance-row"><code>[Row]</code></a> instance contains the collection of the row's cells <em>(and another methods and properties)</em>
    <ul>
      <li>eg. <code>tablio.page.rows[0].record;</code><br/></li>
      <li>eg. <code>tablio.table.rows[3].node;</code><br/></li>
    </ul>
  </li>
</ul>

<h3><code>records</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Array] list of [Object] records of the [Array] <a href="#config-data"><code>config.data</code></a> records collection
    <ul>
      <li>eg. <code>tablio.table.rows.records</code> - gives the access to the <a href="#config-data"><code>config.data</code></a> records of the rows <strong>actually accessible</strong> in the rendered table</li>
      <li>eg. <code>tablio.page.rows.records</code> - gives the access to the <a href="#config-data"><code>config.data</code></a> records of the rows <strong>actually accessible</strong> on the <strong>current page</strong> of the rendered table</li>
    </ul>
  </li>
</ul>

<h3 id="instance-rows-values"><code>values</code> <em>(getter)</em></h3>
<table id="rows-layout">
  <tr><th>Ind.</th><th>Name:</th><th>Age:</th><th>Income:</th></tr>
  <tr><td>1.</td><td>Jessica</td><td>22</td><td>3500$</td></tr>
  <tr><td>2.</td><td>Albert</td><td>35</td><td>2800$</td></tr>
  <tr><td>3.</td><td>Natalie</td><td>26</td><td>6400$</td></tr>
</table>
<ul>
  <li>it returns the [Array] collection of the cells' <strong>values</strong> from the <a href="#config-data"><code>config.data</code></a> records collection<br/><em>(arranged according to the rows layout)</em></li>
  <li>for the table sample <a href="#rows-layout">above</a>, the <code>rows.values</code> property returns the cells collection in the following arrangement:</li>
</ul>

```javascript
[
  [ 1, "Jessica", 22, 3500 ],
  [ 2, "Albert", 35, 2800 ],
  [ 3, "Natalie", 26, 6400 ]
]
```

<h3><code>contents</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Array] collection of the [String] cells' <strong>html contents</strong> from the <code>&lt;td&gt;</code> DOM nodes<br/><em>(arranged according to the rows layout)</em></li>
  <li>for the table sample <a href="#rows-layout">above</a>, the <code>rows.contents</code> property returns the cells collection in the following arrangement:</li>
</ul>


```javascript
[
  [ "1", "Jessica", "22", "3500$" ],
  [ "2", "Albert", "35", "2800$" ],
  [ "3", "Natalie", "26", "6400$" ]
]
```

<h3><code>nodes</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Array] collection of the cells' [HTMLTableCellElement] <code>&lt;td&gt;</code> <strong>DOM nodes</strong><br/><em>(arranged according to the rows layout)</em></li>
  <li><a href="#instance-rows-values">see above</a> how the items are arranged in the returned <code>rows.nodes</code> [Array] object</li>
</ul>

<h3><code>forEach(collection, callback)</code> [Function]</h3>

<ul>
  <li>the [Function] <code>forEach</code> method loops through <strong>all items</strong> of the given collection</li>
  <li>the <code>collection</code> argument must be an [Array] <code>columns.values</code>, <code>columns.contents</code> or <code>columns.nodes</code></li>
  <li>it loops through the <strong>two levels</strong> <em>(column and cell)</em> of [Array] items in the given <code>collection</code>:
    <ul>
      <li>eg. <code>[0][0]</code>, <code>[0][1]</code>, <code>[0][2]</code>, <code>[1][0]</code>, <code>[1][1]</code>, <code>[1][2]</code>, <code>[2][0]</code>, <code>[2][1]</code>, <code>[2][2]</code>, <code>[3][0]</code>, etc.</li>
    </ul>
  </li>
  <li> the <code>callback</code> is called with <strong>the one</strong> [Object] <strong>argument</strong> with the following properties:
    <ul>
      <li><strong><code>item</code></strong>: the collection's item</li>
      <li><strong><code>rowIndex</code></strong>: the [Number] index of the row, that the current cell belongs to</li>
      <li><strong><code>columnIndex</code></strong>: the [Number] index of the column, that the current cell belongs to</li>
      <li><strong><code>totalIndex</code></strong>: the [Number] index of loop repetition</li>
      <li><strong><code>row</code></strong>: the <code>[Row]</code> instance of the row, that the current cell belongs to</li>
      <li><strong><code>column</code></strong>: the <code>[Column]</code> instance of the column, that the current cell belongs to</li>
      <li><strong><code>cell</code></strong>: the <code>[Cell]</code> instance of the current cell</li>
    </ul>
  </li>
</ul>

<h3><code>remove(RowIndicator, output)</code> [Function]</h3>
<ul>
  <li>the <code>remove</code> method allows to remove the whole row</li>
  <li>The <a href="#row-indicator"> <code>RowIndicator</code> </a> argument must be any value <em>(or object)</em> that indicates the row to be removed</li>
  <li>the table will be re-rendered without the row</li>
  <li>the [Boolean] <code>output</code> argument, if set to <code>true</code>, removes both the row from the table and the record from the <a href="#config-data"><code>config.data</code></a> <em>(the updated [Object] <a href="#config-data"><code>config.data</code></a> can be for example sent to the server)</em></li>
  <li>eg. <code>tablio.page.rows.remove(0)</code></li>
</ul>

<h3><code>add(record, RowIndicator, after, output)</code> [Function]</h3>
<ul>
  <li>the <code>add</code> method allows to add the new row</li>
  <li>the <code>record</code> argument must be an [Object] object and must respect the <a href="#config-data"><code>config.data</code></a> <strong>record</strong> types restrictions</li>
  <li>the new row will be added based on the <code>record</code> values</li>
  <li>the <a href="#row-indicator"> <code>RowIndicator</code> </a> argument must be any value <em>(or object)</em> that indicate the <strong><code>adjacent row</code></strong> of the <strong>new row</strong></li>
  <li>the <code>after</code> argument, if set to <code>true</code>, indicates that the <strong>new row</strong> should be placed <strong>after</strong> the <strong>adjacent row</strong> <em>(otherwise, the <code>new row</code> is placed <strong>before</strong> the <strong>adjacent row</strong>)</em></li>
  <li>the table will be re-rendered with the new row</li>
  <li>the [Boolean] <code>output</code> argument, if set to <code>true</code>, adds both the new row to the table and the given <code>record</code> argument to the <a href="#config-data"><code>config.data</code></a> <em>(the updated [Object] <a href="#config-data"><code>config.data</code></a> can be for example sent to the server)</em></li>
  <li>eg. <code>tablio.page.rows.add({ name: "Julia", age: 18, income:1950 }, 0, false, true)</code></li>
</ul>

<h2 id="instance-row-method"><code>row(RowIndicator)</code> [Function]</h2>
<ul>
  <li>the [Function] <code>row</code> method gets the access to the <a href="#instance-row"><code>[Row]</code></a> instance of the desired row, that contain the cells collection of this row</li>
  <li>The <a href="#row-indicator"> <code>RowIndicator</code> </a> argument must be any value <em>(or object)</em> that indicates the row that the desired cell belongs to</li>
  <li>eg. <code>tablio.data.row(0)</code>, <code>tablio.page.row(5)</code></li>
</ul>


<p>The [Function] <code>row</code> method is accessible via:</p>

<ul>
  <li><code>tablio.data.row(RowIndicator)</code></li>
  <li><code>tablio.table.row(RowIndicator)</code></li>
  <li><code>tablio.page.row(RowIndicator)</code></li>
</ul>

<h3 id="instance-row">The returned <code>[Row]</code> properties and methods:</h3>

```console
Row {
  0: [Cell],
  1: [Cell],
  2: [Cell],
  [...],
  __proto__: {
    get record: f(),
    get node: f(),
    get values: f(),
    get contents: f(),
    get nodes: f(),
    remove: f(),
    update: f(),
    cell: f()
  }
}
```


<h3><code>[Row]</code> indeces:</h3>
<ul>
  <li>the <code>[0]</code>, <code>[1]</code>, etc. indeces refer to the <a href="#instance-cell"><code>[Cell]</code></a> instances of the cells of this row
    <ul>
      <li>eg. <code>tablio.page.row(0)[0].value;</code><br/></li>
      <li>eg. <code>tablio.table.row(5)[2].update("Amanda");</code><br/></li>
    </ul>
  </li>
</ul>

<h3><code>record</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Object] record of the <a href="#config-data"><code>config.data</code></a> records collection for this row
    <ul>
      <li>eg. <code>tablio.table.row(3).record</code> - gives the access to the <a href="#config-data"><code>config.data</code></a> record of the fourth row of the rendered table</li>
      <li>eg. <code>tablio.page.row(0).record</code> - gives the access to the <a href="#config-data"><code>config.data</code></a> record of the first row of the <strong>current page</strong> of the rendered table</li>
    </ul>
  </li>
  <li>it works alike for <code>tablio.data.row().record</code>, <code>tablio.table.row().record</code>, <code>tablio.page.row().record</code></code></li>
</ul>

<h3><code>node</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [HTMLTableRowElement] <code>&lt;tr&gt;</code> <strong>DOM node</strong> of the row</li>
  <li>it works alike for <code>tablio.data.row().node</code>, <code>tablio.table.row().node</code>, <code>tablio.page.row().node</code></code></li>
</ul>

<h3><code>values</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Array] list of cells' <strong>values</strong> <em>(the cells of this row)</em> from the <a href="#config-data"><code>config.data</code></a> records collection</li>
  <li>eg. <code>[1, "Jessica", 22, 3500]</code>, <code>[3, "Natalie", 26, 6400]</code></li>
</ul>

<h3><code>contents</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Array] list of the [String] cells' <strong>html contents</strong> <em>(the cells of this row)</em> from the <code>&lt;td&gt;</code> DOM nodes</li>
  <li>eg. <code>["2", "Albert", "35", "2800$"]</code>, <code>["3", "Natalie", "26", "6400$"]</code></li>
</ul>

<h3><code>nodes</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Array] list of the cells' [HTMLTableCellElement] <code>&lt;td&gt;</code> <strong>DOM nodes</strong> <em>(the cells of this row)</em></li>
</ul>

<h3><code>remove(output)</code> [Function]</h3>
<ul>
  <li>the <code>remove</code> method allows to remove the whole row</li>
  <li>the table will be re-rendered without the removed row</li>
  <li>the [Boolean] <code>output</code> argument, if set to <code>true</code>, removes both the row from the table and the record from the <a href="#config-data"><code>config.data</code></a> <em>(the updated [Object] <a href="#config-data"><code>config.data</code></a> can be for example sent to the server)</em></li>
  <li>eg. <code>tablio.page.row(tablio.control.pageRows - 1).remove()</code></li>
</ul>

<h3><code>update(record, output)</code> [Function]</h3>
<ul>
  <li>the <code>update</code> method allows to update the whole row</li>
  <li>the <code>record</code> argument must be an [Object] object and must respect the <a href="#config-data"><code>config.data</code></a> <strong>record</strong> types restrictions</li>
  <li>the row will be re-rendered according to the <code>record</code> values</li>
  <li>the [Boolean] <code>output</code> argument, if set to <code>true</code>, updates both the row in the table and the <a href="#config-data"><code>config.data</code></a> record <em>(the updated [Object] <a href="#config-data"><code>config.data</code></a> can be for example sent to the server)</em></li>
  <li>eg. <code>tablio.page.row(3).update({ name:'Jessica', age: 24, income:4800 }, true)</code></li>
  <li>eg. <code>tablio.data.row(340).update({ name:'Albert', age: 37, income:2900 })</code></li>
</ul>

<h3><code>cell(ColumnIndicator)</code> [Function]</h3>
<ul>
  <li>it returns the <a href="#instance-cell"> <code>[Cell]</code> </a> instance reference for the selected cell of the row</li>
  <li>the <a href="#column-indicator"><code>ColumnIndicator</code></a> argument must be any value <em>(or object)</em> that indicates the desired column</li>
  <li>eg. <code>tablio.page.row(2).cell('names')</code>, <code>tablio.data.row(0).cell('income')</code></li>
</ul>










<h2 id="instance-cell-method"><code>cell(ColumnIndicator, RowIndicator)</code> [Function]</h2>
<ul>
  <li>the [Function] <code>cell</code> method gets the access to the <a href="#instance-cell"><code>[Cell]</code></a> instance of the desired cell, that stores all cell's data</li>
  <li>the <a href="#column-indicator"><code>ColumnIndicator</code></a> and the <a href="#row-indicator"> <code>RowIndicator</code></a> arguments must be any value <em>(or object)</em> that indicate the column and the row that the desired cell belongs to</li>
  <li>eg. <code>tablio.data.cell('names', 10)</code>, <code>tablio.page.cell('income', 0)</code></li>
</ul>


<p>The [Function] <code>cell</code> method is accessible via:</p>

<ul>
  <li><code>tablio.data.cell(ColumnIndicator, RowIndicator)</code></li>
  <li><code>tablio.table.cell(ColumnIndicator, RowIndicator)</code></li>
  <li><code>tablio.page.cell(ColumnIndicator, RowIndicator)</code></li>
</ul>

<h3 id="instance-cell">The returned <code>[Cell]</code> properties and methods:</h3>

```console
Cell {
  __proto__: {
    get header: f(),
    get identifier: f(),
    get record: f(),
    get row: f(),
    get value: f(),
    get content: f(),
    get node: f(),
    update: f()
  }
}
```

<h3><code>header</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [String] <strong>header</strong> of the column <em>(according to the <strong>column</strong> <a href="#config-column-header"><code>header</code></a> property settings)</em> that the cell belongs to</li>
  <li>it works alike for <code>tablio.data.cell().header</code>, <code>tablio.table.cell().header</code> and <code>tablio.page.cell().header</code></li>
</ul>

<h3><code>identifier</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [String] <strong>identifier</strong> of the column <em>(according to the <strong>column</strong><a href="#config-column-id"><code>id</code></a> property settings)</em> that the cell belongs to</li>
  <li>it works alike for <code>tablio.data.cell().identifier</code>, <code>tablio.table.cell().identifier</code>, <code>tablio.page.cell().identifier</code></li>
</ul>

<h3><code>record</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [Object] record of the <a href="#config-data"><code>config.data</code></a> records collection for the row, that the cell belongs to 
    <ul>
      <li>eg. <code>tablio.table.cell('names', 3).record</code> - gives the access to the <a href="#config-data"><code>config.data</code></a> record of the fourth row of the rendered table</li>
      <li>eg. <code>tablio.page.cell('income', 0).record</code> - gives the access to the <a href="#config-data"><code>config.data</code></a> record of the first row of the <strong>current page</strong> of the rendered table</li>
    </ul>
  </li>
  <li>it works alike for <code>tablio.data.cell().record</code>, <code>tablio.table.cell().record</code>, <code>tablio.page.cell().record</code></code></li>
</ul>

<h3><code>row</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [HTMLTableRowElement] <code>&lt;tr&gt;</code> <strong>DOM node</strong> of the row, that the cell belongs to</li>
  <li>it works alike for <code>tablio.data.cell().node</code>, <code>tablio.table.cell().node</code>, <code>tablio.page.cell().node</code></code></li>
</ul>

<h3><code>value</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the cell's <strong>value</strong> from the <a href="#config-data"><code>config.data</code></a> records collection</li>
  <li>eg. <code>"Jessica"</code>, <code>22</code>, <code>6400</code></li>
</ul>

<h3><code>content</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the [String] cell's <strong>html content</strong> from the <code>&lt;td&gt;</code> DOM node</li>
  <li>eg. <code>"Albert"</code>, <code>"26"</code>, <code>"6400$"</code></li>
</ul>

<h3><code>node</code> <em>(getter)</em></h3>
<ul>
  <li>it returns the cell's [HTMLTableCellElement] <code>&lt;td&gt;</code> <strong>DOM node</strong></li>
</ul>

<h3><code>update(value, output)</code> [Function]</h3>
<ul>
  <li>the <code>update</code> method allows to update the cell</li>
  <li>the <code>value</code> argument must respect the <a href="#config-data"><code>config.data</code></a> <strong>record</strong> types restrictions</li>
  <li>the cell will be re-rendered according to the <code>value</code></li>
  <li>the [Boolean] <code>output</code> argument, if set to <code>true</code>, updates both the cell in the table and the <a href="#config-data"><code>config.data</code></a> record's property <em>(the updated [Object] <a href="#config-data"><code>config.data</code></a> can be for example sent to the server)</em></li>
  <li>eg. <code>tablio.page.cell('names', 3).update('Jessica', true)</code></li>
  <li>eg. <code>tablio.data.cell('income', 12).update(4850, false)</code></li>
</ul>

<h2>Indicators</h2>

<h3 id="column-indicator"><code>Column indicator</code></h3>
<p>
There are few <strong>column indicators</strong>, that can be used, to indicate the desired column.<br/>
Any of the column indicators can be used as the methods' argument, to indicate the desired column.<br/>
The column indicator can be:
</p>
<ul>
  <li>the <strong>column</strong> <code>id</code> <em>(according to the <strong>column</strong><a href="#config-column-id"><code>id</code></a> property settings)</em></li>
  <li>the <code>&lt;th&gt;</code> or <code>&lt;td&gt;</code> html <strong>DOM node</strong> that belongs to this <strong>column</strong></li>
  <li>the [Number] index of the <strong>column</strong> <em>(according to the index of the [Object] <strong>column</strong> item defined in the [Array] <a href="#config-columns"><code>config.columns</code></a> property)</em></li>
  <li>the <a href="#instance-cell"><code>[Cell]</code></a> instance of the cell that belongs to this <strong>column</strong></li>
  <li>the <a href="#instance-column"><code>[Column]</code></a> instance of the <strong>column</strong></li>
</ul>

<h3 id="row-indicator"><code>Row indicator</code></h3>
<p>
  There are few <strong>row indicators</strong>, that can be used, to indicate the desired row.<br/>
  Any of the row indicators can be used as the methods' argument, to indicate the desired row.<br/>
  The row indicator can be:
</p>
<ul>
  <li>the [Number] <strong>index</strong> of the <strong>row</strong>:
    <ul>
      <li>for <code>tablio.<a href="#instance-cells-access">data</a></code>:
        <ul>
          <li>the index of the record of this row in the [Array] <a href="#config-data"><code>config.data</code></a> records collection</li>
          <li>eg. <code>tablio.data.row(15)</code>, <code>tablio.data.cell('names', 155)</code>, <code>tablio.data.column('names').cell(0)</code></li>
        </ul>
      </li>
      <li>for <code>tablio.<a href="#instance-cells-access">table</a></code>:
        <ul>
          <li>the index of the row in the rendered table</li>
          <li>eg. <code>tablio.table.row(0)</code>, <code>tablio.table.cell('age', 10)</code>, <code>tablio.table.rows.remove(5)</code></li>
        </ul>
      </li>
      <li>for <code>tablio.<a href="#instance-cells-access">page</a></code>:
        <ul>
          <li>the index of the row on the <strong>current</strong> page of the table</li>
          <li>eg. <code>tablio.page.row(2)</code>, <code>tablio.page.cell('income', 0)</code>, <code>tablio.page.rows.add({ name: "Julia", age: 18, income:1950 }, 15, false, true)</code></li>
        </ul>
      </li>
    </ul>
  </li>
  <li>the [Object] <strong>record</strong> of the <a href="#config-data"><code>config.data</code></a> records collection of this <strong>row</strong></li>
  <li>the <code>&lt;th&gt;</code> or <code>&lt;td&gt;</code> html <strong>DOM node</strong> that belongs to this <strong>row</strong></li>
  <li>the <code>&lt;tr&gt;</code> html <strong>DOM node</strong> of this <strong>row</strong></li>
  <li>the <a href="#instance-cell"><code>[Cell]</code></a> instance of the cell that belongs to this <strong>row</strong></li>
  <li>the <a href="#instance-row"><code>[Row]</code></a> instance of the <strong>row</strong></li>
</ul>