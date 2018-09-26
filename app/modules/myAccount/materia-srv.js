(function VacationsScope(angular) {
    'use strict';
    angular.module('connectingUsCenter.materia')
        .service('Materias', ['ServicesModel', function (ServicesModel) {
            var that = this;
            angular.extend(this, ServicesModel.create('https://orttaller6.herokuapp.com/materias', null, {
                grid: {
                    method: 'GET',
                    isArray: true
                },
                get: {
                    method:'GET',
                    url:'https://orttaller6.herokuapp.com/materias/:id'
                },
                getusersList:{
                    method:'GET',
                    url:'https://orttaller6.herokuapp.com/users/materias/:id',
                    isArray: true
                }
            }));


            that.getDefaultEntity = function getDefaultEntity() {
                return {
                    _id: undefined,
                    name: undefined,
                    year: undefined,
                    division: undefined,
                    abreviatura: undefined
                };
            };
        }]);
})(window.angular);