import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";

const VerifyEmail = () => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate, checkAuth]);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `/api/user/${id}/verify/${token}` // Include token in URL
        );
        setVerificationStatus("success");
        toast.success(response.data.message);
      } catch (error) {
        setVerificationStatus("error");
        toast.error(
          error.response?.data?.message || "Email verification failed"
        );
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [id, token]);

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center p-4">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="mb-4 flex flex-col items-center" role="status">
            <svg
              aria-hidden="true"
              className="w-20 h-20 animate-spin text-indigo-500 fill-gray-700"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          <span className="text-lg">Verifying your email...</span>
        </div>
      ) : (
        <div className="text-center space-y-6">
          {verificationStatus === "success" ? (
            <>
              <h2 className="text-2xl font-bold text-green-500">
                Email Verified Successfully!
              </h2>
              <p className="text-gray-300">
                You can now log in to your account
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-red-500">
                Verification Failed
              </h2>
              <p className="text-gray-300">
                The verification link is invalid or expired
              </p>
            </>
          )}

          {!isAuthenticated && (
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
            >
              Go to Login
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
