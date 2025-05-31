import React from "react";

const Features = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
            Designed for business teams like yours
          </h2>
          <p className="sm:text-xl text-gray-400">
            Here at Swift we focus on markets where technology, innovation, and
            capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          {/* Feature 1 */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-indigo-900 lg:h-12 lg:w-12">
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 001.414 1.414L7.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Marketing</h3>
            <p className="text-gray-400">
              Plan it, create it, launch it. Collaborate seamlessly with your
              organization and hit your marketing goals every month with our
              marketing plan.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-indigo-900 lg:h-12 lg:w-12">
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84l5.144 2.7a1 1 0 00.8 0l5.144-2.7a1 1 0 000-1.84l-7-3z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Leadership</h3>
            <p className="text-gray-400">
              Protect your organization, devices and stay compliant with our
              structured workflows and custom permissions made for your needs.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-indigo-900 lg:h-12 lg:w-12">
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v4a2 2 0 01-2 2H2a2 2 0 01-2-2V8a2 2 0 012-2h4z"
                  clipRule="evenodd"
                ></path>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Business Automation
            </h3>
            <p className="text-gray-400">
              Auto-assign tasks, send Slack messages, and much more. Keep up with
              hundreds of new templates to help you get started.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-indigo-900 lg:h-12 lg:w-12">
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Finance & Audit
            </h3>
            <p className="text-gray-400">
              Audit-proof software built for critical financial operations like
              month-end close and quarterly budgeting.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-indigo-900 lg:h-12 lg:w-12">
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Enterprise Design
            </h3>
            <p className="text-gray-400">
              Craft beautiful, delightful experiences for both marketing and
              product with real cross-company collaboration.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-indigo-900 lg:h-12 lg:w-12">
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 00-.39 1.406l.09.3a.75.75 0 001.3.364l.2-.23a2 2 0 012.9 0l.2.23a.75.75 0 001.3-.364l.09-.3a1.532 1.532 0 00-.39-1.406zM10 5.5a.75.75 0 01.75.75v2.94l1.8-2.08a.75.75 0 011.1 1.02l-3.3 3.8a.75.75 0 01-1.1 0l-3.3-3.8a.75.75 0 011.1-1.02l1.8 2.08V6.25A.75.75 0 0110 5.5z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Operations</h3>
            <p className="text-gray-400">
              Keep your company’s lights on with customizable, intuitive,
              structured workflows built for all efficient teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
