// Empower Ability Labs交互组件的JavaScript

// 处理表单提交的函数
function handleFormSubmit(event) {
    event.preventDefault();
    alert('Thank you for scheduling a call. We will get back to you soon!');
}

// 打开模态框的函数
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');

        // 将焦点移动到模态框内的第一个可聚焦元素
        const focusableElements = modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]');
        if (focusableElements.length) {
            focusableElements[0].focus();
        }
    }
}

// 关闭模态框的函数
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
        modal.removeAttribute('role');

        // 将焦点返回到触发模态框的元素
        const triggerButton = document.querySelector(`[data-modal-trigger="${modalId}"]`);
        if (triggerButton) {
            triggerButton.focus();
        }
    }
}

// 点击模态框内容外部时关闭模态框
window.addEventListener('click', function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            closeModal(modals[i].id);
        }
    }
});

// 按下Escape键时关闭模态框
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.getElementsByClassName('modal');
        for (let i = 0; i < modals.length; i++) {
            if (modals[i].style.display === 'block') {
                closeModal(modals[i].id);
            }
        }
    }
});

document.getElementById('inviteCheckbox').addEventListener('change', function() {
    var additionalOption = document.getElementById('extraField');
    if (this.checked) {
      additionalOption.style.display = 'block';
    } else {
      additionalOption.style.display = 'none';
    }
});