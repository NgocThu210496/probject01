//1. lấy các thông tin có trong localstorage trong hệ thống
let studentManagement=JSON.parse(localStorage.getItem("studentManagement"))||[];
 const statisticalCourse= document.getElementById("statisticalCourse");
 statisticalCourse.innerHTML=studentManagement.length;

const btnLogOut=document.getElementById("btnLogOut");
btnLogOut.addEventListener("click",function(){
  //xoa item trong localStoreage có id 
  localStorage.removeItem("userLogin");
  //chuyển về trang login
  window.location.href="login_page.html"

})
//c2
//   let result = JSON.parse(localStorage.getItem("userSystem")); 
//   result.forEach(function(element){
//     element.email = "";
//     element.password="";
//   })
//   localStorage.setItem("userSystem", JSON.stringify(result));
// })

//1. lấy các thông tin có trong localstorage trong hệ thống
  let userSystem=JSON.parse(localStorage.getItem("userSystem"))||[];
  //thong ke 
  function statistical(){
    const statisticalCourse=0;
    const statisticsClass=0;
    const statisticsClassActive=0;
    const statisticsClassFinal=0;
    const statisticsClassPending=0;
    //forEach() 
    //+)Dùng để duyệt qua từng phần tử của mảng (= for)
    //+)Trả về undefined nếu như không tìm thấy giá tri thõa mãn điều kiện đặt ra 
    studentManagement.forEach(element => { 
      
    });
  }

