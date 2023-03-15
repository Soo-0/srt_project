$(function(){
	headEvt.init();
	// popEvt();
	formEvt.init();//input
	tabEvt();//tab 
	accoEvt()//아코디언
	popMotion.init(); // 팝업
	swiperArea();//swiper
});

/* 에이전트 구분 */
// userAgent : () => {
// 	console.log('dododo')
// 	let userAgent=navigator.userAgent.toLowerCase(); / 플러그인 필요
// 	let os = 'os_' + ua_result.os.name;
// 	let platform = ua_result.platform;
// 	//웨일브라우저에 따른 변경
// 	let browser = (userAgent.indexOf('whale')>-1)?'whale':ua_result.browser.name;
// 	let version = 'ver_' + ua_result.browser.version.major;
// 	//아이패드 13이후 맥과 같이 나옴에 따른 변경
// 	if(userAgent.indexOf('ipad') > -1 || userAgent.indexOf('macintosh') > -1 && 'ontouchend' in document){
// 		platform = 'ipad'
// 	}
// 	document.querySelector('body').classList.add(os);
// 	document.querySelector('body').classList.add(platform);
// 	document.querySelector('body').classList.add(browser);
// 	document.querySelector('body').classList.add(version);
	
// }

/* 모바일 에이전트 구분 */
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i) == null ? false : true;
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
	},
	IOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() || isMobile.Opera() || isMobile.Windows());
	}
}

const headEvt = {
    init : () => {
		$(window).on('load', function(){
			let winW = $(window).width(),
				winH = $(window).height();

			let $container = $('#container'),
				$contents = $('#contents'),
				$cntH = $contents.outerHeight(true),
				$containerH = $container.outerHeight(true),
				$headerH = $('#header').outerHeight(true);
				// $winContH = winH-$headerH;

			if($('.btm_fixed').length > 0){
				let btnH = $('.btm_fixed').outerHeight(true);
				$container.css('padding-bottom',btnH + 16);
			}

			// 컨텐츠 높이가 적어서 contents가 줄어들 때
			// if($('#header, #footer .inner').is(':visible') == false || $('#footer .inner').is(':visible') == false){	//header footer 없을 때
			// 					if(winH > $containerH){
			// 						$('.bg_gray.last').css('padding-bottom',0);
			// 					}
			// 					winShortPage.fixedBtn();
			
			// 					var division = $('.division_wrap:not(.wh)'),
			// 					diviGray = division.find('.ly_box.gray');
			
			// 					if(diviGray.length > 0){
			// 						$('#wrap').css({'background':'#f3f4f8'});
			// 					}
			// 				}else{
			// 					winShortPage.fixedBtnType2();
			// 				}
		})
		

		
    }

}

// var winShortPage = {
// 	fixedBtn : function(){ //fixed버튼 있을 때, container padding-bottom조절 (header footer 없을 때)
// 		if($('.btn_wrap.fixed').length > 0){
// 			// console.log(1);
// 			var btnH = $('.btn_wrap.fixed').outerHeight(true),
// 				$container = $('.btn_wrap.fixed').closest('#container');
// 				//console.log(btnH)
// 			$container.css('padding-bottom',btnH + 40);
// 		}
// 	},
// 	fixedBtnType2 : function(){ //fixed버튼 있을 때, wrap padding-bottom조절 (header footer 있을 때)
// 		//console.log(2);
// 		if($('.btn_wrap.fixed').length > 0){
// 			var btnH = $('.btn_wrap.fixed').outerHeight(true),
// 				$wrap = $('#wrap');
// 				//console.log(btnH)
// 			$wrap.css('padding-bottom',btnH);
// 			if($('.btn_wrap.fixed').parents().is('.tab_cont')){
// 				console.log(444);
// 				var btnH = $('.tab_cont.on .btn_wrap.fixed').outerHeight(true),
// 					$wrap = $('#wrap');
// 				$wrap.css('padding-bottom',btnH);
// 			}
// 		}
// 	}
// }

