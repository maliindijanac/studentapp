var app = angular.module('student',  ['ui.bootstrap']);
app.controller('appctrl', function($scope, $rootScope,$http,$uibModal) {

    loadStudent();
    

    function loadStudent() {
        $http.get("/rest/student").then(function(response) {    
         $scope.students = response.data;
        });
    };

    function loadCategories() {
        $http.get("/rest/categories").then(function(response) {    
         $scope.categories = response.data;
        });

    };

    $scope.deleteStudent= function (id) {
        console.log(id);
        $http.delete("/rest/student/"+ id).then(function(response) {    
        loadStudent();
        });
    };


    $scope.saveStudent = function (data) {
        vdata = {id :data.id, 
                 ime: data.ime,
                 prezime: data.prezime,
                 mentor_id: data.mentor_id,
                 odsijek_id: data.odsijek_id};
        $http.post("/rest/student",JSON.stringify(vdata)).then(function(response) {
	
           loadStudent();
        });
    };

    $scope.updateStudent = function (id,data) {
      vdata = {id :data.id, 
        ime: data.ime,
        prezime: data.prezime,
        mentor_id: data.mentor_id,
        odsijek_id: data.odsijek_id};
      
        $http.put("/rest/student/"+id,JSON.stringify(vdata)).then(function(response) {

         loadStudent();
      });
   };

    $scope.confirmdelete = function (id) {
        console.log('confirmdelete modal');
        modalInstance = $uibModal.open({
            controller: 'ConfirmInstanceCtrl',
            controllerAs: 'pc',
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'confirmModal.html', 
            backdrop : 'static',
            resolve: {
            }     
        });
    
        modalInstance.result.then(function () {
            console.log ("Confirm"+ id);
              $scope.deleteStudent(id);

    
        }, function () {
            console.log('onfirmModal dismissed');
        });
        
        $rootScope.modalInstance = modalInstance;
      };

      $scope.editStudent = function (id) {
        console.log('edit modal');

        modalInstance = $uibModal.open({
            controller: 'editInstanceCtrl',
            controllerAs: '$ctrl',
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'editStudent.html', 
            backdrop : 'static',
            resolve: {
              studentid : function () { return id}
            }     
        });
    
        modalInstance.result.then(function (data) {
            if (data.old_id) {
              $scope.updateStudent(data.old_id,data);
            } else {
              $scope.saveStudent(data);
            }

    
        }, function () {
            console.log('ConfirmModal dismissed');
        });
        
        $rootScope.modalInstance = modalInstance;
      };

}).controller('ConfirmInstanceCtrl', function ($uibModalInstance) {

    this.ok = function () {
      $uibModalInstance.close('ok');
    };
  
    this.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }).controller('editInstanceCtrl', function ($uibModalInstance,$http, studentid) {
    var $ctrl=this;
    
    if (studentid) {
      $http.get("/rest/student/"+studentid).then(function(response) {    
         $ctrl.id= response.data.id;
         $ctrl.ime= response.data.ime;
         $ctrl.prezime= response.data.prezime;
         $ctrl.mentor_id= response.data.mentor_id;
         $ctrl.odsijek_id= response.data.odsijek_id;
       });
    }
    
    $http.get("/rest/mentor").then(function(response) {    
        $ctrl.mentori = response.data;
    });
    $http.get("/rest/odsijek").then(function(response) {    
      $ctrl.odsjeci = response.data;
  });

    this.ok = function () {
      $uibModalInstance.close({
          id:$ctrl.id,
          ime:$ctrl.ime,
          prezime:$ctrl.prezime,
          mentor_id:$ctrl.mentor_id,
          odsijek_id:$ctrl.odsijek_id,
          old_id : studentid
      });
    };
  
    this.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
  ;