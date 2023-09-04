
let arrs = [
    {
        id: "001",
        name: "thu",
        emali: "thu@gmail.com",
        students: [
            {
                studentId: "SV01",
                studentName: "UT1"

            },
            {
                studentId: "SV02",
                studentName: "UT2"
            }

        ]

    },
    {
        id: "002",
        name: "th2",
        emali: "thu2@gmail.com",
        students: [
            {
                studentId: "SV03",
                studentName: "UT3"

            },
            {
                studentId: "SV03",
                studentName: "UT4"
            }

        ]
    }
]
function renderData() {
    arrs.forEach(element => {
        console.log("element",element)
        element.students.forEach(student=>{
            // console.log(student.studentName)

        })

    });
}
renderData();