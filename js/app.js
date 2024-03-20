gsap.registerPlugin(ScrollTrigger, Draggable);

const mm = gsap.matchMedia();

/*  */
const isMobile = /iphone|ipod|ipad|android|blackberry|mini|windows\sce|palm/i.test(
  navigator.userAgent.toLowerCase(),
);

/*  */
const openModal = () => {
  Fancybox.show([{ src: '#modal_form', type: 'inline' }], {
    closeButton: false,
    autoFocus: false,
    dragToClose: false,
  });
};

/* ================= */
const btnStartJs = document.querySelectorAll('.btn_start_js ');

for (const item of btnStartJs) {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    openModal();
  });
}

/* ================= Курсор */
const cursor = document.getElementById('cursor');
const aura = document.getElementById('aura');

if (!isMobile) {
  let posEl = 0;

  // Перемещение курсора
  document.addEventListener('mousemove', (evt) => {
    const posX = evt.clientX;
    const posY = evt.clientY;

    cursor.style.top = posY + 'px';
    cursor.style.left = posX + 'px';

    posEl = posY;

    aura.animate(
      {
        top: posY + 'px',
        left: posX + 'px',
      },
      {
        duration: 500,
        fill: 'forwards',
      },
    );
  });

  // Наведение курсора
  document.addEventListener('mouseover', (evt) => {
    const target = evt.target;

    //
    cursor.classList.remove('hidden');
    aura.classList.remove('hidden');

    // Наведение на блок с классом "about_video"
    if (target.closest('.about_video')) {
      cursor.classList.add('video');
      aura.classList.add('hidden');
      return;
    }

    // Наведение на остальные блоки
    if (
      target.closest('a') ||
      target.closest('button:not(.btn_gray)') ||
      target.closest('.checkbox') ||
      target.closest('.check') ||
      target.closest('.label_radio') ||
      target.closest('.close_modal') ||
      target.closest('.map') ||
      target.closest('.header__menu_dots') ||
      target.closest('.react')
    ) {
      cursor.classList.add('active');
      aura.classList.add('active');
    }
  });

  // Уход курсора
  document.addEventListener('mouseout', (evt) => {
    const target = evt.target;

    //
    cursor.classList.add('hidden');
    aura.classList.add('hidden');

    // Уход с блока с классом "about_video"
    if (target.closest('.about_video')) {
      cursor.classList.remove('video');
      aura.classList.remove('hidden');
      return;
    }

    // Уход с остальных элементов
    if (
      target.closest('a') ||
      target.closest('button:not(.btn_gray)') ||
      target.closest('.checkbox') ||
      target.closest('.check') ||
      target.closest('.label_radio') ||
      target.closest('.close_modal') ||
      target.closest('.map') ||
      target.closest('.header__menu_dots') ||
      target.closest('.react')
    ) {
      cursor.classList.remove('active');
      aura.classList.remove('active');
    }
  });
}

/*  */

/* ================= Меню - Гамбургер */
/* const backDropMenu = document.querySelector('.backDropMenu');
const headerBx = document.querySelector('.header_bx');
const headerNav = headerBx.querySelector('.header__nav');
const hamburger = headerBx.querySelector('.hamburger');

//
let headerHeight = 0;

mm.add('(max-width: 576px)', () => {
  headerHeight = headerBx.offsetHeight;

  return () => {
    headerHeight = 0;
  };
});

//
const visibleMenu = () => {
  document.body.classList.toggle('open_menu');
  hamburger.classList.toggle('is-active');
  headerNav.classList.toggle('active');
  backDropMenu.classList.toggle('active');

  headerNav.style.height = '';

  // Добавление скролла в мобильное меню (если не помещается)
  const wh = window.outerHeight;
  const headerNavHeight = headerNav.scrollHeight;
  // console.log(wh);
  // console.log(headerNavHeight);

  if (wh < headerNavHeight + headerHeight) {
    headerNav.style.height = wh - 120 + 'px';
  } else {
    headerNav.style.height = headerNavHeight + 10 + 'px';
  }
};

if (hamburger) {
  hamburger.addEventListener('click', visibleMenu);
  backDropMenu.addEventListener('click', visibleMenu);
} */

