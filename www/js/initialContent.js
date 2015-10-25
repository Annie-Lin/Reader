/* Paeser API Key */
var token = "f455c88eb6fc4e66d79f02f576890710518f5941";
var articleLengthLimitation = 300;

var isTimeForShortPost = true;
var subscribeURLArr = ["http://chinese.engadget.com/rss.xml",
"http://feeds.feedburner.com/TheNewsLens",
"http://feeds.feedburner.com/TechCrunch/",
"http://rss.cnn.com/rss/edition.rss",
"http://www.bnext.com.tw/Feed/rss/topicslinksall"];
var articleObjArr = [];
var finalArticleObjArr = [];
var isFeedFinished = false;
var indexSite = 0;
var indexPage = 0;


function nowTime(){
  var nowHours = parseTime($.now()).hour;
  log("nowHours "+nowHours)
  if(nowHours<9 && nowHours>17){
    isTimeForShortPost = false;
  }else{isTimeForShortPost = true;};
};
nowTime();

/* RSS get */
function getRSSFeed(feedURL){
  $.jGFeed(feedURL,
    function(feeds){
      
      /* Check for errors */
      if(!feeds){
        log("Fail on Getting Feeds>> "+feedURL)
        return false;
      }
      
      /* do whatever you want with feeds here */
      for(var i=0; i<feeds.entries.length; i++){
        var entry = feeds.entries[i];
        var obj = {
          siteName:feeds.title,
          title:entry.title,
          url:entry.link,
          time:entry.publishedDate
        }
        articleObjArr.push(obj);
      }

      /* make sure get all response of Feed */
      if(indexSite == subscribeURLArr.length-1){
        
        /* Get content of each article */
        indexPage = 0;
        for(var i=0;i<articleObjArr.length;i++){
          getContent(articleObjArr[i]);
        }
      }
      indexSite++;

  }, 5);
};

function startRequestFeed(){
  indexSite = 0;
  for(var i=0;i<subscribeURLArr.length;i++){
    getRSSFeed(subscribeURLArr[i]);
  }
};

/* Readability API to get content and word count */
function getContent(obj) {
  $.getJSON("https://www.readability.com/api/content/v1/parser?url="+ obj.url +"&token="+token+"&callback=?",
    function (data) {
      obj.content = data.content;
      obj.wordCount = data.word_count;

      /* Make sure get all content */
      if(indexPage == articleObjArr.length-1){
        getFinalArr();
      }
      indexPage++;
  });
}

/* filter long story and sort by publish time */
function getFinalArr () {
  /* Filter long articles */
  /**
  
    TODO:
    - check time to filter or not
  
   */
  finalArticleObjArr = articleObjArr.filter(function(item){
    return item.wordCount < articleLengthLimitation;
  });
  /* Sort by publish time */
  finalArticleObjArr.sort(function(a, b){
    var c = new Date(a.time).getTime();
    var d = new Date(b.time).getTime();
    return d-c
  });

  for(var i=0;i<finalArticleObjArr.length;i++){
    finalArticleObjArr[i].index = i;
    log(finalArticleObjArr[i].index+". "+finalArticleObjArr[i].time+"/"+finalArticleObjArr[i].title+"("+finalArticleObjArr[i].wordCount+")");
  }
}

startRequestFeed();
