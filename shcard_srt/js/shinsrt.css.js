(function () {
    var vers = new Date().getDate() + '' + (new Date().getHours());
    // 캐시되어야 하는 공통 파일들 (외부 라이브러리로 변경이 없는 파일)
    document.write('<li' + 'nk rel="stylesheet" href="' + '../../css/libs/swiper-bundle.min.css" media="all" />');
    document.write('<li' + 'nk rel="stylesheet" href="' + '../../css/libs/jquery-ui.min.css" media="all" />');
    document.write('<li' + 'nk rel="stylesheet" href="' + '../../css/font.css" media="all" />');
    document.write('<li' + 'nk rel="stylesheet" href="' + '../../css/datepicker.css" media="all" />');
    document.write('<li' + 'nk rel="stylesheet" href="' + '../../css/common.css?ver=' + vers + '" media="all" />');
    // document.write('<li' + 'nk rel="shortcut icon" type="image/x-icon" hre' + 'f="/pconts/images/ico_favicon96.ico?v=2020" />\n'
	// + '<li' + 'nk rel="stylesheet" hre' + 'f="' + '/pconts/css/shcard/shc-fonts.css?ver=' + ver + '" media="all"  />\n'
})();