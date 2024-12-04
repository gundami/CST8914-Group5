function handleFormSubmit(event) {
    event.preventDefault();

    const messageDiv = document.getElementById('formMessage');
    messageDiv.innerHTML = '';
    messageDiv.className = '';

    const businessName = document.getElementById('businessName').value.trim();
    const email = document.getElementById('email').value.trim();
    let errors = [];

    if (email === '') {
        errors.push('Email is required.');
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errors.push('Please enter a valid email address.');
        }
    }

    if (errors.length > 0) {
        const errorHtml = errors.map(error => `<p style="color: red;">${error}</p>`).join('');
        messageDiv.innerHTML = errorHtml;
        messageDiv.classList.add('error');
    } else {
        messageDiv.innerHTML = '<p style="color: green;">Thank you for scheduling a call. We will get back to you soon!</p>';
        messageDiv.classList.add('success');
        event.target.reset();
        document.getElementById('extraField').style.display = 'none';
        document.getElementById('receiveEmailCheckBoxImage').src = 'images/off.png';
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');

        const focusableElements = modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]');
        if (focusableElements.length) {
            focusableElements[0].focus();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
        modal.removeAttribute('role');

        const triggerButton = document.querySelector(`[data-modal-trigger="${modalId}"]`);
        if (triggerButton) {
            triggerButton.focus();
        }
    }
}

window.addEventListener('click', function (event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            closeModal(modals[i].id);
        }
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const modals = document.getElementsByClassName('modal');
        for (let i = 0; i < modals.length; i++) {
            if (modals[i].style.display === 'block') {
                closeModal(modals[i].id);
            }
        }
    }
});

document.getElementById('inviteCheckbox').addEventListener('change', function () {
    var additionalOption = document.getElementById('extraField');
    if (this.checked) {
        additionalOption.style.display = 'block';
    } else {
        additionalOption.style.display = 'none';
    }
});

function handleHashChange() {
    const hash = window.location.hash;
    if (!hash) {
        window.location.hash = '#home';
        return;
    }
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelectorAll('section').forEach(section => section.classList.remove('active'));

    const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
    const activeSection = document.querySelector(hash);
    if (activeLink && activeSection) {
        activeLink.classList.add('active');
        activeSection.classList.add('active');
    }

    let title;
    switch (hash) {
        case '#home':
            title = 'Empower Ability Labs - Home';
            break;
        case '#services':
            title = 'Empower Ability Labs - Services';
            break;
        case '#schedule':
            title = 'Empower Ability Labs - Schedule a Call';
            break;
        default:
            title = 'Empower Ability Labs';
    }
    document.title = title;

    if (activeSection) {
        const heading = activeSection.querySelector('h1');
        if (heading) {
            heading.focus();
        }
    }
}

window.addEventListener('hashchange', handleHashChange);
window.addEventListener('load', handleHashChange);

document.addEventListener('DOMContentLoaded', function () {
    const customCheckbox = document.getElementById('customCheckbox');
    const customCheckboxImage = document.querySelector('.custom-checkbox-image');
  
    function updateCheckboxImage() {
      const isChecked = customCheckbox.checked;
      customCheckboxImage.setAttribute('aria-checked', isChecked);
      customCheckbox.setAttribute('aria-checked', isChecked);
    }
  
    customCheckboxImage.addEventListener('click', () => {
      customCheckbox.checked = !customCheckbox.checked;
      customCheckbox.dispatchEvent(new Event('change'));
    });
  
    customCheckboxImage.addEventListener('keydown', (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        customCheckbox.checked = !customCheckbox.checked;
        customCheckbox.dispatchEvent(new Event('change'));
      }
    });
  
    customCheckbox.addEventListener('change', updateCheckboxImage);
  
    updateCheckboxImage();
  });
