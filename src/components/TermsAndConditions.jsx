import React from "react";
import NavbarComp from "./Navbar";
import Footer from "./Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavbarComp />
      <div className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-orange-500 px-8 py-6">
            <h1
              className="text-3xl font-extrabold text-black text-center tracking-tight"
              style={{ marginTop: "150px" }}
            >
              Terms & Conditions / नियम और शर्तें
            </h1>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {/* Hindi Section */}
            <section className="space-y-6">
              <div className="border-b-2 border-orange-100 pb-2">
                <h2 className="text-2xl font-bold text-orange-800">
                  नियम और शर्तें
                </h2>
              </div>
              <ol className="list-decimal pl-6 text-gray-700 space-y-4 text-lg">
                <li>
                  MFN (Missing Found Network) का उपयोग करने से आप इन सभी नियमों
                  और शर्तों से सहमत होते हैं।
                </li>
                <li>
                  यह प्लेटफॉर्म केवल सूचनात्मक उद्देश्य के लिए है। MFN किसी भी
                  केस में आधिकारिक निर्णय लेने वाला प्राधिकरण नहीं है।
                </li>
                <li>
                  उपयोगकर्ता द्वारा अपलोड की गई किसी भी जानकारी की ज़िम्मेदारी
                  उसी उपयोगकर्ता की होगी।
                </li>
                <li>
                  किसी भी प्रकार की झूठी, भ्रामक, आपत्तिजनक या गैर-कानूनी
                  जानकारी पोस्ट करना प्रतिबंधित है।
                </li>
                <li>
                  MFN को यह अधिकार है कि वह किसी भी कंटेंट को बिना पूर्व सूचना
                  हटाए या संशोधित करे।
                </li>
                <li>
                  प्लेटफॉर्म का उपयोग किसी भी व्यावसायिक, राजनीतिक या अवैध
                  उद्देश्य के लिए नहीं किया जा सकता।
                </li>
                <li>
                  MFN किसी भी प्रत्यक्ष या अप्रत्यक्ष नुकसान के लिए उत्तरदायी
                  नहीं होगा।
                </li>
              </ol>
            </section>

            <hr className="border-gray-200" />

            {/* English Section */}
            <section className="space-y-6">
              <div className="border-b-2 border-orange-100 pb-2">
                <h2 className="text-2xl font-bold text-orange-800">
                  Terms and Conditions
                </h2>
              </div>
              <ol className="list-decimal pl-6 text-gray-700 space-y-4 text-lg">
                <li>
                  By accessing or using MFN (Missing Found Network), you agree
                  to be bound by these Terms and Conditions.
                </li>
                <li>
                  MFN is an information-only platform and does not act as an
                  official authority for any case.
                </li>
                <li>
                  Users are solely responsible for the accuracy and legality of
                  the information they submit.
                </li>
                <li>
                  Posting false, misleading, offensive, or unlawful content is
                  strictly prohibited.
                </li>
                <li>
                  MFN reserves the right to remove or modify any content without
                  prior notice.
                </li>
                <li>
                  The platform must not be used for any commercial, political,
                  or illegal activities.
                </li>
                <li>
                  MFN shall not be liable for any direct or indirect damages
                  arising from the use of the platform.
                </li>
              </ol>
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

export default TermsAndConditions;
