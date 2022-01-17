const {
    remote,
    ipcRenderer,
} = require('electron')
const fs = require('fs')
const path = require('path');
const {
    cpuUsage
} = require('process');
let hour = document.querySelector('#hour').value;
let min = document.querySelector('#min').value;
let sec = document.querySelector('#sec').value;
let minHour = document.querySelector('#minHour').value;
let minMin = document.querySelector('#minMin').value;
let minSec = document.querySelector('#minSec').value;
let step = document.querySelector('#step').value;
let maxTime = parseInt(hour * 3600) + parseInt(min * 60) + parseInt(sec);
let minTime = parseInt(minHour * 3600) + parseInt(minMin * 60) + parseInt(minSec);
let flag;
let a;
let b;
let temp1;
let temp2;
window.onload = function () {
    // remote.getCurrentWindow().webContents.openDevTools()
    console.log(localStorage.getItem('temp1'))
    console.log(localStorage.getItem('temp2'))
    if (localStorage.getItem('temp1') == "null") {
        localStorage.setItem('temp1', true)
        document.querySelector('#showDate').checked = false
    }
    if (localStorage.getItem('temp2') == "null") {
        localStorage.setItem('temp2', true)
        document.querySelector('#showSmall').checked = false
    }
    if (localStorage.getItem('temp1') == "true") {
        console.log(1)
        a = false
        document.querySelector('#showDate').checked = false
    } else {
        console.log(2)
        a = true
        document.querySelector('#showDate').checked = true
    }
    if (localStorage.getItem('temp2') == "true") {
        console.log(1)
        b = false
        document.querySelector('#showSmall').checked = false
    } else {
        console.log(2)
        b = true
        document.querySelector('#showSmall').checked = true
    }
    if (localStorage.getItem('dft') == "dft") {
        document.querySelector('#dft').style.border = "2px solid orange"
        document.querySelector('#white').style.border = "2px solid transparent"
        document.querySelector('#gray').style.border = "2px solid transparent"
    } else if (localStorage.getItem('white') == "white") {
        document.querySelector('#white').style.border = "2px solid orange"
        document.querySelector('#dft').style.border = "2px solid transparent"
        document.querySelector('#gray').style.border = "2px solid transparent"
    } else if (localStorage.getItem('gray') == "gray") {
        document.querySelector('#gray').style.border = "2px solid orange"
        document.querySelector('#dft').style.border = "2px solid transparent"
        document.querySelector('#white').style.border = "2px solid transparent"
    }
    document.querySelector('#base').style.backgroundColor = "rgba(255, 255, 255)";
    let h_t = localStorage.getItem('h_t') != null ? localStorage.getItem('h_t') : 0;
    let m_t = localStorage.getItem('m_t') != null ? localStorage.getItem('m_t') : 0;
    let s_t = localStorage.getItem('s_t') != null ? localStorage.getItem('s_t') : 0;
    let min_h = localStorage.getItem('min_h') != null ? localStorage.getItem('min_h') : 0;
    let min_m = localStorage.getItem('min_m') != null ? localStorage.getItem('min_m') : 0;
    let min_s = localStorage.getItem('min_s') != null ? localStorage.getItem('min_s') : 0;
    // let min_v = localStorage.getItem('min_v');
    let step_v = localStorage.getItem('step_v') != null ? localStorage.getItem('step_v') : 0;
    // console.log(h_t, m_t, s_t,min_h,min_m,min_s,min_v,step_v)
    document.querySelector('#hour').value = h_t;
    document.querySelector('#min').value = m_t;
    document.querySelector('#sec').value = s_t;
    document.querySelector('#maxHour').value = h_t;
    document.querySelector('#maxMin').value = m_t;
    document.querySelector('#maxSec').value = s_t;
    document.querySelector('#minHour').value = min_h;
    document.querySelector('#minMin').value = min_m;
    document.querySelector('#minSec').value = min_s;
    document.querySelector('#step').value = step_v;
    document.querySelector('.save').addEventListener('click', () => {
        saveTime()
        setSkin(flag)
        sendDate(temp1)
        sendWindow(temp2)
        // window.close()
    })

    document.querySelector('.cancel').addEventListener('click', () => {
        window.close();
    })

    document.querySelector('#hour').addEventListener('input', () => {
        setHourValue();
    })

    document.querySelector('#min').addEventListener('input', () => {
        setMinValue();
    })

    document.querySelector('#sec').addEventListener('input', () => {
        setSecValue();
    })

    document.querySelector('#maxHour').addEventListener('input', () => {
        setMaxHourValue();
    })

    document.querySelector('#maxMin').addEventListener('input', () => {
        setMaxMinValue();
    })

    document.querySelector('#maxSec').addEventListener('input', () => {
        setMaxSecValue();
    })
}
document.querySelector('#base').addEventListener('click', () => {
    document.querySelector('.conv').style.display = "block";
    document.querySelector('.skin').style.display = "none";
    // document.querySelector('.other').style.display = "none";
    document.querySelector('#base').style.backgroundColor = "rgba(255, 255, 255)";
    document.querySelector('#theme').style.backgroundColor = "rgba(255, 250, 240, 0.8)";
    // document.querySelector('#other').style.backgroundColor = "rgba(255, 250, 240, 0.8)";
    ipcRenderer.on('time_send', (event, arg) => {
        console.log(arg)
    })
})
document.querySelector('#theme').addEventListener('click', () => {
    // remote.dialog.showMessageBox({
    //     type: 'info',
    //     title: '信息',
    //     message: '此功能正在开发中。。。'
    // })
    document.querySelector('.conv').style.display = "none";
    document.querySelector('.skin').style.display = "block";
    // document.querySelector('.other').style.display = "none";
    document.querySelector('#base').style.backgroundColor = "rgba(255, 255, 255,0.8)";
    document.querySelector('#theme').style.backgroundColor = "rgba(255, 255, 255)";
    // document.querySelector('#other').style.backgroundColor = "rgba(255, 250, 240, 0.8)";
})
// document.querySelector('#other').addEventListener('click', () => {
// remote.dialog.showMessageBox({
//     type: 'info',
//     title: '信息',
//     message: '此功能正在开发中。。。'
// })
//     document.querySelector('.conv').style.display = "none";
//     document.querySelector('.skin').style.display = "none";
//     document.querySelector('.other').style.display = "block";
//     document.querySelector('#base').style.backgroundColor = "rgba(255, 250, 240, 0.8)";
//     document.querySelector('#theme').style.backgroundColor = "rgba(255, 250, 240, 0.8)";
//     document.querySelector('#other').style.backgroundColor = "rgba(255, 255, 255)";
// })


