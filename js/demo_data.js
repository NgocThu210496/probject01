//data caafn lưu trữ truwosc trong localStorage
//Thông tin khóa học, lớp, sinh viên
const studentManagement = [{
    courseId: "RA01",
    courseName: "Khoá học",
    courseTime: 1000,
    status: true,
    arrClass: [{
        classId: "C001",
        className: "Js230627",
        descriptions: "Mô tả 1",
        totaNumber: 3,
        lecturer: "Nguyễn Duy Quang",
        status: "Đang chờ",//Đang chờ - Kết thúc - Hoạt động
        arrStudent: [{
            studentId: "SV001",
            studentName: "Thu Nguyen",
            year: 1996,
            address: "Đà Nẵng",
            email: "Ngocthu6778@gmail.com",
            phone: "0906342587",
            sex: true,
            status: "Đang học"// chờ lớp, bảo lưu, đình chỉ, tốt nghiệp
        }],
        arrStudent: [{
            studentId: "SV002",
            studentName: "Ngoc Thu",
            year: 1996,
            address: "Ha Noi",
            email: "Ngocthu6778@gmail.com",
            phone: "0906347564",
            sex: true,
            status: "Đang học"// chờ lớp, bảo lưu, đình chỉ, tốt nghiệp
        }]
    }],
    arrClass: [{
        classId: "C002",
        className: "Js230627",
        descriptions: "Mô tả 2",
        totaNumber: 3,
        lecturer: "Nguyễn Duy Hung",
        status: "Đang chờ",//Đang chờ - Kết thúc - Hoạt động
        arrStudent: [{
            studentId: "SV003",
            studentName: "Nguyễn A",
            year: 1996,
            address: "Đà Nẵng",
            email: "utut@gmail.com",
            phone: "0906342587",
            sex: true,
            status: "Đang học"// chờ lớp, bảo lưu, đình chỉ, tốt nghiệp
        }],
        arrStudent: [{
            studentId: "SV004",
            studentName: "NGuyễn Thị C",
            year: 1996,
            address: "Đà Nẵng",
            email: "htuthu@gmail.com",
            phone: "0906347564",
            sex: true,
            status: "Chờ lớp"//Đang học, chờ lớp, bảo lưu, đình chỉ, tốt nghiệp
        }]
    }]
},
{
    courseId: "RA02",
    courseName: "Khoá học",
    courseTime: 1000,
    status: true,
    arrClass: [{
        classId: "C003",
        className: "Js230627",
        descriptions: "Mô tả 1",
        totaNumber: 3,
        lecturer: "Nguyễn An",
        status: "Đang chờ",//Đang chờ - Kết thúc - Hoạt động
        arrStudent: [{
            studentId: "SV005",
            studentName: "Nguyen V",
            year: 1996,
            address: "Đà Nẵng",
            email: "Ngocthu6778@gmail.com",
            phone: "0906342587",
            sex: true,
            status: "Đang học"// chờ lớp, bảo lưu, đình chỉ, tốt nghiệp
        }],
        arrStudent: [{
            studentId: "SV006",
            studentName: "Nguyen Ut",
            year: 1996,
            address: "Sai Gon",
            email: "Ngocthu6778@gmail.com",
            phone: "09067356344",
            sex: true,
            status: "Đang học"// chờ lớp, bảo lưu, đình chỉ, tốt nghiệp
        }]
    }]
}

]
localStorage.setItem("studentManagement",JSON.stringify(studentManagement));

//Thông tin tài khoản để login
const userSystem=[{
    email:"admin@gmail.com",
    password:"123456",
    fullname:"Nguyen Van A",
    status: true//true: hoạt động - false: Đang bị khóa
},
{
    email:"nguyenvana@gmail.com",
    password:"123456",
    fullname:"Nguyen Van A",
    status: true//true: hoạt động - false: Đang bị khóa
},
{
    email:"nguyenvanb@gmail.com",
    password:"123",
    fullname:"Nguyen Van B",
    status: false//true: hoạt động - false: Đang bị khóa
}
]
localStorage.setItem("userSystem",JSON.stringify(userSystem));
//neu dang nhap ok thi vao trang home_page