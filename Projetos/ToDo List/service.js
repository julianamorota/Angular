(function() {
'use strict';

angular
  .module('toDoList')
  .service('listarService', listarService);

  angular.$inject = ['$http','$q', 'caminhoJson'];

  function listarService($http, $q, caminhoJson){

  	//promessa a ser retornada
  	var promessa = $q.defer();

  	this.obtemLista = function(){

      return $http.get(caminhoJson)
  			.then(function(response){
  				//promessa cumprida
  				promessa.resolve(response.data);
  				return promessa.promise;

  			}, function(response){
  				//promessa negada
  				promessa.reject(response);
  				return promessa.promise;
  			})
  		;
  	};
  }
})();
