/*! Typograf | © 2015 Denis Seleznev | https://github.com/typograf/typograf/ */

(function(root, factory) {

if(typeof define === 'function' && define.amd) {
    define('typograf', [], factory);
} else if (typeof exports === 'object') {
    module.exports = factory();
} else {
    root.Typograf = factory();
}

}(this, function() {

'use strict';
