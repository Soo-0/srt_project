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
        // console.log('test')
    }

}

const formEvt = {
	init : () => {
		formEvt.checkAll();
		formEvt.countEvt();
    },
	inputDel : () =>{
		// $(document).off('click.inputDataDel').on('click.inputDataDel', '.input_wrap .btn_del', function(e) {
		// 	e.preventDefault();
		// 	$(this).prev().val('').focus();
		// 	$(this).prev('a').text(''); // 주소입력값 삭제용
		// 	$(this).removeClass('on');
		// });
	},
	checkAll : () =>{
		let $agreeList = $('.agree_box')

		$agreeList.each(function(){
			let $chkAll = $(this).find('.check_all input'),
				$chkList = $(this).find('.agree_list input[type=checkbox]');

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
		if($('.pop_wrap').hasClass('is_active')) popMotion.popOpen($('.pop_wrap.is_active'))
		else $('.pop_wrap').attr('aria-hidden', 'true');

		if($('.tooltip_area').length > 0) popMotion.tooltip();

		$(document).on('click','.j_pop_open', function(e){
			e.preventDefault();
			let $pop = $(this).attr('href');
			popMotion.popOpen($pop);
		})

		$(document).on('click', '.j_pop_close', function(e){
			e.preventDefault();
			let $pop = $(this).closest('.pop_wrap');
			popMotion.popClose($pop);

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
		$("a[href='#" + $id + "']").focus();
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
	let bannerSwiper = new Swiper('.banner-swiper',{
		loop: true,
		slidesPerView: 1,
        pagination: {
            el: ".bann_pagination",
			clickable: true
        },
		type: 'bullets',
	})
}