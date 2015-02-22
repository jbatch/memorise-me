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

	$('#progressInfo').html(currBlobIndex + ' / ' + blobTotal);
}

function handleKeyPress(e){
	if(practicing || testing){
		if(e.which == 8){ //BACKSPACE
			console.log('Backspace');
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

				if(currBlobIndex > blobTotal)
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
	}
}