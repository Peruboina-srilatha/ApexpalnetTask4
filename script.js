// ===== NAVIGATION =====
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}
function saveProfile() {
  let name = document.getElementById("name").value;
  let skills = document.getElementById("skills").value;
  let email = document.getElementById("email").value;

  let profile = { name, skills, email };

  localStorage.setItem("profile", JSON.stringify(profile));
  displayProfile();
}

function displayProfile() {
  let data = JSON.parse(localStorage.getItem("profile"));

  if (data) {
    document.getElementById("profileOutput").innerHTML = `
      <strong>Name:</strong> ${data.name} <br>
      <strong>Skills:</strong> ${data.skills} <br>
      <strong>Email:</strong> ${data.email}
    `;
  }
}

displayProfile();


// ===== TO-DO (LOCAL STORAGE) =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, i) => {
    list.innerHTML += `<li>${task} 
      <button onclick="deleteTask(${i})">❌</button></li>`;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById("taskInput");
  if (input.value) {
    tasks.push(input.value);
    input.value = "";
    showTasks();
  }
}

function deleteTask(i) {
  tasks.splice(i, 1);
  showTasks();
}

showTasks();


// ===== PRODUCTS =====
let products = [
  { name: "Laptop", category: "electronics", price: 50000 },
  { name: "Phone", category: "electronics", price: 20000 },
  { name: "T-Shirt", category: "clothing", price: 500 },
  { name: "Jeans", category: "clothing", price: 1200 }
];

function displayProducts(list) {
  let box = document.getElementById("productList");
  box.innerHTML = "";

  list.forEach(p => {
    box.innerHTML += `
      <div>
        <h4>${p.name}</h4>
        <p>Category: ${p.category}</p>
        <p>Price: ₹${p.price}</p>
      </div>
    `;
  });
}

function filterProducts(cat) {
  if (cat === "all") return displayProducts(products);
  let filtered = products.filter(p => p.category === cat);
  displayProducts(filtered);
}

function sortProducts(type) {
  let sorted = [...products];

  if (type === "low") sorted.sort((a,b)=>a.price-b.price);
  if (type === "high") sorted.sort((a,b)=>b.price-a.price);

  displayProducts(sorted);
}

displayProducts(products);
