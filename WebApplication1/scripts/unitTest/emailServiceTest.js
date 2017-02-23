var target;
QUnit.module("email service test", {
    
    beforeEach: function () {
        target = angular.injector(['ng', 'myApp']).get("EmailService");
    },
    afterEach: function () {
        target = null;
    }
});

QUnit.test("Add valid email", function () {
    var validEmail = "name@domain.com";

    target.add(validEmail);

    var expected = ["name@domain.com"];
    QUnit.assert.deepEqual(expected, target.emails);
});

QUnit.test("Add invalid email throw", function () {
    var validEmail = "name@@domain.com";

    QUnit.assert.throws(function () {
        target.add(validEmail);
    }, "The email invalid");
});

QUnit.test("Add existing email throw", function () {
    var validEmail = "name@domain.com";

    target.add(validEmail);

    QUnit.assert.throws(function () {
        target.add(validEmail);
    }, "The email is already exist");
});

QUnit.test("Remove existing email", function () {
    var validEmail_1 = "name_1@domain.com";
    var validEmail_2 = "name_2@domain.com";

    target.add(validEmail_1);
    target.add(validEmail_2);
    
    target.remove("name_2@domain.com");

    var expected = ["name_1@domain.com"];
    QUnit.assert.deepEqual(expected, target.emails);

});

QUnit.test("Remove not existing email", function () {
    var validEmail_1 = "name_1@domain.com";
    var validEmail_2 = "name_2@domain.com";

    target.add(validEmail_1);
    target.add(validEmail_2);

    target.remove("name_3@domain.com");

    var expected = ["name_1@domain.com", "name_2@domain.com"];
    QUnit.assert.deepEqual(expected, target.emails);
});

QUnit.test("Remove email, emails list is empty", function () {
    
    target.remove("name_3@domain.com");

    QUnit.assert.deepEqual([], target.emails);
});