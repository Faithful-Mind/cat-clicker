var num1 = 0;
document.querySelector('.cat-1 span.number').textContent = num1;
document.querySelector('.cat-1 figcaption').textContent = 'Dragon Li';
document.querySelector('.cat-1 img.cat-pic').addEventListener('click', function() {
  num1++;
  document.querySelector('.cat-1 span.number').textContent = num1;
});

var num2 = 0;
document.querySelector('.cat-2 span.number').textContent = num2;
document.querySelector('.cat-2 figcaption').textContent = 'Calico cat';
document.querySelector('.cat-2 img.cat-pic').addEventListener('click', function() {
  num2++;
  document.querySelector('.cat-2 span.number').textContent = num2;
});
