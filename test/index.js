/* global require, describe, it */
var expect = require('chai').expect;

describe('ArabicReshaper', function() {
  var ArabicReshaper = require('..');

  var a = 'السلام عليكم', b = 'ﺍﻟﺴﻼﻡ ﻋﻠﻴﻜﻢ';

  it('should convert', function() {
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
  });

  it('should convert back', function() {
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });
});
