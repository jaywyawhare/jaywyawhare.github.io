// o = {
//     initial: [{
//         type: "basicText",
//         playSound: "init",
//         content: "GRUB loading.",
//         delay: 1e3
//     }, {
//         type: "basicText",
//         content: "Welcome to GRUB!",
//         delay: 2e3
//     }, {
//         clear: !0,
//         type: "basicText",
//         content: "",
//         delay: 2500
//     }, {
//         clear: !0,
//         type: "basicText",
//         content: "Loading Linux 3.2.0-4-amd64 ...",
//         delay: 600
//     }, {
//         type: "basicText",
//         content: "Loading initial ramdisk  ...",
//         delay: 1e3
//     }, {
//         clear: !0,
//         type: "basicText",
//         content: "",
//         delay: 600
//     }, {
//         clear: !0,
//         type: "basicText",
//         content: "Loading, please wait ...",
//         delay: 1200
//     }, {
//         type: "basicText",
//         content: "[    2.194785] sd 0:0:0:0: [sda] Assuming drive cache: write through",
//         delay: 100
//     }, {
//         type: "basicText",
//         content: "[    2.195284] sd 0:0:0:0: [sda] Assuming drive cache: write through",
//         delay: 100
//     }, {
//         type: "basicText",
//         content: "[    2.196163] sd 0:0:0:0: [sda] Assuming drive cache: write through",
//         delay: 100
//     }, {
//         type: "basicText",
//         content: "INIT: version 2.88 booting",
//         delay: 800
//     }, {
//         type: "basicText",
//         content: '[<span class="bl">info</span>] Using makefile-style concurrent boot in runlevel S.',
//         delay: 0
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Starting the hot plug events dispatcher: udevd.',
//         delay: 40
//     }, {
//         type: "basicText",
//         content: "....] Synthesizing the initial hotplug events...[    2.700609] piix_smbus 0000:00:07.3: Host SMBus controller not enabled!",
//         delay: 200
//     }, {
//         type: "basicText",
//         content: "done.",
//         delay: 40
//     }, {
//         type: "basicText",
//         content: "[ <span class=\"gn\">ok</span> ] Waiting for /dev to be fully populated...[    3.061484] Error: Driver 'pc spkr' is already registered, aborting...",
//         delay: 40
//     }, {
//         type: "basicText",
//         content: "done.",
//         delay: 200
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Setting preliminary keymap...done.',
//         delay: 200
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Activating swap...done.',
//         delay: 200
//     }, {
//         type: "basicText",
//         content: "[....] Checking root file system...fsck from util-linux 2.20.1 /dev/sda1: clean, 38190/1256640 files, 341993/5016832 blocks",
//         delay: 40
//     }, {
//         type: "basicText",
//         content: "done.",
//         delay: 40
//     }, {
//         type: "basicText",
//         content: '[<span class="bl">info</span>] Loading kernel module loop.',
//         delay: 40
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Cleaning up temporary files... /tmp.',
//         delay: 40
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Activating lvm and md swap...done.',
//         delay: 40
//     }, {
//         type: "basicText",
//         content: "[....] Checking file systems...fsck from util-linux 2.20.1",
//         delay: 800
//     }, {
//         type: "basicText",
//         content: "done.",
//         delay: 200
//     }, {
//         type: "basicText",
//         content: "[....] Mounting local filesystems...done.",
//         delay: 500
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Activating swapfile swap...done.',
//         delay: 100
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Cleaning up temporary files....',
//         delay: 20
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Setting kernel variables ...done.',
//         delay: 100
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Configuring network interfaces...done.',
//         delay: 500
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Starting rpcbind daemon....',
//         delay: 200
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Starting NFS common utilities: statd idmapd.',
//         delay: 200
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Cleaning up temporary files....done.',
//         delay: 200
//     }, {
//         type: "basicText",
//         content: '[<span class="bl">info</span>] Setting console screen modes.',
//         delay: 40
//     }, {
//         type: "basicText",
//         content: '[<span class="bl">info</span>] Skipping font and keymap setup (handled by console-setup).',
//         delay: 10
//     }, {
//         type: "basicText",
//         content: "[....] Setting up console font and keymap...done.",
//         delay: 400
//     }, {
//         type: "basicText",
//         content: "INIT: Entering runlevel: 2",
//         delay: 1e3
//     }, {
//         type: "basicText",
//         content: '[<span class="bl">info</span>] Using makefile-style concurrent boot in runlevel 2.',
//         delay: 90
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Starting NFS common utlities: statd idmapd.',
//         delay: 20
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Starting rpcbind daemon...[....] Already running..',
//         delay: 10
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Starting enhanced syslogd: rsyslogd.',
//         delay: 300
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Starting deferred execution scheduler: atd.',
//         delay: 300
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Starting ACPI services....',
//         delay: 100
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Starting periodic command scheduler: cron',
//         delay: 80
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Starting system message bus: dbus',
//         delay: 1e3
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Starting Avahi mDNS/DNS-SD Daemon: avahi-daemon.',
//         delay: 40
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Starting Common Unix Printing System: cupsd',
//         delay: 90
//     }, {
//         type: "basicText",
//         content: '[ <span class="gn">ok</span> ] Starting MTA: exim4.',
//         delay: 20
//     }, {
//         clear: !0,
//         type: "basicText",
//         content: "Debian GNU/Linux 7 mrrobot ttyl",
//         delay: 1e3
//     }, {
//         type: "basicText",
//         content: "&nbsp",
//         delay: 40
//     }, {
//         type: "typedText",
//         content: "root",
//         prefix: "mrrobot login: ",
//         playSound: "init",
//         delay: 1500
//     }, {
//         type: "typedText",
//         content: "•••••••••••",
//         prefix: "password: ",
//         delay: 500
//     }, {
//         clear: !0,
//         type: "basicText",
//         content: "",
//         delay: 250
//     },
//     {
//         type: "basicText",
//         content: "&nbsp",
//         delay: 40
//     },

