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
btnClassSearch.addEventListener("click", function(){
    const searchInputValue = document.getElementById("classNameSearch").value; 
    let searchListClass = [];
    const result = classesManagement.filter((element) => element.insertClassName.includes(searchInputValue));

    // ///////
    //  // 1. Render danh sách trang
    //  const totalPage =  Math.ceil(result.length / recordSperPageClass);
    //  const pagePaginationClass = document.getElementById("pagePaginationClass");
    //  pagePaginationClass.innerHTML = "";
    //  for (let index = 1; index <= totalPage; index++) {
    //      pagePaginationClass.innerHTML +=
    //          `
    //          <li class="page-item"><a class="page-link" href="javascript:renderDataClass(${index})">${index}</a></li>
    //          `;
    //  }
 
    //  // 2. Render dữ liệu của page trên table
    //  let indexFrom = (page - 1) * recordsPerPageClass;
    //  let indexTo = page * recordsPerPageClass;
    //  if (indexTo > result.length) {
    //      indexTo = result.length;
    //  }
    //  listClass.innerHTML = "";
    //  for (let index = indexFrom; index < indexTo; index++) {
    //      var status = "";
    //      if(result[index].status=="1"){
    //          status="Đang chờ";
    //      }else if(result[index].status=="2"){
    //          status= "Hoạt động";
    //      }
    //      else if(result[index].status=="3"){
    //          status= "Kết thúc";
    //      }
    //      //  tạo ra các id động, cho phép bạn dễ dàng xác định nút được nhấp vào
    //      listClass.innerHTML += `
    //          <tr>
    //              <td>${index + 1}</td>
    //              <td>${classesManagement[index].insertClassId}</td>
    //              <td>${classesManagement[index].insertCourseId}</td>
    //              <td>${classesManagement[index].insertClassName}</td>
    //              <td>${classesManagement[index].insertClassTeacher}</td>
    //              <td>${classesManagement[index].insertClassNumber}</td>
    //              <td>${classesManagement[index].insertClassDescribe}</td>
    //              <td>${status}</td>
    //              <td>
    //                  <button class="btn btn-primary"id="btnClassEdit_${index}" onClick="openEditClass(${index})">Edit</button>
    //                  <button class="btn btn-danger"id="btnClassDelete_${index}" onClick="openDeleteClass(${index})">Delete</button>
    //              </td>
    //          </tr>
    //      `;
    //  }
    // ////
    
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
        if(classesManagement[index].status=="1"){
            status="Đang chờ";
        }else if(classesManagement[index].status=="2"){
            status= "Hoạt động";
        }
        else if(classesManagement[index].status=="3"){
            status= "Kết thúc";
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
    document.getElementById("editClassName").value = classData.insertClassName;
    document.getElementById("editClassTeacher").value = classData.insertClassTeacher;
    document.getElementById("editClassNumber").value = classData.insertClassNumber;
    document.getElementById("editClassDescribe").value = classData.insertClassDescribe;
   //
    document.getElementById("floatingEditSelect")[classData.status-1].selected = true;
  
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

    if (!validateClassId(newClass.insertClassId) || !validateClassName(newClass.insertClassName)||!validateCourseId(newClass.insertCourseId)) {
        return;
    }
    //Thêm newClass vào classesManagement
    classesManagement.push(newClass);
    // Lưu đè classesManagement vào localStorage
    localStorage.setItem("classesManagement", JSON.stringify(classesManagement));

    resetFormClass();
    renderClassData();
}
//validateCourseId
function validateCourseId(insertCourseId){  //tu input truyen vao
   for(let i=0; i<studentManagement.length;i++){
                //trong localstorage 
    if(studentManagement[i].courseId===insertCourseId){ 
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
    classesManagement.forEach(function(classes){
       if(classes.insertClassId == editClassId.value){
        classes.insertClassName = editClassName.value, 
        classes.insertClassTeacher = editClassTeacher.value, 
        classes.insertClassNumber =  editClassNumber.value, 
        classes.insertClassDescribe = editClassDescribe.value, 
        classes.status = document.getElementById("floatingEditSelect").value;
       }
    })

    localStorage.setItem("classesManagement", JSON.stringify(classesManagement));
    // window.onload = renderDataClass(1);
    resetFormClassEdit();
    renderDataClass(1)

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
    document.getElementById("active").checked = true;

}
function resetFormClassEdit() {
    document.getElementById("editClassId").value = "";
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

//lấy thông tin course trên form và trả về đối tượng course đó
// function getDataClass() {
//     let insertClassId = document.getElementById("editClassId").value;
//     let insertClassName = document.getElementById("editClassName").value;
//     let insertClassTeacher = document.getElementById("editClassTeacher").value;
//     let insertClassNumber = document.getElementById("editClassNumber").value;
//     let insertClassDescribe = document.getElementById("editClassDescribe").value;
//     let status = document.getElementById("activeEditClass").checked;
//     // let status = document.querySelector("input[type='radio']:checked").value;
//     let getClass = { insertClassId, insertClassName, insertClassTeacher, insertClassNumber,insertClassDescribe,status };
//     return getClass;
// }

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
 //ghi bay
// Chạy hàm renderData khi trang được tải
window.onload = renderDataClass(1);