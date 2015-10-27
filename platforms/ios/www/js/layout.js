function renderLayout(){
	var cardTemplate = $("#container").html();
	for(var i=0;i<finalArticleObjArr.length-1;i++){
        $("#container").append(cardTemplate);
    }
    
    var titleArr = $("#container > section > #item > #title");
    var infoArr = $("#container > section > #item > #info");
    var contentArr = $("#container > section > #item  > #content");
    var linkArr = $("#container > section > #item  > #original_link");
    
    for(var i=0;i<finalArticleObjArr.length;i++){
        titleArr[i].innerHTML = finalArticleObjArr[i].title;
        infoArr[i].innerHTML = finalArticleObjArr[i].siteName;
        $(infoArr[i]).append("</br>"+finalArticleObjArr[i].time);
        contentArr[i].innerHTML = finalArticleObjArr[i].content;
        linkArr[i].setAttribute("href", finalArticleObjArr[i].url);
    }

	openNewPage();

    /* Swiper apply */
    var swiper = swiper_do_swipe(
        $("#container > section"),swiper_do_swipe_effects.flat);

    var callback = function(event, $page, index){
        // console.log(event, $page, index);
    }
    swiper.onchange(callback).oninit(callback);

}