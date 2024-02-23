const customSelect = document.querySelector('[data-custom-select]');
const selectBtn = document.querySelector('[data-select-btn]');
const selectedValue = document.querySelector('[data-selected-value]');
const options = document.querySelectorAll('[data-option]');

selectBtn.addEventListener('click', (() => {
    customSelect.classList.toggle('active');
}))

options.forEach(item => {
    item.addEventListener('click', ((e) => {
        selectedValue.textContent = e.target.textContent;
        selectedValue.value = e.target.textContent;
        customSelect.classList.remove('active');
        filterRegion(selectedValue.value)

    }));
})