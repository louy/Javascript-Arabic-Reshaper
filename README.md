# Javascript-Arabic-Reshaper

[![Circle CI](https://img.shields.io/circleci/project/louy/Javascript-Arabic-Reshaper.svg)](https://circleci.com/gh/louy/Javascript-Arabic-Reshaper)
[![Codecov](https://img.shields.io/codecov/c/github/louy/Javascript-Arabic-Reshaper.svg)](https://codecov.io/github/louy/Javascript-Arabic-Reshaper/)
[![Codacy](https://img.shields.io/codacy/7aeab38f4ce043be8e10a14707fdb7a8.svg)](https://www.codacy.com/app/louy/Javascript-Arabic-Reshaper)
[![NPM](https://img.shields.io/npm/v/arabic-reshaper.svg)](https://www.npmjs.com/package/arabic-reshaper)
[![VersionEye](https://img.shields.io/versioneye/d/nodejs/arabic-reshaper.svg)](https://www.versioneye.com/nodejs/arabic-reshaper/)

Reshapes Arabic words to work in non-supported environments and with custom web fonts.

## Installation

    npm i --save arabic-reshaper

## Usage

    var ArabicReshaper = require('arabic-reshaper');
    document.write(ArabicReshaper.convertArabic('السلام عليكم')); // outputs ﺍﻟﺴﻼﻡ ﻋﻠﻴﻜﻢ
