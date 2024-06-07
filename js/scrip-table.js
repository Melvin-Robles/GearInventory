
const firebaseConfig = {
    apiKey: "AIzaSyD8VNMK5XNyvXzEFi8dwVNp9sp9X5FwDZ4",
    authDomain: "gear-inventory-3f86a.firebaseapp.com",
    projectId: "gear-inventory-3f86a",
    storageBucket: "gear-inventory-3f86a.appspot.com",
    messagingSenderId: "16789192574",
    appId: "1:16789192574:web:e5d4ee5fa3f656c09cbd2f",
  };
  
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth(app);
 
 
  window.eliminarProducto = function(id) {
    console.log(`Eliminar producto: ${id}`);
    db.collection("products_save").doc(id).delete().then(() => {
      console.log("Documento eliminado con éxito");
      window.location.reload();
    }).catch((error) => {
      console.error("Error al eliminar el documento:", error);
    });
  };

  // Función para editar un producto
window.editarProducto = function(id) {
  // Obtener los datos del registro a editar
  db.collection("products_save").doc(id).get().then((doc) => {
    if (doc.exists) {
      // Redirigir a la página de edición y pasar los datos del registro como parámetros en la URL
      window.location.href = `../pages/edita.html?id=${id}&nombre=${doc.data().nombre}&fechaIngreso=${doc.data().fechaIngreso}&maquinaria=${doc.data().maquinaria}&tipoMaterial=${doc.data().tipoMaterial}&tipoProducto=${doc.data().tipoProducto}&cantidadProducto=${doc.data().cantidadProducto}&area=${doc.data().area}`;
    } else {
      console.log("No se encontró el registro a editar");
    }
  }).catch((error) => {
    console.error("Error al obtener los datos del registro a editar:", error);
  });
}


document.addEventListener('DOMContentLoaded', () => {

  const nameInHome = document.getElementById('NameUser');

const dataUser = JSON.parse(sessionStorage.getItem('dataUser'));
const nombres = dataUser.name.split(' '); 
const primerNombre = nombres[0];
const apellidos = dataUser.surname.split(' '); 
const primerApellido = apellidos[0];

if(dataUser.rol == 'admin'){
  nameInHome.textContent = 'Bienvenid@ ' + primerNombre + ' ' + primerApellido + '⭐';
}else{
  nameInHome.textContent = 'Bienvenid@ ' + primerNombre + ' ' + primerApellido + '♾️';
}


// Obtener una referencia a la tabla
let tableBody = document.querySelector("table tbody");
let loadingMessage = document.getElementById("loadingMessage");
let noRecordsMessage = document.getElementById("noRecordsMessage");

// Mostrar mensaje de carga
loadingMessage.style.display = "block";

// Obtener los datos de la colección "products_save" y mostrarlos en la tabla
db.collection("products_save").get().then((querySnapshot) => {
  // Ocultar mensaje de carga
  loadingMessage.style.display = "none";

  if (querySnapshot.size > 0) {
    querySnapshot.forEach((doc) => {
      var producto = doc.data();
      
      // Crear una nueva fila en la tabla con los datos del producto
      var newRow = tableBody.insertRow();
      newRow.insertCell(0).appendChild(document.createTextNode(doc.id));
      newRow.insertCell(1).appendChild(document.createTextNode(producto.nombre));
      newRow.insertCell(2).appendChild(document.createTextNode(producto.fechaIngreso));
      newRow.insertCell(3).appendChild(document.createTextNode(producto.maquinaria));
      newRow.insertCell(4).appendChild(document.createTextNode(producto.tipoMaterial));
      newRow.insertCell(5).appendChild(document.createTextNode(producto.tipoProducto));
      newRow.insertCell(6).appendChild(document.createTextNode(producto.cantidadProducto));

      const nameInHome = document.getElementById('NameUser');

      const dataUser = JSON.parse(sessionStorage.getItem('dataUser'));

      if(dataUser.rol == 'admin'){
        newRow.insertCell(7).innerHTML = '<button type="button" onclick="window.editarProducto(\'' + doc.id + '\')" class="btn btn-warning btn-sm me-2">Editar</button>' + 
        '<button type="button" class="btn btn-danger btn-sm" onclick="window.eliminarProducto(\'' + doc.id + '\')">Eliminar</button>';

      }else{
        newRow.insertCell(7).innerHTML = '<button type="button" onclick="window.editarProducto(\'' + doc.id + '\')" class="btn btn-warning btn-sm me-2">Editar</button>';

      }

    });
    
    // Mostrar la tabla
    tableBody.style.display = "table-row-group";
  } else {
    // Mostrar mensaje "Sin registros"
    noRecordsMessage.style.display = "block";
  }
}).catch((error) => {
  console.error("Error al obtener los datos de la colección 'products_save':", error);
});

// Función para eliminar un producto
function eliminarProducto(id) {
  // Eliminar el documento correspondiente en la colección "products_save"
  db.collection("products_save").doc(id).delete().then(() => {
    console.log("Documento eliminado con éxito");
    // Recargar la página para reflejar los cambios
    window.location.reload();
  }).catch((error) => {
    console.error("Error al eliminar el documento:", error);
  });
}




  });
  