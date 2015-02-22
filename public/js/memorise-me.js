var sequenceChoice = "PI"
var sequence = [];
var blobSize = 4;
var currBlob = [];
var currBlobIndex = 0;
var blobTotal = 0;

var sequences = {
	PI: [3,1,4,1,5,9,2,6,5,3,5,9],
	CreditCard: [5,2,8,0,1,3,3,7,9,9,9,9,9,9,9,9]
}

function startPractice() {
	sequenceChoice = $('#sequenceList').val();
	sequence = sequences[sequenceChoice];
	blobTotal = Math.ceil( sequence.length / blobSize );
	currBlobIndex = 0;
	currBlob = getBlobAtIndex(currBlobIndex);

	displayBlob(currBlob);
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
		$('#blob' + (i + 1)).html(blob[i]);
	}
}

function handleKeyPress(e){
	console.log(String.fromCharCode(e.which));
}