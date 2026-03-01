$(document).ready(function () {
  dispEmployee();
  $(".form-new").on("submit", function (e) {
    e.preventDefault();

    let name = $("#name").val();
    let role = $("#role").val();
    let salary = $("#salary").val();

    let isValid = true;

    if (name === "") {
      $("#nameError").text("please Fill Out This Field");
      $("#name").css("border", "2px solid red");
      isValid = false;
    } else {
      $("#nameError").text("");
      $("#name").css("border", "");
    }

    if (role === "") {
      $("#roleError").text("please Fill Out This Field");
      $("#role").css("border", "2px solid red");
      isValid = false;
    } else {
      $("#roleError").text("");
      $("#role").css("border", "");
    }

    if (salary === "") {
      $("#salaryError").text("please Fill Out This Field");
      $("#salary").css("border", "2px solid red");
      isValid = false;
    } else if (salary <= 0) {
      $("#salaryError").text("Enter valid salary");
      $("#salary").css("border", "2px solid red");
      isValid = false;
    } else {
      $("#salaryError").text("");
      $("#salary").css("border", "");
    }

    if (isValid) {
      //   alert("Form Submitted Successfully!");
      let employee = {
        name: name,
        role: role,
        salary: salary,
      };

      let employees = JSON.parse(localStorage.getItem("employees")) || [];

      employees.push(employee);

      localStorage.setItem("employees", JSON.stringify(employees));

      dispEmployee();
      this.reset();
    }
  });

  // Filter Change Event
  $("#filterRole").on("change", function () {
    dispEmployee();
  });

  // Display Function
  function dispEmployee() {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let selectedRole = $("#filterRole").val();

  let filteredEmployees;

  if (selectedRole === "") {
    filteredEmployees = employees;
  } else {
    filteredEmployees = employees.filter(function (emp) {
      return emp.role === selectedRole;
    });
  }

  let tableData = "";
  let totalSalary = 0;

  if (filteredEmployees.length === 0) {
    tableData = `
      <tr>
        <td colspan="4" style="text-align:center; color:red; font-weight:bold;">
          No Records Found
        </td>
      </tr>
    `;
    $("#employeeBody").html(tableData);
    return;
  }

  filteredEmployees.forEach(function (emp, index) {
    totalSalary += Number(emp.salary);

    tableData += `
      <tr>
        <td>${index + 1}</td>
        <td>${emp.name}</td>
        <td>${emp.role}</td>
        <td>Rs ${emp.salary}</td>
      </tr>
    `;
  });

  tableData += `
    <tr style="font-weight:bold; background:#f2f2f2;">
      <td colspan="3" style="text-align:right;">Total Salary</td>
      <td>Rs ${totalSalary}</td>
    </tr>
  `;

  $("#employeeBody").html(tableData);
}
});
