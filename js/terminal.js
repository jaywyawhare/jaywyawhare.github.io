function drag_start(event) {
    var style = window.getComputedStyle(event.target, null);
    var str = (parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY) + ',' + event.target.id;
    event.dataTransfer.setData("Text", str);
}

function drop(event) {
    var offset = event.dataTransfer.getData("Text").split(',');
    var dm = document.getElementById(offset[2]);
    dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
    event.preventDefault();
    return false;
}

function drag_over(event) {
    event.preventDefault();
    return false;
}

function setSystemInfo(field) {
    const el = document.getElementById(field.key)
    if (field.key === 'connection') {
        const data = navigator[field.key]
        if (data !== undefined)
            el.innerHTML = field.value + ': ' + 'Effective type-' + data.effectiveType + ', RTT-' + data.rtt + ', Downlink-' + data.downlink
        return
    }
    el.innerHTML = field.value + ': ' + navigator[field.key]

}

const inputEl = document.getElementById('terminal__prompt__cursor')
const sysInfoEl = document.getElementById('system__info')
const introEl = document.getElementById('intro')
const outputEl = document.getElementById('output')
const terminal = document.getElementById('terminal')
const denied = document.getElementById('denied')

terminal.addEventListener('click', () => {
    inputEl.focus()
})

const audios = {
    error: '../audio/src_assets_audio_error.wav',
    folder: '../audio/src_assets_audio_folder.wav',
    scan: '../audio/src_assets_audio_scan.wav'
}

const audio = new Audio()

const systemInfo = [
    {
        key: 'appVersion',
        value: 'App version'
    },
    {
        key: 'cookieEnabled',
        value: 'Cookie Enabled'
    },
    {
        key: 'connection',
        value: 'Connection'
    },
    {
        key: 'deviceMemory',
        value: 'Device memory'
    },
    {
        key: 'onLine',
        value: 'Online'
    },
    {
        key: 'platform',
        value: 'Platform'
    },
    {
        key: 'userAgent',
        value: 'User agent'
    }
]

setInterval(() => {
    systemInfo.forEach(info => setSystemInfo(info))
}, 1000)

const commandsData = [
    {
        command: 'help',
        data: '<div class="help"> <span>Available commands</span><table border="1"><tr><th>Command</th><th>Description</th><th>Usage</th></tr><tr><td>cd</td><td>Change directory</td><td>cd directory-name</td></tr><tr><td>ls</td><td>List all files of a directory</td><td>ls</td></tr><tr><td>pwd</td><td>Check present working directory</td><td>pwd</td></tr><tr><td>cat</td><td>Display the contents of a file</td><td>cat filename</td></tr><tr><td>clear</td><td>Clear the terminal</td><td>clear</td></tr><tr><td>help</td><td>Lists all the available commands</td><td>help</td></tr></table></div>'
    }
]

const commands = ['help', 'cd', 'ls', 'cat', 'clear', 'pwd', 'view', 'markdown'];

let lastTabPressed = 0;
let tabCompletionIndex = 0;
let lastInput = '';

