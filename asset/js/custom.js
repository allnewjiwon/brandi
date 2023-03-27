

$(function(){ //start


  /**
   * @cate
   * @전체 
   * @트렌드 1
   * @브랜드 2
   * @뷰티 3
   * @라이프 4 
   * 
   * 
   * @theme << id
   * @오늘은 이 상품 어때요? = 1;
   * @상품은 내일 도착! = 2;
   * @상품은 mdpick = 3;
   * @TODAY 카테고리 베스트 = 4
   * @신상모아보기 = 5
   */

    // 1. json 활용 데이터 가져오기 
  function productList(frame,themeNum,cateNum){

    fetch('./asset/data/productData.json')
    .then((response) => response.json())
    .then((json) => {
        data = json.items;

        var result = data.filter(function (parm) {return parm.theme == themeNum })
          // 카테고리별로 필터링 하는 소스
        if(themeNum == 4 && cateNum){ // 테마가 4번이면서 카테값을 줬을때!
          result = result.filter(function (parm) {return parm.cate == cateNum })
        } 

        if(themeNum == 5 && cateNum){ // 테마가 5번이면서 카테2값을 줬을때!
          result = result.filter(function (parm) {return parm.cate2 == cateNum })
        } 


        let html = '';

        deliEl = `<img class="delivery-fast" src="./asset/images/quick_delivery.png" alt="">`;
        // 하루배송 마크
        result.forEach(element => {
          isDeli = (element.snipet.deliveryFast) ? deliEl : "";
          // 하루배송 img가 true일 경우 집어넣고 아니면 데이터값을 비워두어라.

          isSlide = (element.theme === 3) ? 'swiper-slide' : '';
          // 테마 3번일 경우 슬라이드를 적용하여라.

           html+=` <a class="wrap-prod ${isSlide}" href="">
           <div class="thumb">
             <img src="${element.snipet.thumb}" alt>
           </div>
           <div class="wrap-info">
             <div class="store-info">
               <em class="seller">${element.snipet.seller}</em>
               ${isDeli}
             </div>
             <div class="prod-info">
               <em class="desc">${element.snipet.title}</em>
             </div>
             <div class="price-info">
               <strong class="discount">${element.snipet.price.discount}%</strong>
               <strong class="price">${element.snipet.price.curr}원</strong>
             </div>
           </div>
         </a>`;
        });
        $(frame).html(html);
    })
  }

  productList('#list1',1);
  productList('#list2',2);
  productList('#list3',3);
  productList('#list4',4); 
  productList('#list5',5);//모두 CATE라는걸 설정안함

  // 투데이 베스트 카테고리 탭
  $('.sc-today-best .category-tab-item').click(function(e){
    e.preventDefault();
    cate = $(this).data('cate');
    $(this).addClass('on').siblings().removeClass('on');
    productList('#list4',4,cate); //카테를 설정
  })

  // 신상 모아보기 카테고리 탭 
  $('.sc-new-prd .category-tab-item').click(function(e){
    e.preventDefault();
    cate2 = $(this).data('cate2');
    $(this).addClass('on').siblings().removeClass('on');
    productList('#list5',5,cate2); 
  })


//  2. 검색 버튼 클릭 시 팝업 작동

  $('#searchBtn').click(function(){
    $('.popup-search').addClass('active');
    $('body').addClass('hidden')
  })

  $('.overlay').click(function(){
    $('.popup-search').removeClass('active');
    $('body').removeClass('hidden')
  })

// 3. 헤더 스크롤 fix 

  $(window).scroll(function(){
    curr = $(this).scrollTop();
    target = $('.container').offset().top;
    console.log(target);
    if(curr >= target){
      $('.gnb').addClass('fix');
    }else{
      $('.gnb').removeClass('fix');
    }
  })

// 4. swiper 슬라이드

  var swiper = new Swiper(".main-banner", {
    slidesPerView:1,
    loop: true,
    autoplay: true,
    speed: 1000,

    pagination:{
      el: ".swiper-pagination",
      type: "fraction",
    },
  });
  // 스와이퍼 오토플레이 일시정지 & 재생 컨트롤

  $('.banner-pager-box .btn-stop').click(function(){
    swiper.autoplay.stop();
    $('.banner-pager-box button').addClass('on');
  })

  $('.banner-pager-box .btn-start').click(function(){
    swiper.autoplay.start();
    $('.banner-pager-box button').removeClass('on');
  })

  var swiper2 = new Swiper(".latest-block", {
    slidesPerView: 'auto',  
    spaceBetween:8,
  })

  var swiper3 = new Swiper(".wrap-recent-prd", {
    slidesPerView: 'auto',  
    spaceBetween: 8,

  })

  var swiper4 = new Swiper(".sub-banner", {
    slidesPerView: 'auto',  
    spaceBetween: 8,
  })

  var swiper5 = new Swiper(".md-wrap-box", {
    slidesPerView: 1.3,  
    spaceBetween: 8,
    pagination:false,
    navigation: false,
  })

// 6. accordion



  $('.company-info-area .brand-title a').click(function(){
    const brandTit = $(this).parent();
    // console.log('brandTit');
    // brandTit.siblings('.hide-info').addClass('on');
    $('.company-info-area .brand-title,.footer .hide-info').toggleClass('on');
    // $('.company-info-area .hide-info').stop().toggle();
   
  })
  
// 7. 탑버튼


  $(".top-btn").click(function() {
    $('html, body').animate({
        scrollTop : 0
    }, 400);
    return false;
  });


// tab


  // $('.category-tab-item').click(function(){
  //   target = $(this).attr('href');

  //   $(this).addClass('on').siblings().removeClass('on');
  //   $(target).addClass('on').siblings().removeClass('on');
  // })


}) //end