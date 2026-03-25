import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emails, setEmails] = useState("");
  const [message, setMessage] = useState("");

  // 🔐 AUTH
  const handleAuth = async () => {
  const url = isLogin
  ? "https://bulkmail-1-evj5.onrender.com/api/auth/login"
  : "https://bulkmail-1-evj5.onrender.com/api/auth/register";

  try {
    const res = await axios.post(url, { email, password });

    if (isLogin) {
      console.log("TOKEN 👉", res.data.token); // debug

      setToken(res.data.token);   // 🔥 THIS LINE IS IMPORTANT
      setMessage("Login successful ✅");
    } else {
      setMessage("Registered successfully ✅");
    }
  } catch (err) {
    setMessage("Auth failed ❌");
  }
};

  // 📧 SEND MAIL
  const sendMail = async () => {
    try {
      const res = await axios.post(
        "https://bulkmail-1-evj5.onrender.com/api/mail/send",
        {
          subject,
          body,
          recipients: emails.split(","),
        },
        {
          headers: { 
  Authorization: `Bearer ${token}` 
}
        }
      );
      setMessage(res.data.message);
    } catch {
      setMessage("Failed to send emails ❌");
    }
  };

  // 📄 CSV UPLOAD
  const uploadCSV = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const res = await axios.post(
        "https://bulkmail-1-evj5.onrender.com/api/upload" ,
        formData
      );
      setEmails(res.data.emails.join(","));
      setMessage("CSV uploaded ✅");
    } catch {
      setMessage("CSV upload failed ❌");
    }
  };

  // 🔐 LOGIN PAGE
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">

          <h1 className="text-3xl font-bold text-center mb-6">
            📧 Bulk Mail System
          </h1>

          <input
            className="w-full p-3 border rounded mb-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 border rounded mb-3"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleAuth}
            className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700"
          >
            {isLogin ? "Login" : "Register"}
          </button>

          <p
            className="text-center mt-3 text-indigo-600 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Create account" : "Already have account?"}
          </p>

          {message && (
            <p className="text-center mt-3 text-gray-600">{message}</p>
          )}
        </div>
      </div>
    );
  }

  // 🚀 DASHBOARD
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-indigo-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">📧 Mail App</h2>

        <ul className="space-y-4">
          <li className="bg-indigo-500 p-2 rounded">Send Mail</li>
          <li className="hover:bg-indigo-500 p-2 rounded cursor-pointer">
            History (Coming)
          </li>
          <li
            className="hover:bg-red-500 p-2 rounded cursor-pointer mt-10"
            onClick={() => setToken("")}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-6">Send Bulk Emails</h1>

        <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl">

          <input
            className="w-full p-3 border rounded mb-3"
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            className="w-full p-3 border rounded mb-3"
            rows="5"
            placeholder="Write your email..."
            onChange={(e) => setBody(e.target.value)}
          />

          <input
            className="w-full p-3 border rounded mb-3"
            placeholder="Emails (comma separated)"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
          />

          <input
            type="file"
            onChange={uploadCSV}
            className="mb-3"
          />

          <button
            onClick={sendMail}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            Send Emails 🚀
          </button>

          {message && (
            <p className="mt-4 text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}