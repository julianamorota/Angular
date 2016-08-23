(function() {

angular
  .module('toDoList')
  .service('ListaInicial', ListaInicial);

  //ListaInicial.$inject = ['$http'];
  angular.$inject = ['$http'];
  //ListaInicial.$inject = ['$q'];
  angular.$inject = ['$q'];

  function ListaInicial($http, $q){

    // function leLista(){
      // $http.get("https://api.myjson.com/bins/2krxz")
        // .success(function(data){
            // //return JSON.stringify(data);
            // if(!localStorage["toDo"]){
              // localStorage.setItem('toDo', JSON.stringify(data));
            // }

        // })
        // .error(function(response){
            // return response;
        // })
    // }
	
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
