const readlineSync = require("readline-sync");
const fs = require("fs");
var fetch = require("node-fetch");
var chalk = require("chalk");
const e = require("express");

function chat(token, kata) {
    const index = fetch('https://kick.com/api/v2/messages/send/3894', {
            method: 'POST',
            headers: {
                'Host': 'kick.com',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:137.0) Gecko/20100101 Firefox/137.0',
                'Accept': 'application/json',
                'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://kick.com/popout/exactlyourbae/chat',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token + '',
                'Cluster': 'v2',
                'Content-Length': '33',
                'Origin': 'https://kick.com',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Priority': 'u=0',
                'Cache-Control': 'max-age=0',
                'Te': 'trailers'
            },
            body: JSON.stringify({
                'content': kata,
                'type': 'message'
            })
        })

        .then(async (res) => {
            const headers = res.headers.raw()['set-cookie']
            const data = await res.json();
            return {
                data,
                headers
            }
        });

    return index;
}

(async () => {
    console.log(`Kick.com Auto Spam Chat`)
    console.log()
    const nameFile = readlineSync.question('[!] File name : ')
    const kata = fs.readFileSync('kata.txt', 'UTF-8');
    console.log()
    const read2 = fs.readFileSync(nameFile, 'UTF-8');
    const list2 = read2.split(/\r?\n/);
    while (true) {
        for (var i = 0; i < list2.length; i++) {
            var token = list2[i]
            try {
                const chatdata = await chat(token, kata);
                const message = chatdata.data.status.message;
                if (message == "OK") {
                    console.log(`Successfully sending message ${kata}`)
                } else {
                    console.log(`Failure sending message ${kata}`)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
})();