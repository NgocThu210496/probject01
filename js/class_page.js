const insertClassId = document.getElementById("insertClassId");
const insertClassName = document.getElementById("insertClassName");
const insertClassTeacher = document.getElementById("insertClassTeacher");
const insertClassNumber = document.getElementById("insertClassNumber");
const insertClassDescribe = document.getElementById("insertClassDescribe");
const active = document.getElementById("active");

const listClass = document.getElementById("listClass");
const listPageClass = document.getElementById("listPageClass");

//Định nghĩa số dữ liệu trên trang
const recordSperPageClass = 4;
// Lấy dữ liệu từ localStorage, nếu null thì khởi tạo mảng studentManagement
var studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
// Định nghĩa số dữ liệu trên mỗi trang
const recordsPerPageClass = 4;
// Chạy hàm renderData khi trang được tải
window.onload = renderDataClass(1);

// //search 
// let btnSearch = document.getElementById("btnSearch");
// btnSearch.addEventListener("click", function(){
//     // Lấy dữ liệu từ localStorage, nếu null thì khởi tạo mảng studentManagement
// var studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
//     //Lấy dữ liệu nhập trên ô tìm kiếm
//     let courseNameSearch = document.getElementById("courseNameSearch").value;
//     // tìm các danh mục có tên chứa courseNameSearch
//     //hàm filter:để lọc danh sách studentManagement dựa trên điều kiện tìm kiếm.
//     //listCourseSearch được sử dụng để chứa kết quả tìm kiếm mới,
//     let listCourseSearch = studentManagement.filter(element => element.courseName.includes(courseNameSearch));
//     // 4. render data
//     renderDataClass(listCourseSearch);
//     // console.log("muon lay cai gi" ,courseNames)
// });


