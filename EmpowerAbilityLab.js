// Empower Ability Labs交互组件的JavaScript

// 处理表单提交的函数
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
        // 简单的邮箱格式验证
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errors.push('Please enter a valid email address.');
        }
    }

    if (errors.length > 0) {
        // 显示错误消息
        const errorHtml = errors.map(error => `<p style="color: red;">${error}</p>`).join('');
        messageDiv.innerHTML = errorHtml;
        messageDiv.classList.add('error');
    } else {
        // 显示感谢消息
        messageDiv.innerHTML = '<p style="color: green;">Thank you for scheduling a call. We will get back to you soon!</p>';
        messageDiv.classList.add('success');
        // 重置表单
        event.target.reset();
        document.getElementById('extraField').style.display = 'none';
        document.getElementById('receiveEmailCheckBoxImage').src = 'images/off.png';
    }
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

function handleHashChange() {
    const hash = window.location.hash;
    if (!hash) {
        window.location.hash = '#home';
        return;
    }
    // 移除所有 active 类
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelectorAll('section').forEach(section => section.classList.remove('active'));

    // 根据 hash 值激活对应的链接和内容
    const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
    const activeSection = document.querySelector(hash);
    if (activeLink && activeSection) {
      activeLink.classList.add('active');
      activeSection.classList.add('active');
    }

    // 动态设置页面标题
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

    // 将焦点设置到标题
    if (activeSection) {
      const heading = activeSection.querySelector('h1');
      if (heading) {
        heading.focus();
      }
    }
  }

  window.addEventListener('hashchange', handleHashChange);
  window.addEventListener('load', handleHashChange);

  const customCheckbox = document.getElementById('receiveEmailCheckBox');
  const customCheckboxImage = document.getElementById('receiveEmailCheckBoxImage');

  // 更新图片和alt属性
  function updateCheckboxImage() {
    if (customCheckbox.checked) {
      customCheckboxImage.src = 'images/on.png';
      customCheckboxImage.alt = 'Toggled on';
    } else {
      customCheckboxImage.src = 'images/off.png';
      customCheckboxImage.alt = 'Toggle off';
    }
  }

  // 初始化状态
  updateCheckboxImage();

  // 点击图片切换复选框状态
  customCheckboxImage.addEventListener('click', () => {
    customCheckbox.checked = !customCheckbox.checked;
    customCheckbox.dispatchEvent(new Event('change'));
  });

  // 监听复选框状态变化
  customCheckbox.addEventListener('change', updateCheckboxImage);

  // 键盘操作支持
  customCheckbox.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      customCheckbox.checked = !customCheckbox.checked;
      customCheckbox.dispatchEvent(new Event('change'));
    }
  });

