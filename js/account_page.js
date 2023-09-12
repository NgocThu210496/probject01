const courseId = document.getElementById("courseId");
const courseName = document.getElementById("courseName");
const courseTime = document.getElementById("courseTime");
const active = document.getElementById("active");

const listCourse = document.getElementById("listCourse");
const listPage = document.getElementById("listPage");

//Định nghĩa số dữ liệu trên trang
const recordSperPage = 3;
// Lấy dữ liệu từ localStorage, nếu null thì khởi tạo mảng userSystem
let userSystem = JSON.parse(localStorage.getItem("userSystem")) || [];
// Định nghĩa số dữ liệu trên mỗi trang
const recordsPerPage = 3;


//search 
let btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", function(){
    const searchInputValue = document.getElementById("courseNameSearch"); 
    let searchListCourse = [];
    userSystem.filter(function(element){
        let valueOfSearchInput = (searchInputValue.value)?.toLowerCase(); 
        let valueOfuserSystem = (element.courseName)?.toLowerCase();
        if(valueOfuserSystem?.includes(valueOfSearchInput)){
            searchListCourse.push(element);
        }
        let listAccount=document.getElementById("listAccount");
        listAccount.innerHTML="";
        searchListCourse.forEach((element,index)=>{
            listCourse.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${element.courseId}</td>
                <td>${element.courseName}</td>
                <td>${element.courseTime}</td>
                <td>Search</td>
                <td>
                    <button class="btn btn-primary"id="btnCourseEdit_${index}" onClick="openEditCourse(${index})">Edit</button>
                    <button class="btn btn-danger"id="btnCourseDelete_${index}" onClick="openDeleteCourse(${index})">Delete</button>
                </td>
            </tr>
        `;

        })
        

    })
    
});


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
    for (let index = indexFrom; index < indexTo; index++) {
        const status = userSystem[index].status ? 'unlock' : 'lock';
        //  tạo ra các id động, cho phép bạn dễ dàng xác định nút được nhấp vào
        listAccount.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${userSystem[index].email}</td>
                <td>${userSystem[index].password}</td>
                <td>${userSystem[index].fullName}</td>
                <td>${status}</td>
                <td>
                    <button class="btn btn-primary"id="btnunLockAccount_${index}" onClick="unlockAccount(${index})">Mở khóa</button>
                    <button class="btn btn-danger"id="btnLockAccount_${index}" onClick="lockAccount(${index})">Khóa</button>
                </td>
            </tr>
        `;
    }

}
function openDeleteCourse(index) {
    const deleteCourseData = userSystem[index];
    document.getElementById("deleteCourseId").innerHTML = deleteCourseData.courseId;
    document.getElementById("deleteCourseName").innerHTML = deleteCourseData.courseName;
    $("#deleteCourse").modal('show')

}
//fuction delete
let confirmDeleteButton = document.getElementById("confirmDeleteButton");
confirmDeleteButton.addEventListener("click", function () {

    let deleteCourseId = document.getElementById("deleteCourseId").innerHTML;
    userSystem = userSystem.filter(element => element.courseId != deleteCourseId)
    // Lưu đè userSystem vào localStorage
    localStorage.setItem("userSystem", JSON.stringify(userSystem));
    renderData(1);
})
function openEditCourse(index) {
    // Lấy dữ liệu từ hàng tương ứng và điền vào modal chỉnh sửa
    const courseData = userSystem[index];
    document.getElementById("editCourseId").value = courseData.courseId;
    document.getElementById("editCourseName").value = courseData.courseName;
    document.getElementById("editCourseTime").value = courseData.courseTime;

    // Hiển thị modal chỉnh sửa
    // document.getElementById("editModal").style.display = "block";
    //cách hiển thị modal
    $("#editModal").modal('show');
}
//tính tổng số trang
function getTotalPage() {
    return Math.ceil(userSystem.length / recordSperPage)

}
// Function thực hiện thêm mới dữ liệu
function createCourse() {
    const status = active.checked;
    const newCourse = {
        courseId: courseId.value,
        courseName: courseName.value,
        courseTime: courseTime.value,
        status: status
    };

    if (!validateCourseId(newCourse.courseId) || !validateCourseName(newCourse.courseName)) {
        return;
    }
    //Thêm newCourse vào userSystem
    userSystem.push(newCourse);
    // Lưu đè userSystem vào localStorage
    localStorage.setItem("userSystem", JSON.stringify(userSystem));

    resetForm();
    renderData(1);
}
// click vào edit thì hiển thị all data trên form
function initUpdate() {
    // Lấy dữ liệu từ localStorage, nếu null thì khởi tạo mảng userSystem
    const userSystem = JSON.parse(localStorage.getItem("userSystem")) || [];
    // Lấy thông tin danh mục cần cập nhật
    let index = getClassId(userSystem, courseId);//Chỉ số phần tử sinh viên cần cập nhật
    // Hiển thị thông tin danh mục cần cập nhật lên Input Form
    document.getElementById("courseId").value = userSystem[index].courseId;
    document.getElementById("courseName").value = userSystem[index].courseName;
    document.getElementById("courseTime").value = userSystem[index].courseTime;
    if (userSystem[index].status == "active") {
        document.getElementById("active").checked = true;
    } else {
        document.getElementById("inActive").checked = true;
    }
    //Không cho phép sửa mã courseId form khi cập nhật - readonly
    document.getElementById("courseId").readOnly = true;
   
}
//update
function updateCourse() {

    // 1. Lấy thông tin khoá học trên form
    let courseUpdate = getDataCourse();
    // 2. Cập nhật thông tin course vào userSystem
    let indexUpdate = getCourseId(userSystem, courseUpdate.courseId);
    userSystem[indexUpdate] = courseUpdate;
    // 3. Lưu mảng vào local storage
    localStorage.setItem("userSystem", JSON.stringify(userSystem));
    resetForm();
}

for (let index = 0; index < userSystem.length; index++) {
    const editButton = document.getElementById(`btnCourseEdit_${index}`);
    const deleteButton = document.getElementById(`btnCourseDelete_${index}`)

};
// Hàm lấy thông tin danh mục theo mã danh mục
function getCourseId(userSystem, courseId) {
    for (let index = 0; index < userSystem.length; index++) {
        if (userSystem[index].courseId == courseId) {
            return index;
        }
    }
    return -1;// Trả về -1 nếu không tìm thấy courseId tương ứng trong mảng.
}

// Các function validateCourseId
function validateCourseId(courseId) {
    let indexFind = userSystem.findIndex(element => element.courseId == courseId);
    if (indexFind >= 0) {
        //Đã tồn tại mã danh mục trong userSystem
        document.getElementById("courseId").style.backgroundColor = "yellow";
        alert("Mã danh mục đã tồn tại");
        return false;
    }
    document.getElementById("courseId").style.backgroundColor = "";
    return true;
}

//Function validateCourseName
function validateCourseName(courseName) {
    let indexFind = userSystem.findIndex(element => element.courseName == courseName);
    if (indexFind >= 0) {
        document.getElementById("courseName").style.backgroundColor = "yellow";
        alert("Tên danh mục đã tồn tại");
        return false;
    }
    document.getElementById("courseName").style.backgroundColor = "";
    return true;
}

//fuction reset ô input
function resetForm() {
    document.getElementById("courseId").value = "";
    document.getElementById("courseName").value = "";
    document.getElementById("courseTime").value = "";
    document.getElementById("active").checked = true;

}

//lấy thông tin course trên form và trả về đối tượng course đó
function getDataCourse() {
    let courseId = document.getElementById("editCourseId").value;
    let courseName = document.getElementById("editCourseName").value;
    let courseTime = document.getElementById("editCourseTime").value;
    let status = document.getElementById("activeEdit").checked;
    // let status = document.querySelector("input[type='radio']:checked").value;
    let course = { courseId, courseName, courseTime, status };
    return course;
}

// // Thêm sự kiện click cho nút Submit
// document.getElementById("btnSubmit").addEventListener("click", function (event) {
//     event.preventDefault();
//     createCourse();

// });

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
