// ============================================
// Edit Modal Elements
// ============================================
const modal = document.getElementById("edit-modal");
const closeBtn = document.getElementById("modal-close");
const cancelBtn = document.getElementById("cancel-btn");
const editForm = document.getElementById("edit-form");

// ============================================
// Open/Close Modal
// ============================================
function openEditModal(product) {
  // Populate form
  document.getElementById("edit-id").value = product.id;
  document.getElementById("edit-name").value = product.name;
  document.getElementById("edit-producer").value = product.producer;
  document.getElementById("edit-price").value = product.price;
  document.getElementById("edit-category").value = product.category;
  document.getElementById("edit-contact").value = product.contact || "";

  // Show modal
  modal.classList.remove("hidden");
}

function closeEditModal() {
  modal.classList.add("hidden");
  editForm.reset();
}

// ปิดด้วยปุ่ม X และปุ่ม Cancel
closeBtn.addEventListener("click", closeEditModal);
cancelBtn.addEventListener("click", closeEditModal);

// ปิดเมื่อคลิก overlay (พื้นหลัง)
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeEditModal();
  }
});

// ปิดด้วย ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeEditModal();
  }
});

// ============================================
// Submit Edit Form
// ============================================
editForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = document.getElementById("edit-id").value;
  const updatedData = {
    name: document.getElementById("edit-name").value,
    producer: document.getElementById("edit-producer").value,
    price: Number(document.getElementById("edit-price").value),
    category: document.getElementById("edit-category").value,
    contact: document.getElementById("edit-contact").value || null
  };

  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "แก้ไขไม่สำเร็จ");
    }

    closeEditModal();
    loadProducts();
    alert("✅ บันทึกสำเร็จ");

  } catch (error) {
    alert("❌ " + error.message);
  }
});

// ============================================
// Attach Edit Handlers (call after render)
// ============================================
function attachEditHandlers() {
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      // Fetch product data
      const response = await fetch(`/api/products/${id}`);
      const product = await response.json();

      openEditModal(product);
    });
  });
}