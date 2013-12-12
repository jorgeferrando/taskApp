taskApp.factory('taskService',function($http){

        var URL = "http://domain.com/taskservice";
        var MY_HEADERS = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Uni-Secret": "9d0b6d4d45c18e2bf3d3c841f5cce9ab"
        };

        var combine = function (obj1,obj2) {
            for(var prop in obj2) {
                if(obj2.hasOwnProperty(prop)) {
                    obj1[prop] = obj2[prop];
                }
            }
            return obj1;
        };

        var myHttp = function(customHttpConfig,callback){
            var httpConfig = {
                method:'GET',
                headers:MY_HEADERS
            };
            httpConfig = combine(httpConfig,customHttpConfig);
            $http(httpConfig)
            .success(function(data,status,headers,config){
                callback(null,data);
            })
            .error(function(data,status,headers,config){
                callback(data,null);
            });
        };
        return {
            getAll : function(callback) {
                myHttp({url: URL + '/tasks'},callback);
            },
            getById: function(id,callback) {
                myHttp({url: URL + '/task/'+id},callback);
            },
            newTask: function(task,callback) {
                myHttp({method:'POST',url: URL + '/task',data:task},callback);
            },
            updateTask:function(task,callback) {
                myHttp({method:'PUT',url: URL + '/task',data:task},callback);
            },
            deleteTask:function(id,callback) {
                myHttp({method:'DELETE',url: URL + '/task/'+id},callback);
            },
            getProjects:function(callback) {
                myHttp({url: URL + '/projects'},callback);
            },
            getTasksByProject:function(id,callback) {
                myHttp({url: URL + '/tasks/project/'+id},callback);
            }
        };

});
