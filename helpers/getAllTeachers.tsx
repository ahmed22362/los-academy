export const getAllTeachers = (id : String) => {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.json()).then(data => {
        console.log(data)
    })
}