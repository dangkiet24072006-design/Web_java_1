
document.addEventListener("DOMContentLoaded", () => {
    loadStudents();

    document.getElementById("searchButton")
        .addEventListener("click", searchStudents);

    document.getElementById("searchInput")
        .addEventListener("input", searchStudents);
});

// Tải danh sách hoặc tìm kiếm sinh viên
async function loadStudents(keyword = "") {
    const tbody = document.getElementById("studentTableBody");

    tbody.innerHTML = `
        <tr>
            <td colspan="7" class="empty-message">
                Đang tải dữ liệu...
            </td>
        </tr>
    `;

    try {
        const url = new URL("/api/students", window.location.origin);

        if (keyword.trim() !== "") {
            url.searchParams.set("keyword", keyword.trim());
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Không thể tải dữ liệu sinh viên");
        }

        const students = await response.json();
        renderStudents(students);

    } catch (error) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-message text-danger">
                    Lỗi tải dữ liệu: ${escapeHTML(error.message)}
                </td>
            </tr>
        `;
    }
}

// Tìm kiếm
function searchStudents() {
    const keyword = document.getElementById("searchInput").value;
    loadStudents(keyword);
}

// Hiển thị danh sách
function renderStudents(students) {
    const tbody = document.getElementById("studentTableBody");
    tbody.innerHTML = "";

    if (!students || students.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-message">
                    Không tìm thấy sinh viên
                </td>
            </tr>
        `;
        return;
    }
//sửa sinh viên
    students.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="center">${index + 1}</td>

            <td class="student-code">
                ${escapeHTML(student.studentCode)}
            </td>

            <td>${escapeHTML(student.fullName)}</td>
            <td>${escapeHTML(student.email)}</td>
            <td>${escapeHTML(student.phone)}</td>
            <td>${escapeHTML(student.className)}</td>

            <td>
                <div class="actions">
                    <a
                        href="/form.html?id=${encodeURIComponent(student.id)}&mode=edit"
                        class="action-btn btn-edit"
                        title="Sửa sinh viên">
                        <i class="bi bi-pencil"></i>
                        Sửa
                    </a>

                    <button
                        type="button"
                        class="action-btn btn-delete"
                        title="Xóa sinh viên"
                        data-id="${escapeHTML(student.id)}"
                        data-name="${escapeHTML(student.fullName)}">
                        <i class="bi bi-trash"></i>
                        Xóa
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(row);
    });

    // Gắn sự kiện xóa cho các nút vừa tạo
    tbody.querySelectorAll(".btn-delete").forEach(button => {
        button.addEventListener("click", () => {
            deleteStudent(button.dataset.id, button.dataset.name);
        });
    });
}

// Xóa sinh viên
async function deleteStudent(id, fullName) {
    const confirmed = confirm(
        `Bạn có chắc muốn xóa sinh viên "${fullName}" không?`
    );

    if (!confirmed) return;

    try {
        const response = await fetch(
            `/api/students/${encodeURIComponent(id)}`,
            { method: "DELETE" }
        );

        if (!response.ok) {
            throw new Error("Không thể xóa sinh viên");
        }

        alert("Xóa sinh viên thành công!");

        // Tải lại danh sách, giữ nguyên từ khóa tìm kiếm
        searchStudents();

    } catch (error) {
        alert("Lỗi: " + error.message);
    }
}

// Tránh chèn trực tiếp dữ liệu vào HTML
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}