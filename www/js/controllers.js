angular.module('starter.controllers', ['forceng'])

    .controller('AppCtrl', function ($scope, force, refreshBus) {
        $scope.refreshing = false;
        $scope.logout = function() {
            console.log("logging out");
            force.logout();
        };

        $scope.refresh = function() {
            console.log("refreshing");
            refreshBus.post(true);
            $scope.refreshing = true;
        }

        refreshBus.observable()
            .filter(evt => !evt)
            .subscribe(evt => $scope.refreshing = false);

        refreshBus.observable()
            .filter(evt => evt == null)
            .subscribe(evt => $scope.refresh());
    })

    .controller('ContactListCtrl', function ($scope, force) {

        force.query('select id, name, title from contact limit 50').then(
            function (data) {
                $scope.contacts = data.records;
            },
            function (error) {
                alert("Error Retrieving Contacts");
                console.log(error);
            });

    })

    .controller('ContactCtrl', function ($scope, $stateParams, force) {

        force.retrieve('contact', $stateParams.contactId, 'id,name,title,phone,mobilephone,email').then(
            function (contact) {
                $scope.contact = contact;
            });


    })

    .controller('EditContactCtrl', function ($scope, $stateParams, $ionicNavBarDelegate, force) {

        force.retrieve('contact', $stateParams.contactId, 'id,firstname,lastname,title,phone,mobilephone,email').then(
            function (contact) {
                $scope.contact = contact;
            });

        $scope.save = function () {
            force.update('contact', $scope.contact).then(
                function (response) {
                    $ionicNavBarDelegate.back();
                },
                function() {
                    alert("An error has occurred.");
                });
        };

    })

    .controller('CreateContactCtrl', function ($scope, $stateParams, $ionicNavBarDelegate, force) {

        $scope.contact = {};

        $scope.save = function () {
            force.create('contact', $scope.contact).then(
                function (response) {
                    $ionicNavBarDelegate.back();
                },
                function() {
                    alert("An error has occurred.");
                });
        };

    })

    .controller('AccountListCtrl', function ($scope, force) {

        force.query('select id, name from account limit 50').then(
            function (data) {
                $scope.accounts = data.records;
            });

    })

    .controller('AccountCtrl', function ($scope, $stateParams, force) {

        force.retrieve('account', $stateParams.accountId, 'id,name,phone,billingaddress').then(
            function (account) {
                $scope.account = account;
            });

    });
