const body = document.querySelector('body');
document.querySelector('.theme-toggle-btn').addEventListener('click', (() => {
    body.classList.toggle('dark');
}))

