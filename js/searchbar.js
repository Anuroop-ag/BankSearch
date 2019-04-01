const utils = {
  forEach(array, callback, scope) {
    for (let i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]);
    }
  },

  hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  },

  addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  },

  removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  },

  toggleClass(el, className) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      el.className = classes.join(' ');
    }
  }
}

const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const circlePath = document.querySelector('#circle-path');
const circleIcon = document.querySelector('#circle-icon');
const searchIcon = document.querySelector('#search-icon');

const enterKeyCode = 13;
const escKeyCode = 27;

let done;

const swapIconsTl = new TimelineMax({paused:true})

swapIconsTl
.fromTo(circleIcon, 0.2, {
  opacity: 0,
  scale: 0
}, {
  opacity: 1,
  scale: 1
})
.fromTo(searchIcon, 0.2, {
  opacity: 1,
  scale: 1
}, {
  opacity: 0,
  scale: 0
}, "-=0.2")

const circlePathTl = new TimelineMax({
  paused: true,
  repeat: -1,
  onStart: function() {
    done = false;
  },
  onRepeat: function() {
    if (done) {
      this.pause();
      swapIconsTl.reverse();
    }
  }
});

circlePathTl
.from(circlePath, 0.4, {
  drawSVG: "0% 0%",
  ease: Power1.easeOut
}, "-=0.1")
.to(circlePath, 0.4, {
  drawSVG: "100% 100%",
  ease: Power1.easeOut
})

const searchAnim = () => {
  swapIconsTl.restart();
  circlePathTl.restart();
}

const toggleSearchInput = () => {
  utils.toggleClass(searchInput, 'is-active')
  utils.hasClass(searchInput, 'is-active') ? searchInput.focus() : searchInput.blur();
}

const submitSearch = () => {
  searchAnim();

  // Simulate AJAX call..
  setTimeout(function() {
    done = true;
  }, 1000)
}

const search = {
  init() {
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      toggleSearchInput();
    });

    document.addEventListener('keydown', function(e) {
      if (utils.hasClass(searchInput, 'is-active')) {
        if (e.keyCode === enterKeyCode) {
          e.preventDefault();
          // Submit form
          submitSearch();
        } else if (e.keyCode === escKeyCode) {
          toggleSearchInput();
        }
      }
    });
  }
}

search.init();