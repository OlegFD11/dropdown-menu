/** code by webdevtrick ( https://webdevtrick.com ) **/

import $ from "jquery";
function list() {
  $("nav ul li a:not(:only-child)").click(function (e) {
    $(this).siblings(".nav-dropdown").slideToggle(300);
    $(".nav-dropdown").not($(this).siblings()).slideUp(300);
    e.stopPropagation();
  });
  $("html").click(function () {
    $(".nav-dropdown").hide();
  });
  $("#nav-toggle").click(function () {
    $("nav ul").slideToggle();
  });
  $("#nav-toggle").on("click", function () {
    this.classList.toggle("active");
  });
}

list();
