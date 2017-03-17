jQuery(document).ready(function () {
	jQuery(document).scroll(function () {
		contents = jQuery("body").scrollTop();
		elements = jQuery(".ek").offset().top;
		if (contents > elements) {
			jQuery('.ek').fadeIn('slow');
			jQuery('.ek').css('opacity', '.1');
		} else {
			jQuery('.ek').css('opacity', '1');
		}
	});
});


$(document).ready(function () {
	// SCROLL MENU
	function fixedNav() {
		var scrollToTop = $(window).scrollTop();
		var headerNav = $('.top-menu');
		if (scrollToTop > 1) {
			headerNav.addClass('top-menu_black');
		} else {
			headerNav.removeClass('top-menu_black');
		}
	}
	$(window).on('scroll resize load', function () {
		fixedNav();
	});
	fixedNav();

	//Адаптиввное меню
	$(".mobile-button").click(function () {
		$(".mobile-button").toggleClass("on");
		$(".mobile-menu").toggleClass('open');
		$('body').toggleClass('body_fixed');
	});
	if ($('#search').length) {
		$('.top-menu').addClass('top-menu_blackall');
	}


	$(".search-slider").slider({
		min: 0,
		max: 1000,
		values: [0, 1000],
		range: true,
		stop: function (event, ui) {
			$("input.price_from").val($(".search-slider").slider("values", 0));
			$("input.price_to").val($(".search-slider").slider("values", 1));
			input_width_to();
			input_width_from();
		},
		slide: function (event, ui) {
			$("input.price_from").val($(".search-slider").slider("values", 0));
			input_width_to();
			input_width_from();
			$("input.price_to").val($(".search-slider").slider("values", 1));
		}

	});
	$("input.price_from").change(function () {
		var value1 = $("input.price_from").val();
		var value2 = $("input.price_to").val();
		input_width_from();
		if (parseInt(value1) >= parseInt(value2)) {
			value1 = parseInt(value2) - 1;
			$("input.price_from").val(value1);
		}
		$(".search-slider").slider("values", 0, value1);
	});
	$("input.price_to").change(function () {
		var value1 = $("input.price_from").val();
		var value2 = $("input.price_to").val();
		input_width_to();
		if (value2 > 1000) {
			value2 = 1000;
			$("input.price_to").val(1000)
		}

		if (parseInt(value1) >= parseInt(value2)) {
			value2 = parseInt(value1) + 1;
			$("input.price_to").val(value2);
		}
		$(".search-slider").slider("values", 1, value2);
	});
	$('input.price_to,input.price_from').keypress(function (event) {
		var key, keyChar;
		if (!event) var event = window.event;

		if (event.keyCode) key = event.keyCode;
		else if (event.which) key = event.which;

		if (key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39) return true;
		keyChar = String.fromCharCode(key);

		if (!/\d/.test(keyChar)) return false;

	});
	//Чекбоксы
	$('.checkbox-item__input').change(function () {
		if ($(this).prop('checked')) {
			$(this).parent().addClass('checkbox-item__label_checked');
		} else {
			$(this).parent().removeClass('checkbox-item__label_checked');
		}
	});
	$('.checkbox-item__input_radio').change(function () {
		if ($(this).prop('checked')) {
			$('.checkbox-item__label_radio').removeClass('checkbox-item__label_checked');
			$(this).parent().addClass('checkbox-item__label_checked');
		}
	});


	//Select
	$('.topline-select__select').each(function () {
		var $this = $(this)
		var numberOfOptions = $(this).children('option').length;
		$this.wrap('<div class="topline-select__item"></div>');
		$this.after('<div class="topline-select__currect"></div>');
		var $styledSelect = $this.next('div.topline-select__currect');
		$styledSelect.text($this.children('option').eq(0).text());
		var $list = $('<ul />', {
			'class': 'topline-select__list'
		}).insertAfter($styledSelect);
		for (var i = 0; i < numberOfOptions; i++) {
			$('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}
		var $listItems = $list.children('li');
		$styledSelect.click(function (e) {
			e.stopPropagation();
			$('.topline-select__currect.active').not(this).each(function () {
				$(this).removeClass('active').next('ul.topline-select__list').hide();
			});
			$(this).toggleClass('active').next('ul.topline-select__list').toggle();
		});
		$listItems.click(function (e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass('active');
			$this.val($(this).attr('rel'));
			$list.hide();
			console.log($this.val());
		});
		$(document).click(function () {
			$styledSelect.removeClass('active');
			$list.hide();
		});
	});

	//Мобильный фильтр

	$('.button_filter').click(function () {
		$('.mobile-filter').slideDown();
		$('body').addClass('body_fixed');
	});
	$('.mobile-filter__close').click(function () {
		$('.mobile-filter').slideUp();
		$('body').removeClass('body_fixed');
	});
	//Изменение размеров интупа
	function input_width_from() {
		var elem = $("input.price_from").val().length;
		if ($(document).width() <= 768) {
			if (elem == 1) {
				$("input.price_from").css('width', '10px');
			} else if (elem == 2) {
				$("input.price_from").css('width', '20px');
			} else if (elem == 3) {
				$("input.price_from").css('width', '30px');
			} else if (elem == 4) {
				$("input.price_from").css('width', '40px');
			}
		} else {
			$("input.price_from").css('width', '108px');
		}
	}

	function input_width_to() {
		var elem = $("input.price_to").val().length;
		if ($(document).width() <= 768) {
			if (elem == 1) {
				$("input.price_to").css('width', '10px');
			} else if (elem == 2) {
				$("input.price_to").css('width', '20px');
			} else if (elem == 3) {
				$("input.price_to").css('width', '30px');
			} else if (elem == 4) {
				$("input.price_to").css('width', '40px');
			}
		} else {
			$("input.price_to").css('width', '108px');
		}
	}
	$("input.price_from").keyup(function () {
		input_width_from();
	});
	$("input.price_to").keyup(function () {
		input_width_to();
	});
	//Смена placeholder
	function replace_placeholder() {
		if ($(document).width() < 768) {
			$('.mobile-search__input_date').attr('placeholder', 'Select date');
		} else {
			$('.mobile-search__input_date').attr('placeholder', 'Select date or period');
		}
	}

	//Отчистка фильтров
	$('.mobile-filter__clear').click(function () {
		$("input.price_from").val('0');
		$("input.price_to").val('1000');
		input_width_to();
		input_width_from();
		$(".search-slider").slider("values", 1, 1000);
		$(".search-slider").slider("values", 0, 0);
		$('.checkbox-item__input').prop('checked', false);
		$('.checkbox-item__label').removeClass('checkbox-item__label_checked');
		$('.checkbox-item__input_radio').prop('checked', false);
		$('.checkbox-item__label_radio').removeClass('checkbox-item__label_checked');
	});


	//Перемещение слайдера
	function slider_pos() {
		if ($(document).width() <= 1023) {
			$('.slider-wrap').appendTo('.slider-mobile');
		} else {
			$('.slider-wrap').appendTo('.slider-comp');
		}
	}
	slider_pos();
	replace_placeholder();
	input_width_from();
	input_width_to();
	$(window).resize(function () {
		slider_pos();
		replace_placeholder();
		input_width_from();
		input_width_to();
		console.log($(document).width());
	});

});