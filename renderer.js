//该文件是index.html文件所必需的，并且将在该窗口的渲染器进程中执行。
//此过程中没有可用的Node.js API，因为`nodeIntegration`已关闭。 使用`preload.js`来有选择地启用渲染中所需的功能过程。
const {
    remote,
    ipcRenderer
} = require('electron')
let setWin = null;
let abWin = null;
let smWin = null;
const clockText = document.querySelector('#clockText'); //获取时钟dom
const h_count = document.querySelector('#h_count');
const m_count = document.querySelector('#m_count');
const s_count = document.querySelector('#s_count');
let flag = false;
window.onload = () => {
    // localStorage.removeItem('h_t')
    // localStorage.removeItem('m_t')
    // localStorage.removeItem('s_t')
    // getNetTime();
    setInterval(getSysTime, 1000)
    console.log(localStorage.getItem('time'))
    console.log(localStorage.getItem('small'))
    if (localStorage.getItem('time') == "null") {
        localStorage.setItem('time', true)
        document.querySelector('.time').style.display = "block"
    }
    if (localStorage.getItem('small') == "null") {
        localStorage.setItem('small', true)
        document.querySelector('.size').style.display = "block"
    }
    ipcRenderer.on('dft_reply', (event, arg) => {
        console.log(arg)
        document.querySelector('body').style.background = "url('./img/bg1.jpg') no-repeat";
        document.querySelector('body').style.backgroundPosition = "center center";
        document.querySelector('body').style.backgroundSize = "100% 100%";
        localStorage.removeItem('white')
        localStorage.removeItem('gray')
        localStorage.setItem('dft',arg)
    })
    ipcRenderer.on('white_reply', (event, arg) => {
        console.log(arg)
        document.querySelector('body').style.background = "#f2eada";
        document.querySelector('body').style.backgroundSize = "100% 100%";
        localStorage.removeItem('dft')
        localStorage.removeItem('gray')
        localStorage.setItem('white', arg)
    })
    ipcRenderer.on('gray_reply', (event, arg) => {
        console.log(arg)
        document.querySelector('body').style.background = "#a1a3a6";
        document.querySelector('body').style.backgroundSize = "100% 100%";
        localStorage.removeItem('dft')
        localStorage.removeItem('white')
        localStorage.setItem('gray', arg)
    })
    if (localStorage.getItem('dft') == "dft") {
        setSkin("dft")
    } else if (localStorage.getItem('white') == "white") {
        setSkin("white")
    } else if (localStorage.getItem('gray') == "gray") {
        setSkin("gray")
    }
    if (localStorage.getItem('time') == "true") {
        document.querySelector('.time').style.display = "block"
    } else if (localStorage.getItem('time') == "false") {
        document.querySelector('.time').style.display = "none"
    }
    if (localStorage.getItem('small') == "true") {
        document.querySelector('.size').style.display = "block"
    } else if (localStorage.getItem('small') == "false") {
        document.querySelector('.size').style.display = "none"
    }
    ipcRenderer.on('temp1_reply', (event, arg) => {
        console.log(arg)
        if (arg) {
            document.querySelector('.time').style.display = "block"
            localStorage.removeItem('time')
            localStorage.setItem('time',true)
        } else {
            document.querySelector('.time').style.display = "none"
            localStorage.removeItem('time')
            localStorage.setItem('time', false)
        }
    })
    ipcRenderer.on('temp2_reply', (event, arg) => {
        console.log(arg)
        if (arg) {
            document.querySelector('.size').style.display = "block"
            localStorage.removeItem('small')
            localStorage.setItem('small', true)
        } else {
            document.querySelector('.size').style.display = "none"
            localStorage.removeItem('small')
            localStorage.setItem('small', false)
        }
    })
    document.querySelector('#pause').disabled = "true";
    document.querySelector('#pause').style.cursor = "not-allowed";
    document.querySelector('#reset').disabled = "true";
    document.querySelector('#reset').style.cursor = "not-allowed";
    ipcRenderer.on('time_reply', (event, arg) => {
        console.log(arg)
        console.log(check(arg[0]), check(arg[1]), check(arg[2]))
        h_text = check(arg[0]);
        m_text = check(arg[1]);
        s_text = check(arg[2]);
        h_count.innerHTML = check(arg[0]);
        m_count.innerHTML = check(arg[1]);
        s_count.innerHTML = check(arg[2]);
        // localStorage.removeItem('time_text');
        // localStorage.setItem('time_text',[h_text,m_text,s_text])
    })
    let h_t = localStorage.getItem('h_t');
    let m_t = localStorage.getItem('m_t');
    let s_t = localStorage.getItem('s_t');
    let min_v = localStorage.getItem('min_v');
    let step_v = localStorage.getItem('step_v');
    intEnd = min_v;
    stepNum = step_v;
    h_text = check(h_t) ?? "00";
    m_text = check(m_t) ?? "00";
    s_text = check(s_t) ?? "00";
    ipcRenderer.on('min_reply', (event, arg) => {
        console.log(arg)
        intEnd = arg;
    })
    ipcRenderer.on('step_reply', (event, arg) => {
        console.log(arg)
        stepNum = arg;
    })
    // console.log(h_t, m_t, s_t)
    h_count.innerHTML = h_t !== null ? check(h_t) : "00";
    m_count.innerHTML = m_t !== null ? check(m_t) : "00";
    s_count.innerHTML = s_t !== null ? check(s_t) : "00";
}
document.querySelector('#start').addEventListener('click', () => {
    // timer = setInterval(clockStart(), 1000);
    if (h_count.innerHTML == "00" && m_count.innerHTML == "00" && s_count.innerHTML == "00") {
        remote.dialog.showErrorBox('错误', '请设置倒计时时间！');
    } else {
        timecounts();
        document.querySelector('#pause').disabled = "";
        document.querySelector('#pause').style.cursor = "pointer";
        document.querySelector('#start').disabled = "true";
        document.querySelector('#start').style.cursor = "not-allowed";
        document.querySelector('#reset').disabled = "";
        document.querySelector('#reset').style.cursor = "pointer";
    }

})
document.querySelector('#pause').addEventListener('click', () => {
    // timer = setInterval(clockStart(), 1000);
    pauseTimer();
    document.querySelector('#start').disabled = "";
    document.querySelector('#start').style.cursor = "pointer";
    document.querySelector('#pause').disabled = "true";
    document.querySelector('#pause').style.cursor = "not-allowed";
})
document.querySelector('#reset').addEventListener('click', () => {
    resetTimer();
})
// 打开设置窗口
document.querySelector('#setting').addEventListener('click', () => {

    //调用 BrowserWindow打开新窗口
    setWin = new remote.BrowserWindow({
        width: 500,
        height: 660,
        resizable: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }

    })
    //新建窗口
    setWin.loadFile('setting.html');
    setWin.on('close', () => {
        setWin = null
    })
    setWin.on('focus', () => {
        setWin.setAlwaysOnTop(true, "screen-saver")
    })
    setWin.on('blur', () => {
        setWin.setAlwaysOnTop(false)
    })

})
// 打开关于窗口
document.querySelector('#about').addEventListener('click', () => {
    //调用 BrowserWindow打开新窗口
    abWin = new remote.BrowserWindow({
        width: 500,
        height: 480,
        alwaysOnTop: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }

    })
    //新建窗口
    abWin.loadFile('about.html');
    abWin.on('close', () => {
        abWin = null
    })
    abWin.on('focus', () => {
        abWin.setAlwaysOnTop(true, "screen-saver")
    })
    abWin.on('blur', () => {
        abWin.setAlwaysOnTop(false)
    })
})
// 打开小窗模式
document.querySelector('#small').addEventListener('click', () => {
    remote.getCurrentWindow().setMinimumSize(390, 100);
    remote.getCurrentWindow().setSize(390, 100);
    remote.getCurrentWindow().setResizable(false);
    // remote.getCurrentWindow().setMaximumSize(390, 100);
    remote.getCurrentWindow().setAlwaysOnTop(true, "screen-saver")
})

