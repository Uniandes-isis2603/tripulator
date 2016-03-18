(function (ng) {
    var mod = ng.module("eventoModule");
    mod.controller('EventosController', ['$scope', 'EventosInfoService', '$http', function ($scope, svc, $http) {

            $scope.events = [];
            $scope.eventoActual = {};
            $scope.commentTemplate = {
                user: "Default",
                userPhoto: "http://www.periodicoabc.mx/sites/default/files/anonimoface.png",
                stars: 0,
                comment: ""
            };
            $scope.starSelected = false;
            $scope.newComment = angular.copy($scope.commentTemplate);
            
            $scope.actualizarInfo = function (e) {
                $scope.eventoActual = e;
            };
            $scope.crearEstrellas = function (s) {
                var resp = "";
                var estrellasFaltantes = 5;
                var i = Number(s);
                for (; i > 0; i--) {
                    resp += "&#9733";
                    estrellasFaltantes--;
                }
                for (; estrellasFaltantes > 0; estrellasFaltantes--) {
                    resp += "&#9734";
                }
                var txt = document.createElement("textarea");
                txt.innerHTML = resp;
                return txt.value;
            };
            $scope.comentarioActualStars = function (numb) {
                var i;
                numb = Number(numb);
                var txt = document.createElement("textarea");
                txt.innerHTML = "&#9733";
                var txt2 = document.createElement("textarea");
                txt2.innerHTML = "&#9734";
                for (i = 1; i < numb + 1; i++) {
                    document.getElementById(i).innerHTML = txt.value;
                }
                for (; i < 6; i++) {
                    document.getElementById(i).innerHTML = txt2.value;
                }
                $scope.starSelected = !$scope.starSelected;
                if ($scope.starSelected) {
                    $scope.newComment.stars = numb;
                } else {
                    $scope.newComment.stars = 0;
                }
            };
            var self = this;
            $scope.finComentarioActual = function () {
                self.update($scope.newComment,$scope.eventoActual.id);
                $scope.reset();
            };
            $scope.reset = function () {
                $scope.newComment = angular.copy($scope.commentTemplate);
                $scope.starSelected = false;
                $scope.newComment.comment = "";
                $scope.resetPaint();
            };
            $scope.paintStar = function (numb) {
                if (!$scope.starSelected) {
                    var i;
                    numb = Number(numb);
                    var txt = document.createElement("textarea");
                    txt.innerHTML = "&#9733";
                    var txt2 = document.createElement("textarea");
                    txt2.innerHTML = "&#9734";
                    for (i = 1; i < numb + 1; i++) {
                        document.getElementById(i).innerHTML = txt.value;
                    }
                    for (; i < 6; i++) {
                        document.getElementById(i).innerHTML = txt2.value;
                    }
                }
            };
            $scope.resetPaint = function () {
                if (!$scope.starSelected) {
                    var i = 1;
                    var txt2 = document.createElement("textarea");
                    txt2.innerHTML = "&#9734";
                    for (; i < 6; i++) {
                        document.getElementById(i).innerHTML = txt2.value;
                    }
                }
            };
            var self=this;
            this.fetchEventos = function () {
                return svc.fetchEventos().then(function (response) {
                    $scope.events = response.data;
                    if($scope.events.length>=1){
                        $scope.eventoActual=$scope.events[0];
                        self.getComments();
                    }
                    return response;
                }, function (response){ console.log(response);});
            };
            this.getComments = function (){
              return svc.getComments($scope.eventoActual.id).then(function (response) {
                    $scope.eventoActual.comments = response.data;
                    return response;
                }, function (response){ console.log(response);});
            };
            this.update = function(cmt,index){
                console.log(index);
                cmt.id=$scope.eventoActual.comments.length+1;
                cmt.id_evento=index;
                $scope.eventoActual.comments.push(cmt);
                return svc.saveRecord($scope.eventoActual,index).then(function () {
                        self.fetchEventos();
                    }, function (response){ console.log(response);});
            };
            this.fetchEventos();
        }]);
})(window.angular);
