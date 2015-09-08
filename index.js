/**
 * Javascript Arabic Reshaper by Louy Alakkad
 * https://github.com/louy/Javascript-Arabic-Reshaper
 * Based on (http://git.io/vsnAd)
 */
(function (root, factory) {
	var name = 'ArabicReshaper';
	/* global define, module */

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory();
	} else {
		// Browser globals
		root[name] = factory();
	}
}(this, function () {
	var charsMap = [
			/* code,isolated,initial, medial, final */
			[ 0x0621, 0xFE80, null  , null  , null   ], /* HAMZA */
			[ 0x0622, 0xFE81, null  , null  , 0xFE82 ], /* ALEF_MADDA */
			[ 0x0623, 0xFE83, null  , null  , 0xFE84 ], /* ALEF_HAMZA_ABOVE */
			[ 0x0624, 0xFE85, null  , null  , 0xFE86 ], /* WAW_HAMZA */
			[ 0x0625, 0xFE87, null  , null  , 0xFE88 ], /* ALEF_HAMZA_BELOW */
			[ 0x0626, 0xFE89, 0xFE8B, 0xFE8C, 0xFE8A ], /* YEH_HAMZA */
			[ 0x0627, 0xFE8D, null  , null  , 0xFE8E ], /* ALEF */
			[ 0x0628, 0xFE8F, 0xFE91, 0xFE92, 0xFE90 ], /* BEH */
			[ 0x0629, 0xFE93, null  , null  , 0xFE94 ], /* TEH_MARBUTA */
			[ 0x062A, 0xFE95, 0xFE97, 0xFE98, 0xFE96 ], /* TEH */
			[ 0x062B, 0xFE99, 0xFE9B, 0xFE9C, 0xFE9A ], /* THEH */
			[ 0x062C, 0xFE9D, 0xFE9F, 0xFEA0, 0xFE9E ], /* JEEM */
			[ 0x062D, 0xFEA1, 0xFEA3, 0xFEA4, 0xFEA2 ], /* HAH */
			[ 0x062E, 0xFEA5, 0xFEA7, 0xFEA8, 0xFEA6 ], /* KHAH */
			[ 0x062F, 0xFEA9, null  , null  , 0xFEAA ], /* DAL */
			[ 0x0630, 0xFEAB, null  , null  , 0xFEAC ], /* THAL */
			[ 0x0631, 0xFEAD, null  , null  , 0xFEAE ], /* REH */
			[ 0x0632, 0xFEAF, null  , null  , 0xFEB0 ], /* ZAIN */
			[ 0x0633, 0xFEB1, 0xFEB3, 0xFEB4, 0xFEB2 ], /* SEEN */
			[ 0x0634, 0xFEB5, 0xFEB7, 0xFEB8, 0xFEB6 ], /* SHEEN */
			[ 0x0635, 0xFEB9, 0xFEBB, 0xFEBC, 0xFEBA ], /* SAD */
			[ 0x0636, 0xFEBD, 0xFEBF, 0xFEC0, 0xFEBE ], /* DAD */
			[ 0x0637, 0xFEC1, 0xFEC3, 0xFEC4, 0xFEC2 ], /* TAH */
			[ 0x0638, 0xFEC5, 0xFEC7, 0xFEC8, 0xFEC6 ], /* ZAH */
			[ 0x0639, 0xFEC9, 0xFECB, 0xFECC, 0xFECA ], /* AIN */
			[ 0x063A, 0xFECD, 0xFECF, 0xFED0, 0xFECE ], /* GHAIN */
			[ 0x0640, 0x0640, 0x0640, 0x0640, 0x0640 ], /* TATWEEL */
			[ 0x0641, 0xFED1, 0xFED3, 0xFED4, 0xFED2 ], /* FEH */
			[ 0x0642, 0xFED5, 0xFED7, 0xFED8, 0xFED6 ], /* QAF */
			[ 0x0643, 0xFED9, 0xFEDB, 0xFEDC, 0xFEDA ], /* KAF */
			[ 0x0644, 0xFEDD, 0xFEDF, 0xFEE0, 0xFEDE ], /* LAM */
			[ 0x0645, 0xFEE1, 0xFEE3, 0xFEE4, 0xFEE2 ], /* MEEM */
			[ 0x0646, 0xFEE5, 0xFEE7, 0xFEE8, 0xFEE6 ], /* NOON */
			[ 0x0647, 0xFEE9, 0xFEEB, 0xFEEC, 0xFEEA ], /* HEH */
			[ 0x0648, 0xFEED, null  , null  , 0xFEEE ], /* WAW */
			[ 0x0649, 0xFEEF, null  , null  , 0xFEF0 ], /* ALEF_MAKSURA */
			[ 0x064A, 0xFEF1, 0xFEF3, 0xFEF4, 0xFEF2 ], /* YEH */
		],
		combCharsMap = [
			[ [ 0x0644, 0x0622 ], 0xFEF5, null, null, 0xFEF6 ], /* LAM_ALEF_MADDA */
			[ [ 0x0644, 0x0623 ], 0xFEF7, null, null, 0xFEF8 ], /* LAM_ALEF_HAMZA_ABOVE */
			[ [ 0x0644, 0x0625 ], 0xFEF9, null, null, 0xFEFA ], /* LAM_ALEF_HAMZA_BELOW */
			[ [ 0x0644, 0x0627 ], 0xFEFB, null, null, 0xFEFC ], /* LAM_ALEF */
		],
		transChars = [
			0x0610, /* ARABIC SIGN SALLALLAHOU ALAYHE WASSALLAM */
			0x0612, /* ARABIC SIGN ALAYHE ASSALLAM */
			0x0613, /* ARABIC SIGN RADI ALLAHOU ANHU */
			0x0614, /* ARABIC SIGN TAKHALLUS */
			0x0615, /* ARABIC SMALL HIGH TAH */
			0x064B, /* ARABIC FATHATAN */
			0x064C, /* ARABIC DAMMATAN */
			0x064D, /* ARABIC KASRATAN */
			0x064E, /* ARABIC FATHA */
			0x064F, /* ARABIC DAMMA */
			0x0650, /* ARABIC KASRA */
			0x0651, /* ARABIC SHADDA */
			0x0652, /* ARABIC SUKUN */
			0x0653, /* ARABIC MADDAH ABOVE */
			0x0654, /* ARABIC HAMZA ABOVE */
			0x0655, /* ARABIC HAMZA BELOW */
			0x0656, /* ARABIC SUBSCRIPT ALEF */
			0x0657, /* ARABIC INVERTED DAMMA */
			0x0658, /* ARABIC MARK NOON GHUNNA */
			0x0670, /* ARABIC LETTER SUPERSCRIPT ALEF */
			0x06D6, /* ARABIC SMALL HIGH LIGATURE SAD WITH LAM WITH ALEF MAKSURA */
			0x06D7, /* ARABIC SMALL HIGH LIGATURE QAF WITH LAM WITH ALEF MAKSURA */
			0x06D8, /* ARABIC SMALL HIGH MEEM INITIAL FORM */
			0x06D9, /* ARABIC SMALL HIGH LAM ALEF */
			0x06DA, /* ARABIC SMALL HIGH JEEM */
			0x06DB, /* ARABIC SMALL HIGH THREE DOTS */
			0x06DC, /* ARABIC SMALL HIGH SEEN */
			0x06DF, /* ARABIC SMALL HIGH ROUNDED ZERO */
			0x06E0, /* ARABIC SMALL HIGH UPRIGHT RECTANGULAR ZERO */
			0x06E1, /* ARABIC SMALL HIGH DOTLESS HEAD OF KHAH */
			0x06E2, /* ARABIC SMALL HIGH MEEM ISOLATED FORM */
			0x06E3, /* ARABIC SMALL LOW SEEN */
			0x06E4, /* ARABIC SMALL HIGH MADDA */
			0x06E7, /* ARABIC SMALL HIGH YEH */
			0x06E8, /* ARABIC SMALL HIGH NOON */
			0x06EA, /* ARABIC EMPTY CENTRE LOW STOP */
			0x06EB, /* ARABIC EMPTY CENTRE HIGH STOP */
			0x06EC, /* ARABIC ROUNDED HIGH STOP WITH FILLED CENTRE */
			0x06ED, /* ARABIC SMALL LOW MEEM */
		];

	function characterMapContains( c ) {
		for ( var i = 0 ; i < charsMap.length ; ++i ) {
			if ( charsMap[ i ][0] === c ) {
				return true;
			}
		}
		return false;
	}
	function getCharRep( c ) {
		for ( var i = 0 ; i < charsMap.length ; ++i ) {
			if ( charsMap[ i ][0] === c ) {
				return charsMap[i];
			}
		}
		return false;
	}
	function getCombCharRep( c1, c2 ) {
		for ( var i = 0 ; i < combCharsMap.length ; ++i ) {
			if ( combCharsMap[i][0][0] === c1 && combCharsMap[i][0][1] === c2 ) {
				return combCharsMap[i];
			}
		}
		return false;
	}
	function isTransparent( c ) {
		for ( var i = 0 ; i < transChars.length ; ++i ) {
			if ( transChars[i] === c ) {
				return true;
			}
		}
		return false;
	}


	return {
		convertArabic: function( normal ) {
			var crep,
				combcrep,
				shaped = '';

			for ( var i = 0 ; i < normal.length ; ++i ) {
				var current = normal.charCodeAt(i);
				if ( characterMapContains( current ) ) {
					var prev = null,
							next = null,
							prevID = i - 1,
							nextID = i + 1;

					/*
					 Transparent characters have no effect in the shaping process.
					 So, ignore all the transparent characters that are BEFORE the
					 current character.
					 */
					for ( ; prevID >= 0 ; --prevID ) {
						if ( !isTransparent( normal.charCodeAt(prevID) ) ) {
							break;
						}
					}

					prev = ( prevID >= 0 ) ? normal.charCodeAt(prevID) : null;
					crep = prev ? getCharRep( prev ) : false;
					if( ! crep || crep[2] == null && crep[3] == null ) {
						prev = null; // prev character doesn’t connect with its successor
					}

					/*
					 Transparent characters have no effect in the shaping process.
					 So, ignore all the transparent characters that are AFTER the
					 current character.
					 */
					for ( ; nextID < normal.length ; ++nextID ) {
						if ( !isTransparent( normal.charCodeAt(nextID) ) ) {
							break;
						}
					}

					next = ( nextID < normal.length ) ? normal.charCodeAt(nextID) : null;
					crep = next ? getCharRep( next ) : false;
					if( ! crep || crep[3] == null && crep[4] == null ) {
						next = null; // next character doesn’t connect with its predecessor
					}

					/* Combinations */
					if ( current === 0x0644 && next != null &&
						( next === 0x0622 || next === 0x0623 || next === 0x0625 || next === 0x0627) ) {
						combcrep = getCombCharRep(current, next);
						if ( prev != null ) {
							shaped += String.fromCharCode(combcrep[4]);
						} else {
							shaped += String.fromCharCode(combcrep[1]);
						}
						++ i;
						continue;
					}

					crep = getCharRep( current );

					/* Medial */
					if ( prev != null && next != null && crep[3] != null ) {
						shaped += String.fromCharCode(crep[3]);
						continue;
					} else /* Final */
						if ( prev != null && crep[4] != null ) {
						shaped += String.fromCharCode(crep[4]);
						continue;
					} else /* Initial */
						if ( next != null && crep[2] != null ) {
						shaped += String.fromCharCode(crep[2]);
						continue;
					} else /* Isolated */ {
						shaped += String.fromCharCode(crep[1]);
					}
				} else {
					shaped += String.fromCharCode(current);
				}
			}
			return shaped;
		},

		// convert from Arabic Presentation Forms B
		convertArabicBack: function( apfb ) {
			var toReturn = '',
					selectedChar;

			var i, j;

			theLoop:
			for( i = 0 ; i < apfb.length ; ++i ) {
				selectedChar = apfb.charCodeAt(i);

				for( j = 0 ; j < charsMap.length ; ++j ) {
					if( charsMap[j][4] === selectedChar ||
						charsMap[j][2] === selectedChar ||
						charsMap[j][1] === selectedChar ||
						charsMap[j][3] === selectedChar ) {

						toReturn += String.fromCharCode(charsMap[j][0]);

						continue theLoop;
					}
				}

				for( j = 0 ; j < combCharsMap.length ; ++j ) {
					if( combCharsMap[j][4] === selectedChar ||
						combCharsMap[j][2] === selectedChar ||
						combCharsMap[j][1] === selectedChar ||
						combCharsMap[j][3] === selectedChar ) {

						toReturn += String.fromCharCode(combCharsMap[j][0][0]) +
												String.fromCharCode(combCharsMap[j][0][1]);

						continue theLoop;
					}
				}

				toReturn += String.fromCharCode( selectedChar );
			}
			return toReturn;
		},
	};
}));
