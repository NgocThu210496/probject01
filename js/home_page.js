//1. lấy các thông tin có trong localstorage trong hệ thống
let studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
let classesManagement = JSON.parse(localStorage.getItem("classesManagement")) || [];
let student = JSON.parse(localStorage.getItem("student")) || [];
let classActive = JSON.parse(localStorage.getItem("classActive")) || [];
let classClose=JSON.parse(localStorage.getItem("classClose"))||[];
let classPending=JSON.parse(localStorage.getItem("classPending"))||[];

//id show ket qua trong home_page.htlm
const statisticalCourse = document.getElementById("statisticalCourse");
const statisticsClass = document.getElementById("statisticsClass");
const statisticsStudent = document.getElementById("statisticsStudent");
const statisticsClassActive = document.getElementById("statisticsClassActive");
const statisticsClassClose =document.getElementById("statisticsClassClose");
const statisticsClassPending=document.getElementById("statisticsClassPending");

//tra ve sum tren bang dieu khien
statisticalCourse.innerHTML = studentManagement.length;
statisticsClass.innerHTML = classesManagement.length;
statisticsStudent.innerHTML = student.length;
statisticsClassActive.innerHTML = classActive;
statisticsClassClose.innerHTML=classClose;
statisticsClassPending.innerHTML=classPending;

//  console.log("classClose",classClose);


const btnLogOut = document.getElementById("btnLogOut");
btnLogOut.addEventListener("click", function () {
  //xoa item trong localStoreage có id 
  localStorage.removeItem("userLogin");
  //chuyển về trang login
  window.location.href = "login_page.html"

})
//1. lấy các thông tin có trong localstorage trong hệ thống
let userSystem = JSON.parse(localStorage.getItem("userSystem")) || [];
//thong ke 
function statistical() {
  const statisticalCourse = 0;
  const statisticsClass = 0;
  const statisticsClassActive = 0;
  const statisticsClassFinal = 0;
  const statisticsClassPending = 0;
  //forEach() 
  //+)Dùng để duyệt qua từng phần tử của mảng (= for)
  //+)Trả về undefined nếu như không tìm thấy giá tri thõa mãn điều kiện đặt ra 
  studentManagement.forEach(element => {

  });
}

