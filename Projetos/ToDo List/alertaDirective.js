(function() {

angular
  .module('toDoList')
  .directive('alertaDirective', alertaDirective);

  angular.$inject = [];

  function alertaDirective(){

    return {
      templateUrl: 'alert.html',
      //substitui o elemento pelo template da diretiva
      replace: true,
      //restricao do uso
      restrict: 'AE',
      //mediação da comunição entre a diretiva e o local em que está sendo aplicado
      scope: {
        mensagemalerta: "="
      },
      link: function(){
        $('.toast').hide();

        $('button').click(function () {
          $('.toast').stop().fadeIn(400).delay(3000).fadeOut(400); //fade out after 3 seconds
        });
      }
    };

  }
})();
