//   document.getElementById()
//   //1. lấy các thông tin có trong localstorage trong hệ thống
//   let userSystem=JSON.parse(localStorage.getItem("userSystem"))||[];


// const homePagethu =document.getElementById("homePagethu");
// homePagethu.addEventListener("click",function(){
//     window.location.href="home_page.html";
// })

// const courseManagement =document.getElementById("courseManagement");
// courseManagement.addEventListener("click",function(){
//     window.location.href="course_page.html";
// })

// const classManagement =document.getElementById("classManagement");
// classManagement.addEventListener("click",function(){
//     window.location.href="class_page.html";
// })

function navigate(page) {
    if (page == 'page1') {
        return window.location.pathname = 'home_page.html';
        
    } 
    if (page == 'page2') {
     return   window.location.pathname = 'course_page.html';
    } 
    if (page == 'page3') {
      return  window.location.pathname = 'class_page.html';
    } 
    console.log("chay vao chua?")
}
