(function () {
'use strict';

angular
  .module('toDoList')
  .controller("toDoListCtrl", todo);
  angular.$inject = ['$scope'];

function todo ($scope) {
    function guid() {
	  function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		  .toString(16)
		  .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
	}
	
	$scope.app = "To-Do List"; //nome do app
    $scope.itens = [];
    $scope.situacoes = [
      {id: guid(), descricao: "pendente"},
      {id: guid(), descricao: "finalizada"}
    ];
    $scope.exibicao = ""; //deixar exibicao "todas" selecionado por default
    $scope.edicao = true;

    //verificar se há dados salvos em localStorage
    if(localStorage["toDo"]){
      $scope.itens = ('toDo: ', JSON.parse(localStorage.getItem('toDo')));
    }
    if(localStorage["toDoSituacao"]){
      $scope.situacoes = ('toDoSituacao: ', JSON.parse(localStorage.getItem('toDoSituacao')));
    }
	
	
    /**
   * @description retorna a qtd de vezes que a situação aparece nas tarefas
   * @param {object} situacao descrição da situação
   */
    $scope.contaItens = function(situacao){
      var cont = 0;
      for (var i = 0, len = $scope.itens.length; i < len; i++)
      {
        if ($scope.itens[i].situacao == situacao)
          cont++;
      }
      return cont;
    }

    /**
     * @description adiciona tarefas no array
     * @param {object} item  model de tarefa
     */
    $scope.adicionarItem = function(item){
	  item.id = guid();
      item.situacao = "pendente";
      $scope.itens.push(angular.copy(item));
      $scope.item.descricao = "";
      localStorage.setItem('toDo', JSON.stringify($scope.itens));
    };

  /**
   * @description exclui tarefa(s) selecionada(s) atraves do checkbox
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
     * @description editar e salvar tarefas
     * @param {object} item  model de tarefa
     */
    $scope.editarItem = function(item){
      $scope.edItem = item;
      localStorage.setItem('toDo', JSON.stringify($scope.itens));
    };

     /**
     * @description verificar se tem, pelo menos, um item selecionado na tabela
     * @param {object} itens  model de tarefas
     */
    $scope.isItemSelecionado = function(itens) {
  				return itens.some(function (item){
  					return item.selecionado;
  				});
  	};

    /**
    * @description cadastro de situação
    * @param {object} situacao  model de situacao
    */
    $scope.adicionarSituacao = function(situacao) {
	  situacao.id = guid();
      $scope.situacoes.push(angular.copy(situacao));
      $scope.situacao.descricao = "";
      localStorage.setItem('toDoSituacao', JSON.stringify($scope.situacoes));
    };

    /**
    * @description excluir situação
    * @param {object} situacao  model de situacao
    */
    $scope.excluirSituacao = function(id) {
	  for (var i = 0, len = $scope.situacoes.length; i < len; i++)
      {
        if ($scope.situacoes[i].id == id)
		{
			$scope.situacoes.splice(i, 1);
			break;
		}
      }
      localStorage.setItem('toDoSituacao', JSON.stringify($scope.situacoes));
    };

    /**
     * @description editar e salvar situacoes
     * @param {object} situacao model de situacao
     */
    $scope.editarSituacao = function(situacao){
      $scope.edSit = situacao;
	  $scope.situacao.descricao = $situacao.descricao;
      localStorage.setItem('toDoSituacao', JSON.stringify($scope.situacoes));
    };
}
})();