/* ================= Перемещение кнопки "Начать проект" в моб. версии */
/* if (matchMedia('(max-width: 600px)').matches) {
  const headerInfo = document.querySelector('.header__info');
  const btnStart = document.querySelector('.btn_start_js');

  if (headerInfo && btnStart) {
    headerInfo.prepend(btnStart);
    btnStart.style.display = 'flex';
  }
} */

/* ========================== Открытие меню */
const headerMenuDots = document.querySelector('.header__menu_dots');

if (headerMenuDots) {
  const headerMenu = document.querySelector('.header__menu');
  const headerMenuItems = headerMenu.querySelectorAll('.menu-item');
  const headerMenuClose = headerMenu.querySelector('.header__menu_top_close');
  const backDropMenu = document.querySelector('.backDropMenu');

  //
  const resizeHeightMenu = () => {
    headerMenu.style.height = '';
    const wh = window.innerHeight - 32;
    const hh = headerMenu.offsetHeight;

    if (wh < hh) {
      headerMenu.style.height = wh - 32 + 'px';
    }
  };

  resizeHeightMenu();

  //
  const resetMenu = () => {
    for (const item of headerMenuItems) {
      item.classList.remove('open');
    }
  };

  //
  headerMenuDots.addEventListener('click', () => {
    document.body.classList.add('open_menu');
    backDropMenu.classList.add('active');
    headerMenu.classList.add('open');
    resizeHeightMenu();
  });

  headerMenuClose.addEventListener('click', () => {
    headerMenu.classList.remove('open');
    backDropMenu.classList.remove('active');
    document.body.classList.remove('open_menu');
    resetMenu();
  });

  //
  headerMenu.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.classList.contains('menu-item_not-click')) {
      evt.preventDefault();
      const parent = target.closest('.menu-item');

      parent.classList.toggle('open');
      resizeHeightMenu();
    }
  });
}

/*  */
//
if (ScrollTrigger.isTouch === 0 && matchMedia('(min-width: 1299px)').matches) {
  ScrollTrigger.defaults({
    // markers: true,
  });

  /* ================= Блок "services_bx" */
  const services = document.querySelector('.services_bx');

  if (services) {
    const tlServices = gsap.timeline({
      scrollTrigger: {
        trigger: '.services_bx',
        start: 'top bottom',
        end: 'center-=163 center',
        scrub: 1,
      },
      defaults: {
        duration: 3,
      },
    });

    tlServices.to('.service__item_1', {
      y: 0,
      opacity: 1,
    });

    tlServices.to(
      '.service__item_2',
      {
        y: 0,
        opacity: 1,
      },
      '-=3',
    );

    tlServices.to(
      '.service__item_3',
      {
        y: 0,
        opacity: 1,
      },
      '-=3',
    );

    tlServices.to(
      ['.title_h4_animate', '.description_animate', '.services__cards__vars_animate'],
      {
        opacity: 1,
      },
      '-=3',
    );

    tlServices.to(
      '.services__h2',
      {
        opacity: 1,
      },
      '-=1',
    );
  }

  /* ================= Блок "works_bx" */
  /* const worksBx = document.querySelector('.works_bx');

  if (worksBx) {
    const tlWorks = gsap.timeline({
      scrollTrigger: {
        id: 'Работы',
        trigger: '.works_bx',
        start: 'top top+=150',
        end: 'top top',
        scrub: 1,
      },
    });

    tlWorks.from('.works__h2', {
      duration: 0.3,
      y: 0,
    });

    tlWorks.from('.works__items', {
      duration: 3,
      y: 0,
    });
  } */
}

/* ================= Блок "sphere_bx" */
let idx = 10;
const btnDie = gsap.utils.toArray('.btn_die');

