function html() {
    let htmlUrl = "http://httpbin.org/html";
    this.getHTMLPage(htmlUrl);
}

function getHTMLPage(url) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response;
            }

            throw new Error("Invalid status code");
        })
        // .then(response => {
        //     // Limited entries because response.type is "cors"
        //     for (var entry of response.headers.entries()) {
        //         console.log(entry[0] + " -> " + entry[1]);
        //     }

        //     return response;
        // })
        .then(response => response.text())
        .then(response => console.log(response) || response)
        .catch(error => console.error(error));
}

//--------------------------------------------------------

function post() {
    let postUrl = "http://httpbin.org/post";

    let dataList = [];

    dataList.push(this.createData("Sanveg", "Mumbai", "22"));
    dataList.push(this.createData("Priya", "Boston", "23"));

    dataList.forEach(dataEntry => this.postData(postUrl, dataEntry));
}

function createData(name, location, age) {
    let data = new FormData();
    data.append("name", name);
    data.append("location", location);
    data.append("age", age);

    return data;
}

function postData(url, data) {
    let postPromise = fetch(url, {
        method: "POST",
        body: data
    })
        .then(response => {
            if (response.ok) {
                return response;
            }

            throw new Error("Invalid status code");
        });

    postPromise
        .then(response => response.clone())
        .then(response => response.json())
        .then(response => console.log(response) || response)
        .catch(error => console.error(error));

    // postPromise
    //     .then(response => response.clone())
    //     .then(response => response.blob())
    //     .then(response => console.log(response) || response)
    //     .catch(error => console.error(error));
}