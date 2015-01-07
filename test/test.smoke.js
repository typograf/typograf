var assert = require('chai').assert,
    Typograf = require('../dist/typograf'),
    t = new Typograf({lang: 'ru'}),
    tests = [
        ['    Мир - мой мир!    ', 'Мир\u00A0— мой\u00A0мир!'],
        ['Мороз был страшный но яблони выжили.', 'Мороз был страшный, но\u00A0яблони выжили.'],
        ['Стекло двери, которая ведет на веранду, усеяно дождевыми каплями.', 'Стекло двери, которая ведет на\u00A0веранду, усеяно дождевыми каплями.'],
        ['Роман, в котором творческие принципы Достоевского воплощаются в полной мере а удивительное владение сюжетом достигает подлинного расцвета.', 'Роман, в\u00A0котором творческие принципы Достоевского воплощаются в\u00A0полной мере, а\u00A0удивительное владение сюжетом достигает подлинного расцвета.'],
        ['  start  <script>  var a = 10;  \n\n\n</script>  end  ',
            'start <script>  var a = 10;  \n\n\n</script> end'],
        ['              <pre>6<code>78</code>90</pre>  \n  <code>6<pre>7</pre></code>    ',
            '<pre>6<code>78</code>90</pre>\n  <code>6<pre>7</pre></code>'],
        ['   <pre>   1   <code>   23   </code>   45   </pre>    <code>   1   <pre>   2   </pre>   </code>   ',
            '<pre>   1   <code>   23   </code>   45   </pre> <code>   1   <pre>   2   </pre>   </code>'],
        ['  <![CDATA[  Hello   world!!  ]]>  ', '<![CDATA[  Hello   world!!  ]]>'],
        ['  <![CDDATA[  Hello   world!!  ]]>  ', '<![CDDATA[ Hello world! ]]>'],
        ['  <!--  Hello   world!!  -->  ', '<!--  Hello   world!!  -->'],
        ['  <!-  Hello   world!!  ->  ', '<! — Hello world! →'],
        ['  <a \n href="#hash">  Hello   world!!  </a>  ', '<a \n href="#hash"> Hello world! </a>'],
        ['  <a href="#hash">  Hello   world!!  </a>  ', '<a href="#hash"> Hello world! </a>'],
        ['  <pre>  Hello   world!!  </pre>   Hello   world!!   <pre>  Hello   world!!  </pre>  ', '<pre>  Hello   world!!  </pre> Hello world! <pre>  Hello   world!!  </pre>'],
        ['  <pre class="red">  Hello   world!!  </pre>  ', '<pre class="red">  Hello   world!!  </pre>'],
        ['  <pre \n class="red">  Hello   world!!  </pre>  ', '<pre \n class="red">  Hello   world!!  </pre>'],
        ['  <pre2>  Hello   world!!  <pre>  Hello   world!!  </pre>  </pre2>  ', '<pre2> Hello world! <pre>  Hello   world!!  </pre> </pre2>'],
        ['"Энергия соблазна: от внутреннего к внешнему"', '«Энергия соблазна: от\u00A0внутреннего к\u00A0внешнему»'],
        ['1\r\n2\r\n3', '1\n2\n3'], // Windows
        ['1\r\r2\r3', '1\n\n2\n3'], // MacOS
        [0, '0'],
        [null, 'null'],
        ['', ''],
        [undefined, 'undefined']
    ];

describe('ru/smoke', function() {
    tests.forEach(function(item) {
        it(item[0], function() {
            assert.equal(t.execute(item[0]), item[1]);
        });
    });
});
