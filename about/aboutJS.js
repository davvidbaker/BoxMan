// $(window).on('scroll', function() {
//   var height = window.innerHeight
//   if ($(window).scrollTop() > height)
//     $('.page-title').css('display','none');
//   else if ($(window).scrollTop() < height) {
//     $('.page-title').css('display','block');
//   }
// })
// $('.answer').css('width', window.innerWidth);
// $('.answer-reveal').css('width', window.innerWidth- 10)


// $( window ).resize(function() {
//   $('.answer').css('width', window.innerWidth)
//   $('.answer-reveal').css('width', window.innerWidth-10)

// });

// defining hyperNote
$(".hNote").mouseenter(function() {
  hText = this.innerHTML;
  console.log(hText)
  var myNote = $(this).attr('data-note');
  $(this).text(hText + "  [" + myNote + "]  ");
})
$(".hNote").mouseleave(function() {
  $(this).text(hText);
})


// question and answer portion
$(".question").click(function() {
  $(this).next('.answer').toggleClass('answer-reveal');
  // $(this).next('.answer').css('height','50px');
})