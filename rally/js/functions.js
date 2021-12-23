var app= angular.module("RallyApp", []);
app.controller("RallyController", ['$scope', function($scope){

	function move(e){
		if (e.keyCode == 37) {
			document.getElementById("car").style.left =
			   (document.getElementById("car").offsetLeft-5)+"px";
		}
		if (e.keyCode == 39) {
			document.getElementById("car").style.left = 
			   (document.getElementById("car").offsetLeft+5)+"px";
		}
	}
	
	document.addEventListener("keyup", move);
	
	var y=0;
	function road() 
	{
		var road=document.getElementById("road");
		y+=5;
		road.style.top = y+"px";
		if (y>800) setTimeout(road(), 100);
	}
	
	road();
}]);