// Function thực hiện render dữ liệu theo trang
function renderDataClass(page) {
    // 1. Render danh sách trang
    const totalPage = getTotalPageClass();
    const pagePaginationClass = document.getElementById("pagePaginationClass");
    pagePaginationClass.innerHTML = "";
    for (let index = 1; index <= totalPage; index++) {
        pagePaginationClass.innerHTML +=
            `
            <li class="page-item"><a class="page-link" href="javascript:renderDataClass(${index})">${index}</a></li>
            `;
    }

    // 2. Render dữ liệu của page trên table
    let indexFrom = (page - 1) * recordsPerPageClass;
    let indexTo = page * recordsPerPageClass;
    if (indexTo > studentManagement.length) {
        indexTo = studentManagement.length;
    }
    listClass.innerHTML = "";
    for (let index = indexFrom; index < indexTo; index++) {
        const status = studentManagement[index].status ? 'Active' : 'Inactive';
        //  tạo ra các id động, cho phép bạn dễ dàng xác định nút được nhấp vào
        listClass.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${studentManagement[index].insertClassId}</td>
                <td>${studentManagement[index].insertClassName}</td>
                <td>${studentManagement[index].insertClassTeacher}</td>
                <td>${studentManagement[index].insertClassNumber}</td>
                <td>${studentManagement[index].insertClassDescribe}</td>
                <td>${status}</td>
                <td>
                    <button class="btn btn-primary"id="btnClassEdit_${index}" onClick="openEditClass(${index})">Edit</button>
                    <button class="btn btn-danger"id="btnClassDelete_${index}" onClick="openDeleteClass(${index})">Delete</button>
                </td>
            </tr>
        `;
    }

}
function openDeleteClass(index) {
    const deleteCourseData = studentManagement[index];
    document.getElementById("deleteClassId").innerHTML = deleteCourseData.courseId;
    document.getElementById("deleteClassName").innerHTML = deleteCourseData.courseName;
    $("#deleteCalss").modal('show')

}
//fuction delete
let confirmClassDeleteButton = document.getElementById("confirmClassDeleteButton");
confirmClassDeleteButton.addEventListener("click", function () {

    let deleteClassId = document.getElementById("deleteClassId").innerHTML;
    studentManagement = studentManagement.filter(element => element.insertClassId != deleteClassId)
    // Lưu đè studentManagement vào localStorage
    localStorage.setItem("studentManagement", JSON.stringify(studentManagement));
    renderDataClass(1);
})
function openEditClass(index) {
    // Lấy dữ liệu từ hàng tương ứng và điền vào modal chỉnh sửa
    const classData = studentManagement[index];
    document.getElementById("editCourseId").value = courseData.courseId;
    document.getElementById("editCourseName").value = courseData.courseName;
    document.getElementById("editCourseTime").value = courseData.courseTime;

    // Hiển thị modal chỉnh sửa
    // document.getElementById("editModal").style.display = "block";
    //cách hiển thị modal
    $("#editClassModal").modal('show');
}
//tính tổng số trang
function getTotalPageClass() {
    return Math.ceil(studentManagement.length / recordSperPageClass)

}
// Function thực hiện thêm mới dữ liệu
function createClass() {
    const status = active.checked;
    const newClass = {
        insertClassId: insertClassId.value,
        insertClassName: insertClassName.value,
        insertClassTeacher: insertClassTeacher.value,
        insertClassNumber: insertClassNumber.value,
        insertClassDescribe: insertClassDescribe.value,
        status: status
    };

    if (!validateClassId(newClass.insertClassId) || !validateClassName(newClass.insertClassName)) {
        return;
    }
    //Thêm newClass vào studentManagement
    studentManagement.push(newClass);
    // Lưu đè studentManagement vào localStorage
    localStorage.setItem("studentManagement", JSON.stringify(studentManagement));

    resetForm();
    renderDataClass(1);
}
// click vào edit thì hiển thị all data trên form
function initUpdateClass() {
    // Lấy dữ liệu từ localStorage, nếu null thì khởi tạo mảng studentManagement
    const studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
    // Lấy thông tin danh mục cần cập nhật
    let index = getCourseId(studentManagement, courseId);//Chỉ số phần tử sinh viên cần cập nhật
    // Hiển thị thông tin danh mục cần cập nhật lên Input Form
    document.getElementById("courseId").value = studentManagement[index].courseId;
    document.getElementById("courseName").value = studentManagement[index].courseName;
    document.getElementById("courseTime").value = studentManagement[index].courseTime;
    if (studentManagement[index].status == "active") {
        document.getElementById("active").checked = true;
    } else {
        document.getElementById("inActive").checked = true;
    }
    //Không cho phép sửa mã courseId form khi cập nhật - readonly
    document.getElementById("courseId").readOnly = true;
    //Chuyển action thành update
    resetFormCourseInfo()
}
//update
function updateCourse() {

    // 1. Lấy thông tin khoá học trên form
    let courseUpdate = getDataCourse();
    // 2. Cập nhật thông tin course vào studentManagement
    let indexUpdate = getCourseId(studentManagement, courseUpdate.courseId);
    studentManagement[indexUpdate] = courseUpdate;
    // 3. Lưu mảng vào local storage
    localStorage.setItem("studentManagement", JSON.stringify(studentManagement));
    resetForm();
}

for (let index = 0; index < studentManagement.length; index++) {
    const editButton = document.getElementById(`btnClassEdit_${index}`);
    const deleteButton = document.getElementById(`btnClassDelete_${index}`)

};
// Hàm lấy thông tin danh mục theo mã danh mục
function getCourseId(studentManagement, courseId) {
    for (let index = 0; index < studentManagement.length; index++) {
        if (studentManagement[index].courseId == courseId) {
            return index;
        }
    }
    return -1;// Trả về -1 nếu không tìm thấy courseId tương ứng trong mảng.
}

// Các function validateClassId
function validateClassId(courseId) {
    let indexFind = studentManagement.findIndex(element => element.courseId == courseId);
    if (indexFind >= 0) {
        //Đã tồn tại mã danh mục trong studentManagement
        document.getElementById("courseId").style.backgroundColor = "yellow";
        alert("Mã danh mục đã tồn tại");
        return false;
    }
    document.getElementById("courseId").style.backgroundColor = "";
    return true;
}

//Function validateClassName
function validateClassName(courseName) {
    let indexFind = studentManagement.findIndex(element => element.courseName == courseName);
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
    document.getElementById("insertClassId").value = "";
    document.getElementById("insertClassName").value = "";
    document.getElementById("insertClassTeacher").value = "";
    document.getElementById("insertClassNumber").value = "";
    document.getElementById("insertClassDescribe").value = "";
    document.getElementById("status").checked = true;

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

// Thêm sự kiện click cho nút Submit
document.getElementById("btnSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    createClass();

});

//logout
const btnLogOut=document.getElementById("btnLogOut");
btnLogOut.addEventListener("click",function(){
  //xoa item trong localStoreage có id 
  localStorage.removeItem("userLogin");
  //chuyển về trang login
  window.location.href="login_page.html"

})