// 还原传统模式
document.querySelector('#big').addEventListener('click', () => {
    remote.getCurrentWindow().setSize(800, 600);
    remote.getCurrentWindow().setMinimumSize(800, 600);
    
    remote.getCurrentWindow().setResizable(false);
    remote.getCurrentWindow().setAlwaysOnTop(false)
})

//获取网络时间
function getNetTime() {
    //获取主进程传来的日期时间
    ipcRenderer.on('datetime', (event, arg) => {
        let datetime = arg.datetime; //获取日期时间
        let date = arg.date; //获取格式化日期字符串
        let weekday = getWeek(date); //获取星期几
        let year = datetime.substring(0, 4); //获取年
        let month = datetime.substring(5, 7); //获取月
        let day = datetime.substring(8, 10); //获取日
        let hour = datetime.substring(10, 13); //获取小时
        let min = datetime.substring(14, 16); //获取分钟
        // let sec = datetime.substring(17, 19); //获取秒钟
        const timeText = document.querySelector('#timeText') //获取时间文字dom
        // console.log(datetime);
        // console.log(week);
        // console.log(year,month,day,hour,min);
        //输出日期
        timeText.innerHTML = `${year}年${month}月${day}日&nbsp;${weekday}${hour}:${min}`;
    });

}

//获取系统时间
function getSysTime() {
    let datetime = new Date(); //获取当前时间戳
    let week = datetime.getDay(); //获取星期几
    let year = datetime.getFullYear(); //获取年
    let month = datetime.getMonth() + 1; //获取月
    let day = datetime.getDate(); //获取日
    let hour = datetime.getHours(); //获取小时
    let min = datetime.getMinutes(); //获取分钟
    // let sec = datetime.getSeconds(); //获取秒钟
    let weekday = ""; //获取中文周几
    const timeText = document.querySelector('#timeText') //获取时间文字dom
    // console.log(datetime);
    switch (week) { //处理星期几
        case 1:
            weekday = '星期一';
            break;
        case 2:
            weekday = '星期二';
            break;
        case 3:
            weekday = '星期三';
            break;
        case 4:
            weekday = '星期四';
            break;
        case 5:
            weekday = '星期五';
            break;
        case 6:
            weekday = '星期六';
            break;
        case 0:
            weekday = '星期日';
            break;
    }
    //输出日期
    timeText.innerHTML = `${year}年${check(month)}月${check(day)}日&nbsp;${weekday}&nbsp;${check(hour)}:${check(min)}`;
}