// use the given o[i] to create a loop that will display the animation on black screen using p5.js

o = {
    initial: [{
        type: "basicText",
        playSound: "init",
        content: "GRUB loading.",
        delay: 1e3
    }, {
        type: "basicText",
        content: "Welcome to GRUB!",
        delay: 2e3
    }, {
        clear: !0,
        type: "basicText",
        content: "",
        delay: 2500
    }, {
        clear: !0,
        type: "basicText",
        content: "Loading Linux 3.2.0-4-amd64 ...",
        delay: 600
    }, {
        type: "basicText",
        content: "Loading initial ramdisk  ...",
        delay: 1e3
    }, {
        clear: !0,
        type: "basicText",
        content: "",
        delay: 600
    }, {
        clear: !0,
        type: "basicText",
        content: "Loading, please wait ...",
        delay: 1200
    }, {
        type: "basicText",
        content: "[    2.194785] sd 0:0:0:0: [sda] Assuming drive cache: write through",
        delay: 100
    }, {
        type: "basicText",
        content: "[    2.195284] sd 0:0:0:0: [sda] Assuming drive cache: write through",
        delay: 100
    }, {
        type: "basicText",
        content: "[    2.196163] sd 0:0:0:0: [sda] Assuming drive cache: write through",
        delay: 100
    }, {
        type: "basicText",
        content: "INIT: version 2.88 booting",
        delay: 800
    }, {
        type: "basicText",
        content: '[<span class="bl">info</span>] Using makefile-style concurrent boot in runlevel S.',
        delay: 0
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Starting the hot plug events dispatcher: udevd.',
        delay: 40
    }, {
        type: "basicText",
        content: "....] Synthesizing the initial hotplug events...[    2.700609] piix_smbus 0000:00:07.3: Host SMBus controller not enabled!",
        delay: 200
    }, {
        type: "basicText",
        content: "done.",
        delay: 40
    }, {
        type: "basicText",
        content: "[ <span class=\"gn\">ok</span> ] Waiting for /dev to be fully populated...[    3.061484] Error: Driver 'pc spkr' is already registered, aborting...",
        delay: 40
    }, {
        type: "basicText",
        content: "done.",
        delay: 200
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Setting preliminary keymap...done.',
        delay: 200
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Activating swap...done.',
        delay: 200
    }, {
        type: "basicText",
        content: "[....] Checking root file system...fsck from util-linux 2.20.1 /dev/sda1: clean, 38190/1256640 files, 341993/5016832 blocks",
        delay: 40
    }, {
        type: "basicText",
        content: "done.",
        delay: 40
    }, {
        type: "basicText",
        content: '[<span class="bl">info</span>] Loading kernel module loop.',
        delay: 40
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Cleaning up temporary files... /tmp.',
        delay: 40
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Activating lvm and md swap...done.',
        delay: 40
    }, {
        type: "basicText",
        content: "[....] Checking file systems...fsck from util-linux 2.20.1",
        delay: 800
    }, {
        type: "basicText",
        content: "done.",
        delay: 200
    }, {
        type: "basicText",
        content: "[....] Mounting local filesystems...done.",
        delay: 500
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Activating swapfile swap...done.',
        delay: 100
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Cleaning up temporary files....',
        delay: 20
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Setting kernel variables ...done.',
        delay: 100
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Configuring network interfaces...done.',
        delay: 500
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Starting rpcbind daemon....',
        delay: 200
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Starting NFS common utilities: statd idmapd.',
        delay: 200
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Cleaning up temporary files....done.',
        delay: 200
    }, {
        type: "basicText",
        content: '[<span class="bl">info</span>] Setting console screen modes.',
        delay: 40
    }, {
        type: "basicText",
        content: '[<span class="bl">info</span>] Skipping font and keymap setup (handled by console-setup).',
        delay: 10
    }, {
        type: "basicText",
        content: "[....] Setting up console font and keymap...done.",
        delay: 400
    }, {
        type: "basicText",
        content: "INIT: Entering runlevel: 2",
        delay: 1e3
    }, {
        type: "basicText",
        content: '[<span class="bl">info</span>] Using makefile-style concurrent boot in runlevel 2.',
        delay: 90
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Starting NFS common utlities: statd idmapd.',
        delay: 20
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Starting rpcbind daemon...[....] Already running..',
        delay: 10
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Starting enhanced syslogd: rsyslogd.',
        delay: 300
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Starting deferred execution scheduler: atd.',
        delay: 300
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Starting ACPI services....',
        delay: 100
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Starting periodic command scheduler: cron',
        delay: 80
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Starting system message bus: dbus',
        delay: 1e3
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Starting Avahi mDNS/DNS-SD Daemon: avahi-daemon.',
        delay: 40
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Starting Common Unix Printing System: cupsd',
        delay: 90
    }, {
        type: "basicText",
        content: '[ <span class="gn">ok</span> ] Starting MTA: exim4.',
        delay: 20
    }, {
        clear: !0,
        type: "basicText",
        content: "Debian GNU/Linux 7 mrrobot ttyl",
        delay: 1e3
    }, {
        type: "basicText",
        content: "&nbsp",
        delay: 40
    }, {
        type: "typedText",
        content: "root",
        prefix: "mrrobot login: ",
        playSound: "init",
        delay: 1500
    }, {
        type: "typedText",
        content: "•••••••••••",
        prefix: "password: ",
        delay: 500
    }, {
        clear: !0,
        type: "basicText",
        content: "",
        delay: 250
    },
    {
        type: "basicText",
        content: "&nbsp",
        delay: 40
    },
    ]
}

