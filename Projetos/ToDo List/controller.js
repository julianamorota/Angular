(function () {

angular
  .module('toDoList')
  .controller("toDoListCtrl", todo);

  angular.$inject = ['$scope'];

function todo ($scope) {
    $scope.app = "To-Do List";
    $scope.itens = [];
    $scope.situacoes = [
      {descricao: "pendente"},
      {descricao: "finalizada"}
    ];
    $scope.itens = ('toDo: ', JSON.parse(localStorage.getItem('toDo')));
    $scope.situacoes = ('toDoSituacao: ', JSON.parse(localStorage.getItem('toDoSituacao')));
    $scope.exibicao = ""; //deixar exibicao "todas" selecionado por default

    /**
     * @description  adiciona tarefas no array
     * @param {object} item  model de tarefa
     */
    $scope.adicionarItem = function(item){
      item.situacao="pendente";
      $scope.itens.push(angular.copy(item));
      $scope.item.descricao = "";
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
    }

    /**
     * @description  editar e salvar tarefas
     * @param {object} item  model de tarefa
     */
    $scope.editarItem = function(item){
      $scope.editar = item;
      localStorage.setItem('toDo', JSON.stringify($scope.itens));
    };

     /**
     * @description  verificar se tem, pelo menos, um item selecionado na tabela
     * @param {object} itens  model de tarefas
     */
    $scope.isItemSelecionado = function(itens) {
  				return itens.some(function (item){
  					return item.selecionado;
  				});
  	};

    /**
    * @description  editar e salvar tarefas
    * @param {object} itens  model de tarefas
    */
    $scope.adicionarSituacao = function(situacao) {
      $scope.situacoes.push(angular.copy(situacao));
      $scope.situacao.descricao = "";
      localStorage.setItem('toDoSituacao', JSON.stringify($scope.situacoes));
    };
}
})();