//时间补零
function check(val) {
    if (val < 10) {
        return "0" + val;
    } else {
        return val;
    }
}

//转化星期
function getWeek(dateString) {
    var dateArray = dateString.split("-");
    date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    return "星期" + "日一二三四五六".charAt(date.getDay());
};

//计时器主逻辑
function timer(intDiff, intEnd = -1, stepNum = 1) {
    document.querySelector('#setting').disabled = "true";
    document.querySelector('#setting').style.cursor = "not-allowed";
    if (intDiff > 10) {
        clockText.style.color = "#000000";
    } else {
        clockText.style.color = "#cc0000";
    }
    intDiff -= 1;
    timecount = setInterval(function () {
        // let { h, m, s } = 0,//初始化时间默认值
        //算法控制
        if (intDiff > 0) {
            h = Math.floor(intDiff / (60 * 60));
            m = Math.floor(intDiff / 60) - (h * 60);
            s = Math.floor(intDiff) - (h * 60 * 60) - (m * 60);
        }
        if (h <= 9) {
            h = '0' + h;
        }
        if (m <= 9) {
            m = '0' + m;
        }
        if (s <= 9) {
            s = '0' + s;
        }
        //打印到dom
        h_count.innerHTML = h;
        m_count.innerHTML = m;
        s_count.innerHTML = s;
        intDiff -= stepNum;
        if (intDiff == 59) {
            let audio = new Audio()
            audio.src = "./sound/sound1.wav"
            audio.play();
            let myNotification = new Notification('倒计时提醒', {
                body: '倒计时仅剩1分钟！',
                silent: false
            })
            notification.show()
        }
        if (intDiff <= 59 && intDiff > 10) {
            clockText.style.color = "#ff0066";
        }
        if (intDiff == 4) {
            clockText.style.color = "#cc0000";
            if (!flag) {
                timeFin = setInterval(function () {
                    audio = new Audio()
                    audio.src = "./sound/sound2.wav"
                    audio.play();
                }, 1000)
                flag = true;
            }
            
        }
        if (intDiff == intEnd) {
            timecount = clearInterval(timecount)
            clearInterval(timeFin)
            let audio = new Audio()
            audio.src = "./sound/sound1.wav"
            audio.play();
            remote.dialog.showMessageBox({
                type: 'info',
                title: '信息',
                message: '倒计时结束！'
            })
            h_count.innerHTML = "00";
            m_count.innerHTML = "00";
            s_count.innerHTML = "00";
            clockText.style.color = "#cc0000";
            let myNotification = new Notification('倒计时提醒', {
                body: '倒计时结束！',
                silent: false
            })
            document.querySelector('#pause').disabled = "true";
            document.querySelector('#pause').style.cursor = "not-allowed";
            document.querySelector('#setting').disabled = "";
            document.querySelector('#setting').style.cursor = "pointer";
        }
    }, 1000)

    // console.log(intDiff);
}

function timecounts() {
    let h_num = h_count.innerHTML;
    let m_num = m_count.innerHTML;
    let s_num = s_count.innerHTML;
    // console.log(h_count,m_count,s_count)
    count = parseInt(h_num * 3600) + parseInt(m_num * 60) + parseInt(s_num)
    timer(count, intEnd - 1, stepNum); //调用计时器函数
    // if (h_count == 00 && m_count == 00 && s_count == 00) {
    //     timecount = clearInterval(timecount)
    // }
    console.log(count);
}

