myapp.service('EmailService', function () {

    var cashedEmails = {};
    var emails = [];
    function isValid(input) {
        var regx = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
        return regx.test(input);
    }

    function isContainEmail(email) {

        if (cashedEmails[email])
            return true;

        if (emails.indexOf(email) > -1) {
            cashedEmails[email] = true;
            return true;
        }

        return false;
    }

    function clearCash(email) {
        delete cashedEmails[email];
    }

    function add(email) {

        if (!isValid(email))
            throw "The email invalid";

        if (isContainEmail(email))
            throw "The email is already exist";

        emails.push(email);
    }

    function remove(email) {
        var index = emails.indexOf(email);

        if (index > -1) {
            emails.splice(index, 1);
            clearCash(email);
        }
    }

    return {
        add: add,
        remove, remove,
        get emails() {
            return emails;
        }
    };
});