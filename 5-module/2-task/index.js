function toggleText() {
  const button = document.querySelector('button.toggle-text-button');
  const getText = document.querySelector('div#text');
  button.addEventListener("click", event => {
      if (getText.hasAttribute('hidden'))
        getText.removeAttribute('hidden'); 
      else if (!getText.hasAttribute('hidden')) 
        getText.setAttribute('hidden', true); 
  }, false);
}
