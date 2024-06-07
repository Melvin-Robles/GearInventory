document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("viewRegister")
    .addEventListener("click", function () {
      toggleViewRegister();
    });

  document.getElementById("viewLogin").addEventListener("click", function () {
    toggleViewRegister();
  });

  function toggleViewRegister() {
    var initElement = document.getElementById("init");
    var regisElement = document.getElementById("regis");

    if (
      initElement.style.display === "block" ||
      initElement.style.display === ""
    ) {
      initElement.style.display = "none";
      regisElement.style.display = "block";
    } else {
      initElement.style.display = "block";
      regisElement.style.display = "none";
    }
  }

});

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

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("emailRegis").value;
    const password = document.getElementById("passwordRegis").value;
    const celphone = document.getElementById("celphone").value;
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;



    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const registrationDate =
          firebase.firestore.FieldValue.serverTimestamp();
        const rol = email.endsWith("@impresos.com")
          ? "admin"
          : email.endsWith("@impresos.user")
          ? "user"
          : null;

        db.collection("users")
          .doc(user.uid)
          .set({
            email: user.email,
            celphone: celphone,
            name: name,
            surname: surname,
            registrationDate: registrationDate,
            rol: rol,
          })
          .then(() => {
            console.log("User data saved successfully");
            doLogin(email, password);

          })
          .catch((error) => {
            console.error("Error saving user data: ", error);
          });
      })
      .catch((error) => {
        console.error("Error registering user: ", error);
      });
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    doLogin(email, password);

      
  });

  function doLogin(email, password){
    auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (user) {
        const userId = user.uid;

        const userDocRef = firebase
          .firestore()
          .collection("users")
          .doc(userId);

        userDocRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              sessionStorage.setItem('dataUser', JSON.stringify(userData))
              window.location.href = "pages/home.html";
            } else {
              console.log(
                "No se encontraron datos para el usuario con el UID:",
                userId
              );
            }
          })
          .catch((error) => {
            console.error("Error al obtener los datos del usuario:", error);
          });
      } else {
        console.log("No hay usuario autenticado");
      }
      console.log("User signed in:", user);
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
    });
  }