var cats = [
  {
    name: 'Dragon Li',
    src: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'
  },
  {
    name: 'Calico cat',
    src: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'
  },
  {
    name: 'Two kittens',
    src: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'
  }
];

// cats navbar
cats.forEach((cat, index) => {
  var navList = document.querySelector('nav ul.cats-list');
  navList.insertAdjacentHTML('beforeend',
    `<li><a href='#cat-${index}'>${cat.name}</a></li>`)
});

// the cat details section
cats.forEach((cat, index) => {
  var detailBox = document.querySelector('section.cat-detail');
  detailBox.insertAdjacentHTML('beforeend',
    `<div id="cat-${index}" class="catbox">
    <figure>
      <figcaption><span>${cat.name}</span></figcaption>
      <div class='img'><img class="cat-pic" src="${cat.src}" alt="cat pic 2" /></div>
    </figure>
    <p>You have clicked <span class="number"></span> times</p>
  </div>`);
  var clickCount = 0;
  detailBox.querySelector(`#cat-${index} img.cat-pic`).addEventListener('click', function() {
    clickCount++;
    document.querySelector(`#cat-${index} span.number`).textContent = clickCount;
  });
});
