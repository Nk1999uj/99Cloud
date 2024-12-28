// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWq9jvv0_Bpoq24DozTBx3WBSBEtysRP0",
  authDomain: "clouds-b5cd6.firebaseapp.com",
  projectId: "clouds-b5cd6",
  storageBucket: "clouds-b5cd6.firebasestorage.app",
  messagingSenderId: "131090349751",
  appId: "1:131090349751:web:4f1ca9e8a3111906189732",
  measurementId: "G-MYHG8F7L5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get the button and file input elements
const uploadButton = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-input');
const gallery = document.getElementById('gallery');

// Handle file upload
uploadButton.addEventListener('click', function() {
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Please select a file to upload!');
        return;
    }

    // Loop through the selected files
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Create a reference in Firebase Storage
        const storageRef = storage.ref('media/' + file.name);

        // Upload the file
        const uploadTask = storageRef.put(file);

        // Monitor the upload state
        uploadTask.on('state_changed', function(snapshot) {
            // Optional: Show upload progress
        }, function(error) {
            console.error('Upload error:', error);
        }, function() {
            // Get the download URL when upload is complete
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                // Create an element to display the uploaded media
                const mediaElement = document.createElement(file.type.startsWith('image') ? 'img' : 'video');
                mediaElement.src = downloadURL;

                if (file.type.startsWith('video')) {
                    mediaElement.controls = true; // Add controls for video
                }

                // Append the media element to the gallery
                gallery.appendChild(mediaElement);
            });
        });
    }
});
