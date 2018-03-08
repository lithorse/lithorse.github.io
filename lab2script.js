const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?';
let key = '';     //old key: hC3jF
let success = false;
let searchingTitleArray = [];
let callTimesLeft;

function formatBooks(arr) {
    let str = "";
    for (i = 0; i < arr.length; i++) {
        searchingTitleArray.push(arr[i].title);
        // console.log(searchingTitleArray);
        str += "<div class='table-cell'>" + arr[i].id + ". " + arr[i].title + " by " + arr[i].author + "</div>";
    }
    return str;
}

function fetchData(x) {
    if (x == 'undefined' || x < 1) {
        callTimesLeft = 0;
        document.getElementById("demo").innerHTML = 
            'Request failed after 10 tries.';
        return;
    } else {
        callTimesLeft = x;
    }
    callTimesLeft -= 1;

    console.log(callTimesLeft);
    var request = new Request(url + 'op=select&key=' + key);
    fetch(request).then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            // Examine the text in the response
            response.json().then(function (data) {
                console.log(data);
                if (data.status === "success") {
                    searchingTitleArray = [];
                    document.getElementById("demo").innerHTML =
                        formatBooks(data.data) + '<br>' + 'Request succeeded in ' + (10 - callTimesLeft) + ' tries.';
                }
                else {
                    document.getElementById("demo").innerHTML =
                        data.status + ' ' + data.message;
                    console.log('call times left: ' + callTimesLeft);
                    fetchData(callTimesLeft);
                }
            });
        }
    )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function addDataPrimer(){
    var title = document.getElementById('title').value; 
    var author = document.getElementById('author').value;
    addData(10, title, author);
}

function addData(x, title, author) {
    var x = 10;
    if (x == 'undefined' || x < 1) {
        callTimesLeft = 0;
        document.getElementById("demo").innerHTML = 
            'Request failed after 10 tries.';
        return;
    } else {
        callTimesLeft = x;
    }
    callTimesLeft -= 1;

    console.log(callTimesLeft);
    
    var request = new Request(url + 'op=insert&key=' + key + '&title=' + title + '&author=' + author, {
        method: 'post',
    });
    fetch(request).then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                console.log(data);
                if (data.status === "success") {
                    document.getElementById("demo").innerHTML =
                        data.status + '<br>' + 'Request succeeded in ' + (10 - callTimesLeft) + ' tries.';
                }
                else {
                    document.getElementById("demo").innerHTML =
                        data.status + ' ' + data.message;
                        console.log('call times left: ' + callTimesLeft);
                        addData(callTimesLeft, title, author);
                }
            });
        }
    )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function modifyDataPrimer(){
    var id = document.getElementById('id').value; 
    var title = document.getElementById('title').value; 
    var author = document.getElementById('author').value;
    modifyData(10, id, title, author);
}

function modifyData(x, id, title, author) {
    if (x == 'undefined' || x < 1) {
        callTimesLeft = 0;
        document.getElementById("demo").innerHTML = 
            'Request failed after 10 tries.';
        return;
    } else {
        callTimesLeft = x;
    }
    callTimesLeft -= 1;

    console.log(callTimesLeft);
    var request = new Request(url + 'op=update&key=' + key + '&id=' + id + '&title=' + title + '&author=' + author, {
        method: 'post',
    });
    fetch(request).then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                console.log(data);
                if (data.status === "success") {
                    document.getElementById("demo").innerHTML =
                        data.status + '<br>' + 'Request succeeded in ' + (10 - callTimesLeft) + ' tries.';
                }
                else {
                    document.getElementById("demo").innerHTML =
                        data.status + ' ' + data.message;
                        console.log('call times left: ' + callTimesLeft);
                        modifyData(callTimesLeft, id, title, author);
                }
            });
        }
    )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function deleteDataPrimer(){
    var id = document.getElementById('id').value; 
    deleteData(10, id);    
}

function deleteData(x, id) {
    if (x == 'undefined' || x < 1) {
        callTimesLeft = 0;
        document.getElementById("demo").innerHTML = 
            'Request failed after 10 tries.';
        return;
    } else {
        callTimesLeft = x;
    }
    callTimesLeft -= 1;

    console.log(callTimesLeft);
    var request = new Request(url + 'op=delete&key=' + key + '&id=' + id, {
        method: 'post',
    });
    fetch(request).then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                console.log(data);
                if (data.status === "success") {
                    document.getElementById("demo").innerHTML =
                        data.status  + '<br>' + 'Request succeeded in ' + (10 - callTimesLeft) + ' tries.';
                }
                else {
                    document.getElementById("demo").innerHTML =
                        data.status + ' ' + data.message;
                        console.log('call times left: ' + callTimesLeft);
                        deleteData(callTimesLeft, id);
                }
            });
        }
    )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

//  All things Key:
if (!localStorage.getItem('KeyStorage')) {  //if there is no key in KeyStorage
    setKeyStorage();
} else {                                    //if there is a key already
    getKey();
}

function getNewKey() {
    localStorage.removeItem('KeyStorage'); //Remove old key
    setKeyStorage(1);
}