document.querySelector('#dft').addEventListener('click', function () {
    document.querySelector('#dft').style.border = "2px solid orange"
    document.querySelector('#white').style.border = "2px solid transparent"
    document.querySelector('#gray').style.border = "2px solid transparent"
    flag = 1;
})


document.querySelector('#white').addEventListener('click', function () {
    document.querySelector('#dft').style.border = "2px solid transparent"
    document.querySelector('#white').style.border = "2px solid orange"
    document.querySelector('#gray').style.border = "2px solid transparent"
    flag = 2;
})

document.querySelector('#gray').addEventListener('click', function () {
    document.querySelector('#dft').style.border = "2px solid transparent"
    document.querySelector('#white').style.border = "2px solid transparent"
    document.querySelector('#gray').style.border = "2px solid orange"
    flag = 3;
})

document.querySelector('#showDate').addEventListener('click', function () {
    if (!a) {
        temp1 = false;
    } else {
        temp1 = true;
    }
    a = !a
    console.log(temp1)
})

document.querySelector('#showSmall').addEventListener('click', function () {
    if (!b) {
        temp2 = false;
    } else {
        temp2 = true;
    }
    b = !b
    console.log(temp2)
})

function setHourValue() {
    let hourValue = document.querySelector('#hour').value;
    document.querySelector('#maxHour').value = hourValue;
}

function setMinValue() {
    let minValue = document.querySelector('#min').value;
    document.querySelector('#maxMin').value = minValue;
}

function setSecValue() {
    let secValue = document.querySelector('#sec').value;
    document.querySelector('#maxSec').value = secValue;
}

function setMaxHourValue() {
    let hourValue = document.querySelector('#maxHour').value;
    document.querySelector('#hour').value = hourValue;
}

function setMaxMinValue() {
    let minValue = document.querySelector('#maxMin').value;
    document.querySelector('#min').value = minValue;
}

function setMaxSecValue() {
    let secValue = document.querySelector('#maxSec').value;
    document.querySelector('#sec').value = secValue;
}

function saveTime() {
    let hour = document.querySelector('#hour').value;
    let min = document.querySelector('#min').value;
    let sec = document.querySelector('#sec').value;
    console.log(step)
    if (checkValue()) {
        localStorage.removeItem('h_t');
        localStorage.removeItem('m_t');
        localStorage.removeItem('s_t');
        localStorage.removeItem('min_h');
        localStorage.removeItem('min_m');
        localStorage.removeItem('min_s');
        localStorage.removeItem('min_v');
        localStorage.removeItem('step_v');
        localStorage.setItem('h_t', ~~hour);
        localStorage.setItem('m_t', ~~min);
        localStorage.setItem('s_t', ~~sec);
        localStorage.setItem('min_h', ~~minHour);
        localStorage.setItem('min_m', ~~minMin);
        localStorage.setItem('min_s', ~~minSec);
        localStorage.setItem('min_v', minTime);
        localStorage.setItem('step_v', ~~step);
        ipcRenderer.send('time_message', [~~hour, ~~min, ~~sec]);
        ipcRenderer.send('min_time', minTime);
        ipcRenderer.send('step_value', ~~step);
        window.close()
    }



}


