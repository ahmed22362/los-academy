
export const getCurrentTeacher = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data
}
