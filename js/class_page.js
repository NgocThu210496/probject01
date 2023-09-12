let insertClassId = document.getElementById("insertClassId");
let insertCourseId = document.getElementById("insertCourseId");
let insertClassName = document.getElementById("insertClassName");
let insertClassTeacher = document.getElementById("insertClassTeacher");
let insertClassNumber = document.getElementById("insertClassNumber");
let insertClassDescribe = document.getElementById("insertClassDescribe");
let active = document.getElementById("active");

const editClassId = document.getElementById("editClassId");
const editClassName = document.getElementById("editClassName");
const editClassTeacher = document.getElementById("editClassTeacher");
const editClassNumber = document.getElementById("editClassNumber");
const editClassDescribe = document.getElementById("editClassDescribe");
const status = document.getElementById("floatingEditSelect");

let classActive = [];  //Số lớp đang hoạt động
let classClose = []; //Số lớp đã kết thúc
let classPending = []; //Số lớp đang chờ



const listClass = document.getElementById("listClass");
const listPageClass = document.getElementById("listPageClass");


//Định nghĩa số dữ liệu trên trang
const recordSperPageClass = 4;
// Lấy dữ liệu từ localStorage, nếu null thì khởi tạo mảng studentManagement
let classesManagement = JSON.parse(localStorage.getItem("classesManagement")) || [];
let studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
// Định nghĩa số dữ liệu trên mỗi trang
const recordsPerPageClass = 4;

