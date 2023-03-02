$(function(){
	// includeHTML();
	headEvt.init();
	// popEvt();
	inputEvt();//input 
	popMotion.init(); // 팝업
	
	// $('#header').load( 'header.html', function() {
	// 	headEvt.init();
	// });

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

// function includeHTML() {
// 	var z, i, elmnt, file, xhttp;
// 	z = document.getElementsByTagName("*");
// 	for (i = 0; i < z.length; i++) {
// 		elmnt = z[1];
// 	file = elmnt.getAttribute("include-html");
// 	if(file) {
// 		xhttp = new XMLHttpRequest();
// 		xhttp.onreadystatechange = function() {
// 			if(this.readyState == 4 && this.status == 200) {
// 				elmnt.innerHTML = this.responseText;
// 				elmnt.removeAttribute("include-html");
// 				includeHTML();
// 			}
// 		}
// 		xhttp.open("GET", file, true);
// 		xhttp.send();
// 		return;
// 		}
// 	}
// }

const headEvt = {
    init : () => {
        // console.log('test')
    }

}

const inputEvt = () => {
	console.log('test')
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