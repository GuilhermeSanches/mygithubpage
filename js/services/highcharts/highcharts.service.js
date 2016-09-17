angular.module('serviceHighcharts', [])

    .factory('HighchartsService', ['chartThemes', function (chartThemes) {
        return {

            initializeChart: function ($scope) {
                var optionsYearly = [0.765346, 0.765346, 0.765346, 0.765346, 2.76535, 23.7653, 12.7653, 23.7653, 12.7653, 23.7653, 12.7653, 23.7653, 12.7653];
                $scope.optionsYearly = [0.765346, 0.765346, 0.765346, 0.765346, 2.76535, 23.7653, 12.7653, 23.7653, 12.7653, 23.7653, 12.7653, 23.7653, 12.7653];
                this.initializeChartYearly($scope, optionsYearly);
                this.initializeChartMonthly($scope);
                this.initializeChartDaily($scope);
                if ($scope.history) {
                    $scope.history.forEach(function (element) {
                        $scope.optionsYearly.push(element.consumption);
                    }, this);
                    console.log($scope.optionsYearly);                                         
                }                                               
            },

            initializeChartMonthly: function ($scope) {

                $scope.sprintOptions = {
                    title: {
                        text: 'Consumo mensal',
                    },
                    chart: {
                        type: 'column',
                        events: {
                            load: function () {
                                $(window).resize();
                            }
                        }
                    },
                    xAxis: {
                        categories: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
                    },
                    yAxis: {
                        title: {
                            text: 'KW/h'
                        },
                    },
                    series: [
                        {
                            name: '2',
                            type: 'spline',
                            data: [105, 112.5, 104, 105, 103.5, 92.5, 101],
                            color: '#D4F1F9',
                            lineWidth: 2,
                            marker: {
                                enabled: false
                            }
                        },
                        {
                            name: '1',
                            type: 'line',
                            data: [103, 103, 103, 103, 103, 103, 103],
                            color: '#FF9A28',
                            lineWidth: 2,
                            marker: {
                                enabled: false
                            }
                        },
                        {
                            name: 'Estimate',
                            data: [120, 110, 103, 110, 105, 95, 103],
                            color: '#2CABE1'
                        },
                        {
                            name: 'Real',
                            data: [110, 115, 105, 100, 102, 90, 99],
                            color: '#97C31B',
                            colorByPoint: true,
                            colors: ['#DC6900', '#97C31B', '#97C31B', '#DC6900', '#DC6900', '#DC6900', '#DC6900']
                        }
                    ]
                };
                $scope.themes = chartThemes;
            },

            initializeChartYearly: function ($scope, optionsYearly) {

                $scope.burndownOptions = {
                    title: {
                        text: 'Consumo desde o início',
                    },
                    xAxis: {
                        categories: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
                    },
                    yAxis: {
                        title: {
                            text: 'KW/h'
                        },
                    },
                    series: [
                        {
                            name: 'KilloWatts/hora consumidos',
                            type: 'area',
                            data: $scope.optionsYearly,
                        }
                    ]
                };
                $scope.themes = chartThemes;
            },

            initializeChartDaily: function ($scope) {

                $scope.hoursOptions = {
                    title: {
                        text: 'Consumo Diário',
                    },
                    subtitle: {
                        useHTML: true,
                        text: "<div>120<small style='font-weight: normal; font-size: 50%'>h</small></div><div style='border-bottom: 1px solid rgba(0,0,0,0.15); margin: 0 -13px 5px;'></div><div style='font-size: 14px; font-weight: normal; color: #717171'>used of<br> 367 hour</div>",
                        verticalAlign: 'middle',
                        floating: true,
                        align: 'center',
                        style: {
                            textAlign: 'center',
                            color: '#3A4650',
                            fontSize: '31px',
                            fontWeight: 'bold',
                            padding: 0,
                            transform: 'translateY(-65%)'
                        }
                    },
                    chart: {
                        type: 'pie'
                    },
                    series: [{
                        name: 'Hours',
                        data: [["John", 35], ["Chris", 25], ["Jane", 12], ["Philip", 16], ["Mary", 12], ["Empty", 20]],
                        size: '100%',
                        innerSize: '70%',
                        showInLegend: true,
                        dataLabels: {
                            enabled: false
                        }
                    }]
                };
                $scope.themes = chartThemes;
            }
        };
    }]);
