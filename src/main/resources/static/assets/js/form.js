
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("studentForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const student = {
            studentCode: document.getElementById("studentCode").value.trim(),
            fullName: document.getElementById("fullName").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            className: document.getElementById("className").value.trim()
        };

        try {
            const response = await fetch("/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
            });

            if (!response.ok) {
                throw new Error("Không thể thêm sinh viên");
            }

            alert("Thêm sinh viên thành công!");
            window.location.href = "/student.html";

        } catch (error) {
            alert("Lỗi: " + error.message);
        }
    });
});