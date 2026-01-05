import React from "react";
import NavbarComp from "./Navbar";
import Footer from "./Footer";

const UserContentPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavbarComp />
      <div className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 px-8 py-6">
            <h1
              className="text-3xl font-extrabold text-black text-center tracking-tight"
              style={{ marginTop: "150px" }}
            >
              User Content Policy
            </h1>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {/* User-Generated Content Guidelines */}
            <section className="space-y-6">
              <div className="border-b-2 border-indigo-100 pb-2">
                <h2 className="text-2xl font-bold text-indigo-800">
                  User-Generated Content Guidelines
                </h2>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-4 text-lg">
                <li>
                  Users may submit information only if they reasonably believe
                  it to be true.
                </li>
                <li>
                  Do not upload sensitive personal data (phone numbers,
                  addresses, ID numbers).
                </li>
                <li>
                  Uploaded photos must not violate privacy or dignity of
                  individuals.
                </li>
                <li>
                  MFN reserves the right to verify, edit, or remove
                  user-submitted content.
                </li>
              </ul>
            </section>

            <hr className="border-gray-200" />

            {/* Takedown & Correction Policy */}
            <section className="space-y-6">
              <div className="border-b-2 border-indigo-100 pb-2">
                <h2 className="text-2xl font-bold text-indigo-800">
                  Takedown & Correction Policy
                </h2>
              </div>
              <div className="text-gray-700 text-lg space-y-4">
                <p>
                  If any individual or authority believes that content available
                  on MFN is inaccurate, outdated, or violates privacy, they may
                  request correction or removal by contacting the MFN support
                  team.
                </p>
                <p className="font-semibold">Requests should include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Case reference or record details</li>
                  <li>Reason for takedown or correction</li>
                  <li>Supporting proof, if available</li>
                </ul>
                <p className="italic bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                  MFN will make reasonable efforts to review and act upon valid
                  requests in a timely manner.
                </p>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Limitation of Liability */}
            <section className="space-y-6">
              <div className="border-b-2 border-indigo-100 pb-2">
                <h2 className="text-2xl font-bold text-indigo-800">
                  Limitation of Liability
                </h2>
              </div>
              <div className="text-gray-700 text-lg">
                <p className="font-semibold mb-2">
                  MFN and Dishaayein Technology shall not be responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Errors or omissions in the data</li>
                  <li>
                    Actions taken based on information displayed on the platform
                  </li>
                  <li>
                    Any loss, injury, or damage resulting from the use of the
                    platform
                  </li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Governing Law & Jurisdiction */}
            <section className="space-y-6">
              <div className="border-b-2 border-indigo-100 pb-2">
                <h2 className="text-2xl font-bold text-indigo-800">
                  Governing Law & Jurisdiction
                </h2>
              </div>
              <div className="text-gray-700 text-lg leading-relaxed">
                <p>
                  These Terms and Policies shall be governed by and interpreted
                  in accordance with the laws of India. Any disputes shall be
                  subject to the exclusive jurisdiction of the courts of India.
                </p>
              </div>
            </section>
          </div>

          <div className="bg-gray-50 px-8 py-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} MFN (Missing Found Network) - All
            Rights Reserved.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserContentPolicy;
