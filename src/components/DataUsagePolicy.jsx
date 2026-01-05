import React from "react";
import NavbarComp from "./Navbar";
import Footer from "./Footer";

const DataUsagePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavbarComp />
      <div className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-green-600 px-8 py-6" >
            <h1
              className="text-3xl font-extrabold text-black text-center tracking-tight"
              style={{ marginTop: "150px" }}
            >
              Data Usage Policy
            </h1>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-green-800 border-b-2 border-green-100 pb-2">
                1. Data Sources
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
                <li>
                  Publicly accessible government portals (e.g., ZIPNET – Delhi
                  Police)
                </li>
                <li>News publications and verified public records</li>
                <li>User-submitted information (subject to moderation)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-green-800 border-b-2 border-green-100 pb-2">
                2. Nature of Data
              </h2>
              <p className="text-gray-700 text-lg">
                MFN may display the following non-sensitive information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
                <li>Name, age, gender</li>
                <li>Photograph (if publicly available)</li>
                <li>Location and date related to missing/found cases</li>
                <li>General descriptive details</li>
              </ul>
              <p className="text-gray-600 italic mt-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                Sensitive personal information such as contact numbers, exact
                addresses, FIR details, or family member information is not
                intentionally published.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-green-800 border-b-2 border-green-100 pb-2">
                3. Purpose of Data Usage
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
                <li>
                  To assist in locating missing persons or identifying found
                  individuals
                </li>
                <li>
                  To create public awareness and facilitate information sharing
                </li>
                <li>
                  To act as a reference platform directing users to official
                  sources
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-green-800 border-b-2 border-green-100 pb-2">
                4. Data Limitations
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
                <li>MFN does not claim ownership of government data</li>
                <li>
                  All government-origin data remains the property of the
                  respective authority
                </li>
                <li>Data is presented in a read-only, informational manner</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-green-800 border-b-2 border-green-100 pb-2">
                5. Data Retention & Updates
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
                <li>Data may be periodically reviewed, updated, or removed</li>
                <li>Outdated or resolved cases may be archived or deleted</li>
                <li>
                  Users may request correction or removal of data by contacting
                  the MFN support team
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-green-800 border-b-2 border-green-100 pb-2">
                6. User Responsibilities
              </h2>
              <p className="text-gray-700 text-lg font-semibold">
                Users agree:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
                <li>
                  Not to misuse data for commercial, political, or illegal
                  purposes
                </li>
                <li>
                  Not to attempt data scraping, bulk downloading, or
                  redistribution
                </li>
                <li>
                  To respect the privacy and dignity of individuals mentioned on
                  the platform
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-green-800 border-b-2 border-green-100 pb-2">
                7. Compliance
              </h2>
              <p className="text-gray-700 text-lg">
                MFN aims to operate in compliance with applicable Indian laws,
                including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
                <li>Information Technology Act, 2000</li>
                <li>Digital Personal Data Protection (DPDP) Act, 2023</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-green-800 border-b-2 border-green-100 pb-2">
                8. External Links
              </h2>
              <p className="text-gray-700 text-lg">
                MFN may provide links to official government portals for
                verification. MFN is not responsible for the content or privacy
                practices of external websites.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-green-800 border-b-2 border-green-100 pb-2">
                9. Policy Updates
              </h2>
              <p className="text-gray-700 text-lg">
                This Data Usage Policy may be updated from time to time.
                Continued use of MFN constitutes acceptance of the revised
                policy.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-800 font-bold">
                Owner & Operator:{" "}
                <span className="text-green-700">Dishaayein Technology</span>
              </p>
              <p className="text-gray-800 font-bold">
                Platform:{" "}
                <span className="text-green-700">
                  MFN – Missing Found Network
                </span>
              </p>
            </div>
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

export default DataUsagePolicy;
