//SideBar Toggle
var sideBarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar(){
    //If side bar is Closed
    if(!sideBarOpen){
        sidebar.classList.add("sidebar-resoponsive")
        sideBarOpen = true;
    }
}

function closeSidebar(){
    //If sidebar is open
    if(sideBarOpen){
        //This function will add/remove a css property to any element
        sidebar.classList.remove("sidebar-responsive")
        sideBarOpen = false
    }
}


//The XMLHttpRequest (XHR) object, when used in a web browser environment, sends requests to the same server and 
//port from which the web page was served by default. This is known as the same-origin policy
function GrowthinStock(){

    //Hiding the Select an option Text
    var element = document.getElementById('temp');
    if (element) {
        element.style.display = 'none';
    }

    // Check if 'nah' has any child nodes
    if (nah.hasChildNodes()) {
        // If 'nah' is not empty, remove all child nodes
        while (nah.firstChild) {
            nah.removeChild(nah.firstChild);
        }
    }
    var graph = document.getElementById('graph');
    if (graph) {
        // If it exists, remove it
        graph.parentNode.removeChild(graph);
    }



    var xhr = new XMLHttpRequest()     //Creating an instance of XMLHttprequest object

    //Configuring the exr object for a GET request to the '/Growth_Graph' route on the server ,true means asynchronous
    xhr.open('GET','/Growth_Graph',true)

    //onload event is triggered whenever we get response back from the server and based on the response we have to
    //handle this event using a function
    xhr.onload = function() {
        if (xhr.status == 200) {
            // Creating a new element
            var div = document.createElement('div')
            div.id = 'graph'
            div.id = 'graph'
            div.style.display = 'flex';
        
            // Horizontally center the child elements
            div.style.justifyContent = 'center';
            div.style.flexDirection = 'column';
            // Vertically center the child elements
            div.style.alignItems = 'center';
        
            // Set the SVG content as the innerHTML of the div
            div.innerHTML = xhr.responseText

            //Appending this new container to main
            document.getElementById('nah').appendChild(div)
        } else {
            console.error('Request failed: ' + xhr.statusText)
        }
    }

    //onerror is an event which is triggered when for some reason the request doesn't reach the server, we can 
    //handle this event using this function
    xhr.onerror = function() {
        console.error('Request failed')
    }

    //This line sends the request
    xhr.send();
}


function TechStockComp() {

    var element = document.getElementById('temp');
    element.style.display = 'none';

    // Get the container element 'nah'
    var nah = document.getElementById('nah');
    
    // Check if 'nah' has any child nodes
    if (nah.hasChildNodes()) {
        // If 'nah' is not empty, remove all child nodes
        while (nah.firstChild) {
            nah.removeChild(nah.firstChild);
        }
    }

    var xhr = new XMLHttpRequest(); // Creating an instance of XMLHttpRequest object

    // Configure the XMLHttpRequest object for a GET request to the '/Growth_Graph' route on the server
    xhr.open('GET', '/TechStockComp', true);

    // Define what happens once the request is completed
    xhr.onload = function () {
        if (xhr.status == 200) {
            // Creating a new element for the graph
            var div = document.createElement('div');
            div.id = 'graph';
            div.id = 'graph'
            div.style.display = 'flex';

            // Horizontally center the child elements
            div.style.justifyContent = 'center';
            div.style.flexDirection = 'column';
            // Vertically center the child elements
            div.style.alignItems = 'center';

            // Set the SVG content as the innerHTML of the div
            div.innerHTML = xhr.responseText;

            // Append the new graph container to 'nah'
            nah.appendChild(div);
        } else {
            console.error('Request failed: ' + xhr.statusText);
        }
    };

    // Define what happens if there is an error with the request
    xhr.onerror = function () {
        console.error('Request failed');
    };

    // Send the request
    xhr.send();
}

function Reset(){

    if (nah.hasChildNodes()) {
        // If 'nah' is not empty, remove all child nodes
        while (nah.firstChild) {
            nah.removeChild(nah.firstChild);
        }
    }   
    var element = document.getElementById('temp');
    if (element) {
        element.style.display = 'block';
    }
}

function MaxiValStock(){

    var temp = document.getElementById('temp');
    temp.style.display = 'none';


    // Get the container element 'nah'
    var nah = document.getElementById('nah');
    
    // Check if 'nah' has any child nodes
    if (nah.hasChildNodes()) {
         // If 'nah' is not empty, remove all child nodes
        while (nah.firstChild) {
            nah.removeChild(nah.firstChild);
        }
    }

    //This is a promise object which is returned whenver an HTTP request is sent successfully and once it is
    //sent successfully it takes another function as argument and executes it , this funciton is called success
    //handler
    var graph = document.getElementById('graph');
    if (graph) {
        // If it exists, remove it
        graph.parentNode.removeChild(graph);
    }

    var div = document.createElement('div')
    div.id = 'graph'
    div.style.display = 'flex';

    // Horizontally center the child elements
    div.style.justifyContent = 'center';
    div.style.flexDirection = 'column';
    // Vertically center the child elements
    div.style.alignItems = 'center';

    var nah = document.getElementById('nah')
    nah.appendChild(div)


    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/MaxiValStock', true); 

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {  // Check if the request is complete
            if (xhr.status === 200) {  // Check if the request was successful
                var response = JSON.parse(xhr.responseText);  // Parse the JSON response

                // Iterate over the response object keys (SVG file names)
                for (var fileName in response) {
                    if (response.hasOwnProperty(fileName)) {
                        var svgBlob = new Blob([response[fileName]], { type: 'image/svg+xml' });  // Create a Blob from the SVG content
                        var svgUrl = URL.createObjectURL(svgBlob);  // Create a URL for the Blob
                        // Use the svgUrl to display the SVG image on the webpage or manipulate it as needed
                        // For example, create an <img> element and append it to the document body
                        var imgElement = document.createElement('img');
                        imgElement.style.marginBottom = '20px';
                        imgElement.src = svgUrl;
                        div.appendChild(imgElement);
                    }
                }
            } else {
                console.error('Request failed: ' + xhr.statusText);
            }
        }
    };
    xhr.send();  // Send the XMLHttpRequest
}

