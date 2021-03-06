/**
 * Object that manages localizations
 * @returns {{getMessage: Function, translateElement: Function}}
 * @constructor
 */
/* global en, ru, uk, pl, de, zh, he, it, fa, tr, ja, ar, es_419, pt_BR, ko, AdguardSettings */

var Localization = function() { // jshint ignore:line
    var currentLocale = null, locale;
    var SupportedLocales = {
        'en': en,
        'ru': ru,
        'uk': uk,
        'pl': pl,
        'de': de,
        'zh': zh,
        'he': he,
        'it': it,
        'fa': fa,
        'tr': tr,
        'ja': ja,
        'ar': ar,
        'es': es_419,
        'pt': pt_BR,
        'ko': ko
    };

    if (typeof AdguardSettings !== 'undefined') {
        locale = AdguardSettings.locale;
    } else if (navigator.languages) {
        locale = navigator.languages[0];
    } else if (navigator.language) {
        locale = navigator.language.split('-')[0];
    }

    if (SupportedLocales[locale]) {
        currentLocale = locale;
    } else {
        currentLocale = 'en';
    }

    var getMessage = function (messageId) {
        var message = SupportedLocales[currentLocale][messageId];
        if (!message) {
            throw messageId + ' not localized';
        }
        return SupportedLocales[currentLocale][messageId].message;
    };

    var translateElement = function (element, message) {
        try {
            while (element.lastChild) {
                element.removeChild(element.lastChild);
            }
            processString(message, element);
        } catch (ex) {
            // Ignore exceptions
        }
    };

    var processString = function (str, element) {
        var el;

        var match1 = /^([^]*?)<(a|strong|span|i)([^>]*)>(.*?)<\/\2>([^]*)$/m.exec(str);
        var match2 = /^([^]*?)<(br|input)([^>]*)\/?>([^]*)$/m.exec(str);
        if (match1) {

            processString(match1[1], element);

            el = createElement(match1[2], match1[3]);

            processString(match1[4], el);
            element.appendChild(el);

            processString(match1[5], element);

        } else if (match2) {

            processString(match2[1], element);

            el = createElement(match2[2], match2[3]);
            element.appendChild(el);

            processString(match2[4], element);

        } else {
            element.appendChild(document.createTextNode(str.replace(/&nbsp;/g, '\u00A0')));
        }
    };

    var createElement = function (tagName, attributes) {

        var el = document.createElement(tagName);
        if (!attributes) {
            return el;
        }

        var attrs = attributes.split(/([a-z]+='[^']+')/);
        for (var i = 0; i < attrs.length; i++) {
            var attr = attrs[i].trim();
            if (!attr) {
                continue;
            }
            var index = attr.indexOf("=");
            var attrName;
            var attrValue;
            if (index > 0) {
                attrName = attr.substring(0, index);
                attrValue = attr.substring(index + 2, attr.length - 1);
            }
            if (attrName && attrValue) {
                el.setAttribute(attrName, attrValue);
            }
        }
        return el;
    };

    return {
        getMessage: getMessage,
        translateElement: translateElement
    };
};
