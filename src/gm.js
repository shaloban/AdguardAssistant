/**
 * Gm api wrapper
 * @param ADG_addRule
 * @param ADG_temporaryDontBlock
 * @param ADG_sendAbuse
 * @param ADG_isFiltered
 * @param ADG_changeFilteringState
 * @returns {{GM_getValue, GM_setValue, GM_getResourceText, GM_addStyle, ADG_addRule: *, ADG_temporaryDontBlock: *, ADG_sendAbuse: *, ADG_isFiltered: *, ADG_changeFilteringState: *}}
 * @constructor
 */
var GM = function (ADG_addRule, ADG_temporaryDontBlock, ADG_sendAbuse, ADG_isFiltered, ADG_changeFilteringState) {
    if (!ADG_addRule) {
        ADG_addRule = function (rule) {
            alert('GM_api is not supported. ' + rule + ' rule added');
        };
    }

    if (!ADG_sendAbuse) {
        ADG_sendAbuse = function (url) {
            alert('GM_api is not supported. ' + url + 'abused');
        };
    }

    if (!ADG_temporaryDontBlock) {
        ADG_temporaryDontBlock = function (timeout) {
            alert('GM_api is not supported. ' + 'Do not block for ' + timeout + ' seconds');
        };
    }

    if (!ADG_isFiltered) {
        ADG_isFiltered = function () {
            return true;
        };
    }

    if (!ADG_changeFilteringState) {
        ADG_changeFilteringState = function () {
            alert('GM_api is not supported. ' + 'State changed');
        };
    }

    return {
        GM_getValue: GM_getValue,
        GM_setValue: GM_setValue,
        GM_getResourceText: GM_getResourceText,
        GM_addStyle: GM_addStyle,
        ADG_addRule: ADG_addRule,
        ADG_temporaryDontBlock: ADG_temporaryDontBlock,
        ADG_sendAbuse: ADG_sendAbuse,
        ADG_isFiltered: ADG_isFiltered,
        ADG_changeFilteringState: ADG_changeFilteringState
    };
};