document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      status.textContent = 'Citation copied to your clipboard.';
    } catch {
      status.textContent = 'Copy unavailable. Select the citation text above.';
    }
  });
});
