/* global require, describe, it */
var expect = require('chai').expect;

describe('ArabicReshaper', function() {
  var ArabicReshaper = require('../dist/');

  it('should convert an isolated letter', function() {
    var a = String.fromCharCode(0x0633), b = String.fromCharCode(0xFEB1);
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });

  it('should convert two letter', function() {
    var a = String.fromCharCode(0x0633) + String.fromCharCode(0x0633),
        b = String.fromCharCode(0xFEB3) + String.fromCharCode(0xFEB2);
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });

  it('should convert three letter', function() {
    var a = String.fromCharCode(0x0633) + String.fromCharCode(0x0633) + String.fromCharCode(0x0633),
        b = String.fromCharCode(0xFEB3) + String.fromCharCode(0xFEB4) + String.fromCharCode(0xFEB2);
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

  it('should respect spaces', function() {
    var a = [String.fromCharCode(0x0633), String.fromCharCode(0x0633)].join(' '),
        b = [String.fromCharCode(0xFEB1), String.fromCharCode(0xFEB1)].join(' ');
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });

  it('should convert a sentence', function() {
    var a = 'السلام عليكم', b = 'ﺍﻟﺴﻼﻡ ﻋﻠﻴﻜﻢ';
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });

  it('should respect transparent characters', function() {
    var a = 'السّلاْمُ عَليكم', b = 'ﺍﻟﺴّﻼْﻡُ ﻋَﻠﻴﻜﻢ';
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });

  it('respect foreign characters', function() {
    var a = String.fromCharCode(0x0628) + String.fromCharCode(0x0628) + String.fromCharCode(0x0628) + 'a' +
            String.fromCharCode(0x0628) + String.fromCharCode(0x0628) + 'a' +
            String.fromCharCode(0x0628),
        b = String.fromCharCode(0xFE91) + String.fromCharCode(0xFE92) + String.fromCharCode(0xFE90) + 'a' +
            String.fromCharCode(0xFE91) + String.fromCharCode(0xFE90) + 'a' +
            String.fromCharCode(0xFE8F);
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });

  it('should convert compound chars correctly', function() {
    var a = 'لالا للا', b = 'ﻻﻻ ﻟﻼ';
    expect(ArabicReshaper.convertArabic(a)).to.equal(b);
    expect(ArabicReshaper.convertArabicBack(b)).to.equal(a);
  });
});
