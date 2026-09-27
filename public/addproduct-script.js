// ============================================
// Add Product Form
// ============================================
const addForm = document.getElementById("add-product-form");

addForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // สร้าง object จาก form
  const newProduct = {
    name: document.getElementById("product-name").value,
    producer: document.getElementById("product-producer").value,
    price: document.getElementById("product-price").value,
    category: document.getElementById("product-category").value,
    contact: document.getElementById("product-contact").value || null
  };

  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "เพิ่มไม่สำเร็จ");
    }

    // Success!
    addForm.reset();
    loadProducts();
    alert("✅ เพิ่มผลิตภัณฑ์สำเร็จ");

  } catch (error) {
    alert("❌ เกิดข้อผิดพลาด: " + error.message);
  }
});