//search
let btnClassSearch = document.getElementById("btnClassSearch");
btnClassSearch.addEventListener("click", function () {
    const searchInputValue = document.getElementById("classNameSearch");
    let searchListClass = [];
    let result = classesManagement.filter(function (element) {
        let valueOfSearchInput = (searchInputValue.value)?.toLowerCase();
        let valueOfclassesManagement = (element.insertClassName)?.toLowerCase();
        return valueOfclassesManagement?.includes(valueOfSearchInput)
    })
    let listClass = document.getElementById("listClass");
    listClass.innerHTML = "";
    console.log("=>", result)

    result.forEach((element, index) => {
        var status = "";
        if (element.status == "1") {
            status = "Đang học";
        } else if (element.status == "2") {
            status = "Chờ lớp";
        }
        else if (element.status == "3") {
            status = "Bảo lưu - Đình chỉ";
        }
        else if (element.status == "4") {
            status = "Tốt nghiệp";
        }
        listClass.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${element.insertClassId}</td>
                <td>${element.insertCourseId}</td>
                <td>${element.insertClassName}</td>
                <td>${element.insertClassTeacher}</td>
                <td>${element.insertClassNumber}</td>
                <td>${element.insertClassDescribe}</td>
                <td>${status}</td>
               
               <td>
                <button class="btn btn-primary"id="btnCourseEdit_${index}" onClick="openEditCourse(${index})">Edit</button>
                <button class="btn btn-danger"id="btnCourseDelete_${index}" onClick="openDeleteCourse(${index})">Delete</button>
                </td>
            </tr>
        `;

    })


});

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
    if (indexTo > classesManagement.length) {
        indexTo = classesManagement.length;
    }
    listClass.innerHTML = "";
    for (let index = indexFrom; index < indexTo; index++) {
        var status = "";
        if (classesManagement[index].status == "1") {
            status = "Đang chờ";
        } else if (classesManagement[index].status == "2") {
            status = "Hoạt động";
        }
        else if (classesManagement[index].status == "3") {
            status = "Kết thúc";
        }
        //  tạo ra các id động, cho phép bạn dễ dàng xác định nút được nhấp vào
        listClass.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${classesManagement[index].insertClassId}</td>
                <td>${classesManagement[index].insertCourseId}</td>
                <td>${classesManagement[index].insertClassName}</td>
                <td>${classesManagement[index].insertClassTeacher}</td>
                <td>${classesManagement[index].insertClassNumber}</td>
                <td>${classesManagement[index].insertClassDescribe}</td>
                <td>${status}</td>
                <td>
                    <button class="btn btn-primary"id="btnClassEdit_${index}" onClick="openEditClass(${index})">Edit</button>
                    <button class="btn btn-danger"id="btnClassDelete_${index}" onClick="openDeleteClass(${index})">Delete</button>
                </td>
            </tr>
        `;
    }

    renderCourseId();

}
function openDeleteClass(index) {
    const deleteClasseData = classesManagement[index];
    document.getElementById("deleteClassId").innerHTML = deleteClasseData.insertClassId;
    document.getElementById("deleteClassName").innerHTML = deleteClasseData.insertClassName;
    $("#deleteCalss").modal('show')

}
//fuction delete
let confirmClassDeleteButton = document.getElementById("confirmClassDeleteButton");
confirmClassDeleteButton.addEventListener("click", function () {

    let deleteClassId = document.getElementById("deleteClassId").innerHTML;
    classesManagement = classesManagement.filter(element => element.insertClassId != deleteClassId)
    // Lưu đè classesManagement vào localStorage
    localStorage.setItem("classesManagement", JSON.stringify(classesManagement));
    renderDataClass(1);
})
function openEditClass(index) {
    const classData = classesManagement[index];
    document.getElementById("editClassId").value = classData.insertClassId;
    document.getElementById("editCourseId").value = classData.insertCourseId;
    document.getElementById("editClassName").value = classData.insertClassName;
    document.getElementById("editClassTeacher").value = classData.insertClassTeacher;
    document.getElementById("editClassNumber").value = classData.insertClassNumber;
    document.getElementById("editClassDescribe").value = classData.insertClassDescribe;
    document.getElementById("floatingEditSelect")[classData.status - 1].selected = true;

    $("#editClassModal").modal('show');
}
//tính tổng số trang
function getTotalPageClass() {
    return Math.ceil(classesManagement.length / recordSperPageClass)

}
// Function thực hiện thêm mới dữ liệu
function createClass() {
    const status = document.getElementById("floatingSelect").value;
    const newClass = {
        insertClassId: insertClassId.value,
        insertCourseId: insertCourseId.value,
        insertClassName: insertClassName.value,
        insertClassTeacher: insertClassTeacher.value,
        insertClassNumber: insertClassNumber.value,
        insertClassDescribe: insertClassDescribe.value,
        status: status
    };

    if (!validateClassId(newClass.insertClassId) || !validateClassName(newClass.insertClassName) || !validateCourseId(newClass.insertCourseId)) {
        return;
    }
    //Thêm newClass vào classesManagement
    classesManagement.push(newClass);
    // Lưu đè classesManagement vào localStorage
    localStorage.setItem("classesManagement", JSON.stringify(classesManagement));

    resetFormClass();
    renderClassData();
    calculateSumOfClassActive();
    calculateSumOfClassClose();
    calculateSumOfclassPending();
}

//Lọc tất cả những phần tử theo các trạng thái: hoạt động, kết thúc và đang chờ 
//1. Lọc ra phần tử có trạng thái là hoạt động 
function calculateSumOfClassActive() {
    classActive = classesManagement.filter((classes) => {
        return classes.status == "2";
    })
    // console.log("Active",classActive.length)
    localStorage.setItem("classActive", classActive.length);
}
//2. Lọc ra phần tử có trạng thái đã kết thúc 
function calculateSumOfClassClose(){
    classClose = classesManagement.filter((e)=>{
        return e.status == "3";
    })
    // console.log("classClose: ", classClose);
   localStorage.setItem("classClose",classClose.length);
} 

//3. Lọc ra phần tử có trạng thái đã dang cho
function calculateSumOfclassPending(){
    classPending = classesManagement.filter((item)=>{
        return item.status == "1";
    })
    //  console.log("classPending: ", classPending);
 localStorage.setItem("classPending",classPending.length);
} 

//validateCourseId
function validateCourseId(insertCourseId) {  //tu input truyen vao
    for (let i = 0; i < studentManagement.length; i++) {
        //trong localstorage 
        if (studentManagement[i].courseId === insertCourseId) {
            return true;
        }
    }
    alert("Mã khoá học không khớp.")
    return false;
}

//update
function updateClass(event) {
    // Lấy dữ liệu từ hàng tương ứng và điền vào modal chỉnh sửa
    event.preventDefault();
    classesManagement.forEach(function (classes) {
        if (classes.insertClassId == editClassId.value) {
            classes.insertCourseId == insertCourseId.value,
                classes.insertClassName = editClassName.value,
                classes.insertClassTeacher = editClassTeacher.value,
                classes.insertClassNumber = editClassNumber.value,
                classes.insertClassDescribe = editClassDescribe.value,
                classes.status = document.getElementById("floatingEditSelect").value;
        }
    })

    localStorage.setItem("classesManagement", JSON.stringify(classesManagement));

    // window.onload = renderDataClass(1);
    resetFormClassEdit();
    renderDataClass(1)
    calculateSumOfClassActive();
    calculateSumOfClassClose();
    calculateSumOfclassPending();

}

for (let index = 0; index < studentManagement.length; index++) {
    const editCLassButton = document.getElementById(`btnClassEdit_${index}`);
    const deleteClassButton = document.getElementById(`btnClassDelete_${index}`)

};
// Hàm lấy thông tin danh mục theo mã danh mục
function getClassId(studentManagement, insertClassId) {
    for (let index = 0; index < studentManagement.length; index++) {
        if (studentManagement[index].insertClassId == insertClassId) {
            return index;
        }
    }
    return -1;// Trả về -1 nếu không tìm thấy courseId tương ứng trong mảng.
}

// Các function validateClassId
function validateClassId(insertClassId) {
    let indexFind = studentManagement.findIndex(element => element.insertClassId == insertClassId);
    if (indexFind >= 0) {
        //Đã tồn tại mã danh mục trong studentManagement
        document.getElementById("insertClassId").style.backgroundColor = "yellow";
        alert("Mã danh mục đã tồn tại");
        return false;
    }
    document.getElementById("insertClassId").style.backgroundColor = "";
    return true;
}
function renderCourseId() {
    console.log("renderCourseId");
    let studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
    let insertCourseId = document.getElementById("insertCourseId");
    insertCourseId.innerHTML = "";
    for (let i = 0; i < studentManagement.length; i++) {
        insertCourseId.innerHTML += `<option value="${studentManagement[i].courseId}">${studentManagement[i].courseId}</option>`;
    }
}

//Function validateClassName
function validateClassName(insertClassName) {
    let indexFind = studentManagement.findIndex(element => element.insertClassName == insertClassName);
    if (indexFind >= 0) {
        document.getElementById("insertClassName").style.backgroundColor = "yellow";
        alert("Tên danh mục đã tồn tại");
        return false;
    }
    document.getElementById("insertClassName").style.backgroundColor = "";
    return true;
}


//fuction reset ô input
function resetFormClass() {
    document.getElementById("insertClassId").value = "";
    document.getElementById("insertClassName").value = "";
    document.getElementById("insertClassTeacher").value = "";
    document.getElementById("insertClassNumber").value = "";
    document.getElementById("insertClassDescribe").value = "";
    //document.getElementById("active").checked = true

}
function resetFormClassEdit() {
    document.getElementById("editClassId").value = "";
    document.getElementById("editCourseId").value = "";
    document.getElementById("editClassName").value = "";
    document.getElementById("editClassTeacher").value = "";
    document.getElementById("editClassNumber").value = "";
    document.getElementById("editClassDescribe").value = "";
    document.getElementById("floatingEditSelect")[0].selected = true;

}

function renderClassData() {
    let classesManagement = JSON.parse(localStorage.getItem("classesManagement")) || [];
    listClass.innerHTML = "";
    classesManagement.forEach((courseElement, index) => {

        listClass.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${courseElement.insertClassId}</td>
            <td>${courseElement.insertCourseId}</td>
            <td>${courseElement.insertClassName}</td>
            <td>${courseElement.insertClassTeacher}</td>
            <td>${courseElement.insertClassDescribe}</td>
            <td>${courseElement.insertClassNumber}</td>
            <td>${courseElement.status}</td>
            <td>
                <button class="btn btn-primary" data-bs-target="editClassModal" id="btnClassEdit_${index}" onClick="openEditClass('${index}')">Edit</button>
                <button class="btn btn-danger" id="btnClassDelete_${index}" onClick="openDeleteClass(${index})">Delete</button>
            </td>
        </tr>`


    });

}
renderClassData();

// Thêm sự kiện click cho nút Submit
document.getElementById("btnClassSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    createClass();

});

//logout
const btnLogOut = document.getElementById("btnLogOut");
btnLogOut.addEventListener("click", function () {
    //xoa item trong localStoreage có id 
    localStorage.removeItem("userLogin");
    //chuyển về trang login
    window.location.href = "login_page.html"

})

// Chạy hàm renderData khi trang được tải
window.onload = renderDataClass(1);