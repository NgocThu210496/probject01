let insertClassId = document.getElementById("insertClassId");
let insertClassName = document.getElementById("insertClassName");
let insertClassTeacher = document.getElementById("insertClassTeacher");
let insertClassNumber = document.getElementById("insertClassNumber");
let insertClassDescribe = document.getElementById("insertClassDescribe");
let active = document.getElementById("active");

const listClass = document.getElementById("listClass");
const listPageClass = document.getElementById("listPageClass");

//Định nghĩa số dữ liệu trên trang
const recordSperPageClass = 4;
// Lấy dữ liệu từ localStorage, nếu null thì khởi tạo mảng studentManagement
// var studentManagement = JSON.parse(localStorage.getItem("studentManagement")) || [];
// Định nghĩa số dữ liệu trên mỗi trang
const recordsPerPageClass = 4;

// //search
// let btnSearch = document.getElementById("btnSearch");
// btnSearch.addEventListener("click", function(){
//     // Lấy dữ liệu từ localStorage, nếu null thì khởi tạo mảng studentManagement
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

let studentManagement =
  JSON.parse(localStorage.getItem("studentManagement")) || [];

// Function thực hiện render dữ liệu theo trang
function renderDataClass(page) {
  // 1. Render danh sách trang
  const totalPage = getTotalPageClass();
  const pagePaginationClass = document.getElementById("pagePaginationClass");
  pagePaginationClass.innerHTML = "";
  for (let index = 1; index <= totalPage; index++) {
    pagePaginationClass.innerHTML += `
            <li class="page-item"><a class="page-link" href="javascript:renderDataClass(${index})">${index}</a></li>
            `;
  }

  // 2. Render dữ liệu của page trên table
  let indexFrom = (page - 1) * recordsPerPageClass;
  let indexTo = page * recordsPerPageClass;
  if (indexTo > studentManagement.length) {
    indexTo = studentManagement.length;
  }
  // listClass.innerHTML = "";
  // for (let index = indexFrom; index < indexTo; index++) {
  //     const status = studentManagement[index].status ? 'Active' : 'Inactive';
  //     //  tạo ra các id động, cho phép bạn dễ dàng xác định nút được nhấp vào
  //     listClass.innerHTML += `
  //         <tr>
  //             <td>${index + 1}</td>
  //             <td>${studentManagement[index].insertClassId}</td>
  //             <td>${studentManagement[index].insertClassName}</td>
  //             <td>${studentManagement[index].insertClassTeacher}</td>
  //             <td>${studentManagement[index].insertClassNumber}</td>
  //             <td>${studentManagement[index].insertClassDescribe}</td>
  //             <td>${status}</td>
  //             <td>
  //                 <button class="btn btn-primary"id="btnClassEdit_${index}" onClick="openEditClass(${index})">Edit</button>
  //                 <button class="btn btn-danger"id="btnClassDelete_${index}" onClick="openDeleteClass(${index})">Delete</button>
  //             </td>
  //         </tr>
  //     `;
  // }
}
function openDeleteClass(index) {
  const deleteClasseData = studentManagement[index];
  document.getElementById("deleteClassId").innerHTML =
    deleteClasseData.insertClassId;
  document.getElementById("deleteClassName").innerHTML =
    deleteClasseData.insertClassName;
  $("#deleteCalss").modal("show");
}
//fuction delete
let confirmClassDeleteButton = document.getElementById(
  "confirmClassDeleteButton"
);
confirmClassDeleteButton.addEventListener("click", function () {
  let deleteClassId = document.getElementById("deleteClassId").innerHTML;
  studentManagement = studentManagement.filter(
    (element) => element.insertClassId != deleteClassId
  );
  // Lưu đè studentManagement vào localStorage
  localStorage.setItem("studentManagement", JSON.stringify(studentManagement));
  renderDataClass(1);
});
function openEditClass(index) {
  // Lấy dữ liệu từ hàng tương ứng và điền vào modal chỉnh sửa
  const classData = studentManagement[index];
  document.getElementById("editClassId").value = classData.insertClassId;
  document.getElementById("editClassName").value = classData.insertClassName;
  document.getElementById("editClassTeacher").value =
    classData.insertClassTeacher;
  document.getElementById("editClassNumber").value =
    classData.insertClassNumber;
  document.getElementById("editClassDescribe").value =
    classData.insertClassDescribe;

  // Hiển thị modal chỉnh sửa
  // document.getElementById("editModal").style.display = "block";
  //cách hiển thị modal
  $("#editClassModal").modal("show");
}
//tính tổng số trang
function getTotalPageClass() {
  return Math.ceil(studentManagement.length / recordSperPageClass);
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

  if (
    !validateClassId(newClass.insertClassId) ||
    !validateClassName(newClass.insertClassName)
  ) {
    return;
  }
  //Thêm newClass vào studentManagement
  studentManagement.push(newClass);
  // Lưu đè studentManagement vào localStorage
  localStorage.setItem("studentManagement", JSON.stringify(studentManagement));

  resetFormClass();
  renderDataClass(1);
}
// click vào edit thì hiển thị all data trên form
function initUpdateClass() {
  // Lấy dữ liệu từ localStorage, nếu null thì khởi tạo mảng studentManagement
  const studentManagement =
    JSON.parse(localStorage.getItem("studentManagement")) || [];
  // Lấy thông tin danh mục cần cập nhật
  let index = getClassId(studentManagement, insertClassId); //Chỉ số phần tử sinh viên cần cập nhật
  // Hiển thị thông tin danh mục cần cập nhật lên Input Form
  document.getElementById("insertClassId").value =
    studentManagement[index].insertClassId;
  document.getElementById("insertClassName").value =
    studentManagement[index].insertClassName;
  document.getElementById("insertClassTeacher").value =
    studentManagement[index].insertClassTeacher;
  document.getElementById("insertClassNumber").value =
    studentManagement[index].insertClassNumber;
  document.getElementById("insertClassDescribe").value =
    studentManagement[index].insertClassDescribe;
  if (studentManagement[index].status == "active") {
    document.getElementById("active").checked = true;
  } else {
    document.getElementById("inActive").checked = true;
  }
  //Không cho phép sửa mã courseId form khi cập nhật - readonly
  document.getElementById("insertClassId").readOnly = true;
  //Chuyển action thành update
  resetFormClass();
}
//update
function updateClass() {
  // 1. Lấy thông tin khoá học trên form
  let classUpdate = getDataClass();
  // 2. Cập nhật thông tin course vào studentManagement
  let indexUpdate = getCourseId(studentManagement, courseUpdate.courseId);
  studentManagement[indexUpdate] = courseUpdate;
  // 3. Lưu mảng vào local storage
  localStorage.setItem("studentManagement", JSON.stringify(studentManagement));
  resetFormClass();
}

