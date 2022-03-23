import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';

import {
  updateProfile,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  getRedirectResult,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBjr-ZpWK_pg0Apckfty-O56ZqnFhwSO_U',
  authDomain: 'valorant-social.firebaseapp.com',
  projectId: 'valorant-social',
  storageBucket: 'valorant-social.appspot.com',
  messagingSenderId: '700869464423',
  appId: '1:700869464423:web:88689d128213e38acb1fc2',
  measurementId: 'G-1KJ7QLNHYF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const user = auth.currentUser;

// registro de usuario
export const createU = (email, password, nameUser, userLast, nickName) => {
  createUserWithEmailAndPassword(auth, email, password, nameUser, userLast, nickName)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('El usuario ha sido creado');
      window.location.hash = '#/';
      updateProfile(auth.currentUser, {
        displayName: nameUser,
      });
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('El correo o la contraseña son incorrectos, intentalo de nuevo');
      console.log(errorCode + errorMessage);
    });
};

// registro con google
export const whithGoogle = () => {
  signInWithPopup(auth, provider);
  getRedirectResult(auth)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      window.location.hash = '#/board';
      alert('El usuario se ha registrado con exito');
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode + errorMessage);
    });
};

//Iniciar sesion
export const loginInit = (userEmail, userPassword) => {
  signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.hash = '#/board';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('El usuario o la contraseña son incorrectas');
      console.log(errorCode + errorMessage);
    });
};

// cerrar Sesión
export const close = () => {
  signOut(auth).then(() => {
    window.location.hash = '#/';
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage);
  });
};

// observador
export const lookout = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      window.location.hash = '#/board';
    } else if (!window.location.hash.includes('registerPage')) {
      window.location.hash = '#/';
    }
  });
};
