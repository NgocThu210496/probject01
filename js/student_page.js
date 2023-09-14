const studentId = document.getElementById("studentId");
const courseNameSelect = document.getElementById("courseNameSelect");
const classNameSelect=document.getElementById("classNameSelect");
const studentName = document.getElementById("studentName");
const birthday = document.getElementById("birthday");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const sex = document.getElementById("Nam");

let editStudentId=document.getElementById("editStudentId");
let editCourseNameSelect=document.getElementById("editCourseNameSelect");
let editClassNameSelect =document.getElementById("editClassNameSelect");
let editStudentName =document.getElementById("editStudentName");
let editBirthday =document.getElementById("editBirthday");
let editAddress = document.getElementById("editAddress");
let editPhone = document.getElementById("editPhone");
let editEmail = document.getElementById("editEmail");
let floatingEdittSelect = document.getElementById("floatingEdittSelect");

const listStudent = document.getElementById("listStudent");
const listPage = document.getElementById("listPage");
const floatingInsertSelect =document.getElementById("floatingInsertSelect");

let arrStudentStudying = [];
let studentPending = [];
let studentReserve = []; //bao luu
let studentGraduate = []; //tot nghiep

//Định nghĩa số dữ liệu trên trang
const recordSperPage = 3;
// Lấy dữ liệu từ localStorage, nếu null thì khởi tạo mảng studentManagement
var studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
let classesManagement = JSON.parse(localStorage.getItem("classesManagement")) || [];
let student = JSON.parse(localStorage.getItem("student")) || [];
// Định nghĩa số dữ liệu trên mỗi trang
const recordsPerPage = 3;

//1. Lọc ra phần tử có trạng thái là dang hoc
function calculateSumOfStudentStudying() {
    arrStudentStudying = student.filter((classes) => {
        return classes.status == "2";
    })
     //console.log("arrStudentStudying.length",arrStudentStudying.length)
    localStorage.setItem("arrStudentStudying", arrStudentStudying.length);
}