function Forecasting(){
    var temp = document.getElementById('temp');
    temp.style.display = 'none';

    //This is a promise object which is returned whenver an HTTP request is sent successfully and once it is
    //sent successfully it takes another function as argument and executes it , this funciton is called success
    //handler
    var graph = document.getElementById('graph');
    if (graph) {
        // If it exists, remove it
        graph.parentNode.removeChild(graph);
    }

    // Get the container element 'nah'
    var nah = document.getElementById('nah');
    
    // Check if 'nah' has any child nodes
    if (nah.hasChildNodes()) {
        // If 'nah' is not empty, remove all child nodes
        while (nah.firstChild) {
            nah.removeChild(nah.firstChild);
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/Forecasting', true); 

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {  // Check if the request is complete
            if (xhr.status === 200) {  // Check if the request was successful
                // Parse the JSON response
                const data = JSON.parse(xhr.responseText);
                var nah = document.getElementById('nah')

                console.log(data)
                console.log(typeof data)

                var table = document.createElement('table');
                var thead = document.createElement('thead');
                var headerRow = document.createElement('tr');


                //This will calculate the distance of the paraent element and then put equal distance from
                //both the left and right margin, effectively placing our current element at center
                table.style.marginLeft = 'auto';
                table.style.marginRight = 'auto'

                //for in loop iterates over keys of a dictionary in javascipt
                for(var key in data[0]){
                    var th = document.createElement('th');
                    th.textContent = key;
                    th.style.padding = '20px'; // Adjust this value as needed
                    th.style.textAlign = 'left';
                    th.style.borderBottom = '1px solid #ddd';
                    headerRow.appendChild(th);
                }
                thead.appendChild(headerRow);
                table.appendChild(thead);
                
                var tbody = document.createElement('tbody');
                //for each function will loop through the whole iterable datatype and will execute a
                //anonymous function for them , and each element of that iterable can be accessed using
                //'item' name
                data.forEach(function (item) {
                    var row = document.createElement('tr');
                    for (var key in item) {
                        var cell = document.createElement('td');
                        cell.textContent = item[key];
                        cell.style.padding = '20px'; // Adjust this value as needed
                        cell.style.textAlign = 'left';
                        cell.style.borderBottom = '1px solid #ddd';
                        row.appendChild(cell);
                    }
                    tbody.appendChild(row);
                    row.style.borderBottom = '1px solid black';
                });
                table.appendChild(tbody);

                
                nah.appendChild(table)

            } else {
                console.error('Request failed: ' + xhr.statusText);
            }
        }
    };
    xhr.send();  // Send the XMLHttpRequest

}


function ForecastingApp(){
    var temp = document.getElementById('temp');
    temp.style.display = 'none';

    //This is a promise object which is returned whenver an HTTP request is sent successfully and once it is
    //sent successfully it takes another function as argument and executes it , this funciton is called success
    //handler
    var graph = document.getElementById('graph');
    if (graph) {
        // If it exists, remove it
        graph.parentNode.removeChild(graph);
    }

     // Get the container element 'nah'
    var nah = document.getElementById('nah');
    
    // Check if 'nah' has any child nodes
    if (nah.hasChildNodes()) {
        // If 'nah' is not empty, remove all child nodes
        while (nah.firstChild) {
            nah.removeChild(nah.firstChild);
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/ForecastingApp', true); 

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {  // Check if the request is complete
            if (xhr.status === 200) {  // Check if the request was successful
                // Parse the JSON response
                const data = JSON.parse(xhr.responseText);
                var nah = document.getElementById('nah')

                console.log(data)
                console.log(typeof data)

                var table = document.createElement('table');
                var thead = document.createElement('thead');
                var headerRow = document.createElement('tr');


                //This will calculate the distance of the paraent element and then put equal distance from
                //both the left and right margin, effectively placing our current element at center
                table.style.marginLeft = 'auto';
                table.style.marginRight = 'auto'

                //for in loop iterates over keys of a dictionary in javascipt
                for(var key in data[0]){
                    var th = document.createElement('th');
                    th.textContent = key;
                    th.style.padding = '20px'; // Adjust this value as needed
                    th.style.textAlign = 'left';
                    th.style.borderBottom = '1px solid #ddd';
                    headerRow.appendChild(th);
                }
                thead.appendChild(headerRow);
                table.appendChild(thead);
                
                var tbody = document.createElement('tbody');
                //for each function will loop through the whole iterable datatype and will execute a
                //anonymous function for them , and each element of that iterable can be accessed using
                //'item' name
                data.forEach(function (item) {
                    var row = document.createElement('tr');
                    for (var key in item) {
                        var cell = document.createElement('td');
                        cell.textContent = item[key];
                        cell.style.padding = '20px'; // Adjust this value as needed
                        cell.style.textAlign = 'left';
                        cell.style.borderBottom = '1px solid #ddd';
                        row.appendChild(cell);
                    }
                    tbody.appendChild(row);
                    row.style.borderBottom = '1px solid black';
                });
                table.appendChild(tbody);

                
                nah.appendChild(table)

            } else {
                console.error('Request failed: ' + xhr.statusText);
            }
        }
    };
    xhr.send();  // Send the XMLHttpRequest

}