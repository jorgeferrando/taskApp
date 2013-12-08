taskApp.controller('taskController',function($scope,$timeout,taskService){
    // VARIABLE DEFINITIONS
    $scope.tasks = [];
    $scope.totalTasks = 0;
    $scope.currentPage = 1;
    $scope.perPageOptions = [5,10,15,20,50,100];
    $scope.tasksPerPage = $scope.perPageOptions[0];
    $scope.allChecked = false;
    $scope.completedTasks = 0;
    $scope.alerts = [];
    $scope.visiblealert = false;
    $scope.alert =  {
        msg:'message',
        type:'success'
    };

    // PRIVATE FUNCTIONS
    var updateAlert = function(msg,type) {
        type = type || 'success';
        $scope.alert.msg = msg;
        $scope.alert.type = type;
        $scope.visiblealert = true;
        $timeout(function(){
            $scope.visiblealert = false;
        },3000);
    };
    var updateNumberOfCompletedTasks = function (tasks) {
        var i = tasks.length;
        var completed = 0;
        while(i--) {
            if(tasks[i].completed) {
                completed++;
            }
        }
        $scope.completedTasks = completed;
    };
    var refreshTasks = function () {
        taskService.getAll(function(error,data){
            if(error !== null){
                console.log(JSON.stringify(error));
                return;
            }
            $scope.tasks = data;
            $scope.totalTasks = data.length;
            updateNumberOfCompletedTasks($scope.tasks);
            updatePagination();
        });
    };
    var getCompletedIds = function(tasks) {
        var i = tasks.length;
        var completedIds = [];
        while(i--) {
            if(tasks[i].completed) {
                completedIds.push(tasks[i].id);
            }
        }
        return completedIds;
    };
    var taskServiceCallback = function(error,data){
        if(error !== null) {
            console.log(JSON.stringify(error));
            updateAlert('Something went wrong. Review the console to see the error','error');
            return;
        }
        refreshTasks();
    };

    //PAGINATION FUNCTIONS
    var updatePagination = function() {
        var begin = (($scope.currentPage - 1) * $scope.tasksPerPage)
            , end = begin + $scope.tasksPerPage;
        $scope.filteredTasks = $scope.tasks.slice(begin, end);
    };
    $scope.$watch('currentPage+tasksPerPage',updatePagination);

    //CHECK ALL TASKS IN PAGE FUNCTION
    var updateAllTasksInPage = function (newValue,oldValue) {
        if (newValue === oldValue) {
            return;
        }
        var i = $scope.filteredTasks.length;
        while(i--) {
            $scope.filteredTasks[i].completed = !$scope.allChecked;
            $scope.completeTask($scope.filteredTasks[i]);
        }
        updateAlert("All tasks in page updated.");
    };
    $scope.$watch('allChecked',updateAllTasksInPage);

    //PUBLIC CRUD FUNCTIONS
    $scope.addTask = function() {
        var now = new Date().toISOString();
        var task = {
            description: $scope.formTaskDescription,
            duedate: now,
            completed:false,
            project: $scope.formProjectName
        };
        taskService.newTask(task,taskServiceCallback);
        updateAlert("Task '"+task.description+"' added to project '"+task.project+"'");
    };
    $scope.deleteTask = function(task) {
        taskService.deleteTask(task.id,taskServiceCallback);
        updateAlert("Task '"+task.description+"' deleted from project '"+task.project+"'");
    };
    $scope.completeTask = function(task) {
        task.completed = !task.completed;
        taskService.updateTask(task,taskServiceCallback);
        if(task.completed) {
            updateAlert("Task '"+task.description+"' from project '"+task.project+"' completed");
        } else {
            updateAlert("Task '"+task.description+"' from project '"+task.project+"' reopened");
        }
    };
    $scope.updateTaskDescription = function(task,data) {
        task.description = data;
        taskService.updateTask(task,taskServiceCallback);
        updateAlert("Task description updated to '"+task.description+"'");
    };
    $scope.updateTaskProject = function(task,data) {
        task.project = data;
        taskService.updateTask(task,taskServiceCallback);
        updateAlert("Task project updated to '"+task.description+"'");
    };
    $scope.deleteCompletedTasks = function() {
        var completedIds = getCompletedIds($scope.tasks);
        var i = completedIds.length;
        while(i--) {
            taskService.deleteTask(completedIds[i],taskServiceCallback);
        }
        updateAlert("All completed tasks have been removed");
    };

    //INITIALIZATION
    refreshTasks();
});
