'use strict';

//  送信ボタンが押されたときの処理
const formElement = document.forms['message-form'];
if (formElement) {
  const textareaElement = formElement.elements['content'];

  formElement.addEventListener('submit', (event) => {
    // 通常の送信を一度止める
    event.preventDefault();

    const comment = textareaElement.value.trim();
    if (!comment) return;

    const selectedStampInput = formElement.querySelector('input[name="stamp"]:checked');
    const stampClass = selectedStampInput ? selectedStampInput.value : 'bi-chat-left-text';
    textareaElement.value = `${stampClass} ${comment}`;
    formElement.submit();
  });

  textareaElement.addEventListener('keydown', (event) => {
    if (isPressedSubmitKey(event)) {
      event.preventDefault();
      formElement.dispatchEvent(new Event('submit'));
    }
  });
}

function isPressedSubmitKey(event) {
  if (event.key !== 'Enter') {
    return false;
  }
  if (event.ctrlKey) {
    return true;
  }
  if (event.metaKey) {
    return true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const cardTexts = document.querySelectorAll('p.card-text.lead');
  
  cardTexts.forEach(p => {
    const originalText = p.textContent.trim();
    const firstSpaceIndex = originalText.indexOf(' ');
    
    if (firstSpaceIndex !== -1) {
      const stampClass = originalText.substring(0, firstSpaceIndex);
      const comment = originalText.substring(firstSpaceIndex + 1);
      
      if (stampClass.startsWith('bi-')) {
        p.innerHTML = `
          <div class="d-flex align-items-center">
            <i class="bi ${stampClass} fs-1 me-3" style="line-height: 1; color: var(--md-aqua);"></i>
            <span style="flex-grow: 1;">${escapeHTML(comment)}</span>
          </div>
        `;
        return;
      }
    }
    p.textContent = originalText;
  });
});

// ページ読み込み時に一番下を表示
window.addEventListener('load', () => {
  window.scrollTo(0, document.body.scrollHeight);
});
setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 100);

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

const tooltipTriggerElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltipTriggerElements.forEach((tooltipTriggerElement) => {
  new bootstrap.Tooltip(tooltipTriggerElement);
});