
import { spawn } from "child_process"
/** @type {import('@sveltejs/kit').RequestHandler} */

export var commandOutput = ``


// TODO: - upgrade makeSystemCall to take command and its arguments, not just command.
// function makeSystemCall(command: string, arguments: [string])
function makeSystemCall(command) {
    const commandArguments = command.split(' ');
    var command = commandArguments[0]
    // const systemCall = spawn(`ping`, [`-al`])
    // const systemCall = spawn(command string, array of arguments)
    const systemCall = spawn(command, commandArguments.slice(1))
    systemCall.on('error', function(err) {
        console.log('command not found: ' + command);
        console.error(err)
        commandOutput = `command not found: ${command}`
      });
    systemCall.stdout.on(`data`, (data) => {
        commandOutput += data
        console.log(`stdout: ${data}`)
    })
    
    systemCall.stderr.on(`data`, (data) => {
        commandOutput += data.toString()
        console.error(`stderr: ${data}`)
    })
    
    systemCall.on(`close`, (code) => {
        console.log(`makeSystemCall() exited with code ${code}`)
    })
   

}
// 04/04/2022 This looks to be the new way to make a request

export async function get({ params }) {
    if (api) {
        // create array here from params.args
        // pretty sure this is slice(), but maybe somthing else
        // take first element from array and place it in 'command' var
        // take every element after first and place in array 'arguments'
        // pass 'command' and 'arguments' to makeSystemCall()
        makeSystemCall(params.args) // params.args comes from /src/routes/cnc/[args].ts
        return {
            body: commandOutput,
        }
    }
}

export const api = (request) => {
    let body = {}
    let status = 500

    switch (request.method.toUpperCase()) {
        case "GET":
            // makeSystemCall() here provides different output, stays in buffer, or not
            body = commandOutput
            status = 200
            break
        default:
            break
    }
    return {
        status,
        body,
    }
}