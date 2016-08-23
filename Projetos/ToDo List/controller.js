(function () {
'use strict';

angular
  .module('toDoList')
  .controller("toDoListCtrl", todo);
  angular.$inject = ['$scope'];
  angular.$inject = ['$timeout'];
  angular.$inject = ['$window'];
  angular.$inject = ['listarService'];
  angular.$inject = ['removeItensFactory'];

  function todo ($scope, $timeout, $window, listarService, removeItensFactory) {

	
    //nome do app
    $scope.app = "To-Do List";
    $scope.itens = [];
    //inicializa com duas situacoes por default
    $scope.situacoes = [
      {id: guid(), descricao: "pendente"},
      {id: guid(), descricao: "finalizada"}
    ];
    //deixar exibicao "todas" selecionado por default
    $scope.exibicao = "";
    //div msg hide
    $scope.msg = true;

    //verificar se há dados salvos em localStorage
    if(localStorage["toDo"]){
      $scope.itens = ('toDo: ', JSON.parse(localStorage.getItem('toDo')));
    }
	//se não houver dados salvos em localstorage, ele salva uma lista inicial
	else{
		listarService.obtemLista()
		.then(
			function(result){
				$scope.itens = result;
			},
			function(error){
				$scope.alerta("Erro ao carregar lista inicial");
			}
		);
	}
    if(localStorage["toDoSituacao"]){
      $scope.situacoes = ('toDoSituacao: ', JSON.parse(localStorage.getItem('toDoSituacao')));
    }
    //verifica se há dados salvos em localstorage sobre o tempo de exibição das mensagens na tela
    if(localStorage["configTemp"]){
        $scope.tempo = ('configTemp: ', JSON.parse(localStorage.getItem('configTemp')));
    }
    //se não existe, default 3 segundos
    else{
      $scope.tempo = 3000;
    }

  /**
  * @description gera um guid para tarefa e situacao
  */
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
  };

  /**
  * @description retorna a qtd de vezes que a situação aparece nas tarefas
  * @param {object} situacao model de situacao
  */
    $scope.contaItens = function(situacao){
      var cont = 0;
      for (var i = 0, len = $scope.itens.length; i < len; i++){
        if ($scope.itens[i].situacao === situacao) {
          cont++;
        }
      }
      return cont;
    };

  /**
   * @description cadastro de tarefa
   * @param {object} item  model de tarefa
   */
    $scope.adicionarItem = function(item){
      item.id = guid();
      item.situacao = "pendente";
      $scope.itens.push(angular.copy(item));
      $scope.item.descricao = "";
      localStorage.setItem('toDo', JSON.stringify($scope.itens));
      $scope.alerta("Cadastro de tarefa realizado com sucesso!");
    };

  /**
  * @description exclui tarefa(s) selecionada(s) atraves do checkbox
  * @param {object} itens  model de tarefas
  */
    $scope.excluirItem = function(itens){
	  for (var i = 0, len = itens.length; i < len; i++)
      {
        if (itens[i].selecionado === true){
			removeItensFactory.removerItem(itens, itens[i].id);
			break;
		}
      }
      localStorage.setItem('toDo', JSON.stringify($scope.itens));
      $scope.alerta("Exclusao de tarefa realizada com sucesso!");
    };

  /**
   * @description editar e salvar tarefas
   * @param {object} item  model de tarefa
   */
    $scope.editarItem = function(item){
      $scope.edItem = item;
      localStorage.setItem('toDo', JSON.stringify($scope.itens));
    };

   /**
   * @description verificar se existe, pelo menos, um item selecionado na tabela
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
      var igual = false;
      for (var i = 0, len = $scope.situacoes.length; i < len; i++)
      {
        if ($scope.situacoes[i].descricao === situacao.descricao)
          igual = true;
      }
      if(!igual)
      {
        situacao.id = guid();
        $scope.situacoes.push(angular.copy(situacao));
        $scope.situacao.descricao = "";
        localStorage.setItem('toDoSituacao', JSON.stringify($scope.situacoes));
        $scope.alerta("Cadastro de situacao realizado com sucesso.");
      }
      else{
        $scope.alerta("Ja existe uma situacao cadastrada com esse nome.");
      }
    };

    /**
      * @description excluir situação (fazendo verificação se já existe tarefa cadastrada)
      * @param {object} situacao  model de situacao
      */
      $scope.excluirSituacao = function(situacao) {
        var existe = false;
        for (var i = 0, len = $scope.itens.length; i < len; i++){
          if ($scope.itens[i].situacao === situacao.descricao) existe = true;
        }
        if(!existe){
          for (var i = 0, len = $scope.situacoes.length; i < len; i++){
            if ($scope.situacoes[i].id === situacao.id){
        	     $scope.situacoes.splice(i, 1);
               break;
            }
          }
          localStorage.setItem('toDoSituacao', JSON.stringify($scope.situacoes));
          $scope.alerta("Exclusao de situacao realizada com sucesso.");
        }
        else{
          $scope.alerta("Nao foi possivel apagar pois uma tarefa esta cadastrada com essa situacao.");
        }
      };

    /**
      * @description mostrar o link do site gitkraken depois de 3 segundos
      */
      $timeout(function(){
        $scope.gitkraken = "Git Kraken";
      }, 3000);

      /**
        * @description redirecionar para o site gitkraken
        */
      $scope.redireciona = function(){
         $window.location.href = 'https://www.gitkraken.com';
      }

    /**
      * @description cadastro do tempo que as mensagens serão exibidas
      */
      $scope.configTemp = function(){
        localStorage.setItem('configTemp', JSON.stringify($scope.tempo));
        $scope.alerta("Configuracao de tempo cadastrada com sucesso");
      };

    /**
      * @description exibir mensagens na tela (erro/sucesso) baseado no tempo cadastrado
      * @param {object} mensagem mensagem a ser exibida
      */
      $scope.alerta = function(mensagem){
        $scope.msg = false;
        $scope.mensagem = mensagem;
        $timeout(function(){ $scope.msg = true;}, $scope.tempo);
      };
  }
})();