for (let index = 0; index < studentManagement.length; index++) {
  const editCLassButton = document.getElementById(`btnClassEdit_${index}`);
  const deleteClassButton = document.getElementById(`btnClassDelete_${index}`);
}
// Hàm lấy thông tin danh mục theo mã danh mục
function getClassId(studentManagement, insertClassId) {
  for (let index = 0; index < studentManagement.length; index++) {
    if (studentManagement[index].insertClassId == insertClassId) {
      return index;
    }
  }
  return -1; // Trả về -1 nếu không tìm thấy courseId tương ứng trong mảng.
}

// Các function validateClassId
function validateClassId(insertClassId) {
  let indexFind = studentManagement.findIndex(
    (element) => element.insertClassId == insertClassId
  );
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
  let indexFind = studentManagement.findIndex(
    (element) => element.insertClassName == insertClassName
  );
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

function renderClassData() {
  listClass.innerHTML = "";
  studentManagement.forEach((courseElement) => {
    courseElement.arrClass?.forEach((classElement, index) => {
      listClass.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${classElement.classId}</td>
                <td>${classElement.className}</td>
                <td>${classElement.lecturer}</td>
                <td>${classElement.description}</td>
                <td>${classElement.totalNumber}</td>
                <td>${classElement.status}</td>
                <td>
                    <button class="btn btn-primary"id="btnClassEdit_${index}" onClick="openEditClass(${index})">Edit</button>
                    <button class="btn btn-danger"id="btnClassDelete_${index}" onClick="openDeleteClass(${index})">Delete</button>
                </td>
            </tr>`;
    });
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
document
  .getElementById("btnClassSubmit")
  .addEventListener("click", function (event) {
    event.preventDefault();
    createClass();
  });

//logout
const btnLogOut = document.getElementById("btnLogOut");
btnLogOut.addEventListener("click", function () {
  //xoa item trong localStoreage có id
  localStorage.removeItem("userLogin");
  //chuyển về trang login
  window.location.href = "login_page.html";
});
//ghi bay
// Chạy hàm renderData khi trang được tải
window.onload = renderDataClass(1);