//search 
let btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", function(){
    const studentNameSearch = document.getElementById("studentNameSearch"); 
    let searchListStudent = [];//Mảng này sẽ chứa danh sách các khóa học được tìm thấy dựa trên tên nhập vào ô tìm kiếm.
    student.filter(function(element){
        let valueOfSearchInput = (studentNameSearch.value)?.toLowerCase(); 
        let valueOfStudent = (element.studentName)?.toLowerCase();
        if(valueOfStudent?.includes(valueOfSearchInput)){
            searchListStudent.push(element);
        }
        let listStudent=document.getElementById("listStudent");
        listStudent.innerHTML="";
        searchListStudent.forEach((element,index)=>{
            // <td>${element.sex}</td>
            // <td>${element.birthday}</td>
            // <td>${element.address}</td>
            listStudent.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${element.studentId}</td>
                <td>${element.studentName}</td>
                <td>${element.email}</td>
                <td>${element.status}</td>
                <td>${element.classNameSelect}</td>
                <td>${element.courseNameSelect}</td>
                <td>
                    <button class="btn btn-warning"id="btnCourseEdit_${index}" onClick="openEditCourse(${index})">Edit</button>
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
        // <td>${sex}</td>
        //         <td>${student[index].birthday}</td>
        //         <td>${student[index].address}</td>
        listStudent.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student[index].studentId}</td>
                <td>${student[index].studentName}</td>
                <td>${student[index].email}</td>
                <td>${status}</td>
                <td>${student[index].classNameSelect}</td>
                <td>${student[index].courseNameSelect}</td>
                <td>
                    <button class="btn btn-warning" style="color: white;" id="btnStudentEdit_${index}" onClick="openEditStudent(${index})">Edit</button>
                    <button class="btn btn-danger"id="btnStudentDelete_${index}" onClick="openDeleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    }
    renderCourseNameSelect();
    renderClassNameSelect();
}

function openDeleteStudent(index) {
    const deleteStudentData = student[index];
    document.getElementById("deleteStudentId").innerHTML = deleteStudentData.studentId;
    document.getElementById("deleteStudentName").innerHTML = deleteStudentData.studentName;
    $("#deleteStudent").modal('show')

}
//fuction delete
let confirmDeleteButton = document.getElementById("confirmDeleteButton");
confirmDeleteButton.addEventListener("click", function () {

    let deleteStudentId = document.getElementById("deleteStudentId").innerHTML;
    console.log("=>delete",deleteStudentId)
    student = student.filter(element => element.studentId != deleteStudentId)
    // Lưu đè student vào localStorage
    localStorage.setItem("student", JSON.stringify(student));
    renderData(1);
})
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

    if (!validateClassId(newStudent.studentId) || !validateCourseNameSelect(newStudent.courseNameSelect)||!validateClassNameSelect(newStudent.classNameSelect)) {
        return;
    }
    //Thêm newStudent vào studentManagement
    student.push(newStudent);
    // Lưu đè studentManagement vào localStorage
    localStorage.setItem("student", JSON.stringify(student));

    resetForm();
    renderData(1);
    calculateSumOfStudentStudying();
}
// Các function validateStudentId
function validateClassId(studentId) {
    let indexFind = student.findIndex(element => element.studentId == studentId);
    if (indexFind >= 0) {
        //Đã tồn tại mã danh mục trong studentManagement
        alert("Mã danh mục đã tồn tại");
        return false;
    }
    return true;
}
//validateCourseNameSelect
function validateCourseNameSelect(courseNameSelect){  //tu input truyen vao
    for(let i=0; i<studentManagement.length;i++){
                 //trong localstorage 
     if(studentManagement[i].courseName===courseNameSelect){ 
        return true;
     }
    }
    alert("Ten khoa học không khớp.")
    return false;
 }
 //renderCourseNameSelect() trong studentManagement[]
 function renderCourseNameSelect() {
    courseNameSelect.innerHTML = "";
    for (let i = 0; i < studentManagement.length; i++) {
        courseNameSelect.innerHTML += `<option value="${studentManagement[i].courseName}">${studentManagement[i].courseName}</option>`;
    }
}

//validate classNameSelect
function validateClassNameSelect(classNameSelect){
    for(let i=0;i<classesManagement.length;i++){
        if(classesManagement[i].insertClassName==classNameSelect){
            return true;
        }
    }
    alert("Ten lop học không khớp.")
    return false;
}
 //renderClassNameSelect() trong studentManagement[]
 function renderClassNameSelect() {
    classNameSelect.innerHTML = "";
    for (let i = 0; i < classesManagement.length; i++) {
        classNameSelect.innerHTML += `<option value="${classesManagement[i].insertClassName}">${classesManagement[i].insertClassName}</option>`;
    }
}
// click vào edit thì hiển thị all data trên form
function openEditStudent(index) {
    // Lấy thông tin danh mục cần cập nhật
    let studentData = student[index];//Chỉ số phần tử sinh viên cần cập nhật
    // Hiển thị thông tin danh mục cần cập nhật lên Input Form
    document.getElementById("editStudentId").value = studentData.studentId;
    document.getElementById("editCourseNameSelect").value = studentData.courseNameSelect;
    document.getElementById("editClassNameSelect").value = studentData.classNameSelect;
    document.getElementById("editStudentName").value = studentData.studentName;
    document.getElementById("editBirthday").value = studentData.birthday;
    document.getElementById("editAddress").value = studentData.address;
    document.getElementById("editPhone").value = studentData.phone;
    document.getElementById("editEmail").value = studentData.email;
    document.getElementById("floatingEdittSelect")[studentData.status-1].selected = true;
    
    if (student[index].sex == "Nam") {
        document.getElementById("Nam").checked = true;
    } else {
        document.getElementById("Nu").checked = true;
    }
    $("#editModal").modal('show');
}
//update
function updateClass(event) {
    event.preventDefault();
    
   // Lấy dữ liệu từ hàng tương ứng và điền vào modal chỉnh sửa
student.forEach(function(element){
    if(element.studentId == editStudentId.value){
        element.courseNameSelect = editCourseNameSelect.value;
        element.classNameSelect=editClassNameSelect.value;
        element.studentName=editStudentName.value;
        element.birthday=editBirthday.value;
        element.address=editAddress.value;
        element.phone=editPhone.value;
        element.email=editEmail.value;
        element.status=document.getElementById("floatingEdittSelect").value;
    }
    
})

    // 3. Lưu mảng vào local storage
    localStorage.setItem("student", JSON.stringify(student));
    //resetForm();
    
    renderData(1)
    resetForm();
    calculateSumOfStudentStudying();
}

//fuction reset ô input
function resetForm() {
    document.getElementById("studentId").value = "";
    document.getElementById("courseNameSelect").value = "";
    document.getElementById("classNameSelect").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("birthday").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("Nam").checked = true;

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
