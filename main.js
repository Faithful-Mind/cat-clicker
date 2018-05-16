var i = 0;
document.querySelector('span.number').textContent = i

document.querySelector('img.cat-pic').addEventListener('click', function() {
  i++;
  document.querySelector('span.number').textContent = i;
})