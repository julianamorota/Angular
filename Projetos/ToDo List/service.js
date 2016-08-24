(function() {
'use strict';

angular
  .module('toDoList')
  .service('listarService', listarService);

  angular.$inject = ['$http'];
  angular.$inject = ['$q'];

  function listarService($http, $q){

	//promessa a ser retornada
	var promessa = $q.defer();

	this.obtemLista = function(){
		return $http.get("https://api.myjson.com/bins/2krxz")
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