const formEvt = {
	init : () => {
		formEvt.inputDel();//input text 삭제
		formEvt.checkAll();//전체선택
		formEvt.countEvt();//카운트
    },
	inputDel : () =>{
		let $inputWarp = $('.input_wrap');

		$inputWarp.each(function(idx, ele){
			let $thInp = $(ele).find('input'),
				$thBtn = $thInp.siblings('.btn_del');

			$thInp.on('focus keyup', function(){
				$(this).next('.btn_del').addClass('on').removeClass($thInp.val().length > 0 ? '':'on');
				if($(this).next('.btn_del').next().length > 0){
					let $items = $(this).next('.btn_del').nextAll(),
						itemsWid = '',
						totalWid = 0;
					$items.each(function(e, idx){
						itemsWid = $(idx).outerWidth();
						totalWid = totalWid + itemsWid;
					})
					$(this).next('.btn_del').css('right', totalWid + 8)
				}
			})
			$thBtn.on('click', function(e){
				e.preventDefault();
				$(this).prev().val('').focus();
				$(this).removeClass('on');
			})
		})
	},
	checkAll : () =>{
		let $agreeList = $('.agree_area')

		$agreeList.each(function(){
			let $chkAll = $(this).find('.check_all input'),
				$chkList = $(this).find('input[type=checkbox]').not($chkAll)
			
				$chkAll.on('change', function() {
				if($chkAll.prop('checked')) $chkList.prop('checked', true);
				else $chkList.prop('checked', false);
			});
			$chkList.on('change', function() {
				if($chkList.filter(':checked').length == $chkList.length) $chkAll.prop('checked', true)
				else $chkAll.prop('checked', false)
			})
		})
	},
	countEvt : () =>{
		let $counterWrap = $('.counter_item');
		$counterWrap.each(function(idx, ele){
			let $btnCount = $(ele).find('.btn_count'),
				$textVal = $(ele).find('.num');

			$btnCount.on('click', function(e){
				e.preventDefault();
				let $numVal = +$textVal.val()
				if($(this).hasClass('minus')){
					$textVal.val($numVal - 1);
					if($textVal.val() == 0) $(this).attr('disabled', 'disabled')
				}else if($(this).hasClass('plus')){
					$textVal.val($numVal + 1);
					if($textVal.val() > 0) $(ele).find('.btn_count.minus').removeAttr('disabled')
				}
			})
		})
	}

}

const tabEvt = () => {
	let tabWrap = $('.j_ui_tab');
	if(tabWrap.length > 0){
		let tabLi = tabWrap.find('li');

		$(document).on('click', '.j_ui_tab a', function(e){
			e.preventDefault();
			let tabCont = $(this).attr('href');

			$(this).attr('aria-selected','true').closest('li').addClass('on').siblings('li').removeClass('on').find('a').attr('aria-selected','false');
			$(tabCont).addClass('on').siblings('.tab_cont').removeClass('on');
			
			if($(this).closest(tabWrap).hasClass('tab_seat')){
				$(this).closest(tabWrap).find('li').removeClass('on');
				$(this).addClass('on').closest('li').siblings('li').find('a').removeClass('on')
			}
			return false;
		})
	}
}

const accoEvt = () => {
	let $accoWrap = $('.j_ui_acco'),
		$thBtn = $accoWrap.find('.j_acco_btn');

	if($accoWrap.length > 0){
		$accoWrap.each(function(){
			if($thBtn.hasClass('on')) $thBtn.attr('aria-expanded','true');
			else $thBtn.attr('aria-expanded','false');
		});
		
		$thBtn.on('click', function(e){
			e.preventDefault();
			let $thCont = $(this).closest('.acco_tit').siblings('.acco_cont');

			if(!$(this).hasClass('on')){
				$(this).addClass('on').attr('aria-expanded','true').find('span').text('상세내용 닫기');
				$thCont.slideDown(200)
			}else{
				$(this).removeClass('on').attr('aria-expanded','false').find('span').text('상세내용 열기');
				$thCont.slideUp(200)
			}
		})
	}
}

