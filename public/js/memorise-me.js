var sequenceChoice = "PI";
var sequence = [];
var blobSize = 4;
var currBlob = [];
var currBlobBitIndex = 0;
var currBlobIndex = 0;
var blobTotal = 0;

var correct;

var sequences = {
	PI: [3,1,4,1,5,9,2,6,5,3,5,9],
	CreditCard: [5,2,8,0,1,3,3,7,9,9,9,9,9,9,9,9]
}

var practicing = false;
var testing = false;
var menuOpen = false;

function startPractice() {
	if(!menuOpen){
		initialiseSequence();

		displayBlob(currBlob);
		practicing = true;
		testing = false;
	}
}

function startTest(){
	if(!menuOpen){
		initialiseSequence();

		updateProgress();
		practicing = false;
		testing = true;
		correct = 0;
	}
}

function initialiseSequence(){
	sequenceChoice = $('#sequenceList').val();
	sequence = sequences[sequenceChoice];
	blobTotal = Math.ceil( sequence.length / blobSize );
	currBlobIndex = 0;
	currBlobBitIndex = 0;
	currBlob = getBlobAtIndex(currBlobIndex);

	clearBlobs();
}

function getBlobAtIndex(index){
	var blob = [];

	for(var i = 0; i < 4; i++){
		if(sequence[index * blobSize + i]){
			blob.push(sequence[index * blobSize + i]);
		}
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

function showResults(){
	$('#results').html('Results: ' + correct + ' / ' + sequence.length);
	$('#resultsRow').css('display', 'flex')
}

function handleKeyPress(e){
	if(practicing || testing && !menuOpen){
		if(e.which == 8 && practicing){ //BACKSPACE
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
			
			if(letter == currBlob[currBlobBitIndex]){
				$('#topBlob' + currBlobBitIndex).addClass('rightBit');
				correct++;
			}
			else{
				$('#topBlob' + currBlobBitIndex).addClass('wrongBit');
			}

			updateBlobIndexes();
		}		
	}	
}

function updateBlobIndexes(){
	currBlobBitIndex++;
	console.log(currBlob);
	if(currBlobBitIndex >= currBlob.length){
		currBlobBitIndex = 0;
		currBlobIndex++;

		clearBlobs();
	}
	if(currBlobIndex >= blobTotal)
	{
		if(testing){
			showResults();
		}
		practicing = false;
		testing = false;
	}
	else{
		currBlob = getBlobAtIndex(currBlobIndex);
		
		if(practicing){
			displayBlob(currBlob);
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

function toggleLeftMenu(){
	$('#site-wrapper').toggleClass('show-left');
	fillCurrentSequences();
	menuOpen = menuOpen ? false : true;
}

function toggleRightMenu(){
	$('#site-wrapper').toggleClass('show-right');
	menuOpen = menuOpen ? false : true;
}

function showDetailedResults(){
	$('#resultsModal').modal('show');
}

function fillCurrentSequences(){
	$('#currentSequences').empty();
	var options = $('#sequenceList').children('option');
	for(var i = 0; i < options.length; i++){
		appendSequence(options[i].innerHTML);
	}
}

function appendSequence(sequenceName){
	console.log(sequenceName);
	$('#currentSequences').append('<div onclick="removeSequence(this)" class="btn btn-danger">' 
		 + sequenceName + 
		 '<span class="glyphicon glyphicon-remove"><span>' + 
		 '</div>');
}

function removeSequence(source){
	console.log(source.innerHTML);
	source.remove();
	// $('#sequenceList').find('[val="' + source.innerHTML + '"]').remove();
	var options = $('#sequenceList').children();
	console.log(options);
	for(var i = 0; i < options.length; i++){
		if(options[i].innerHTML + '<span class="glyphicon glyphicon-remove"><span></span></span>' == source.innerHTML){
			options[i].remove();
		}
	}
}

function addSequence(){
	var sequenceName = $('#nameField').val();
	var sequenceValue = $('#sequenceField').val();
	if(sequenceValue.indexOf(',') > -1){
		sequenceValue = sequenceValue.split(',');
	}
	else if(sequenceValue.indexOf(' ') > -1){
		sequenceValue = sequenceValue.split(' ');
	}
	else{
		sequenceValue = sequenceValue.split('');
	}

	if(validateSequence(sequenceValue)){
		if(!sequences[sequenceName]){
			sequences[sequenceName] = sequenceValue;
			$('#sequenceList').append($('<option></option>').html(sequenceName));
			$('#nameField').val('')
			$('#sequenceField').val('')
			fillCurrentSequences();
		}
		else{
			alert("Sequence name already used!")
		}
	}
	else {
		alert('Invalid sequence!');
	}
}

function validateSequence(sequence){
	var valid = true;

	for(var i = 0; i < sequence.length; i++){
		if(sequence[i].length != 1){
			valid = false;
		}
	}

	return valid;
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









