
var app = angular.module('app',['ui.bootstrap','ae-datetimepicker']);

app.controller('myCtrl', function ($scope) {

    $scope.switcher1="active";
    $scope.switcher2="";
    $scope.switcher3="";

    $scope.activate1 = "in active";
    $scope.activate2 = "";
    $scope.activate3 = "";

    $scope.switchen = function (linker) {

        switch(linker){
            case 1:
                $scope.switcher1="active";
                $scope.switcher2="";
                $scope.switcher3="";

                $scope.activate1 = "in active";
                $scope.activate2 = "";
                $scope.activate3 = "";
                break;
            case 2:
                $scope.switcher1="";
                $scope.switcher2="active";
                $scope.switcher3="";

                $scope.activate1 = "";
                $scope.activate2 = "in active";
                $scope.activate3 = "";
                break;
            case 3:
                $scope.switcher1="";
                $scope.switcher2="";
                $scope.switcher3="active";

                $scope.activate1 = "";
                $scope.activate2 = "";
                $scope.activate3 = "in active";
                break;
        }
    };
});


app.controller("bTabel", function ($http, $scope, $uibModal, $log) {

    $http.get('http://localhost:63342/BewerbungsPortal/bread.php')
        .success(function (result) {
            //console.log("succes");
            //console.log(result);
            $scope.bFirmen = result;
        })
        .error(function (result) {
            //console.log("error");
            //console.log(result);
        });


    $scope.animationsEnabled = true;
    $scope.open = function (newid) {

        $scope.lookId=newid;
        angular.forEach($scope.bFirmen,function (value) {
            if(value.id == $scope.lookId)
            {
                //console.log(value)
                $scope.firms = value;
            }

        });
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            keyboard:true,
            size: "lg",
            resolve: {
                items: function () {
                    return $scope.firms;
                }
            }
        });

        modalInstance.result.then(function (firma) {
            $scope.selected = firma;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };
});


//Modalwindowlistener
app.controller('ModalInstanceCtrl', function ($http, $scope, $uibModalInstance, items) {

    $scope.firma = items;

    //DataTime picker and his formater
    $scope.vm = this;
    $scope.vm.date = moment($scope.firma.einladungZeit, 'DD.MM.YYYY   HH:mm');
    $scope.vm.options = {format: 'DD.MM.YYYY   HH:mm', showClear: true};

    //Listener for OK-button
    $scope.ok = function (bw) {
        $uibModalInstance.close();

        bw.einladungZeit = $scope.vm.date;

        //Send a firma-information to backend
        $http.post('http://localhost:63342/BewerbungsPortal/bwrite.php', bw)
            .success(function (result) {
                //console.log(result)
            })
            .error(function (result) {
            })
    };

    $scope.delete = function (bw) {
        $uibModalInstance.close();

        //Send a firma-information to backend for Deleting
        $http.post('http://localhost:63342/BewerbungsPortal/bwdelete.php', bw)
            .success(function (result) {
                console.log(result)
            })
            .error(function (result) {
            })

    };

    //Listener for Cancel-button
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

app.controller('NewBewerbung', function ($http,$scope,$filter) {

    //Get last valid ID to make a one new for frondend newBewerbung
    $http.get('http://localhost:63342/BewerbungsPortal/getlastid.php')
        .success(function (result) {
            //console.log("succes");
            //console.log(result);
            $scope.newId = parseInt(result) + 1;
        })
        .error(function (result) {
            console.log("error");
            console.log(result);
        });

    //Date for "Datum der Bewerbung"
    $scope.datum = $filter('date')(new Date(), 'dd.MM.yyyy');

    //DataTime picker and his formater
    var vm = this;
    vm.date = moment();
    vm.options = {format: 'DD.MM.YYYY   HH:mm', showClear: true};

    //If "OK"-button pressed, save all infro in a array
    $scope.ok = function () {

        var newFirmen = { };
        newFirmen.id = $scope.newId;
        newFirmen.datum = $scope.datum;
        newFirmen.name = $scope.fname;
        newFirmen.als = $scope.als;
        newFirmen.partner = $scope.partner;
        newFirmen.ruckfrage = $scope.ruckfrage;
        newFirmen.einladung = true;
        newFirmen.einladungZeit = $scope.einladungZeit;
        newFirmen.notiz = $scope.notiz;
        newFirmen.status = "Warten";

        console.log(newFirmen);

        //Write new Bewerbung in json File
        $http.post('http://localhost:63342/BewerbungsPortal/newbwrite.php', newFirmen)
            .success(function (result) {
                console.log("Succes ->"+result)
            })
            .error(function (result) {
            })
        //Delete all Information after it is writen to backend.
        $scope.newId ++;
        $scope.status = "";
        $scope.fname="";
        $scope.als="";
        $scope.partner="";
        $scope.ruckfrage="";
        $scope.einladungdatum="";
        $scope.notiz="";
    }


});

app.controller('Linklist',function ($http,$scope,$filter){
    var vm = this;
    vm.date = moment();
    vm.options = {format: 'DD.MM.YYYY HH:mm', showClear: true};

})
