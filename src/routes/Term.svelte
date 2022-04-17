<script>
    const initTerminal = async () => {
        const { Terminal } = await import("xterm");
        const term = new Terminal();
        var userInput = ``

        term.open(document.getElementById("terminal"));
        term.write(`\r\n Remote terminal $`);
        term.onKey((e) => {
            // send user input to console
            console.log(e.key);
            // display user input
            term.write(e.key);
            userInput += e.key
            // add each char of user input to string
            if (e.key == `\r`) {
                term.write(`\n\r`);
                fetchResponse();
                fetchResponse();
                async function fetchResponse() {
                    try {
                        const response = await fetch(
                            `http://localhost:3000/${userInput}`,
                            {
                                mode: `no-cors`,
                            }
                            ); // end of fetch()
                            console.log(`end of fetch(${userInput.toString()})`);
                            
                            
                            
                            async function readStream() {
                                const streamReader = await response.body.getReader();
                        streamReader
                            .read()
                            }



                        const streamReader = response.body.getReader();
                        streamReader
                            .read()
                            .then(function processData({ done, value }) {
                                // Result objects contain two properties:
                                // done  - true if the stream has already given you all its data.
                                // value - some data. Always undefined when done is true.
                                if (done) {
                                    console.log("Stream complete");
                                    term.clear()
                                    term.writeln(`\r`)
                                    // fetchResponse()
                                }
                                if (value !== undefined) {
                                    console.log(
                                        `streamReader has value`
                                    );

                                    value.forEach((element) => {
                                            term.write(String.fromCharCode(element));
                                            if (element == 10) {
                                                term.write(`\r`)
                                            }
                                    });
                                } else {
                                    return
                                }
                                term.write(`Remote terminal $`)

                                // Read some more, and call this function again
                                return streamReader
                                    .read()
                                   
                            });
                            userInput = ``
                    } catch (error) {
                        console.error(`⛔️ DEV ERROR: ${error} ⛔️`); // fetch() error
                    }
                }
            }
        });
    };

    initTerminal();
    // fetchResponse();
</script>

<div id="terminal" />

<head>
    <link rel="stylesheet" href="/node_modules/xterm/css/xterm.css" />
    <script src="/node_modules/xterm/lib/xterm.js"></script>
</head>
