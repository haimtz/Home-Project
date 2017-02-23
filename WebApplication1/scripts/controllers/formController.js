myapp.controller("formContorller", function ($scope, EmailService) {

    $scope.txt = "send";
    $scope.placeHolderTxt = "Enter Email";
    $scope.emails = EmailService.emails;
    $scope.messages = [];

    $scope.click = function (email) {
        console.dir($scope.value);
        try{
            EmailService.add(email)
            $scope.messages.push("The email " + email + " added");
        }
        catch(error){
            $scope.messages.push(error);
            return email;
        }
        return "";
    };

    $scope.remove = function (email) {
        EmailService.remove(email);
        $scope.messages.push("The email " + email + " removed");
    };
});