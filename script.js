document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");
  const tableBody = document.querySelector("#studentTable tbody");

  let students = JSON.parse(localStorage.getItem("students")) || [];
  let editIndex = null;

  function renderTable() {
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.roll}</td>
        <td>${student.course}</td>
        <td>
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const course = document.getElementById("course").value.trim();

    if (!name || !roll || !course) {
      alert("Please fill all fields!");
      return;
    }

    if (editIndex === null) {
      students.push({ name, roll, course });
    } else {
      students[editIndex] = { name, roll, course };
      editIndex = null;
    }

    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
    form.reset();
  });

  window.deleteStudent = (index) => {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
  };

  window.editStudent = (index) => {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("course").value = student.course;
    editIndex = index;
  };

  renderTable();
});
