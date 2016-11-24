App.controller('InvoiceCtrl', ['$scope', 'md5', 'HomeService', function ($scope, md5, HomeService) {

    $scope.getClient = function () {
        var client = window.localStorage.getItem("client");
        var md5Email = md5.createHash((JSON.parse(client)).email);
        $scope.user = JSON.parse(client);
        $scope.user.urlAvatar = 'http://www.gravatar.com/avatar/' + md5Email;
    } ();

    $scope.report = {
        date1: '',
        date2: '',
        bandeira: ''
    };

    $scope.tot = 0.00;
    $scope.totkwh = 0;
    
    var bandeiras = [
        0.53122,
        0.54622,
        0.56122,
        0.57622
    ];
    

    $scope.getInvoice = function(report){
        var date3 = new Date(window.document.invoice.dateReport1.value);
        var date4 = new Date(window.document.invoice.dateReport2.value);
        var bandeira = window.document.invoice.bandeira.value;
        var baixa_renda = window.document.invoice.baixa_renda.checked;
        console.log(baixa_renda);
        
        HomeService.getHistory().then(function (data) {

            var tot = 0.00;
            
            data.data.result.forEach(function (element, index) {

                var hour = new Date(element.date).getHours();
                var dateView = new Date(element.date).setHours(hour);
                var date = new Date(element.date).setHours(hour);
                var hourLocale = new Date().getHours();

                if (moment(date).isBetween(date3, date4, 'days', [])) {
                    var temp2;
                    temp2 =  (element.consumption - (data.data.result[index - 2] ? data.data.result[index - 2].consumption : 0));
                    if(temp2 < 0) temp2 = 0;
                    tot+=(temp2);
                }
            }, this);
           $scope.totkwh = tot;
           if(!baixa_renda){
                $scope.tot = tot*bandeiras[bandeira-1];
           }else{               
                   switch (true) {
                       case (bandeira =="1" && $scope.tot <= 30.00):
                          $scope.tot = tot*0.18247;
                           break;
                       case (bandeira =="1" &&  $scope.tot >= 31 &&  $scope.tot <= 100.99):
                           $scope.tot = tot*0.31280;
                           break;
                       case (bandeira == "1" &&  $scope.tot >= 101 &&  $scope.tot <= 220.99):
                           $scope.tot = tot*0.46921;
                           break;
                       case (bandeira =="1" &&  $scope.tot >= 221):
                           $scope.tot = tot*0.52134;
                           break;

                      case (bandeira =="2" && $scope.tot <= 30.00):
                          $scope.tot = tot*0.18772;
                           break;
                       case (bandeira =="2" &&  $scope.tot >= 31 &&  $scope.tot <= 100.99):
                           $scope.tot = tot*0.32180;
                           break;
                       case (bandeira =="2" &&  $scope.tot >= 101 &&  $scope.tot <= 220.99):
                           $scope.tot = tot*0.48271;
                           break;
                       case (bandeira =="2" &&  $scope.tot >= 221):
                           $scope.tot = tot*0.53634;
                           break;

                      case (bandeira =="3" && $scope.tot <= 30.00):
                          $scope.tot = tot*0.19297;
                           break;
                       case (bandeira =="3" &&  $scope.tot >= 31 &&  $scope.tot <= 100.99):
                           $scope.tot = tot*0.33080;
                           break;
                       case (bandeira =="3" &&  $scope.tot >= 101 &&  $scope.tot <= 220.99):
                           $scope.tot = tot*0.49621;
                           break;
                       case (bandeira =="3" &&  $scope.tot >= 221):
                           $scope.tot = tot*0.55134;
                           break;

                      case (bandeira =="4" && $scope.tot <= 30.00):
                          $scope.tot = tot*0.19822;
                           break;
                       case (bandeira =="4" &&  $scope.tot >= 31 &&  $scope.tot <= 100.99):
                           $scope.tot = tot*0.33980;
                           break;
                       case (bandeira =="4" &&  $scope.tot >= 101 &&  $scope.tot <= 220.99):
                           $scope.tot = tot*0.50971;
                           break;
                       case (bandeira =="4" &&  $scope.tot >= 221):
                           $scope.tot = tot*0.56634;
                           break;                           
                   }
           }           
           $scope.tot = parseFloat($scope.tot.toFixed(2));
           $scope.totkwh = parseFloat($scope.totkwh.toFixed(2));   
           $scope.date1 = moment(date3).format("D/M/Y");
           $scope.date2 = moment(date4).format("D/M/Y");
        });
    };


    $(document).ready(function () {

        $('.brand-logo').sideNav({
            menuWidth: 300,
            edge: 'left',
            closeOnClick: true
        });
        $('.datepicker').pickadate({
            selectMonths: true, 
            selectYears: 15 
        });

        $('select').material_select();

        $(".dropdown-button").dropdown();

        $('.collapsible').collapsible({
            expandable: true
        });
    });
}]);