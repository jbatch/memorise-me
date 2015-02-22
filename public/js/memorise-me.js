var sequenceChoice = "PI"
var sequence = [];
var blobSize = 4;
var currBlob = [];
var currBlobBitIndex = 0;
var currBlobIndex = 0;
var blobTotal = 0;

var sequences = {
	PI: [3,1,4,1,5,9,2,6,5,3,5,9],
	CreditCard: [5,2,8,0,1,3,3,7,9,9,9,9,9,9,9,9]
}

var practicing = false;
var testing = false;

function startPractice() {
	sequenceChoice = $('#sequenceList').val();
	sequence = sequences[sequenceChoice];
	blobTotal = Math.ceil( sequence.length / blobSize );
	currBlobIndex = 0;
	currBlobBitIndex = 0;
	currBlob = getBlobAtIndex(currBlobIndex);

	displayBlob(currBlob);
	practicing = true;
}

function getBlobAtIndex(index){
	var blob = [];

	for(var i = 0; i < 4; i++){
		blob.push(sequence[index * blobSize + i])
	}

	return blob;
}

function displayBlob(blob){
	for(var i = 0; i < 4; i++){
		$('#bottomBlob' + i).html(blob[i]);
	}

	updateProgress();
}

function updateProgress(){
	$('#progressInfo').html((currBlobIndex + 1)+ ' / ' + blobTotal);
}

function handleKeyPress(e){
	if(practicing || testing){
		if(e.which == 8){ //BACKSPACE
			console.log('Backspace');
			if(currBlobBitIndex > 0){
				currBlobBitIndex--;
				$('#topBlob' + currBlobBitIndex).removeClass('rightBit');
				$('#topBlob' + currBlobBitIndex).removeClass('wrongBit');
				$('#topBlob' + currBlobBitIndex).html('');
			}
		}
		else{
			var letter = String.fromCharCode(e.which);
			$('#topBlob' + currBlobBitIndex).html(letter);
			
			console.log('Letter: ' + String.fromCharCode(e.which));
			if(letter == currBlob[currBlobBitIndex]){
				$('#topBlob' + currBlobBitIndex).addClass('rightBit');
			}
			else{
				$('#topBlob' + currBlobBitIndex).addClass('wrongBit');
			}

			currBlobBitIndex++;

			if(currBlobBitIndex == 4){
				currBlobBitIndex = 0;
				currBlobIndex++;

				clearBlobs();

				if(currBlobIndex >= blobTotal)
				{
					practicing = false;
				}
				else{
					currBlob = getBlobAtIndex(currBlobIndex);
					displayBlob(currBlob);
				}
				
			}

		}
	}	
}

function clearBlobs(){
	for(var i = 0; i < 4; i++){
		$('#topBlob' + i).html('');
		$('#bottomBlob' + i).html('');
		$('#topBlob' + i).removeClass('rightBit');
		$('#topBlob' + i).removeClass('wrongBit');
		$('#bottomBlob' + i).removeClass('rightBit');
		$('#bottomBlob' + i).removeClass('wrongBit');
	}
}

function toggleNav(){
	$('#site-wrapper').toggleClass('show-nav');
}

function init(){
	$(document).keypress(function(e){
		handleKeyPress(e);
	});


	// http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
	$(document).keydown(function (e) {
	    var preventKeyPress;
	    if (e.keyCode == 8) {
	    	handleKeyPress(e);
	        var d = e.srcElement || e.target;
	        switch (d.tagName.toUpperCase()) {
	            case 'TEXTAREA':
	                preventKeyPress = d.readOnly || d.disabled;
	                break;
	            case 'INPUT':
	                preventKeyPress = d.readOnly || d.disabled ||
	                    (d.attributes["type"] && $.inArray(d.attributes["type"].value.toLowerCase(), ["radio", "checkbox", "submit", "button"]) >= 0);
	                break;
	            case 'DIV':
	                preventKeyPress = d.readOnly || d.disabled || !(d.attributes["contentEditable"] && d.attributes["contentEditable"].value == "true");
	                break;
	            default:
	                preventKeyPress = true;
	                break;
	        }
	    }
	    else
	        preventKeyPress = false;

	    if (preventKeyPress)
	        e.preventDefault();
	});

// https://scotch.io/tutorials/off-canvas-menus-with-css3-transitions-and-transforms

	$('.toggle-nav').click(function() {
		toggleNav();
	});
};









