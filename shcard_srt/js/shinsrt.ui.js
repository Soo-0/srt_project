(function () {
    var vers = new Date().getDate() + '' + (new Date().getHours());
    // 캐시되어야 하는 공통 파일들 (외부 라이브러리로 변경이 없는 파일)
    document.write('<script src="' + '../../js/libs/jquery-3.6.3.min.js"></scr'+'ipt>');
    document.write('<script src="' + '../../js/libs/jquery-ui.min.js"></scr'+'ipt>');
    document.write('<script src="' + '../../js/libs/swiper-bundle.min.js"></scr'+'ipt>');
    document.write('<script src="' + '../../js/common.js?v='+ vers +'"></scr'+'ipt>');
    // document.write('<script src="' + '../../js/ui.js?v='+ vers +'"></scr'+'ipt>');
})();