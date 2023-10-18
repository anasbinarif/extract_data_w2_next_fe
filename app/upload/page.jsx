"use client";

import React, { useState } from "react";
import { Audio, CirclesWithBar } from "react-loader-spinner";
import useStore from "../store";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";

const FileUploadPage = () => {
  const router = useRouter();
  const { username, token, setUsername } = useStore();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleLogout = async () => {
    console.log("Logout button clicked");
    const authToken = token;
    const url =
      "https://extract-data-from-w2docs-django.onrender.com/api/logout/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setUsername("");
      const data = await response.json();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleExtractData = async () => {
    try {
      console.log("Extract Data button clicked for file:", file);
      setLoading(true);

      const url =
        "https://extract-data-from-w2docs-django.onrender.com/api/upload/";
      const user_token = token;

      const formData = new FormData();
      formData.append("pdf_file", file);

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Token ${user_token}`,
        },
        body: formData,
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Login failed. Check your credentials.");
      }
      setLoading(false);
      setUploaded(true);
      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (username == "") {
    return router.push("/");
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex flex-col items-end w-full p-4">
        <button
          className="text-white bg-purple-600 py-2 px-4 rounded-xl"
          onClick={handleLogout}
        >
          <BiLogOut className="inline-block mr-2" />
          Logout
        </button>
        <p className="text-white">{username}</p>
      </div>

      <div className="w-1/3 border border-dashed border-gray-400 p-8 rounded-lg flex items-center">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className=" w-9/12"
        />
        {file && (
          <button
            onClick={handleExtractData}
            className="text-white bg-purple-600 py-2 px-4 rounded"
          >
            Extract Data
          </button>
        )}
      </div>
      <div className="mt-2">
        {loading && (
          <CirclesWithBar
            height="100"
            width="100"
            color="#9a4da9"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
        )}
        {uploaded && <p>Extracted Data</p>}
      </div>
    </div>
  );
};

export default FileUploadPage;
