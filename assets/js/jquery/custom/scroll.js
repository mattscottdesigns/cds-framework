(function(){
    var check = 0;
    $(window).on("scroll", function(){
        window.scrollY > check ? console.log("down", window.scrollY) : console.log("up", window.scrollY);
        check = window.scrollY
    });
})();
