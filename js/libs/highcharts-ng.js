(function (window, angular, undefined) {
    var hc = angular.module('bHighcharts', []);

    hc.directive('highcharts', function () {
        return {
            restrict: 'EA',
            scope: {
                id: '@',
                theme: '@',
                options: '@',
                ratio: '@'
            },
            controller: function ($scope, $element, $attrs) {
                $scope.options = JSON.parse($scope.options);
                $scope.theme = JSON.parse($scope.theme);
                $scope.wrapStyle = { width: '100%', height: 0, overflow: 'hidden', display: 'block', position: 'relative', paddingBottom: '56.25%' };
                $scope.childrenStyle = { position: 'absolute', top: 0, bottom: 0, left: 0, width: '100%', height: '100%' };
                $scope.updateRatioStyle = function () {
                    var ratio = JSON.parse($attrs.ratio),
                        ratioStyle = { paddingBottom: ratio[1] / ratio[0] * 100 + '%' };
                    $element.parent().css(ratioStyle);
                    window.dispatchEvent(new Event('resize'));
                }
            },
            link: function (scope, element, attrs) {
                var chart, loaded = false;
                attrs.$observe('id', function () {
                    var selector = { chart: { renderTo: scope.id } },
                        options = angular.merge(scope.theme, scope.options, selector);
                    chart = new Highcharts.Chart(options);
                });

                attrs.$observe('ratio', function (newValue) {
                    if (!loaded) {
                        element.wrap('<div class="highchart-responsive" />').parent().css(scope.wrapStyle);
                        element.css(scope.childrenStyle);
                        loaded = true;
                    };
                    scope.updateRatioStyle();
                });
            }
        }
    });
})(window, window.angular);

App.service('bUtils', function () {
    return {
        round: function (value, decimals) {
            decimals = decimals || 1;
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }
    };
});

App.service('chartThemes', function ($timeout) {
    return {
        light: {
            chart: {
                backgroundColor: 'transparent',
                events: {
                    load: function (chart) {
                        $timeout(function () {                            
                            chart.target.reflow();
                        }
                        );
                    }
                },
                style: {
                    fontFamily: 'Roboto',
                    '-webkit-font-smoothing': 'antialiased'
                },
                spacing: [30, 30, 30, 30],
            },

            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            title: {
                align: 0,
                style: {
                    color: '#717171',
                    fontWeight: '400',
                    padding: '1em 0',
                    display: 'block'
                }
            },
            plotOptions: {
                column: {
                    borderWidth: 0,
                    maxPointWidth: 17
                },
                pie: {
                    borderWidth: 0,
                    colors: ['#D1592C', '#DC6900', '#E2A200', '#E8C600', '#97C31B', '#F0F0F0']
                },
                series: {
                    lineWidth: 3,
                    marker: {
                        radius: 5,
                        symbol: 'circle',
                        lineWidth: 0,
                        states: {
                            hover: {
                                lineWidth: 1.5,
                                lineColor: 'rgba(255,255,255,0.62)',
                                radius: 6
                            }
                        }
                    }
                }
            },
            xAxis: {
                gridLineWidth: 0,
                gridLineColor: "#ddd",
                gridLineDashStyle: "longdash",
                labels: {
                    style: {
                        color: '#ACACAC'
                    }
                },
                tickWidth: 0,
                lineWidth: 0
            },
            yAxis: {
                gridLineWidth: 1,
                gridLineColor: "#ddd",
                gridLineDashStyle: "longdash",
                labels: {
                    style: {
                        color: '#ACACAC'
                    }
                }
            },
            series: [
                {
                    color: 'rgba(125,190,113,.15)',
                }, {
                    fillColor: 'rgba(0,0,0,.08)',
                    color: '#2CABE1'
                }
            ]
        },
        dark: {
            chart: {
                backgroundColor: '#303030',
                style: {
                    fontFamily: 'Roboto',
                    '-webkit-font-smoothing': 'antialiased'
                },
                spacing: [30, 30, 30, 30]
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            title: {
                align: 0,
                style: {
                    color: 'white',
                    fontWeight: '400',
                    padding: '1em 0',
                    display: 'block'
                }
            },
            plotOptions: {
                column: {
                    borderWidth: 0,
                    maxPointWidth: 17
                },
                series: {
                    lineWidth: 3,
                    marker: {
                        radius: 5,
                        symbol: 'circle',
                        lineWidth: 0,
                        states: {
                            hover: {
                                lineWidth: 1.5,
                                lineColor: 'rgba(0,0,0,0.32)',
                                radius: 6
                            }
                        }
                    }
                }
            },
            xAxis: {
                gridLineWidth: 0,
                gridLineColor: "rgba(255,255,255,.03)",
                gridLineDashStyle: "longdash",
                labels: {
                    style: {
                        color: 'rgba(255,255,255,0.5)'
                    }
                },
                tickWidth: 0,
                lineWidth: 0
            },
            yAxis: {
                gridLineWidth: 1,
                gridLineColor: "rgba(255,255,255,.03)",
                gridLineDashStyle: "longdash",
                labels: {
                    style: {
                        color: 'rgba(255,255,255,0.5)'
                    }
                }
            },
            series: [
                {
                    color: 'rgba(125,190,113,.15)',
                }, {
                    fillColor: 'rgba(0,0,0,.08)',
                    color: '#2CABE1'
                }
            ]
        }
    };
});

