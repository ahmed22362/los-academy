
export const getCurrentTeacher = async (id: string | any, token: any) => {
    if(id && token) {
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
}
