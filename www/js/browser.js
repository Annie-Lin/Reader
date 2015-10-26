var link = "";
var iFrameObj;

function openNewPage(){

	$("a").click(function(e){
		/* prevent click and save url */
		e.preventDefault();
		link = e.target.href;
		
		/* cordova inappbrowser plugin */
		cordova.InAppBrowser.open(link, '_blank', 'location=yes');

	});

}


