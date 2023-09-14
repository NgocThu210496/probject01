// const courseId = document.getElementById("courseId");
// const courseName = document.getElementById("courseName");
// const courseTime = document.getElementById("courseTime");
// const active = document.getElementById("active");

const listAccount = document.getElementById("listAccount");
const listPage = document.getElementById("listPage");

//Định nghĩa số dữ liệu trên trang
const recordSperPage = 3;
// Lấy dữ liệu từ localStorage, nếu null thì khởi tạo mảng userSystem
let userSystem = JSON.parse(localStorage.getItem("userSystem")) || [];
// Định nghĩa số dữ liệu trên mỗi trang
const recordsPerPage = 3;

//tính tổng số trang
function getTotalPage() {
    return Math.ceil(userSystem.length / recordSperPage)

}
//search 
// let btnSearch = document.getElementById("btnSearch");
// btnSearch.addEventListener("click", function(){
//     const searchInputValue = document.getElementById("courseNameSearch"); 
//     let searchListCourse = [];
//     userSystem.filter(function(element){
//         let valueOfSearchInput = (searchInputValue.value)?.toLowerCase(); 
//         let valueOfuserSystem = (element.courseName)?.toLowerCase();
//         if(valueOfuserSystem?.includes(valueOfSearchInput)){
//             searchListCourse.push(element);
//         }
//         let listAccount=document.getElementById("listAccount");
//         listAccount.innerHTML="";
//         searchListCourse.forEach((element,index)=>{
//             listCourse.innerHTML += `
//             <tr>
//                 <td>${index + 1}</td>
//                 <td>${element.courseId}</td>
//                 <td>${element.courseName}</td>
//                 <td>${element.courseTime}</td>
//                 <td>Search</td>
//                 <td>
//                     <button class="btn btn-primary"id="btnCourseEdit_${index}" onClick="openEditCourse(${index})">Edit</button>
//                     <button class="btn btn-danger"id="btnCourseDelete_${index}" onClick="openDeleteCourse(${index})">Delete</button>
//                 </td>
//             </tr>
//         `;

//         })
        

//     })
    
// });


// Function thực hiện render dữ liệu theo trang
function renderData(page) {
    // 1. Render danh sách trang
    const totalPage = getTotalPage();
    const pagePagination = document.getElementById("pagePagination");
    pagePagination.innerHTML = "";
    for (let index = 1; index <= totalPage; index++) {
        pagePagination.innerHTML +=
            `
            <li class="page-item"><a class="page-link" href="javascript:renderData(${index})">${index}</a></li>
            `;
    }

    // 2. Render dữ liệu của page trên table
    let indexFrom = (page - 1) * recordsPerPage;
    let indexTo = page * recordsPerPage;
    if (indexTo > userSystem.length) {
        indexTo = userSystem.length;
    }
    listAccount.innerHTML = "";
    for (let index = 0; index < indexTo; index++) {
        const status = userSystem[index].status ? 'unlock' : 'lock';
        //  tạo ra các id động, cho phép bạn dễ dàng xác định nút được nhấp vào
        listAccount.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${userSystem[index].email}</td>
                <td>${userSystem[index].password}</td>
                <td>${userSystem[index].fullname}</td>
                <td>${status}</td>
                <td>
                    <button class="btn btn-primary"id="btnunLockAccount_${index}" onClick="unlockAccount(${index})">Mở khóa</button>
                    <button class="btn btn-danger"id="btnLockAccount_${index}" onClick="lockAccount(${index})">Khóa</button>
                </td>
            </tr>
        `;
    }

}


// Tạo hàm lockAccount 
var lockModal = document.getElementById("lockModal");
var confirmLock = document.getElementById("confirmLock");
var cancelLock = document.getElementById("cancelLock");
var userEmailToLock = null;
let lockAccount = (index) => {
    console.log("lockAccount: ", index);
    userEmailToLock = email; // Lưu email của người dùng cần khóa
    lockModal.style.display = "block"; // Hiển thị modal    
}
confirmLock.addEventListener("click", () => {
    let userSystem = JSON.parse(localStorage.getItem("userSystem")) || [];

    let index = indexOfCourseId(userSystem, userEmailToLock);
    userSystem[index].status = false;
    localStorage.setItem("userSystem", JSON.stringify(userSystem));
    renderData(1);
    lockModal.style.display = "none";
});
// cancelLock.addEventListener("click", () => {
//     lockModal.style.display = "none";
// });
// Tạo unlockAccount
var unlockModal = document.getElementById("unlockModal");
var confirmUnlock = document.getElementById("confirmUnlock");
var cancelUnlock = document.getElementById("cancelUnlock");
var userEmailToUnlock = null;
let unlockAccount = (email) => {

    userEmailToUnlock = email; // Lưu email của người dùng cần khóa
    unlockModal.style.display = "block"; // Hiển thị modal
}
confirmUnlock.addEventListener("click", () => {
    let userSystem = localStorage.getItem("userSystem") ? JSON.parse(localStorage.getItem("userSystem")) : [];
    console.log("userSystem: ", userSystem);
    let index = indexOfCourseId(userSystem, userEmailToUnlock);
    // userSystem[index].status = true;
    localStorage.setItem("userSystem", JSON.stringify(userSystem));
    renderData(1);
    unlockModal.style.display = "none";
});
cancelUnlock.addEventListener("click", () => {
    unlockModal.style.display = "none";
});
let indexOfCourseId = (userSystem, email) => {
    for (let i = 0; i < userSystem.length; i++) {
        if (userSystem[i].email == email) {
            return i;
        }
    }
    return -1;
}

let btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", (event) => {
    event.preventDefault();
    let userSystem = localStorage.getItem("userSystem") ? JSON.parse(localStorage.getItem("userSystem")) : [];
    let searchValue = document.getElementById("accountNameSearch").value;
    let accountSearch = userSystem.filter(userarr => userarr.email.includes(searchValue));
    renderData(1);
})
// Tạo Sắp xếp
let sortAccount = () => {
    let userSystem = localStorage.getItem("userSystem") ? JSON.parse(localStorage.getItem("userSystem")) : [];
    let sort = document.getElementById("sort").value;
    switch (sort) {
        case "accountEmailASC":
            userSystem.sort((a, b) => {
                const nameA = a.email.toLowerCase();
                const nameB = b.email.toLowerCase();
              
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              });
              console.log("tang",userSystem);
              break;
        case "accountEmailDESC":
            userSystem.sort((a, b) => {
                const nameA = a.email.toLowerCase();
                const nameB = b.email.toLowerCase();
              
                if (nameA > nameB) {
                  return -1;
                }
                if (nameA < nameB) {
                  return 1;
                }
                return 0;
              });
              console.log("giam",userSystem);
              break;
    }
    localStorage.setItem("userSystem", JSON.stringify(userSystem));
    renderData(1);
}

// Chạy hàm renderData khi trang được tải
window.onload = renderData(1);
//logout
const btnLogOut=document.getElementById("btnLogOut");
btnLogOut.addEventListener("click",function(){
  //xoa item trong localStoreage có id 
  localStorage.removeItem("userLogin");
  //chuyển về trang login
  window.location.href="login_page.html"

})
