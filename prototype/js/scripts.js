var imageBinary;
var styles;
var resultCheck;
var submissionId;
var maxImageSize;

var deepArtEffectsClient = apigClientFactory.newClient({
	apiKey: 'O4hbyntqyw7vQhp4Hei137fpKKw2fyZ24hf6AHjf',
	accessKey: 'AKIA3XE3HF7SVBFS4G2B',
    secretKey: '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'
});

var chosen_styles = [122, 116, 112, 9, 34]

$(document).ready(function(){
	$("#result").hide();
	$("#progress-wrapper").hide();
	deepArtEffectsClient.stylesGet()
    .then(function(result){
    	console.log("Successfully loaded styles");
        //This is where you would put a success callback
        var ol = $('<ol id="selectable">');
        ol.appendTo('#style-list')
		styles = result.data;
        for (var i = 0, length = chosen_styles.length; i < length; i++) {	
  			var li = $("<li>");
  			li.attr('onClick',"uploadImage('"+styles[chosen_styles[i]].id+"')")
  			var div = $('<div class="style">');
			div.attr('style', "background-image: url("+styles[chosen_styles[i]].url+")");
			li.append(div);
			li.appendTo('#selectable');
		}
    }).catch(function(result){
        //This is where you would put an error callback
        console.log("Error loading styles");
    });
})
function uploadImage(styleId) {
	if(imageBinary==null) {
		alert('Please choose a picture first')
		return;
	}

	$("#styles").hide();
	$("#progress-wrapper").show();
	maxImageSize = $("#qualitySelect").val();

	optimizeForPrint = $('#optimzeForPrint').prop('checked');
	useOriginalColors = $('#useOriginalColors').prop('checked');

	var body = { 
		'styleId': styleId,
		'imageBase64Encoded': imageBinary,
		'optimizeForPrint': optimizeForPrint,
		'useOriginalColors': useOriginalColors,
		'imageSize': maxImageSize
	};

	deepArtEffectsClient.uploadPost(null, body)
	.then(function(result) {
		console.log("Successfully uploaded image");
		submissionId = result.data.submissionId
		resultCheck = setInterval(imageReadyCheck, 2500);
	}).catch(function(result){
        //This is where you would put an error callback
        console.log("Error uploading image");
    });
}
function imageReadyCheck() {
	var params = {
    	submissionId: submissionId,
	};
	deepArtEffectsClient.resultGet(params)
	.then(function(result) {
		console.log("Successfully status check");
		if(result.data.status=="finished") {
			var a = $('<a data-fancybox="gallery">');
			a.attr('href', result.data.url);
			var img = $('<img class="result-image">');
			img.attr('src', result.data.url);
			a.append(img);
			a.appendTo('#artwork');
			clearInterval(resultCheck);
			$("#result").show();
			$("#styles").show();
			$("#progress-wrapper").hide();
		}
	}).catch(function(result){
        console.log("Error checking status");
    });
}
function onFileSelected(event) {
    var files = event.target.files;
    var file = files[0];

	maxImageSize = $("#qualitySelect").val();

    if (files && file) {
	    ImageTools.resize(file, {width: maxImageSize, height: maxImageSize}, 
	    	function(blob, didItResize) {
				var reader = new FileReader();
				reader.onload = function(readerEvt) {
	            	imageBinary = btoa(readerEvt.target.result);
	        	};
        		reader.readAsBinaryString(blob);
	    	}
	    );
	}
}