if (btnDie) {
  btnDie.forEach((btn) => {
    Draggable.create(btn, {
      cursor: 'none',
      activeCursor: 'none',
      bounds: '.sphere__items',
      edgeResistance: 0.9,
      inertia: true,
      onDragStart(evt) {
        evt.target.style.zIndex = idx++;
      },
      onDrag(evt) {
        cursor.style.top = evt.pageY + 'px';
        cursor.style.left = evt.pageX + 'px';
      },
    });
  });
}

/* ================= Блок "Рассчитаем стоимость" */
const calculationForm = document.querySelector('.calculation__form');
if (calculationForm) {
  const blueBtnTitle = calculationForm.querySelector('.blue_btn__title');
  const calculationVariantsWrap = calculationForm.querySelectorAll('.calculation__variants_wrap');
  let isSelect = false;
  let isCalcSelect = false;
  let dataForm = null;

  //
  const isSelectFoo = () => {
    if (isCalcSelect !== isSelect) {
      isCalcSelect = isSelect;
    } else {
      return;
    }

    if (isSelect) {
      gsap.to(blueBtnTitle, {
        keyframes: [
          { duration: 0.3, x: -100, opacity: 0 },
          { duration: 0.3, textContent: 'Рассчитать стоимость', x: 0, opacity: 1 },
        ],
      });
    } else {
      gsap.to(blueBtnTitle, {
        keyframes: [
          { duration: 0.3, x: -100, opacity: 0 },
          { duration: 0.3, textContent: 'Нужна консультация', x: 0, opacity: 1 },
        ],
      });
    }
  };

  //
  if (calculationForm) {
    // Проверка отмеченных пунктов
    const checkFooCalc = () => {
      for (let elem of calculationForm.elements) {
        if (elem.tagName === 'INPUT') {
          if (elem.checked) {
            isSelect = true;
            break;
          } else {
            isSelect = false;
          }
        }
      }
    };

    //
    calculationForm.addEventListener('change', (evt) => {
      const target = evt.target;

      // Проверка отмеченных пунктов
      checkFooCalc();

      // Открытие / закрытие подпунктов
      if (target.matches('.checkbox__inp')) {
        const el = target
          .closest('.calculation__field')
          .querySelector('.calculation__variants_wrap');

        // сброс подвариантов
        const resetVariants = () => {
          el.querySelectorAll('.check__inp').forEach((el) => (el.checked = false));
          checkFooCalc();
        };

        // Переключение чекбокса
        if (target.checked) {
          gsap.to(el, {
            duration: 0.6,
            height: 'auto',
          });
        } else {
          gsap.to(el, {
            duration: 0.6,
            height: 0,
          });

          resetVariants();
        }
      }

      //
      isSelectFoo();
    });

    //
    calculationForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      dataForm = new FormData(calculationForm);

      /* Модальное окно */
      openModal();
    });

    // Отмечаем варианты
    calculationForm.addEventListener('click', (evt) => {
      const target = evt.target;
      const calcVarItem = target.closest('.calculation__variants__item');

      if (calcVarItem) {
        calcVarItem.querySelector('.check__inp').checked =
          !calcVarItem.querySelector('.check__inp').checked;
      }
    });
  }
}

/* ================= Валидация форм */
const validateForm = (form) => {
  const validator = new JustValidate(form, {
    lockForm: true,
  });

  validator
    .addField('.inp_field__forename', [
      {
        rule: 'required',
      },
    ])
    .addField('.inp_field__email', [
      {
        rule: 'required',
      },
      {
        rule: 'email',
      },
    ])
    .addField('.inp_field__tel', [
      {
        rule: 'required',
      },
    ])
    .addRequiredGroup('#modal_radio_group')
    .onSuccess(async (event) => {
      const data = new FormData(event.target);

      if (dataForm) {
        dataForm.forEach((value, key) => {
          data.append(key, value);
        });
      }

      await new Promise((res) => setTimeout(() => res(''), 3000));

      // Сброс данных формы
      calculationForm.reset();
      event.target.reset();

      isSelect = false;
      dataForm = null;

      calculationVariantsWrap.forEach((el) => (el.style.height = 0));

      isSelectFoo();

      // Закрытие модального окна
      Fancybox.close();

      // Для просмотра данных
      const obj = {};

      data.forEach((value, key) => {
        obj[key] = value;
      });

      console.log(obj);
    });
};

