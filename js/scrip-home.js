
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
 
 
 document.addEventListener("DOMContentLoaded", function () {

firebase.firestore().collection("product_to_registered").get()
.then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    rendericeDrop(doc.data())
  });
})
.catch((error) => {
  console.error("Error al obtener los datos de la colección 'users':", error);
});

firebase.firestore().collection("materials_used").get()
.then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    rendericeDropMaterial(doc.data())
  });
})
.catch((error) => {
  console.error("Error al obtener los datos de la colección 'users':", error);
});

firebase.firestore().collection("machinery_used").get()
.then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    rendericeDropMaquinas(doc.data())
  });
})
.catch((error) => {
  console.error("Error al obtener los datos de la colección 'users':", error);
});

firebase.firestore().collection("department_production").get()
.then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    rendericeDropArea(doc.data())
  });
})
.catch((error) => {
  console.error("Error al obtener los datos de la colección 'users':", error);
});


function rendericeDrop(data) {
    const dropdownTipo = document.getElementById("dropdownTipo");
    Object.keys(data).forEach((category) => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = category;
      data[category].forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        optgroup.appendChild(optionElement);
      });
      dropdownTipo.appendChild(optgroup);
    });
  }

function rendericeDropMaterial(data) {
    const dropdownTipo = document.getElementById("dropdownMateriales");
    Object.keys(data).forEach((category) => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = category;
      data[category].forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        optgroup.appendChild(optionElement);
      });
      dropdownTipo.appendChild(optgroup);
    });
  }

  function rendericeDropMaquinas(data) {
    const dropdownTipo = document.getElementById("dropdownMaquinas");
    Object.keys(data).forEach((category) => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = category;
      data[category].forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        optgroup.appendChild(optionElement);
      });
      dropdownTipo.appendChild(optgroup);
    });
  }
  
  function rendericeDropArea(data) {
    const dropdownTipo = document.getElementById("dropdownArea");
    Object.keys(data).forEach((category) => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = category;
      data[category].forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        optgroup.appendChild(optionElement);
      });
      dropdownTipo.appendChild(optgroup);
    });
  }




  });