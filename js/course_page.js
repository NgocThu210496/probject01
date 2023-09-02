const courseId = document.getElementById("courseId");
const courseName = document.getElementById("courseName");
const courseTime = document.getElementById("courseTime");
const active = document.getElementById("active");

const listCourse = document.getElementById("listCourse");
const listPage = document.getElementById("listPage");

//Định nghĩa số dữ liệu trên trang
const recordSperPage = 3;
// Mặc định là chế độ "Create"
const action = "Create";
// Lấy dữ liệu từ localStorage, nếu null thì khởi tạo mảng studentManagement
const studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
// Định nghĩa số dữ liệu trên mỗi trang
const recordsPerPage = 3;
// Chạy hàm renderData khi trang được tải
window.onload = renderData(1);

// Function thực hiện render dữ liệu theo trang
function renderData(page) {
    // 1. Render danh sách trang
    const totalPage = getTotalPage();
    listPage.innerHTML = "";
    for (let index = 1; index <= totalPage; index++) {
        listPage.innerHTML += 
        `<li  class="page-item">
            <a class="page-link" href="javascript:renderData(${index})">${index}</a>
        </li>`;
    }

    // 2. Render dữ liệu của page trên table
    let indexFrom = (page - 1) * recordsPerPage;
    let indexTo = page * recordsPerPage;
    if (indexTo > studentManagement.length) {
        indexTo = studentManagement.length;
    }

    listCourse.innerHTML = "";
    for (let index = indexFrom; index < indexTo; index++) {
        const status = studentManagement[index].status ? 'Active' : 'Inactive';
        listCourse.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${studentManagement[index].courseId}</td>
                <td>${studentManagement[index].courseName}</td>
                <td>${studentManagement[index].courseTime}</td>
                <td>${status}</td>
                <td>
                    <button class="btn btn-primary"id="btnCourseEdit">Edit</button>
                    <button class="btn btn-danger"id="btnCourseDelete">Delete</button>
                </td>
            </tr>
        `;
    }
}
function getTotalPage() {
    return Math.ceil(studentManagement.length / recordSperPage)

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
    //Thêm newCourse vào studentManagement
    studentManagement.push(newCourse);
      // Lưu đè studentManagement vào localStorage
      localStorage.setItem("studentManagement", JSON.stringify(studentManagement));

      resetFormCourseInfo();
    renderData(1);
}

// Các function validateCourseId
function validateCourseId(courseId) {
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

//Function validateCourseName
function validateCourseName(courseName) {
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
function resetFormCourseInfo() {
    courseId.value = "";
    courseName.value = "";
    courseTime.value = "";
    active.checked = true;
   
}
// Thêm sự kiện click cho nút Submit
document.getElementById("btnSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    if (action === "Create") {
        createCourse();
    } else {
        updateCatalog();
    }
});