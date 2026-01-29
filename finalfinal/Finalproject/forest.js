var endTime = +localStorage.getItem('endTime') || 0;
let b;
function setTimer() {
    document.getElementById('imageoftree').src = 'media/plant.png'
    setText('--:--');
    const input = document.getElementById('mins');
    const duration = parseFloat(input.value);
    const middle = parseFloat((duration * 60e3) / 2);
    if (isNaN(duration) || duration <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }
    endTime = Date.now() + duration * 60e3;
    localStorage.setItem('endTime', endTime);
    // let middleTime = (startTime + endTime) / 2;
    // localStorage.setItem('middleTime', middleTime);
    update(0);
    b = setInterval(update, 1000);
    document.getElementById('btnstop').style.visibility = 'visible';
    document.getElementById('ach').style.visibility = 'hidden';
}

function resetTimer() {
    endTime = 0;
    localStorage.removeItem('endTime');
}


function update(some) {
    // var middleTime = (duration)/2;
    var timeLeft = endTime - Date.now();
    if (timeLeft < 0) {
        setText('--:--');
        document.getElementById('imageoftree').src = 'media/tree.png';
        document.getElementById('ach').style.visibility = 'visible';
        document.getElementById('btnstop').style.visibility = 'hidden';

    } else if (some == 1) {
        var minutes = Math.floor(timeLeft / 60e3);
        var seconds = Math.floor(timeLeft / 1e3) % 60;
        setText(`${minutes}:${seconds.toString(10).padStart(2, '0')}`);
        timeLeft = 0;
    } else {
        var minutes = Math.floor(timeLeft / 60e3);
        var seconds = Math.floor(timeLeft / 1e3) % 60;
        setText(`${minutes}:${seconds.toString(10).padStart(2, '0')}`);

    }
}

function setText(text) {
    document.getElementById('timer').textContent = text;
}
function stoptime() {
    clearInterval(b);
    document.getElementById('imageoftree').src = 'media/deadtree.png'
}

function changetree() {
    document.getElementById('imageoftree').src = 'media/bush.png'
    update(0);
}



