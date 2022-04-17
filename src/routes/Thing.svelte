<script>
    export let answer;
    var userInput = ``;
    var url = `https://localhost:3000/`;
    const initTerminal = async () => {

        const { Terminal } = await import("xterm");
        const term = new Terminal();

        term.open(document.getElementById("terminal"));

        term.write(`\r\n Remote terminal $`);

        term.onKey((e) => {
            // send user input to console
            console.log(e.key);
            // display user input
            term.write(e.key);
            // add each char of user input to string
            userInput += e.key;
            // if user inputs return key, process the user input
            if (e.key == `\r`) {

                    fetch(`${url}${userInput}`).then(
                        (response) => {
                            async function concatStringStream(stream) {
                                let result = ``
                                const reader = stream.getReader();
                                while (true) {
                                    // The `read()` method returns a promise that
                                    // resolves when a value has been received.
                                    const { done, value } = await reader.read();
                                    // Result objects contain two properties:
                                    // `done`  - `true` stream is done.
                                    // `value` - stream has data.
                                    // `value becomes `undefined` when `done` is `true`.
                                    
                                    if (done) {
                                        console.log(
                                            `stream done, value is ${value}`
                                        );
                                        userInput = ``; // reset user input

                            //    var a = result.split(`,`) // create array from result string   
                            //    a.forEach(element => {

                            //     let char = String.fromCharCode(parseInt(element)); // convert array element from ascii to char
                                // ascii 10 is newline, write a \n
                                
                                
                                // term.write(`${char}`)
                                // console.log(`char is ${char}`)
                            //    });     

                                        return result
                                    }
                                    result += value;
                                    console.log(
                                        `Read ${result.length} characters so far`
                                        );
                                        console.log(
                                            `Most recently read chunk: ${value}`
                                            );
                                            console.log(`value of value is: ${value}`)
                                            term.write(value);
                                            term.write(`\r\n Remote terminal $`);
                                        } // while stream reader has value
                                    } // async result
                            concatStringStream(response.body).then(
                                (result) =>
                                    console.log("Stream complete", result)
                            ); // async function concatStringStream concatinates stream value
                            // creates a string with each value represented as a character
                            // should be UTF-8 to string conversion, bytes to character.
                        } // response from fetch
                    ); // fetch call
            } // if e.key
        }); // term.onkey()
    }; // initTerminal
    initTerminal();
</script>

<head>
    <link rel="stylesheet" href="/node_modules/xterm/css/xterm.css" />
    <script src="/node_modules/xterm/lib/xterm.js"></script>
</head>

<p>the answer is {answer}</p>
<div id="terminal" />

<slot />
