angular
  .module('toDoList')
  .controller("toDoListCtrl", todo);

  angular.$inject = ['$scope'];

function todo ($scope) {
    $scope.app = "To-Do List";
    $scope.itens = [];
    $scope.itens = ('toDo: ', JSON.parse(localStorage.getItem('toDo')));
    $scope.exibicao = ""; //deixar exibicao todas selecionado default

    /**
     * @description  adiciona tarefas no array
     * @param {object} item  model de tarefa
     */
    $scope.adicionarItem = function(item){
      item.situacao="pendente";
      $scope.itens.push(angular.copy(item));
      delete $scope.item;
      //TODO: mudar modo de limpar campo
      localStorage.setItem('toDo', JSON.stringify($scope.itens));
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
      localStorage.setItem('toDo', JSON.stringify($scope.itens));
    };

    /**
     * @description  editar e salvar tarefas
     * @param {object} itens  model de tarefas
     */
    $scope.editarItem = function(item){
      $scope.editar = item;
      localStorage.setItem('toDo', JSON.stringify($scope.itens));
    };

     /**
     * @description  editar e salvar tarefas
     * @param {object} itens  model de tarefas
     */
    $scope.isItemSelecionado = function(itens) {
  				return itens.some(function (item){
  					return item.selecionado;
  				});
  			};

}
