(function() {

angular
  .module('toDoList')
  .service('ListaInicial', ListaInicial);

  ListaInicial.$inject = ['$http'];

  function ListaInicial($http){
    var vm = this;
    vm.leLista = leLista;

    function leLista(){
      $http.get("https://api.myjson.com/bins/2krxz")
        .success(function(data){
            //return JSON.stringify(data);
            if(!localStorage["toDo"]){
              localStorage.setItem('toDo', JSON.stringify(data));
            }

        })
        .error(function(response){
            return response;
        })
    }

  }


})();