function setKeyStorage(buttonClick) {
    if (buttonClick === 1) {
        fetchRequestKey(1);
    } else {
        fetchRequestKey();
    }
}

function getKey() {
    key = localStorage.getItem('KeyStorage');
    console.log(localStorage.getItem('KeyStorage') + ' key from localStorage');
}

function fetchRequestKey(buttonClick) {
    var request = new Request(url + 'requestKey');
    fetch(request).then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                document.getElementById("demo").innerHTML = 'inside !== 200';
                return;
            }

            response.json().then(function (data) {
                console.log(data);
                if (data.status === "success") {
                    key = data.key;
                    localStorage.setItem('KeyStorage', key);
                    getKey();
                    if (buttonClick === 1) {
                        document.getElementById("demo").innerHTML = 'Here is the new key you asked for: "' + key + '" 😃';
                    }
                    console.log('should set to: ' + key);
                }
                else {
                    console.log('there was a problem with response.json')
                    document.getElementById("demo").innerHTML = 'success - else not success';
                }
            });

        }

    )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

//  Search suggestion:
// var arr = ['A', 'a', 'B', 'b', 'SAGAN OM e', 'sagan om', 'sagan om ringen', 'den långa sagan', 'Historien om Ringen', 'SAGAN OM RINGEN', 'SaGan om de två tornen', 'sagan i de två tornen', 'en saga om hober', 'sagorna om RINGEN', 'det var en gång en saga'];

function searchArray() {

    let searchinput = document.getElementById('searchInput').value;
    let search = '';
    console.log(searchingTitleArray);

    if (searchinput !== '') {
        //Filter out search result, ignores case:
        var regexie = new RegExp(searchinput, 'i');
        let filteredArray = searchingTitleArray.filter(item => item.match(regexie));
        console.log('---Filtered array---');

        let sortedArray = filteredArray.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        //  If array is empty no border
        if (typeof filteredArray !== 'undefined' && filteredArray.length > 0) {
            console.log('---Sorted Array---');
            sortedArray.forEach(element => {
                // searchingTitleArray.push(element);
                search += element + '<br>';
                console.log(element);
            });
            document.getElementById('searchResult').innerHTML = "<div>" + search + '</div>';
            document.getElementById('searchResult').style.border = '1px solid black';
        }
        else {
            console.log('filteredArray is empty');
            document.getElementById('searchResult').style.border = '0px solid black';
            document.getElementById('searchResult').innerHTML = '';
        }
    }
    else {
        search = '';
        document.getElementById('searchResult').style.border = '0px solid black';
        document.getElementById('searchResult').innerHTML = '';
    }
};

function addDataSetup(){
    document.getElementById("demo").innerHTML = '';
    var btn = document.createElement("BUTTON");
    btn.id = 'button';
    var titleInput = document.createElement("INPUT");
    titleInput.id = 'title';
    var authorInput = document.createElement("INPUT");
    authorInput.id = 'author';
    var titleText = document.createTextNode("Enter Title");
    var authorText = document.createTextNode("Enter Author");

    btn.innerText = 'Submit';
    btn.setAttribute('class', 'buttonSubmit');
    document.getElementById("demo").appendChild(titleText);
    document.getElementById("demo").appendChild(titleInput);
    document.getElementById("demo").appendChild(authorText);
    document.getElementById("demo").appendChild(authorInput);
    document.getElementById("demo").appendChild(btn);
    document.getElementById("button").onclick = addDataPrimer;
}

function modifyDataSetup(){
    document.getElementById("demo").innerHTML = '';
    var btn = document.createElement("BUTTON");
    btn.id = 'button';
    var idInput = document.createElement("INPUT");
    idInput.id = 'id';
    var titleInput = document.createElement("INPUT");
    titleInput.id = 'title';
    var authorInput = document.createElement("INPUT");
    authorInput.id = 'author';
    var titleText = document.createTextNode("Enter Title");
    var authorText = document.createTextNode("Enter Author");
    var idText = document.createTextNode("Enter Id");

    btn.innerText = 'Submit';
    btn.setAttribute('class', 'buttonSubmit');
    document.getElementById("demo").appendChild(idText);
    document.getElementById("demo").appendChild(idInput);
    document.getElementById("demo").appendChild(titleText);
    document.getElementById("demo").appendChild(titleInput);
    document.getElementById("demo").appendChild(authorText);
    document.getElementById("demo").appendChild(authorInput);
    document.getElementById("demo").appendChild(btn);
    document.getElementById("button").onclick = modifyDataPrimer;
}

function deleteDataSetup(){
    document.getElementById("demo").innerHTML = '';
    var btn = document.createElement("BUTTON");
    btn.id = 'button';
    var idInput = document.createElement("INPUT");
    idInput.id = 'id';
    var idText = document.createTextNode("Enter Id");

    btn.innerText = 'Submit';
    btn.setAttribute('class', 'buttonSubmit');
    document.getElementById("demo").appendChild(idText);
    document.getElementById("demo").appendChild(idInput);
    document.getElementById("demo").appendChild(btn);
    document.getElementById("button").onclick = deleteDataPrimer;
}