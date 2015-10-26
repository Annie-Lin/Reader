var link = "";
var iFrameObj;

function openNewPage(){

	$("a").click(function(e){
		e.preventDefault();
		link = e.target.href;
		// log(">>>  "+link)
		
		// cordova.InAppBrowser.open(link, '_blank', 'location=yes');

		// $("#container").hide();
		// $("#browser").show();

		// iFrameObj = document.createElement("iframe");
		// $(iFrameObj).attr("src",link);
		// $(iFrameObj).width(100%);
		// $(iFrameObj).css("frameborder",0);
		// $("#loader").append(iFrameObj);

		// $.get(link,function(data){
 	// 		$("#loader").html(data);
 	// 	});
		
	});

	$("#browser #backBtn").click(function(e){
		$("#container").show();
		$("#browser").hide();
		$("#loader").html("");
	});
}


