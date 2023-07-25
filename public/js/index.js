const socket = io()


const productoTitle = document.getElementById("producto_title")
const productoDescription = document.getElementById("producto_description")
const productoCode = document.getElementById("producto_code")
const productoPrice = document.getElementById("producto_price")
const productoStock = document.getElementById("producto_stock")
const productoCategory = document.getElementById("producto_category")
const boton = document.getElementById("boton");
const actionAdd = document.getElementById("action_add");
const idEliminar = document.getElementById("id_eliminar")
const btnEliminar = document.getElementById("btn_eliminar");
const actionDelete = document.getElementById("action_delete");

//render lista productos

socket.on("lista_productos", (data) => {
  let form = document.getElementById("form-real-time");
  let element = "";

  data.forEach((product) => {
    element += `
      <ul class="producto">
      <li class="idTitle">${product.id}</li>
      <li><strong>${product.title}</strong></li>
      <li>${product.description}</li>
      <li>$ ${product.price}</li>
      <li>${product.stock}</li>
      <li>${product.category}</li>
      <li>${product.code}</li>
    </ul>`;
  });
  form.innerHTML = element;
});

//agregar producto

boton.addEventListener("click", () => {
  socket.emit("agregar_producto", {
    title: productoTitle.value,
    description: productoDescription.value,
    code: productoCode.value,
    price: productoPrice.value,
    stock: productoStock.value,
    category: productoCategory.value
  })
  actionAdd.innerHTML = ``
})

socket.on("agregar_producto", (data) => {
  if (!data.isComplete) {
    actionAdd.innerHTML = `<p>Complete todos los datos</p>`

  } else if (data.isComplete && data.isDuplicate) {
    actionAdd.innerHTML = `<p>El codigo esta repetido.</p>`

  } else {
    actionAdd.innerHTML = `<p>Producto agregado!!</p>`
  }
})

//eliminar producto

btnEliminar.addEventListener("click", () => {
  const id = Number(idEliminar.value)
  socket.emit("eliminar_producto", { id })
  actionDelete.innerHTML = ""
})

socket.on("eliminar_producto", (data) => {

  if (data.notFound) {
    actionDelete.innerHTML = `<p>Not Found</p>`
  } else {
    actionDelete.innerHTML = `<p>Producto eliminado!!</p>`
  }
})