const directoryStructure = [
    {
        pathName: '~',
        items: [
            {
                type: 'directory',
                item: 'About'
            },
            { type: 'directory', item: 'Work' },
            { type: 'directory', item: 'Technology' },
            { type: 'directory', item: 'Connect' }]
    },
    {
        pathName: '~/About',
        items: [
            {
                type: 'file',
                item: 'about.txt',
                content: '<p class="about">A freelance penetration tester and developer who believes Everyone Can Code.</p>'
            }
        ]
    },
    {
        pathName: '~/Work',
        items: [
            {
                type: 'file',
                item: 'work.txt',
                content: '<p class="work">I am co-founder at <a target="_blank" href="https://in.linkedin.com/company/cybernito">Cybernito</a></p>'
            }
        ]
    },
    {
        pathName: '~/Technology',
        items: [
            {
                type: 'file',
                item: 'technology.txt',
                content: '<p class="technology">I love to code with Java, Javascript, Python. I spend most of time in terminal.</p>'
            }
        ]
    },
    {
        pathName: '~/Connect',
        items: [
            {
                type: 'file',
                item: 'connect.txt',
                content: '<div class="connect"><div class="row"><div class="row"> <span>Email - </span> <a href="mailto:awyawhare@gmail.com" target="_blank" alt="jaywyawhare">awyawhare@gmail.com</a></div></div><div class="row"> <span>GitHub - </span> <a href="https://github.com/jaywyawhare" target="_blank" alt="jaywyawhare">https://github.com/jaywyawhare</a></div><div class="row"> <span>LinkedIn - </span> <a href="https://www.linkedin.com/in/arinjay-wyawhare/" target="_blank" alt="jaywyawhare">https://www.linkedin.com/in/arinjay-wyawhare</a></div><div class="row"> <span>Instagram - </span> <a href="https://www.instagram.com/jaywyawhare/" target="_blank" alt="jaywyawhare">https://www.instagram.com/jaywyawhare</a></div>'
            }
        ]
    },
    {
        pathName: '~/secret',
        items: [
            {
                type: 'file',
                item: 'resume.txt',
                content: '<div class="resume"><h2>Resume Found!</h2><p>Download my resume here: <a href="./src/resume.pdf" target="_blank">resume.pdf</a></p></div>'
            }
        ]
    },
    {
        pathName: '~/.hidden',
        items: [
            {
                type: 'file',
                item: '.resume.enc',
                content: '<div class="resume"><h2>Access Granted</h2><p>Decryption successful. Download: <a href="./src/resume.pdf" target="_blank">resume.pdf</a></p></div>'
            }
        ]
    },
    {
        pathName: '~/Documents',
        items: [
            {
                type: 'file',
                item: 'sample.md',
                content: '# Sample Markdown\n\nThis is a sample markdown file.',
                format: 'markdown'
            },
            {
                type: 'file',
                item: 'document.pdf',
                content: './documents/document.pdf',
                format: 'pdf'
            }
        ]
    }
]

let currentPath = "~"
updateCurrentPath()

function isValidCommad(cmd) {
    return commands.find(command => command === cmd) ? true : false
}

function preparedCommand(command) {
    return command.split(' ');
}

function changeDirectory(dir) {
    if (dir === '~' || dir === '..' || dir === undefined || dir === '') {
        currentPath = '~'
        updateCurrentPath()
        return
    }
    if (isHome()) {
        const obj = directoryStructure.find(path => path.pathName.substring(2, path.pathName.length) === dir)
        if (obj === undefined) {
            displayOutput({ command: '', data: '<span class="no__such">No such file or directory</span>' })
            return
        }
        currentPath += `/${dir}`
        updateCurrentPath()
        return
    }
    displayOutput({ command: '', data: '<span class="no__such">No such file or directory</span>' })
}

function isHome() {
    return currentPath === '~' ? true : false
}

function updateCurrentPath() {
    const curPathEls = document.getElementsByClassName('current__path')

    Array.from(curPathEls).forEach(cPath => {
        cPath.innerHTML = `${currentPath}`
    })
}

function listFileOrDirectories() {
    const obj = directoryStructure.find(item => item.pathName === currentPath)
    const el = document.createElement('div')
    el.className = 'listings'
    let spanEl = ''
    obj.items.forEach(item => {
        spanEl = document.createElement('span')
        spanEl.innerHTML = item.item
        el.appendChild(spanEl)
    })
    displayOutput({ command: '', data: el.outerHTML })
}

function viewMarkdown(content) {
    const md = window.markdownit();
    const result = md.render(content);
    displayOutput({ 
        command: '', 
        data: `<div class="markdown-content">${result}</div>` 
    });
}

function viewPDF(filepath) {
    displayOutput({
        command: '',
        data: `<iframe class="pdf-viewer" src="${filepath}#toolbar=0"></iframe>`
    });
}

function displayFileContents(file) {
    if (file === undefined) {
        displayOutput(commandsData.find(cmdDt => cmdDt.command === 'help'));
        return;
    }

    const obj = directoryStructure.find(path => path.pathName === currentPath);
    if (!obj) {
        displayOutput({ command: '', data: `<span class="no__such">No such file called ${file}</span>` });
        return;
    }

    const item = obj.items.find(item => item.item === file);
    if (!item) {
        displayOutput({ command: '', data: `<span class="no__such">No such file called ${file}</span>` });
        return;
    }

    if (item.format === 'markdown') {
        viewMarkdown(item.content);
    } else if (item.format === 'pdf') {
        viewPDF(item.content);
    } else {
        displayOutput({ command: '', data: item.content });
    }
}

