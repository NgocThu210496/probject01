 
const btnLogin=document.getElementById("btnLogin");
btnLogin.addEventListener("click",function(){
    //1. lấy các thông tin có trong localstorage trong hệ thống
    let userSystem=JSON.parse(localStorage.getItem("userSystem"))||[];
    //lat thong tin trong form dang nhap
const email=document.getElementById("email").value;
const password=document.getElementById("password").value;
    //3 kiểm tra xem ngừoi dùng đăng nhập vào có trùng emali và password đang hoạt động or khoá?
        //hàm findIndex() sẽ trả về vị trí đầu tiên của phần tử trong mảng, Nếu không tìm thấy phần tử nào thỏa mãn hàm sẽ trả về -1.
    let indexUserLogin=userSystem.findIndex(userSystem=>
        userSystem.email==email && userSystem.password==password);
    // không để trống 1 trong 2 trường
    
     // Email phải có định dạng email
     let emailInput= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailInput.test(email)){
        alert("Nhập đúng định dạng Email");
    }
   else if(indexUserLogin==-1){
        alert("Email và password chưa chính xác");

    }else{
        //kiem tra status cua user (hoat dong/khoa)
        if(userSystem[indexUserLogin].status){
            //set thông tin ngươì nhập đẩy vào local
            localStorage.setItem("userLogin",email);
             // dieu huwong sang trang 
            //user dang hoat dong thi ->home_page.html
            window.location.href="home_page.html";
        }else{
            alert("Tài khoản đang bị khoá");
        }

    }

})