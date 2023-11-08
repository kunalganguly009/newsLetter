function myFunction() {
    var x = document.getElementById("snackbar");
    x.className = "hide";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 300);
}