function pauseTimer() {
    clearInterval(timecount)
    clockText.style.color = "#ff9900";
}

function resetTimer() {
    clearInterval(timecount);
    if (flag) {
        clearInterval(timeFin)
        flag = false;
    }
    if (h_count.innerHTML == "00" && m_count.innerHTML == "00" && s_count.innerHTML == "00") {
        h_count.innerHTML = h_text;
        m_count.innerHTML = m_text;
        s_count.innerHTML = s_text;
        document.querySelector('#start').disabled = "";
        document.querySelector('#start').style.cursor = "pointer";
        document.querySelector('#pause').disabled = "true";
        document.querySelector('#pause').style.cursor = "not-allowed";
        document.querySelector('#reset').disabled = "true";
        document.querySelector('#reset').style.cursor = "not-allowed";
        document.querySelector('#setting').disabled = "";
        document.querySelector('#setting').style.cursor = "pointer";
        clockText.style.color = "#000000";
    } else {
        if (h_text.innerHTML != "00") {
            h_count.innerHTML = h_text;
            document.querySelector('#start').disabled = "";
            document.querySelector('#start').style.cursor = "pointer";
            document.querySelector('#pause').disabled = "true";
            document.querySelector('#pause').style.cursor = "not-allowed";
            document.querySelector('#reset').disabled = "true";
            document.querySelector('#reset').style.cursor = "not-allowed";
            document.querySelector('#setting').disabled = "";
            document.querySelector('#setting').style.cursor = "pointer";
            clockText.style.color = "#000000";
        } else {
            h_count.innerHTML = "00";
            document.querySelector('#start').disabled = "true";
            document.querySelector('#start').style.cursor = "not-allowed";
            document.querySelector('#pause').disabled = "true";
            document.querySelector('#pause').style.cursor = "not-allowed";
            document.querySelector('#setting').disabled = "";
            document.querySelector('#setting').style.cursor = "not-allowed";
            clockText.style.color = "#000000";
        }
        if (m_text.innerHTML != "00") {
            m_count.innerHTML = m_text;
            document.querySelector('#start').disabled = "";
            document.querySelector('#start').style.cursor = "pointer";
            document.querySelector('#pause').disabled = "true";
            document.querySelector('#pause').style.cursor = "not-allowed";
            document.querySelector('#reset').disabled = "true";
            document.querySelector('#reset').style.cursor = "not-allowed";
            document.querySelector('#setting').disabled = "";
            document.querySelector('#setting').style.cursor = "pointer";
            clockText.style.color = "#000000";
        } else {
            m_count.innerHTML = "00";
            document.querySelector('#start').disabled = "true";
            document.querySelector('#start').style.cursor = "not-allowed";
            document.querySelector('#pause').disabled = "true";
            document.querySelector('#pause').style.cursor = "not-allowed";
            document.querySelector('#setting').disabled = "";
            document.querySelector('#setting').style.cursor = "pointer";
            clockText.style.color = "#000000";
        }
        if (s_text.innerHTML != "00") {
            s_count.innerHTML = s_text;
            document.querySelector('#start').disabled = "";
            document.querySelector('#start').style.cursor = "pointer";
            document.querySelector('#pause').disabled = "true";
            document.querySelector('#pause').style.cursor = "not-allowed";
            document.querySelector('#reset').disabled = "true";
            document.querySelector('#reset').style.cursor = "not-allowed";
            document.querySelector('#setting').disabled = "";
            document.querySelector('#setting').style.cursor = "pointer";
            clockText.style.color = "#000000";
        } else {
            s_count.innerHTML = "00";
            document.querySelector('#start').disabled = "true";
            document.querySelector('#start').style.cursor = "not-allowed";
            document.querySelector('#pause').disabled = "true";
            document.querySelector('#pause').style.cursor = "not-allowed";
            document.querySelector('#setting').disabled = "";
            document.querySelector('#setting').style.cursor = "pointer";
            clockText.style.color = "#000000";
        }

    }
}
function setSkin(value) {
    switch (value) {
        case "dft":
            document.querySelector('body').style.background = "url('./img/bg1.jpg') no-repeat";
            document.querySelector('body').style.backgroundPosition = "center center";
            document.querySelector('body').style.backgroundSize = "100% 100%";
            break;
        case "white":
            document.querySelector('body').style.background = "#f2eada";
            document.querySelector('body').style.backgroundSize = "100% 100%";
            break;
        case "gray":
            document.querySelector('body').style.background = "#a1a3a6";
            document.querySelector('body').style.backgroundSize = "100% 100%";
            break;
    }
}