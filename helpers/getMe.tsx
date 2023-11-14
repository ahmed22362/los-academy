
export const getCurrentTeacher = async (id: string | any, token: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/teacher/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data
}
