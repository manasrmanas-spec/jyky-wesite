let topBtn = document.getElementById("topBtn");

window.onscroll = function () {
    if (topBtn) {
        if (document.documentElement.scrollTop > 200) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    }
};

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.style.display = "none";
    }
});