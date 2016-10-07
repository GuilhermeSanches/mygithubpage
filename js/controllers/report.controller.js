App.controller('ReportCtrl', ['$scope', 'md5', 'HomeService', function ($scope, md5, HomeService) {

    $scope.getClient = function () {
        var client = window.localStorage.getItem("client");
        var md5Email = md5.createHash((JSON.parse(client)).email);
        $scope.user = JSON.parse(client);
        $scope.user.urlAvatar = 'http://www.gravatar.com/avatar/' + md5Email;
    } ();

    $scope.report = {
        date1: '',
        date2: ''
    }

    $scope.getReport2 = function () {
        var date3 = new Date(window.document.report2.dateReport3.value);
        var date4 = new Date(window.document.report2.dateReport4.value);

        HomeService.getHistory().then(function (data) {

            var arraySensor0 = [];
            var arraySensor1 = [];

            data.data.result.forEach(function (element, index) {

                var hour = new Date(element.date).getHours();
                var dateView = new Date(element.date).setHours(hour);
                var date = new Date(element.date).setHours(hour);

                var hourLocale = new Date().getHours();
                if (moment(date).isBetween(date3, date4, 'days', [])) {
                    if (element.sensors_id === 0) {
                        var temp2;
                        temp2 = [dateView, (element.consumption - (data.data.result[index - 2] ? data.data.result[index - 2].consumption : 0))];
                        arraySensor0.push(temp2);
                    } else {
                        var temp;
                        temp = [dateView, (element.consumption - (data.data.result[index - 2] ? data.data.result[index - 2].consumption : 0))];
                        arraySensor1.push(temp);
                    }
                }

            }, this);
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });
            $('#container-report-2').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Consumo por sensor'
                },
                subtitle: {
                    text: 'Exibe o consumo medido por cada sensor a cada 30 minutos'
                },
                xAxis: {
                    type: "datetime",
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Consumo (KW/h)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.3f} kw/h </b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Chuveiro e cozinha',
                    data: arraySensor0

                }, {
                        name: 'Lâmpadas e tomadas',
                        data: arraySensor1

                    }]
            });
        });


    }


    $scope.getReport = function () {
        var date1 = new Date(window.document.report1.dateReport1.value);
        var date2 = new Date(window.document.report1.dateReport2.value);

        HomeService.getHistory().then(function (data) {

            var arraySensor0 = [];
            var arraySensor1 = [];

            data.data.result.forEach(function (element, index) {

                var hour = new Date(element.date).getHours();
                var date = new Date(element.date).setHours(hour);

                var hourLocale = new Date().getHours();
                if (moment(date).isBetween(date1, date2, 'days', [])) {
                    if (element.sensors_id === 0) {
                        var temp2;
                        temp2 = [date, (element.consumption - (data.data.result[index - 2] ? data.data.result[index - 2].consumption : 0))];
                        arraySensor0.push(temp2);
                    } else {
                        var temp;
                        temp = [date, (element.consumption - (data.data.result[index - 2] ? data.data.result[index - 2].consumption : 0))];
                        arraySensor1.push(temp);
                    }
                }

            }, this);
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });
            $('#container-report-1').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Consumo por sensor'
                },
                subtitle: {
                    text: 'Exibe o consumo medido por cada sensor a cada 30 minutos'
                },
                xAxis: {
                    type: "datetime",
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Consumo (KW/h)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.3f} kw/h </b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Chuveiro e cozinha',
                    data: arraySensor0

                }, {
                        name: 'Lâmpadas e tomadas',
                        data: arraySensor1

                    }]
            });
        });


    }
    $(function () {
        HomeService.getHistory().then(function (data) {

            var arraySensor0 = [];
            var arraySensor1 = [];

            data.data.result.forEach(function (element, index) {

                var hour = new Date(element.date).getHours();
                var date = new Date(element.date).setHours(hour - 3);

                var hourLocale = new Date().getHours();
                if (moment(date).isBetween(new Date().setHours(hourLocale - 6), new Date(), 'hour')) {
                    if (element.sensors_id === 0) {
                        var temp2;
                        temp2 = [date, (element.consumption - data.data.result[index - 2].consumption)];
                        arraySensor0.push(temp2);
                    } else {
                        var temp;
                        temp = [date, (element.consumption - data.data.result[index - 2].consumption)];
                        arraySensor1.push(temp);
                    }
                }

            }, this);

            $('#container-report-1').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Consumo por sensor'
                },
                subtitle: {
                    text: 'Exibe o consumo medido por cada sensor a cada 30 minutos'
                },
                xAxis: {
                    type: "datetime",
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Consumo (KW/h)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.3f} kw/h </b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Chuveiro e cozinha',
                    data: arraySensor0

                }, {
                        name: 'Lâmpadas e tomadas',
                        data: arraySensor1

                    }]
            });
        });

    });


    $(function () {
        HomeService.getHistory().then(function (data) {

            var arraySensor0 = [];
            var arraySensor1 = [];

            data.data.result.forEach(function (element, index) {

                var hour = new Date(element.date).getHours();
                var date2 = new Date(element.date).setHours(hour - 3);

                var hourLocale = new Date().getHours();
                if (moment(date2).isBetween(new Date().setHours(hourLocale - 6), new Date(), 'hour')) {
                    if (element.sensors_id === 0) {
                        var temp2;
                        temp2 = [date2, (element.consumption - data.data.result[index - 2].consumption)];
                        arraySensor0.push(temp2);
                    } else {
                        var temp;
                        temp = [date2, (element.consumption - data.data.result[index - 2].consumption)];
                        arraySensor1.push(temp);
                    }
                }

            }, this);

            $('#container-report-2').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Consumo por sensor'
                },
                subtitle: {
                    text: 'Exibe o consumo medido por cada sensor a cada 30 minutos'
                },
                xAxis: {
                    type: "datetime",
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Consumo (KW/h)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.3f} kw/h </b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Chuveiro e cozinha',
                    data: arraySensor0

                }, {
                        name: 'Lâmpadas e tomadas',
                        data: arraySensor1

                    }]
            });
        });

    });


    $(document).ready(function () {

        $('.brand-logo').sideNav({
            menuWidth: 300,
            edge: 'left',
            closeOnClick: true
        });
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });

        $(".dropdown-button").dropdown();

        $('.collapsible').collapsible({
            expandable: true
        });
    });
}]);