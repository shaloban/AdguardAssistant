function triggerEvent(node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent(clickEvent);
}

describe("#DOM Tests", function() {
    it("Adguard is in the DOM", function() {
        var adguardEl = document.getElementsByClassName('adguard-alert')[0];
        expect(adguardEl).to.not.equal(null);
        expect(adguardEl).to.not.equal(undefined);
    });

    it("Adguard is a child of the body", function() {
        var adguardEl = document.getElementsByClassName('adguard-alert')[0];
        expect(adguardEl).to.not.equal(null);
        expect(adguardEl).to.not.equal(undefined);
        expect(adguardEl.parentElement).to.equal(document.body);
    });
});

describe("Adguard iframe", function() {
    before(function() {
        var button = document.getElementsByClassName('adguard-alert')[0];
        expect(button).to.not.equal(null);
        expect(button).to.not.equal(undefined);
        triggerEvent(button, 'click');
    });

    it("Click on button - opening adguard iframe", function() {
        var adguardEl = document.getElementById('adguard-assistant-dialog');
        expect(adguardEl).to.not.equal(null);
        expect(adguardEl).to.not.equal(undefined);
        expect(adguardEl.parentElement).to.equal(document.body);
    });

    it("Close adguard iframe on document click", function(done) {
        setTimeout(function() {
            triggerEvent(document, 'click');
            var adguardEl = document.getElementById('adguard-assistant-dialog');
            var button = document.getElementsByClassName('adguard-alert')[0];
            expect(adguardEl).to.equal(null);
            expect(button).to.not.equal(undefined);
            expect(button.parentElement).to.equal(document.body);
            done();
        }, 150);
    });
});


describe("Adguard touches events", function() {
    before(function() {
        var button = document.getElementsByClassName('adguard-alert')[0];
        expect(button).to.not.equal(null);
        expect(button).to.not.equal(undefined);
        triggerEvent(button, 'touchstart');
        triggerEvent(document, 'touchend');
    });

    it("Touch on button - opening adguard iframe", function(done) {
        var button = document.getElementsByClassName('adguard-alert')[0];
        setTimeout(function() {
            var adguardEl = document.getElementById('adguard-assistant-dialog');
            expect(adguardEl).to.not.equal(null);
            expect(adguardEl).to.not.equal(undefined);
            expect(adguardEl.parentElement).to.equal(document.body);
            done();
        }, 150);
    });
});
