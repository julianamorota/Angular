app.controller("toDoListCtrl", function($scope){

  $scope.app = "To-Do List";
  $scope.itens = [];

  /**
   * @description  adiciona tarefas no array
   * @param {object} item  model de tarefa
   */
  $scope.adicionarItem = function(item){
    item.situacao="pendente";
    $scope.itens.push(angular.copy(item));
    delete $scope.item;
  };

  /**
   * @description  editar
   * @param {object} itens  model de tarefas
   */
  $scope.editarItem = function(item){

  };

  /**
   * @description  o que é a fn
   * @param {object} itens  model de tarefas
   */
  $scope.alterarItem = function(item){

  };

/**
 * @description  o que é a fn
 * @param {object} itens  model de tarefas
 */
  $scope.excluirItem = function(itens){

    $scope.itens = itens.filter(function(item){
      if(!item.selecionado)
        return item;
    });

  };

  $scope.editarItem = function(item){
    $scope.editar = item;
    console.log($scope.itens);
  };


});