let $popSpeed = 150;
const popMotion = {
	init : () => {
		let $openBtn;
		if($('.pop_wrap').hasClass('is_active')) popMotion.popOpen($('.pop_wrap.is_active'))
		else $('.pop_wrap').attr('aria-hidden', 'true');

		if($('.tooltip_area').length > 0) popMotion.tooltip();

		$(document).on('click','.j_pop_open', function(e){
			e.preventDefault();
			let $pop = $(this).attr('href');
			$openBtn = $(this);
			popMotion.popOpen($pop);
		})

		$(document).on('click', '.j_pop_close', function(e){
			e.preventDefault();
			let $pop = $(this).closest('.pop_wrap');
			popMotion.popClose($pop);
			$openBtn.focus(); // $("a[href='#" + $id + "']").focus();
			if($('.pop_wrap').length > 1){
				$('.pop_wrap.is_active .popup').attr('tabindex','0').focus();
			}
		})
	},
	popOpen : tar => {
		let $tar = $(tar);
		$tar.addClass('is_visible').attr('aria-hidden', 'false');
		$tar.find('.popup').attr('tabindex', 0).focus().find('.pop_cont').attr('tabindex',0);
		setTimeout(function(){$tar.addClass('is_active')}, $popSpeed);
		$('#wrap').attr('aria-hidden','true');
		$('body').addClass('pop_open');
		if($tar.hasClass('toast')){
			setTimeout(function(){popMotion.popClose($tar)}, 1000);
		}
	},
	popClose: tar => {
		let $tar = $(tar),
			$id = $tar.attr('id');
		$tar.removeClass('is_active').find('.pop_cont').scrollTop(0);
		setTimeout(function(){$tar.removeClass('is_visible')}, $popSpeed);
		$('#wrap').attr('aria-hidden','false');
		$('body').removeClass('pop_open')
	},
	tooltip: () => {
		$('.tooltip_area').find('.tooltip_cont').attr({'aria-hidden':'true', 'tabindex':'-1'});
		$('.tooltip_area').on('click', '.btn_tooltip', function(e){
			e.preventDefault();
			let $this = $(this),
				$area = $this.closest('.tooltip_area');
			$area.addClass('visible');
			setTimeout(function(){$area.addClass('act')},150);
			$area.find('.tooltip_cont').attr({'aria-hidden':'false', 'tabindex':'0'});
			
			$('.tooltip_area').not($area).find('.btn_close').click();
		})
		
		$('.tooltip_area').on('click', '.btn_close', function(e){
			e.preventDefault();
			let $this = $(this),
				$area = $this.closest('.tooltip_area');
			
			$area.removeClass('act');
			setTimeout(function(){$area.removeClass('visible')},150);
			$area.find('.tooltip_cont').attr({'aria-hidden':'true', 'tabindex':'-1'});
			$area.find('.btn_tooltip').focus();
		})
	}
}

const swiperArea = ()=>{
	let bannerSwiper = new Swiper('.evtBanner-swiper',{
		slidesPerView: 1,
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		navigation: {
			prevEl: ' .swiper-btn-prev',
			nextEl: ' .swiper-btn-next',
		},
        pagination: {
			el: '.swiper-pagination',
			clickable: true,
			type: 'bullets',
		},
		a11y: {
			prevSlideMessage: '이전 슬라이드',
			nextSlideMessage: '다음 슬라이드',
			slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
		},
	})
	$('.swiper-btn-play').on('click', function() {
		$(this).hide();
		$(this).siblings('.swiper-btn-pause').show();
		bannerSwiper.autoplay.start();
		return false;
	  });
	  $('.swiper-btn-pause').on('click', function() {
		$(this).hide();
		$(this).siblings('.swiper-btn-play').show();
		bannerSwiper.autoplay.stop();
		return false;
	  });
}