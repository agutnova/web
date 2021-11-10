$(document).ready(function(){
	let cellSize=60;
	let numRows=8;
	let numCols=12;
	let selectedRow = -1;
	let selectedCol = -1;
	let currentRow = -1;
	let currentCol = -1;
	let gems=new Array();
	let gameStatus="pick";
	
	let colors=new Array(
		"red",
		"blue",
		"green",
		"yellow",
		"gray",
		"orange",
		"purple",
		"pink"
	);
	
	$("body").append('<div id="gameField"></div>').css({
		"background-color": "black", 
		"margin": "0"});
	
	$("#gameField").css({
		"background-color": "black",
		"position": "relative",
		"width": (numCols*cellSize)+"px",
		"height": (numRows*cellSize)+"px"	
	});
	
	for (i=0;i<numRows;i++) {
		gems[i]=new Array();
		for(j=0;j<numCols;j++)
			gems[i][j]=-1;
	}
	
	for (i=0;i<numRows;i++) {
		for(j=0;j<numCols;j++) {
			do {
				gems[i][j]=Math.floor(Math.random()*8);
			} while(isThree(i,j));
			
			$("#gameField").append('<div class="cells" id="cells_'+i+'_'+j+'"></div>');
			$("#cells_"+i+"_"+j).css({
				"position": "absolute",
				"top": (i*cellSize+4)+"px",
				"left": (j*cellSize+4)+"px",
				"width": (cellSize-4)+"px",
				"height": (cellSize-4)+"px",
				"cursor": "pointer",
				"background-color": colors[gems[i][j]]
			})
		}
	}
	
	$("body").append('<div id="marker"></div>');
	$("#marker").css({
		"position": "absolute",
		"width": (cellSize-6)+"px",
		"height": (cellSize-6)+"px",
		"border": "3px solid white"
	}).hide();
	
	$("#gameField").swipe({
		tap: tapListener
	})
	
	function tapListener(event, target)
	{
		if ($(target).hasClass("cells")) {
			if (gameStatus=="pick") {
				let tmp= $(target).attr("id").split("_");
				let row=parseInt(tmp[1]);
				let col=parseInt(tmp[2]);
				$("#marker").show();
				$("#marker").css({
					"top": (row*cellSize+2)+"px",
					"left": (col*cellSize+2)+"px"
				});
				if (selectedCol == -1) {
					selectedRow = row;
					selectedCol = col;
				} else if ((Math.abs(selectedRow-row)==1 && selectedCol==col) ||
						(selectedRow==row && Math.abs(selectedCol-col)==1))
				{
					gameStatus="switch";
					console.log(gameStatus);
					$("#marker").hide();
					currentRow=row;
					currentCol=col;
					switchGems();
					checkMoving();
				} else {
					selectedRow = row;
					selectedCol = col;
				}
			}
		}
	}
	
	function checkMoving() {
		switch (gameStatus) {
			case "switch":
			case "reverse":
				if (!isThree(currentRow, currentCol) && !isThree(selectedRow, selectedCol)) 
				{
					if (gameStatus!="reverse") {
						gameStatus="reverse";
						console.log(gameStatus);
						switchGems();
						checkMoving();
					} else {
						gameStatus="pick";
						console.log(gameStatus);
						selectedCol=-1;
						selectedRow=-1;
					}
				} else {
					gameStatus="delete";
					console.log(gameStatus);
					if (isThree(currentRow,currentCol)) deleteGems(currentRow,currentCol);
					if (isThree(selectedRow,selectedCol)) deleteGems(selectedRow,selectedCol);
					checkMoving();
				}
			break;
			case "delete":
				fallGems();
			break;
			case "filling":
				genNewGems();
			break;
		}
	}
	
	function genNewGems()
	{
		let newGems=0;
		let tmp=-1;
		for (j=0;j<numCols;j++)
		{
			if (gems[0][j]==-1) {
				tmp=0;
				while (tmp<numRows && gems[tmp][j]==-1) {
					gems[tmp][j]=Math.floor(Math.random()*8);
					$("#cells_"+tmp+"_"+j).css({"background-color": colors[gems[tmp][j]]});
					tmp++;
					newGems++;
				}
			}
		}
		if (newGems>0) {
			gameStatus="delete";
			console.log(gameStatus);
			fallGems();
		} else {
			gameStatus="pick";
			selectedCol=-1;
			selectedRow=-1;
		}
	}
	
	function fallGems() {
		for (j=0;j<numCols;j++) {
			for (i=numRows-1;i>0;i--){
				if (gems[i][j]==-1 && gems[i-1][j]>=0) {
					gems[i][j]=gems[i-1][j];
					gems[i-1][j]=-1;
					$("#cells_"+i+"_"+j).css({"background-color": colors[gems[i][j]]});
				}
			}
		}
		gameStatus="filling";
		console.log(gameStatus);
		checkMoving();
	}
	
	function deleteGems(row, col) {
		let c = gems[row][col];
		let tmp=row;
		if (isVertThree(row, col)) {
			while (tmp>0 && gems[tmp-1][col]==c) {
				gems[tmp-1][col]=-1;
				tmp--;
			}
			tmp=row;
			while (tmp<numRows-1 && gems[tmp+1][col]==c)
			{
				gems[tmp+1][col]=-1;
				tmp++;
			}
		}
		if (isHorThree(row,col)) {
			tmp=col;
			while (tmp>0 && gems[row][tmp-1]==c) {
				gems[row][tmp-1]=-1;
				tmp--;
			}
			tmp=col;
			while(tmp<numCols-1 && gems[row][tmp+1]==c)
			{
				gems[row][tmp+1]=-1;
				tmp++;
			}
		}
		gems[row][col]=-1;
	}
	
	function switchGems()
	{
		let tmp=gems[currentRow][currentCol];
		gems[currentRow][currentCol] = gems[selectedRow][selectedCol];
		gems[selectedRow][selectedCol] = tmp;
		$("#cells_"+currentRow+"_"+currentCol).css({"background-color": colors[gems[currentRow][currentCol]]});
		$("#cells_"+selectedRow+"_"+selectedCol).css({"background-color": colors[gems[selectedRow][selectedCol]]});
	}
	
	function isThree(i,j) 
	{
		return isVertThree(i,j) || isHorThree(i,j);
	}

	function isVertThree(i,j)
	{
		let k=1;
		let tmp=i;
		while (tmp>0 && gems[tmp-1][j]==gems[i][j]) {
			k++;
			tmp--;
		}
		tmp=i;
		while(tmp<numRows-1 && gems[tmp+1][j]==gems[i][j]) {
			k++;
			tmp++;
		}
		return k>2;
	}

	function isHorThree(i,j)
	{
		let k=1;
		let tmp=j;
		while (tmp>0 && gems[i][tmp-1]==gems[i][j]) {
			k++;
			tmp--;
		}
		tmp=j;
		while(tmp<numCols-1 && gems[i][tmp+1]==gems[i][j]) {
			k++;
			tmp++;
		}
		return k>2;
	}
})