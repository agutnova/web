var app= angular.module("FrogsApp", []);
app.controller("FrogsController", MyController);

function MyController($scope) {
	var empty=4;
	var list=[];
	for(i=0;i<9;i++)
		if (i<4)
			list.push({id:i, image: "images/frog1.png"});
		else if (i>4)
			list.push({id:i, image: "images/frog2.png"});
		else
			list.push({id:i, image: "images/list.png"});
	$scope.frogs=list;
	
	$scope.Jump = function(id) {
		if (id != empty) {
			/*var frog1_left=document.getElementById("frog_"+id).style.left;
			alert(frog1_left);*/
			
			var frog_src=document.getElementById("frog_"+id).src;
			document.getElementById("frog_"+empty).src=frog_src;
			document.getElementById("frog_"+id).src="images/list.png";
			empty=id;
			var tmp=$scope.frogs[id];
			$scope.frogs[id]=$scope.frogs[empty];
			$scope.frogs[empty]=tmp;
		}
	}
}