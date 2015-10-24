var targetURL;

////RSS get
$.jGFeed('http://feeds.feedburner.com/TheNewsLens',
  function(feeds){
    // Check for errors
    if(!feeds){
      // there was an error
      return false;
    }

    //first item's url
    targetURL = feeds.entries[0].link;
    
    //Get Page here(right after got url)
    //loadXMLDoc(targetURL);
    getInfo(targetURL);

    // do whatever you want with feeds here
    for(var i=0; i<feeds.entries.length; i++){
      var entry = feeds.entries[i];
      console.log("Title: "+entry.title);
    }   
}, 3);

////HTML GET
var xmlhttp;
var htmlCode=null;
function loadXMLDoc(url)
{
  xmlhttp=null;
  if (window.XMLHttpRequest)
    { // code for all new browsers 
    xmlhttp= new XMLHttpRequest() ;
    }
  else if (window.ActiveXObject)
    { // code for IE5 and IE6 
    xmlhttp= new ActiveXObject("Microsoft.XMLHTTP") ;
    }
  if (xmlhttp!=null)
    {
    xmlhttp.onreadystatechange=state_Change ;
    xmlhttp.open("GET",url,true);
    xmlhttp.send(null);
    }
  else
    {
    console.log("Your browser does not support XMLHTTP.");
    }
}

function state_Change()
{
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
  { // 4 = "loaded", 200 = OK 
    
    //parse text to DOM object
    htmlCode = $.parseHTML( xmlhttp.responseText );
    
    $.each(htmlCode, function( index, value ) {
      console.log( index + ": " + value );
    });
  }else{
    console.log("readyState: "+xmlhttp.readyState);
  }
}

//Readability API
var token = "f455c88eb6fc4e66d79f02f576890710518f5941";
function getInfo(url) {
    $.getJSON("https://www.readability.com/api/content/v1/parser?url="+ url +"&token="+token+"&callback=?",
    function (data) {
        console.log(data);
        $("#load").append(data.content);
    });
}

