function id(_id) {
    return document.getElementById(_id)
}

function log(trace) {
    return window.console.log(trace)
}

function parseTime(t) {
    //--用unix格式換算成數字或文字後回傳
    var timeNumber = parseInt(t);
    var date = new Date(timeNumber);
    var year = date.getFullYear();
    var monthStr = parseMonth(date.getMonth());
    var day = date.getDate();

    var month = date.getMonth() + 1;
    month = month.toString();
    
    if (month.length == 1) {
        month = "0" + month;
    }

    var hour = date.getHours();
    if (hour.toString().length < 2) {
        hour = "0" + hour;
    }
    var minutes = date.getMinutes();
    if (minutes.toString().length < 2) {
        minutes = "0" + minutes;
    }

    return {
        year: year,
        month: month,
        monthStr: monthStr,
        day: day,
        hour: hour,
        minutes: minutes
    }
}

function parseMonth(num) {
    //switch month string
    var nameArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return nameArr[num];
}

function parseJSON(str) {
    //--將String轉成JSON
    var obj = JSON.parse(str);

    return obj
}

function encodeJSON(jsonObj) {
    //--將JSON轉成String
    var str = JSON.stringify(jsonObj);

    return str
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getItemByKey(value, array) {
    //--回傳array中所有key = value的item
    return $.grep(array, function (n, i) {
        return n.key == value;
    });
};

function sendRequest(url) {
    try {
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);
        return JSON.parse(request.responseText);

    } catch (err) {
        //sdkSample.displayError("Error sending request: " + err);
        return;
    }
}

function sendPostRequest(url, authzheader) {
    try {
        var request = new XMLHttpRequest();
        request.open("POST", url, false);
        request.setRequestHeader("Authorization", authzheader);
        request.send(null);
        return request.responseText;
    } catch (err) {
        //sdkSample.displayError("Error sending request: " + err);
        return;
    }
}

function getPicturesLibraryURL(folderName, imgsrc) {

    var picturesLibrary = Windows.Storage.KnownFolders.picturesLibrary;

    return picturesLibrary.getFolderAsync(folderName).then(
        function (folder) {
            return folder.getFileAsync(imgsrc)
        }
    ).then(
        function (item) {
            if (item) {
                var imageBlob = URL.createObjectURL(item);

                return imageBlob
            }
        }
    );
}