/* ================= Формы */
const forms = document.querySelectorAll('.contact_form');

forms.forEach(validateForm);

/* ================= Карта */
ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map('map', {
    center: [44.99993657458068, 41.9158945],
    zoom: 17,
    controls: [],
  });

  var myPlacemark = new ymaps.Placemark(
    myMap.getCenter(),
    {},
    {
      preset: 'islands#blueIcon',
    },
  );

  myMap.geoObjects.add(myPlacemark);
}

/* ================= Перемещение блока */
const dataCompany = document.querySelector('.data_company');
const dataCompanyLeft = dataCompany.querySelector('.data_company__left');
const mapWrap = dataCompanyLeft.querySelector('.map_wrap');
const dataCompanyForm = dataCompany.querySelector('.data_company__form');

if (dataCompany && matchMedia('(max-width: 1365px)').matches) {
  mapWrap.after(dataCompanyForm);
}

// ================= Настройки Fancybox
// console.log(Fancybox.defaults);

Fancybox.defaults.trapFocus = false;
Fancybox.defaults.l10n.CLOSE = 'Закрыть';

// ================= Слайдер услуг на главной
const swiperServicesBx = document.querySelector('.swiper_services');

if (swiperServicesBx) {
  const swiperServices = new Swiper(swiperServicesBx, {
    init: false,
    slidesPerView: 'auto',
    freeMode: true,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
      hide: false,
    },
    breakpoints: {
      320: {
        spaceBetween: 10,
      },
      577: {
        spaceBetween: 20,
      },
      769: {
        spaceBetween: 40,
      },
    },
  });

  mm.add({ is1365: '(max-width: 1365px)' }, (context) => {
    const { is1365 } = context.conditions;

    if (is1365) {
      swiperServices.init();
      swiperServicesBx.classList.add('scrollbar');
    }

    return () => {};
  });
}

// ================= Слайдер "Наши работы" на главной
const swiperWorksBx = document.querySelector('.swiper__works');

if (swiperWorksBx) {
  const swiperWorks = new Swiper(swiperWorksBx, {
    init: false,
    slidesPerView: 'auto',
    freeMode: true,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
      hide: false,
    },
    breakpoints: {
      320: {
        spaceBetween: 10,
      },
      577: {
        spaceBetween: 40,
      },
    },
  });

  mm.add('(max-width: 1199px)', () => {
    swiperWorks.init();
    swiperWorksBx.classList.add('scrollbar');

    return () => {};
  });
}

// ================= Слайдер Блога / Статей
const swiperArticlesBx = document.querySelector('.swiper_articles');

if (swiperArticlesBx) {
  const swiperArticles = new Swiper(swiperArticlesBx, {
    init: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
    freeMode: true,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
      hide: false,
    },
    breakpoints: {
      320: {
        spaceBetween: 10,
      },
      577: {
        spaceBetween: 20,
      },
    },
  });

  mm.add('(max-width: 1365px)', () => {
    swiperArticles.init();
    swiperArticlesBx.classList.add('scrollbar');

    return () => {};
  });
}

// ================= Видео на странице "Команда"
Fancybox.bind('[data-fancybox="team"]', {
  on: {
    close() {
      cursor.classList.remove('active');
      aura.classList.remove('active');
    },
  },
});

// ================= Слайдер "Люди - наша гордость" на странице "Команда"
const swiperPeopleBx = document.querySelector('.swiper_people');

if (swiperPeopleBx) {
  const peopleSwiper = new Swiper(swiperPeopleBx, {
    init: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
    freeMode: true,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
      hide: false,
    },
  });

  mm.add('(max-width: 767px)', () => {
    peopleSwiper.init();
    swiperPeopleBx.classList.add('scrollbar');

    return () => {};
  });
}

