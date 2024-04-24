let notifications = document.querySelector('.notifications');

function createToast(type, icon, title, text, timeout = 5000) {
    let newToast = document.createElement('div');
    newToast.innerHTML = `
        <div class="toast ${type}">
            <i class="${icon}"></i>
            <div class="content">
                <div class="title">${title}</div>
                <span>${text}</span>
            </div>
            <i class="fa-solid fa-xmark"></i>
        </div>`;

    if (notifications) {
        notifications.appendChild(newToast);
        newToast.timeOut = setTimeout(() => newToast.remove(), timeout);
        newToast.querySelector('.fa-xmark').addEventListener('click', function() {
            newToast.remove();
        });
    } else {
        console.error("Notifications container not found!");
    }
}

function showToast(type, title, text) {
    let icon;
    switch (type) {
        case 'success':
            icon = 'fa-solid fa-circle-check';
            break;
        case 'error':
            icon = 'fa-solid fa-circle-exclamation';
            break;
        case 'warning':
            icon = 'fa-solid fa-triangle-exclamation';
            break;
        case 'info':
            icon = 'fa-solid fa-circle-info';
            break;
        default:
            icon = 'fa-solid fa-info-circle';
    }
    createToast(type, icon, title, text);
}

let success = document.getElementById('success');
if (success) {
    success.onclick = function() {
        showToast('success', 'Success', 'This is a success toast.');
    }
}

let error = document.getElementById('error');
if (error) {
    error.onclick = function() {
        showToast('error', 'Error', 'This is an error toast.');
    }
}

let warning = document.getElementById('warning');
if (warning) {
    warning.onclick = function() {
        showToast('warning', 'Warning', 'This is a warning toast.');
    }
}

let info = document.getElementById('info');
if (info) {
    info.onclick = function() {
        showToast('info', 'Info', 'This is an info toast.');
    }
}
