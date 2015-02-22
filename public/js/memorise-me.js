var sequenceChoice = "PI"
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
	console.log(sequences[sequenceChoice]);
}