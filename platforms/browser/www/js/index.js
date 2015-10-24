/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        
        ////RSS get
        $.jGFeed('http://chinese.engadget.com/rss.xml',
          function(feeds){
            // Check for errors
            if(!feeds){
              // there was an error
              return false;
            }
            // do whatever you want with feeds here
            for(var i=0; i<feeds.entries.length; i++){
              var entry = feeds.entries[i];
              //console.log(entry);
              // Entry title
              $('#rss').append("///");
              $('#rss').append(entry.title+"</br>");
              $('#rss').append("</br>");
            }
        }, 3);

        ////HTML GET
        var xmlhttp;
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
              alert("Your browser does not support XMLHTTP.");
              }
            }

            function state_Change()
            {
            if (xmlhttp.readyState==4)
              { // 4 = "loaded"
              if (xmlhttp.status==200)
                { // 200 = OK 
                // ...our code here...
                $("#load").append(xmlhttp.responseText);
                console.log("******************************************");
                console.log(xmlhttp.responseText);
                }
              else
                {
                alert("Problem retrieving XML data");
                }
              }
            }

            loadXMLDoc("http://techcrunch.com/2015/10/20/the-teenaged-maker-who-was-arrested-for-building-a-clock-is-moving-to-qatar/");
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();