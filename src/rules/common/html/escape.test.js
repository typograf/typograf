import { typografRuleTest } from '../../../../test/helpers';

typografRuleTest(['common/html/escape', [
    ['Hello, world!<br/>Hello world!<p>Hello world!</p>', 'Hello, world!&lt;br&#x2F;&gt;Hello world!&lt;p&gt;Hello world!&lt;&#x2F;p&gt;']
]]);
