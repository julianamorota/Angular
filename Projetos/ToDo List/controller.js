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
    localStorage.setItem('toDoList', JSON.stringify($scope.itens));
  };

/**
 * @description  exclui tarefa(s) selecionada(s) atraves do checkbox
 * @param {object} itens  model de tarefas
 */
  $scope.excluirItem = function(itens){

    $scope.itens = itens.filter(function(item){
      if(!item.selecionado)
        return item;
    });
  };

  /**
   * @description  editar e salvar tarefas
   * @param {object} itens  model de tarefas
   */
  $scope.editarItem = function(item){
    $scope.editar = item;
  };


});
