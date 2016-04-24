/*
Future Steps:
1. Use POST request and submit form.
2. See if different responseType works for output. 
3. Try callbacks with messageListeners.
4. Make links clickable.
5. Format text so it's nicer - maybe update make other elements using popup.js.
6. Choose better icon.
*/



// Post url site
url = 'http://www.ncbi.nlm.nih.gov';
query = '/pubmed/?term=brain+computer+interface';

// check for popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.message == "popup_loaded") {

		// we got the message so we'll start running program
		chrome.runtime.sendMessage({type: "message", message: "running_script"});

		// load pubmed once to get form content
		var xhr1 = new XMLHttpRequest();
		xhr1.open("GET", url+query);
		xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr1.onreadystatechange = function() {
		    if(xhr1.readyState == 4 && xhr1.status == 200) {
		    	// get document from response
		    	var xmlDoc = (new DOMParser()).parseFromString(xhr1.responseText,"text/xml");
		    	
		    	// get title
		    	var titles = xmlDoc.getElementsByTagName('title');
		    	var title_name = titles[0];

		    	// get results from search
		    	htmltext = '';
		    	var results = xmlDoc.getElementsByClassName('rprt');
		    	for (i=0; i < results.length; i++) {
		    		var element = results[i];
		    		// get name and href
		    		var a_el = element.getElementsByTagName('a');
		    		var text = a_el[0].innerText;
		    		var href = url+a_el[0].getAttribute('href');
		    		// get authors
		    		var author_el = element.getElementsByClassName('desc');
		    		var author = author_el[0].innerText;
		    		// get journal and date
		    		var detail_el = element.getElementsByClassName('details');
		    		var detail = detail_el[0].innerText;
		    		// join everything together 
		    		htmltext += text + '\n' + author + '\n' + detail + '\n' + href +  '\n\n';
		    	};

		    	console.log(htmltext);

		    	// pass this information back to popup.js
		    	chrome.runtime.sendMessage({type: "message", message: "script_complete", response: htmltext});
		    };		
		};
		xhr1.send();
		// xhr1.onreadystatechange = function() {//Call a function when the state changes.
		//     // log output stuff
		//     if(xhr1.readyState == 4 && xhr1.status == 200) {
		//     	var xmlDoc = (new DOMParser()).parseFromString(xhr1.responseText,"text/xml");
		//     	// console.log(xmlDoc);
		//     	var forms = xmlDoc.getElementsByTagName('form');
		//     	var form = forms[0];
		//     	var obj = xmlDoc.getElementById('term');
		//     	// console.log(obj);
		//         console.log(form);

		//         // create form data to submit to pubmed
		// 		var formData = new FormData(form);
		// 		formData.set(name, query);
		// 		for (var value of formData.values()) {
		// 			console.log(value);
		// 		};

		// 		// set up request and submit it with the formdata
		// 		var xhr2 = new XMLHttpRequest();
		// 		xhr2.open("POST", post_url, true);
		// 		// xhr2.overrideMimeType('text/plain','charset=x-user-defined');
		// 		xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		// 		xhr2.onreadystatechange = function() {//Call a function when the state changes.
		// 		    // log output stuff
		// 		    if(xhr2.readyState == 4 && xhr2.status == 200) {
		// 		    	var xmlDoc = (new DOMParser()).parseFromString(xhr2.responseText,"text/xml");
		// 		    	// console.log(xmlDoc);
		// 		    	var titles = xmlDoc.getElementsByTagName('title');
		// 		    	var title_name = titles[0];
		// 		        // console.log(title_name);
		// 		        // console.log((typeof title_name.innerHTML));
		// 			    // send output information back to popup
		// 			    chrome.runtime.sendMessage({type: "message", message: "script_complete", responseText: title_name.innerHTML});
		// 		    };
		// 		};
		// 		xhr2.send(formData);
		//     }
		// }
		// xhr1.send();
	};
});
