(function() {
'use strict';
	
angular
  .module('toDoList')
  .factory('removeItensFactory', removeItensFactory);

  function removeItensFactory(){
	var acao = {
		removerItem: removerItem
	};
	return acao;
	
	function removerItem(itens ,id){
		for (var i = 0, len = itens.length; i < len; i++){
            if (itens[i].id === id){
        	     itens.splice(i, 1);
				 break;
            }
		}
	}
  }
})();