var _part = 0,

var _part_index = 0,

var _interval_val;
var _element = document.getElementById("typed-text");
var _element_content = _element.innerHTML;
var _element_prefix = _element.getAttribute("data-prefix");
var _element_playSound = _element.getAttribute("data-playSound");
var _element_delay = _element.getAttribute("data-delay");
var _element_clear = _element.getAttribute("data-clear");
var _element_type = _element.getAttribute("data-type");
var _element_content_length = _element_content.length;
var _element_content_array = _element_content.split("");
var _element_prefix_length = _element_prefix.length;

var _cursor_element = document.getElementById("cursor");
var _cursor_element_content = _cursor_element.innerHTML;

function type() {
    if (_part_index < _parts[_part].length) {
        if (_parts[_part][_part_index].type == "basicText") {
            if (_parts[_part][_part_index].clear) {
                _element.innerHTML = ""
            } else {
                _element.innerHTML += _parts[_part][_part_index].content
            }
            _part_index++
        } else if (_parts[_part][_part_index].type == "typedText") {
            if (_parts[_part][_part_index].clear) {
                _element.innerHTML = ""
            } else {
                _element.innerHTML += _parts[_part][_part_index].content
            }
            _part_index++
        }
    } else {
        _part++;
        _part_index = 0
    }
    if (_part < _parts.length) {
        _interval_val = setTimeout(type, _parts[_part][_part_index].delay)
    }
}

_interval_val = setTimeout(type, _parts[_part][_part_index].delay);