function presentWorkingDir() {
    displayOutput({ command: '', data: `<span>${currentPath.replace('~', '/home')}</span>` })
}

function switchFolder(folder) {
    audio.src = audios.folder
    audio.play()
    clear()
    currentPath = '~'
    changeDirectory(folder)
}

function getMatchingItems(input) {
    const [cmd, ...args] = input.split(' ');
    
    // Command completion
    if (!args.length) {
        return commands.filter(c => c.startsWith(cmd));
    }
    
    // File/directory completion
    const obj = directoryStructure.find(item => item.pathName === currentPath);
    if (!obj) return [];
    
    const partial = args[args.length - 1];
    return obj.items
        .map(item => item.item)
        .filter(name => name.startsWith(partial));
}

function handleTabCompletion(event) {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    
    const input = inputEl.value;
    const now = Date.now();
    
    // Reset completion state if too much time passed or input changed
    if (now - lastTabPressed > 2000 || input !== lastInput) {
        tabCompletionIndex = 0;
        lastInput = input;
    }
    
    const matches = getMatchingItems(input);
    if (!matches.length) return;
    
    // Cycle through matches
    const match = matches[tabCompletionIndex % matches.length];
    const parts = input.split(' ');
    
    if (parts.length === 1) {
        // Completing command
        inputEl.value = match;
    } else {
        // Completing filename
        parts.pop();
        inputEl.value = parts.join(' ') + ' ' + match;
    }
    
    tabCompletionIndex++;
    lastTabPressed = now;

    // Add visual feedback for completion
    inputEl.style.transition = 'all 0.2s ease';
    inputEl.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    setTimeout(() => {
        inputEl.style.backgroundColor = 'transparent';
    }, 200);
}

function executeCommand(command) {
    const preparedCmd = preparedCommand(command)
    const isValid = isValidCommad(preparedCmd[0])
    if (isValid) {
        switch (preparedCmd[0]) {
            case 'help': displayOutput(commandsData.find(cmdDt => cmdDt.command === preparedCmd[0]));
                break;
            case 'cd': changeDirectory(preparedCmd[1])
                break;
            case 'ls': listFileOrDirectories()
                break;
            case 'cat': displayFileContents(preparedCmd[1])
                break;
            case 'clear': clear()
                break;
            case 'pwd': presentWorkingDir()
                break;
            default: executeCommand('help')
        }
        inputEl.value = ""
        return
    }
    executeCommand('help')
}

function observeKeyInput(event) {
    if (event.key === 'Tab') {
        return handleTabCompletion(event);
    }
    
    if (event.key === 'Enter') {
        event.preventDefault();
        clear();
        executeCommand(inputEl.value);
        inputEl.value = '';
        return;
    }
    
    audio.src = audios.stdin;
    audio.play();
}

inputEl.removeEventListener('keyup', observeKeyInput);
inputEl.addEventListener('keydown', observeKeyInput);

function clear() {
    sysInfoEl.style.display = 'none'
    introEl.style.display = 'none'
    denied.style.display = 'none'
    outputEl.innerHTML = ''
}

function displayOutput(obj) {
    audio.src = audios.granted;
    audio.play();
    clear();
    
    // Add fade-in animation
    outputEl.style.opacity = '0';
    outputEl.innerHTML = obj.data;
    
    requestAnimationFrame(() => {
        outputEl.style.transition = 'opacity 0.2s ease';
        outputEl.style.opacity = '1';
    });
}

// Add smooth scrolling
function scrollToBottom() {
    const terminal = document.querySelector('.terminal__body');
    terminal.scrollTo({
        top: terminal.scrollHeight,
        behavior: 'smooth'
    });
}

// Call scrollToBottom after each command
inputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        setTimeout(scrollToBottom, 100);
    }
});

document.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    displayError()
    return false
})

function displayError() {
    clear()
    denied.style.display = 'block'
    audio.src = audios.error
    audio.play()
}

document.onkeydown = function (e) {
    if (event.keyCode == 123) {
        displayError()
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        displayError()
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        displayError()
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        displayError()
        return false;
    }
}