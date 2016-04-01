(function(){
	var app = angular.module('clockApp',[]);
	
	app.controller('TimeController', ['$interval',function($interval){
		this.time = 1234;
		
		this.getTime = function(){return Date.now()};
		
		var tick = function(){
			this.time = Date.now();
		};
		tick();
		$interval(tick,1000);
	}]);

	app.controller('LightController', ['$http',function($http){
		this.lights = [{"id":0,"value":1},
				{"id":1,"value":0},
				{"id":2,"value":1},
				{"id":3,"value":0}];


		this.switch = function(switch_id, switch_val=-1){
			var data = {"light_id": switch_id, "light_val": switch_val};
			$http.post('/lights', data)
		};
	}]);
})();