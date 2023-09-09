const studentId = document.getElementById("studentId");
const courseNameSelect = document.getElementById("courseNameSelect");
const classNameSelect=document.getElementById("classNameSelect");
const studentName = document.getElementById("studentName");
const birthday = document.getElementById("birthday");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const sex = document.getElementById("Nam");

const listStudent = document.getElementById("listStudent");
const listPage = document.getElementById("listPage");
const floatingInsertSelect =document.getElementById("floatingInsertSelect");
//Định nghĩa số dữ liệu trên trang
const recordSperPage = 3;
// Lấy dữ liệu từ localStorage, nếu null thì khởi tạo mảng studentManagement
var studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
let classesManagement = JSON.parse(localStorage.getItem("classesManagement")) || [];
let student = JSON.parse(localStorage.getItem("student")) || [];
// Định nghĩa số dữ liệu trên mỗi trang
const recordsPerPage = 3;


//search 
let btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", function(){
    const searchInputValue = document.getElementById("courseNameSearch"); 
    let searchListCourse = [];
    studentManagement.filter(function(element){
        let valueOfSearchInput = (searchInputValue.value)?.toLowerCase(); 
        let valueOfStudentManagement = (element.courseName)?.toLowerCase();
        if(valueOfStudentManagement?.includes(valueOfSearchInput)){
            searchListCourse.push(element);
        }
        let listCourse=document.getElementById("listCourse");
        listCourse.innerHTML="";
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
    if (indexTo > student.length) {
        indexTo = student.length;
    }
    
    listStudent.innerHTML = "";
    for (let index = indexFrom; index < indexTo; index++) {
        var sex = student[index].sex ? 'Nam' : 'Nu';
        var status = "";
        if(student[index].status=="1"){
            status="Đang học";
        }else if(student[index].status=="2"){
            status= "Chờ lớp";
        }
        else if(student[index].status=="3"){
            status= "Bảo lưu - Đình chỉ";
        }
        else if(student[index].status=="4"){
            status= "Tốt nghiệp";
        }
        //  tạo ra các id động, cho phép bạn dễ dàng xác định nút được nhấp vào
        listStudent.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student[index].studentId}</td>
                <td>${student[index].courseNameSelect}</td>
                <td>${student[index].classNameSelect}</td>
                <td>${student[index].studentName}</td>
                <td>${sex}</td>
                <td>${student[index].birthday}</td>
                <td>${student[index].address}</td>
                <td>${student[index].email}</td>
                <td>${status}</td>
                <td>
                    <button class="btn btn-primary"id="btnStudentEdit_${index}" onClick="openEditStudent(${index})">Edit</button>
                    <button class="btn btn-danger"id="btnStudentDelete_${index}" onClick="openDeleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    }

}

function openDeleteCourse(index) {
    const deleteCourseData = student[index];
    document.getElementById("deleteCourseId").innerHTML = deleteCourseData.courseId;
    document.getElementById("deleteCourseName").innerHTML = deleteCourseData.courseName;
    $("#deleteCourse").modal('show')

}
//fuction delete
let confirmDeleteButton = document.getElementById("confirmDeleteButton");
confirmDeleteButton.addEventListener("click", function () {

    let deleteCourseId = document.getElementById("deleteCourseId").innerHTML;
    student = student.filter(element => element.courseId != deleteCourseId)
    // Lưu đè student vào localStorage
    localStorage.setItem("student", JSON.stringify(student));
    renderData(1);
})
function openEditCourse(index) {
    // Lấy dữ liệu từ hàng tương ứng và điền vào modal chỉnh sửa
    const courseData = student[index];
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
    return Math.ceil(student.length / recordSperPage)

}
// Function thực hiện thêm mới dữ liệu
function createStudent() {
    const sex = Nam.checked;
    const status = document.getElementById("floatingInsertSelect").value;
    const newStudent = {
        studentId: studentId.value,
        courseNameSelect: courseNameSelect.value,
        classNameSelect: classNameSelect.value,
        studentName: studentName.value,
        sex:sex,
        birthday: birthday.value,
        address: address.value,
        email: email.value,
        phone: phone.value,
        status: status
    };

    if (!validateStudentId(newStudent.studentId) || !validateClassId(newStudent.classId)) {
        return;
    }
    //Thêm newStudent vào studentManagement
    student.push(newStudent);
    // Lưu đè studentManagement vào localStorage
    localStorage.setItem("student", JSON.stringify(student));

    resetForm();
    renderData(1);
}
//validateClassId
function validateClassId(classId){  //tu input truyen vao
    for(let i=0; i<classesManagement.length;i++){
                 //trong localstorage 
     if(classesManagement[i].insertClassId===classId){ 
        return true;
     }
    }
    alert("Mã lớp học không khớp.")
    return false;
 }
// click vào edit thì hiển thị all data trên form
function initUpdate() {
    // Lấy dữ liệu từ localStorage, nếu null thì khởi tạo mảng studentManagement
    const student = JSON.parse(localStorage.getItem("student")) || [];
    // Lấy thông tin danh mục cần cập nhật
    let index = getClassId(studentManagement, courseId);//Chỉ số phần tử sinh viên cần cập nhật
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
    const editButton = document.getElementById(`btnCourseEdit_${index}`);
    const deleteButton = document.getElementById(`btnCourseDelete_${index}`)

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

// Các function validateCourseId
function validateStudentId(studentId) {
    let indexFind = student.findIndex(element => element.studentId == studentId);
    if (indexFind >= 0) {
        //Đã tồn tại mã danh mục trong studentManagement
        document.getElementById("studentId").style.backgroundColor = "yellow";
        alert("Mã danh mục đã tồn tại");
        return false;
    }
    document.getElementById("studentId").style.backgroundColor = "";
    return true;
}

// //Function validateCourseName
// function validateCourseName(courseName) {
//     let indexFind = studentManagement.findIndex(element => element.courseName == courseName);
//     if (indexFind >= 0) {
//         document.getElementById("courseName").style.backgroundColor = "yellow";
//         alert("Tên danh mục đã tồn tại");
//         return false;
//     }
//     document.getElementById("courseName").style.backgroundColor = "";
//     return true;
// }

//fuction reset ô input
function resetForm() {
    document.getElementById("studentId").value = "";
    document.getElementById("classId").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("birthday").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("Nam").checked = true;

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
    createStudent();

});

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
