/* global require, describe, it */
var expect = require('chai').expect;

describe('ArabicReshaper', function() {
  var ArabicReshaper = require('..');

  it('should convert an isolated letter', function() {
  	var a = 'س', b = String.fromCharCode(0xFEB1);
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });

  it('should convert two letter', function() {
  	var a = 'سس', b = String.fromCharCode(0xFEB3)+String.fromCharCode(0xFEB2);
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });

  it('should convert three letter', function() {
  	var a = 'سسس', b = String.fromCharCode(0xFEB3)+String.fromCharCode(0xFEB4)+String.fromCharCode(0xFEB2);
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });

  it('should convert a word', function() {
  	var a = 'السلام', b = 'ﺍﻟﺴﻼﻡ';
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });

  it('should convert another word', function() {
  	var a = 'عليكم', b = 'ﻋﻠﻴﻜﻢ';
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });

  it('should convert a sentence', function() {
  	var a = 'السلام عليكم', b = 'ﺍﻟﺴﻼﻡ ﻋﻠﻴﻜﻢ';
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });
});