// console.log(hour, min, sec)
// console.log(minHour, minMin, minSec)
// console.log(minTime)
//时间去零
function check(val) {
    if (val < 10) {
        return val;
    } else {
        return "0" + val;
    }
}


function checkValue() {
    let hour = document.querySelector('#hour').value;
    let min = document.querySelector('#min').value;
    let sec = document.querySelector('#sec').value;
    let maxHour = document.querySelector('#maxHour').value;
    let maxMin = document.querySelector('#maxMin').value;
    let maxSec = document.querySelector('#maxSec').value;
    let minHour = document.querySelector('#minHour').value;
    let minMin = document.querySelector('#minMin').value;
    let minSec = document.querySelector('#minSec').value;
    let step = document.querySelector('#step').value;
    let maxTime = parseInt(hour * 3600) + parseInt(min * 60) + parseInt(sec);
    let minTime = parseInt(minHour * 3600) + parseInt(minMin * 60) + parseInt(minSec);
    if (Number.isInteger(parseFloat(hour)) && Number.isInteger(parseFloat(min)) && Number.isInteger(parseFloat(sec))) {
        if (hour < 0 || min < 0 || sec < 0 || maxHour < 0 || maxMin < 0 || maxSec < 0 || minHour < 0 || minMin < 0 || minSec < 0) {
            remote.getCurrentWindow().setAlwaysOnTop(false)
            remote.dialog.showErrorBox('错误', '倒计时时间不得小于0');
            return false;
        } else if (hour > 24 || maxHour > 24 || minHour > 24) {
            remote.getCurrentWindow().setAlwaysOnTop(false)
            remote.dialog.showErrorBox('错误', '倒计时小时数不得大于24');
            return false;
        } else if (min > 59 || maxMin > 59 || minMin > 59) {
            remote.getCurrentWindow().setAlwaysOnTop(false)
            remote.dialog.showErrorBox('错误', '倒计时分钟数不得大于59，你应添加1小时');
            return false;
        } else if (sec > 59 || maxSec > 59 || minSec > 59) {
            remote.getCurrentWindow().setAlwaysOnTop(false)
            remote.dialog.showErrorBox('错误', '倒计时秒钟数不得大于59，你应添加1分钟');
            return false;
        } else if (minTime != 0 && maxTime != 0) {
            if (minTime >= maxTime) {
                remote.getCurrentWindow().setAlwaysOnTop(false)
                remote.dialog.showErrorBox('错误', '倒计时最小阈值不得大于或等于最大阈值');
                return false;
            }
        } else if (step < 1) {
            remote.getCurrentWindow().setAlwaysOnTop(false)
            remote.dialog.showErrorBox('错误', '倒计时步（秒）长不得小于1');
            return false;
        } else if (step > 10) {
            remote.getCurrentWindow().setAlwaysOnTop(false)
            remote.dialog.showErrorBox('错误', '倒计时步（秒）长不得大于10');
            return false;
        }
        return true;
    } else {
        remote.getCurrentWindow().setAlwaysOnTop(false)
        remote.dialog.showErrorBox('错误', '倒计时时间只能是非负整数！');
        return false;
    }



}

function setSkin(index) {
    const dft = 'dft';
    const white = 'white';
    const gray = 'gray';
    switch (index) {
        case 1:
            ipcRenderer.send('dft', dft);
            localStorage.setItem('dft', dft)
            localStorage.removeItem('white')
            localStorage.removeItem('gary')
            break;
        case 2:
            ipcRenderer.send('white', white);
            localStorage.setItem('white', white)
            localStorage.removeItem('dft')
            localStorage.removeItem('gary')
            break;
        case 3:
            ipcRenderer.send('gray', gray);
            localStorage.setItem('gray', gray)
            localStorage.removeItem('dft')
            localStorage.removeItem('white')
            break;
    }
}
//发送是否隐藏日期给主进程
function sendDate(date) {
    if (date == undefined) {
        date = true
    }
    if (date) {
        console.log(date)
        ipcRenderer.send('temp1', date);
        localStorage.removeItem('temp1')
        localStorage.setItem('temp1', true)
    } else {
        console.log(date)
        ipcRenderer.send('temp1', date);
        localStorage.removeItem('temp1')
        localStorage.setItem('temp1', false)
    }
}

//发送是否隐藏小窗模式给主进程
function sendWindow(value) {
    if (value == undefined) {
        value = true
    }
    if (value) {
        console.log(value)
        ipcRenderer.send('temp2', value);
        localStorage.removeItem('temp2')
        localStorage.setItem('temp2', true)
    } else {
        console.log(value)
        ipcRenderer.send('temp2', value);
        localStorage.removeItem('temp2')
        localStorage.setItem('temp2', false)
    }
}