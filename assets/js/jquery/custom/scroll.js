(function(){
    var check = 0;
    window.addEventListener("scroll", function(){
        window.scrollY > check ? console.log("down") : console.log("up");
        check = window.scrollY
    });
})();
