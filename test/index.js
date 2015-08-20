/* global require, describe, it */
var assert = require('assert');

describe('ArabicReshaper', function() {
  var ArabicReshaper = require('..');

  var a = 'السلام عليكم', b = 'ﺍﻟﺴﻼﻡ ﻋﻠﻴﻜﻢ';

  it('should convert', function() {
    assert.equal(b, ArabicReshaper.convertArabic(a));
  });
  it('should convert back', function() {
    assert.equal(a, ArabicReshaper.convertArabicBack(b));
  });
});