// ======================= Форма "Обсудить идею или проект"
const discussForm = document.querySelector('.discuss_form');

if (discussForm) {
  const discussFileBtn = discussForm.querySelector('.discuss__file_btn');
  const discussFileInput = discussForm.querySelector('[name="discuss_file"]');

  discussFileBtn.addEventListener('click', () => {
    discussFileInput.click();
  });

  // Валидация и отправка
  const validator = new JustValidate(discussForm, {
    lockForm: true,
  });

  validator
    .addField('[name="discuss_name"]', [{ rule: 'required' }])
    .addField('[name="discuss_tel"]', [{ rule: 'required' }])
    .onSuccess(async (event) => {
      const data = new FormData(event.target);
      console.log('Отправлено');
    });
}

// ======================= Скелетон
const skeletonJs = document.querySelector('.skeleton_js');

if (skeletonJs) {
  const skeletonsBx = skeletonJs.querySelectorAll('.skeleton');

  // Скрытие skeleton
  setTimeout(() => {
    skeletonsBx.forEach((item) => item.classList.remove('skeleton'));
    worksTabs.classList.remove('stop_pointer');
    skeletonJs.classList.remove('stop_pointer');
  }, 2000);
}

// ======================= Работы
// Клик по кнопкам фильтра
const worksTabs = document.querySelector('.works_tabs');

if (worksTabs) {
  worksTabs.addEventListener('click', ({ target }) => {
    const worksTabsBtn = target.closest('.works_tabs__btn');

    if (worksTabsBtn) {
      worksTabs.querySelector('.works_tabs__btn.active').classList.remove('active');
      worksTabsBtn.classList.add('active');
    }
  });
}

// Фильтрация работ
const filterJs = document.querySelector('.filter_js');

if (filterJs) {
  // const works = filterJs.querySelector('.works');
  // mixitup(works);
  mixitup(filterJs);
}

// Открытие модального окна с полной статьёй на странице "Портфолио"
const worksModalJs = document.querySelector('.works_modal_js');

if (worksModalJs) {
  worksModalJs.addEventListener('click', (evt) => {
    const target = evt.target;

    const worksImg = target.closest('.works__img');
    const worksTitle = target.closest('.works__title');

    if (worksImg || worksTitle) {
      evt.preventDefault();

      Fancybox.show([{ src: '#work_full_article', type: 'inline' }], {
        closeButton: false,
        autoFocus: false,
        dragToClose: false,
      });
    }
  });
}

// Сердечко на странице "Портфолио" в полном описании работы в модальном окне
const workFullArticle = document.querySelector('.work_full_article');

if (workFullArticle) {
  const workFullArticleHart = workFullArticle.querySelector('.work_full_article__hart');

  workFullArticleHart.addEventListener('click', () => {
    workFullArticleHart.classList.toggle('active');
  });
}

// ======================= Страница полной статьи
const articleFullBx = document.querySelector('.article_full_bx');

if (articleFullBx) {
  const rticleFullUsefulBtn = articleFullBx.querySelector('.rticle_full_useful__btn');

  rticleFullUsefulBtn.addEventListener('click', () => {
    rticleFullUsefulBtn.classList.toggle('active');
  });

  // Форма "Еженедельный дайджест"
  const validator = new JustValidate('#digest__form', {
    lockForm: true,
  });

  validator
    .addField('[name="digest_email"]', [{ rule: 'required' }, { rule: 'email' }])
    .onSuccess(async (event) => {
      const data = new FormData(event.target);
      console.log('Отправлено');
    });

  // Слайдер
  const swiperArticleFull = articleFullBx.querySelector('.swiper_article_full');

  if (swiperArticleFull) {
    new Swiper('.swiper_article_full', {
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        hide: false,
      },
      breakpoints: {
        320: {
          spaceBetween: 30,
        },
        577: {
          spaceBetween: 30,
        },
        769: {
          spaceBetween: 20,
        },
      },
    });
  }
}
