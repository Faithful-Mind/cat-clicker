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
    }
  ],

  init() {
    this.cats[0].visible = true; // show the first cat on initialization
  },

  getAllCats() {
    return this.cats;
  },

  getVisibleCats() {
    return this.cats.filter(cat => cat.visible);
  }
};

var view = {

  init(octo) {
    this.octo = octo;
    this.renderNavbar();
    view.renderDetails(true); // for not triggering clearing on initialization
  },

  renderNavbar() {
    this.octo.getAllCats().forEach((cat, index) => {
      var navList = document.querySelector('nav ul.cats-list');
      navList.insertAdjacentHTML('beforeend',
        `<li><a id='cat-${index}' href="javascript: void(0);">${cat.name}</a></li>`);
      document.querySelector(`#cat-${index}`).addEventListener('click',
        function() { this.octo.switchCurrentCat(index); }.bind(this) // closes on index
      );
    });
  },

  renderDetails(init = false) {
    var detailBox = document.querySelector('section.cat-detail');
    var currentCat = this.octo.getCurrentCat();

    // not triggering on initialization (passed a true value)
    if (!init) {
      // clear current cat's details
      detailBox.removeChild(detailBox.querySelector('#cat-curr'));
    }
    
    if (currentCat) {
      detailBox.insertAdjacentHTML('beforeend',
        `<div id="cat-curr" class="catbox">
        <figure>
          <figcaption><span>${currentCat.name}</span></figcaption>
          <div class='img'><img class="cat-pic" src="${currentCat.src}" alt="cat pic 2" /></div>
        </figure>
        <p>You have clicked <span class="number">${currentCat.clickCount}</span> times</p>
      </div>`);

      detailBox.querySelector(`#cat-curr img.cat-pic`).addEventListener('click', this._countClick.bind(this));
    }
  },

  _countClick() {
    this.octo.getCurrentCat().clickCount++;
    document.querySelector(`#cat-curr span.number`).textContent = this.octo.getCurrentCat().clickCount;
  }

};

var octopus = {

  init() {
    model.init();
    view.init(this);
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
    view.renderDetails();
  }

};


octopus.init();
