/* global require, describe, it */
var expect = require('chai').expect;

describe('ArabicReshaper', function() {
  var ArabicReshaper = require('..');

  var a = 'السلام عليكم', b = 'ﺍﻟﺴﻼﻡ ﻋﻠﻴﻜﻢ';

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

  it('should convert', function() {
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
  });

  it('should convert back', function() {
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });
});
