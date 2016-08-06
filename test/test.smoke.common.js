const assert = require('chai').assert;
const Typograf = require('../build/typograf');
const t = new Typograf();
const commonTests = [
    [
        '  start  <script>  var a = 10;  \n\n\n</script>  end  ',
        'start <script>  var a = 10;  \n\n\n</script> end'
    ],
    [
        '              <pre>6<code>78</code>90</pre>  \n  <code>6<pre>7</pre></code>    ',
        '<pre>6<code>78</code>90</pre>\n  <code>6<pre>7</pre></code>'
    ],
    [
        '   <pre>   1   <code>   23   </code>   45   </pre>    <code>   1   <pre>   2   </pre>   </code>   ',
        '<pre>   1   <code>   23   </code>   45   </pre> <code>   1   <pre>   2   </pre>   </code>'
    ],
    [
        '  <![CDATA[  Hello   world!  ]]>  ',
        '<![CDATA[  Hello   world!  ]]>'
    ],
    [
        '  <![CDDATA[  Hello   world!  ]]>  ',
        '<![CDDATA[Hello world!]]>'
    ],
    [
        '  <!--  Hello   world!  -->  ',
        '<!--  Hello   world!  -->'
    ],
    [
        '  <!-  Hello   world!  ->  ',
        '<! - Hello world! →'
    ],
    [
        '  <a \n href="#hash">  Hello   world!  </a>  ',
        '<a \n href="#hash"> Hello world! </a>'
    ],
    [
        '  <a href="#hash">  Hello   world!  </a>  ',
        '<a href="#hash"> Hello world! </a>'
    ],
    [
        '  <pre>  Hello   world!  </pre>   Hello   world!   <pre>  Hello   world!  </pre>  ',
        '<pre>  Hello   world!  </pre> Hello world! <pre>  Hello   world!  </pre>'
    ],
    [
        '  <pre class="red">  Hello   world!  </pre>  ',
        '<pre class="red">  Hello   world!  </pre>'
    ],
    [
        '  <pre \n class="red">  Hello   world!  </pre>  ',
        '<pre \n class="red">  Hello   world!  </pre>'
    ],
    [
        '  <pre2>  Hello   world!  <pre>  Hello   world!  </pre>  </pre2>  ',
        '<pre2> Hello world! <pre>  Hello   world!  </pre> </pre2>'
    ],
    [
        '<p>&lt;iframe src="//vk.com/video_ext.php?oid=1048842&amp;id=151929844&amp;hash=4b69ed3d4d09bd5c&amp;hd=2" width="853" height="480"  frameborder="0"&gt;&lt;/iframe&gt;</p>',
        '<p>&lt;iframe src="//vk.com/video_ext.php?oid=1048842&amp;id=151929844&amp;hash=4b69ed3d4d09bd5c&amp;hd=2" width="853" height="480"  frameborder="0"&gt;&lt;/iframe&gt;</p>'
    ],
    [
        '<div>    Text  &lt;br/&gt;     Text  &lt;br/&gt;  </div>',
        '<div> Text &lt;br/&gt; Text &lt;br/&gt; </div>'
    ],
    ['1\r\n2\r\n3', '1\n2\n3'], // Windows
    [0, '0'],
    [null, 'null'],
    ['', ''],
    [undefined, 'undefined']
];

describe('common/smoke', function() {
    commonTests.forEach(function(item) {
        it(String(item[0]), function() {
            assert.equal(t.execute(item[0]), item[1]);
        });
    });
});

describe('common/smoke double execute', function() {
    commonTests.forEach(function(item) {
        it(String(item[0]), function() {
            var result = t.execute(item[0]);
            assert.equal(t.execute(result), item[1]);
        });
    });
});

it('enable common/html/escape', function() {
    var tp = new Typograf();
    tp.enable('common/html/escape');

    var escapeTests = [
        ['<p align="center">\nHello world!\n</p>',
        '&lt;p align=&quot;center&quot;&gt;\nHello world!\n&lt;&#x2F;p&gt;']
    ];

    escapeTests.forEach(function(el) {
        assert.equal(tp.execute(el[0]), el[1]);
    });
});
