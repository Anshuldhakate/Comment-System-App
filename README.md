# Comment System Application

## Deployed Link
https://unrivaled-hamster-02dee6.netlify.app

## Description

This is a comment system application built with React, Firebase, and ReactQuill. Users can sign in with Google, post comments, reply to comments, and upload files. The application uses Firestore for storing comments and Firebase Storage for file attachments.

<br/>
<img width="229" alt="Screenshot 2024-08-20 215935" src="https://github.com/user-attachments/assets/81cf2dc2-2be9-42f8-8ec7-54699e2fccc0">

<br/>

## Features

- Google Authentication: Sign in with Google to access the comment system.
- Commenting: Post new comments with rich text support using ReactQuill.
- Replies: Reply to comments, with nested replies up to two levels.
- File Attachments: Upload and attach files (e.g., images) to comments.
- Live Updates: Real-time comment updates using Firestore.
- Responsive Design: Fully responsive UI for seamless use across devices.

## Technologies Used

- **Frontend**: React, ReactQuill, CSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Hosting**: Firebase Hosting (if applicable)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A Firebase project set up and configured.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Anshuldhakate/Comment-System-App.git
    cd your-repo-name
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up Firebase configuration:**

    - Create a `firebase.js` file in the `src` directory with your Firebase configuration:

        ```javascript
        import firebase from 'firebase/compat/app';
        import 'firebase/compat/auth';
        import 'firebase/compat/firestore';
        import 'firebase/compat/storage';

        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID"
        };

        firebase.initializeApp(firebaseConfig);

        const auth = firebase.auth();
        const firestore = firebase.firestore();
        const storage = firebase.storage();
        const googleProvider = new firebase.auth.GoogleAuthProvider();

        export { auth, firestore, storage, googleProvider };
        ```

4. **Run the application:**

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Usage

1. **Sign In:** Click on "Sign in with Google" to authenticate using your Google account.
2. **Post a Comment:** Use the comment input area to post a new comment. You can format your comment with rich text and attach files.
3. **Reply to Comments:** Click "Reply" on any comment to post a reply. Replies will be nested under the parent comment.
4. **File Attachments:** Attach images or files to your comments.

## Contributing

Feel free to submit issues and pull requests. Contributions are welcome!

1. **Fork the repository** and clone it to your local machine.
2. **Create a new branch** for your changes.
3. **Make your changes** and test thoroughly.
4. **Submit a pull request** with a clear description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact [anshuldhakate11@gmail.com](mailto:anshuldhakate11@gmail.com).

