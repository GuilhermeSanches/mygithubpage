App.controller('HomeCtrl', ['$scope', 'HomeService', 'UserService', '$location', 'md5', '$http', 'API',
    function ($scope, HomeService, UserService, $location, md5, $http, API) {

        // HighchartsService.initializeChart($scope);
        // HomeService.getHistory().then(function (data) {
        //     $scope.history = data.data.result;
        // }, function (err) {

        // });
        $scope.sensor1 = {};
        $scope.sensor1.status = true;

        $scope.sensor2 = {};
        $scope.sensor2.status = true;

        $scope.message = {
            text: 'hello world!',
            time: new Date()
        };
        $scope.getClient = function () {
            var client = window.localStorage.getItem("client");
            var md5Email = md5.createHash((JSON.parse(client)).email);
            $scope.user = JSON.parse(client);
            $scope.user.urlAvatar = 'http://www.gravatar.com/avatar/' + md5Email;
        } ();

        $scope.reload = function () {
            HighchartsService.initializeChart($scope);
        };

        $scope.logout = function () {
            window.localStorage.clear();
            window.sessionStorage.clear();
            $location.path("/login");
        };

        /**
         * Dark theme for Highcharts JS
         * @author Torstein Honsi
         */

        // Load the fonts
        Highcharts.createElement('link', {
            href: 'https://fonts.googleapis.com/css?family=Unica+One',
            rel: 'stylesheet',
            type: 'text/css'
        }, null, document.getElementsByTagName('head')[0]);

        Highcharts.theme1 = {
            colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
                "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
            chart: {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                    stops: [
                        [0, '#2a2a2b'],
                        [1, '#3e3e40']
                    ]
                },
                style: {
                    fontFamily: "'Unica One', sans-serif"
                },
                plotBorderColor: '#606063'
            },
            title: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                }
            },
            subtitle: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },
            xAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3'

                    }
                }
            },
            yAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        color: '#B0B0B3'
                    },
                    marker: {
                        lineColor: '#333'
                    }
                },
                boxplot: {
                    fillColor: '#505053'
                },
                candlestick: {
                    lineColor: 'white'
                },
                errorbar: {
                    color: 'white'
                }
            },
            legend: {
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                }
            },
            credits: {
                style: {
                    color: '#666'
                }
            },
            labels: {
                style: {
                    color: '#707073'
                }
            },

            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3'
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3'
                }
            },

            navigation: {
                buttonOptions: {
                    symbolStroke: '#DDDDDD',
                    theme: {
                        fill: '#505053'
                    }
                }
            },

            // scroll charts
            rangeSelector: {
                buttonTheme: {
                    fill: '#505053',
                    stroke: '#000000',
                    style: {
                        color: '#CCC'
                    },
                    states: {
                        hover: {
                            fill: '#707073',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        },
                        select: {
                            fill: '#000003',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                },
                inputBoxBorderColor: '#505053',
                inputStyle: {
                    backgroundColor: '#333',
                    color: 'silver'
                },
                labelStyle: {
                    color: 'silver'
                }
            },

            navigator: {
                handles: {
                    backgroundColor: '#666',
                    borderColor: '#AAA'
                },
                outlineColor: '#CCC',
                maskFill: 'rgba(255,255,255,0.1)',
                series: {
                    color: '#7798BF',
                    lineColor: '#A6C7ED'
                },
                xAxis: {
                    gridLineColor: '#505053'
                }
            },

            scrollbar: {
                barBackgroundColor: '#808083',
                barBorderColor: '#808083',
                buttonArrowColor: '#CCC',
                buttonBackgroundColor: '#606063',
                buttonBorderColor: '#606063',
                rifleColor: '#FFF',
                trackBackgroundColor: '#404043',
                trackBorderColor: '#404043'
            },

            // special colors for some of the
            legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
            background2: '#505053',
            dataLabelsColor: '#B0B0B3',
            textColor: '#C0C0C0',
            contrastTextColor: '#F0F0F3',
            maskColor: 'rgba(255,255,255,0.3)'
        };

        $(function () {
            HomeService.getLastConsumtion().then(function (data) {
                $scope.lastUpdate = moment(data.data.result[0].date).format('D/M/Y, H:mm:ss');
                var gaugeOptions = {

                    chart: {
                        type: 'solidgauge'
                    },

                    title: null,

                    pane: {
                        center: ['50%', '80%'],
                        size: '140%',
                        startAngle: -90,
                        endAngle: 90,
                        background: {
                            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#fff',
                            innerRadius: '60%',
                            outerRadius: '100%',
                            shape: 'arc'
                        }
                    },

                    tooltip: {
                        enabled: false
                    },

                    // the value axis
                    yAxis: {
                        stops: [
                            [0.1, '#55BF3B'], // green
                            [0.5, '#DDDF0D'], // yellow
                            [0.9, '#DF5353'] // red
                        ],
                        lineWidth: 0,
                        minorTickInterval: null,
                        tickAmount: 2,
                        title: {
                            y: -70
                        },
                        labels: {
                            y: 16
                        }
                    },

                    plotOptions: {
                        solidgauge: {
                            dataLabels: {
                                y: 5,
                                borderWidth: 0,
                                useHTML: true
                            }
                        }
                    }
                };
                // Highcharts.setOptions(Highcharts.theme1);
                // The speed gauge  
                $('#container-speed').highcharts(Highcharts.merge(gaugeOptions, {
                    yAxis: {
                        min: 0,
                        max: (Math.round(data.data.result[0].last_consumption) * 10),
                        title: {
                            text: 'KW/h consumido até último minuto'
                        }
                    },

                    credits: {
                        enabled: false
                    },

                    series: [{
                        name: 'Speed',
                        data: [parseFloat(parseFloat(data.data.result[0].last_consumption).toFixed(4))],
                        dataLabels: {
                            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                            ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                            '<span style="font-size:12px;color:silver">kW/h</span></div>'
                        },
                        tooltip: {
                            valueSuffix: ' kW/h'
                        }
                    }]

                }));


                // Bring life to the dials
                setInterval(function () {
                    // Speed
                    HomeService.getLastConsumtion().then(function (data) {
                        $scope.lastUpdate = moment(data.data.result[0].date).format('D/M/Y, H:mm:ss');
                        var chart = $('#container-speed').highcharts(),
                            point,
                            newVal,
                            inc, dataLabel;

                        if (chart) {
                            point = chart.series[0].points[0];
                            // inc = Math.round((Math.random() - 0.5) * 100);
                            // newVal = point.y + 10;
                            newVal = parseFloat(parseFloat(data.data.result[0].last_consumption).toFixed(4));

                            if (newVal < 0 || newVal > 200) {
                                newVal = point.y - inc;
                            }

                            point.update(newVal);
                        }
                    })

                }, 20000);

            });
        });

        $scope.callReport = function () {


            $(function () {
                HomeService.getHistory().then(function (data) {

                    var dateNow = new Date();
                    var lastDateS1 = new Date(data.data.result[data.data.result.length - 1].date);
                    var lastDateS2 = new Date(data.data.result[data.data.result.length - 2].date);
                    var dateLimit = new Date(dateNow.setMinutes(dateNow.getMinutes() - 30));
                    $scope.sensor1.lastDate = moment(lastDateS1).format("D/M/Y, H:mm:ss");
                    $scope.sensor2.lastDate = moment(lastDateS2).format("D/M/Y, H:mm:ss");
                    $scope.lastUpdate30 = $scope.sensor1.lastDate > $scope.sensor2.lastDate ? $scope.sensor1.lastDate : $scope.sensor2.lastDate;
                    if (moment(lastDateS1).isAfter(dateLimit)) {
                        $scope.sensor1.status = true;
                    } else {
                        $scope.sensor1.status = false;
                    }
                    if (moment(lastDateS2).isAfter(dateLimit)) {
                        $scope.sensor2.status = true;
                    } else {
                        $scope.sensor2.status = false;
                    }


                    var array = [];
                    data.data.result.forEach(function (element, index) {
                        var hour = new Date(element.date).getHours();
                        var date = new Date(element.date).setHours(hour);
                        var hourLocale = new Date().getHours();
                        if (moment(date).isAfter(new Date().setHours(hourLocale - 24))) {
                            if (array.length > 0) {
                                if (date == array[array.length - 1][0]) {
                                    array[array.length - 1][1] += element.consumption;
                                } else {
                                    var temp = [date, element.consumption];
                                    array.push(temp);
                                }
                            } else {
                                var temp2 = [date, element.consumption];
                                array.push(temp2);
                            }

                        }


                    }, this);
                    // console.log(array);
                    Highcharts.setOptions({
                        global: {
                            useUTC: false
                        }
                    });
                    $('#container').highcharts(Highcharts.merge(Highcharts.theme1, {
                        chart: {
                            zoomType: 'x'
                        },
                        title: {
                            text: 'Consumo total mensal'
                        },
                        subtitle: {
                            text: document.ontouchstart === undefined ?
                                'Verifique seu consumo desde o início de utilização do sistema' : 'Consumo mensal'
                        },
                        xAxis: {
                            type: 'datetime'
                        },
                        yAxis: {
                            title: {
                                text: 'KW/h'
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        plotOptions: {
                            area: {
                                fillColor: {
                                    linearGradient: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 1
                                    },
                                    stops: [
                                        [0, Highcharts.getOptions().colors[0]],
                                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                    ]
                                },
                                marker: {
                                    radius: 2
                                },
                                lineWidth: 1,
                                states: {
                                    hover: {
                                        lineWidth: 1
                                    }
                                },
                                threshold: null
                            }
                        },

                        series: [{
                            type: 'area',
                            name: 'KW/h consumidos',
                            data: array
                        }]
                    }));
                });
            });

            $(function () {
                HomeService.getHistory().then(function (data) {

                    var arraySensor0 = [];
                    var arraySensor1 = [];

                    data.data.result.forEach(function (element, index) {

                        var hour = new Date(element.date).getHours();
                        var date = new Date(element.date).setHours(hour);

                        var hourLocale = new Date().getHours();
                        if (moment(date).isBetween(new Date().setHours(hourLocale - 6), new Date(), 'hour', [])) {
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
                    Highcharts.setOptions({
                        global: {
                            useUTC: false
                        }
                    });
                    $('#container2').highcharts({
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
        }




        $(document).ready(function () {
            $scope.callReport();
            $('.brand-logo').sideNav({
                menuWidth: 300,
                edge: 'left',
                closeOnClick: true
            });

            $(".dropdown-button").dropdown();

            $('.collapsible').collapsible({
                expandable: true
            });
        });
    }]);

