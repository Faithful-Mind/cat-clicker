var model = {
  cats : [
    {
      name: 'Dragon Li',
      src: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426',
      clickCount: 0,
      visible: false,
    },
    {
      name: 'Calico cat',
      src: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
      clickCount: 0,
      visible: false,
    },
    {
      name: 'Two kittens',
      src: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454',
      clickCount: 0,
      visible: false,
    },
    {
      name: 'Happy orange tabby cat',
      src: 'https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640',
      clickCount: 0,
      visible: false,
    },
    {
      name: 'Midge cat and computer',
      src: 'https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480',
      clickCount: 0,
      visible: false,
    },
  ],

  init() {
    this.cats[0].visible = true; // show the first cat on initialization
  },

  getAllCats() {
    return this.cats.map(cat => new Proxy(cat, this._handler));
  },

  getVisibleCats() {
    return this.cats.filter(cat => cat.visible);
  },

  _handler: {
    get: function(obj, prop){
      return obj[prop];
    },
    set(obj, prop, value) {
      obj[prop] = value;
    },
  },
};

var navView = {
  init() {
    this._render();
  },
  
  _render() {
    octopus.getAllCats().forEach((cat, index) => {
      var anchor = document.createElement('a');
      anchor.id = 'cat-' + index;
      anchor.href = 'javascript: void(0);'
      anchor.textContent = cat.name;

      var listItem = document.createElement('li');
      listItem.appendChild(anchor);

      listItem.addEventListener('click', function() {
        octopus.switchCurrentCat(index); // closes on index
      });

      var navList = document.querySelector('nav ul.cats-list');
      navList.appendChild(listItem);
    });
  },

};

var detailsView = {

  init() {
    var detailBox = document.querySelector('section.cat-detail');
    this.currNameSpan = detailBox.querySelector('#cat-curr figcaption > span.click-count');
    this.currImg = detailBox.querySelector(`#cat-curr img.cat-pic`);
    this.clickCountSpan = detailBox.querySelector(`#cat-curr span.number`);

    this.render();

    document.querySelector(`section.cat-detail #cat-curr img.cat-pic`).addEventListener('click', this._countsClick);
  },


  render() {
    var currentCat = octopus.getCurrentCat();

    this.currNameSpan.textContent = currentCat.name;
    this.currImg.src = currentCat.src;
    this.clickCountSpan.textContent = currentCat.clickCount;
  },

  _countsClick() {
    octopus.getCurrentCat().clickCount++;
    document.querySelector(`#cat-curr span.number`).textContent = octopus.getCurrentCat().clickCount;
  },

};

var octopus = {

  init() {
    model.init();
    navView.init();
    detailsView.init();
  },

  getAllCats() {
    return model.getAllCats();
  },

  getCurrentCat() {
    var currentCatArray = model.getVisibleCats();
    return currentCatArray.length === 1 ? currentCatArray[0] : /* throw */ new Error('multiple or none visible cats!');
  },

  switchCurrentCat(index) {
    model.getAllCats().forEach(cat => {
      cat.visible = false;
    });
    model.getAllCats()[index].visible = true;
    detailsView.render();
  },

};


octopus.init();
