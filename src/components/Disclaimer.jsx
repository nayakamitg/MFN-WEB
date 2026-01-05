import React from "react";
import NavbarComp from "./Navbar";
import Footer from "./Footer";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavbarComp />
      <div className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-600 px-8 py-6">
            <h1
              className="text-3xl font-extrabold text-black text-center tracking-tight"
              style={{ marginTop: "150px" }}
            >
              Legal Disclaimer / कानूनी अस्वीकरण
            </h1>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {/* Hindi Section */}
            <section className="space-y-6">
              <div className="border-b-2 border-blue-100 pb-2">
                <h2 className="text-2xl font-bold text-blue-800">
                  अस्वीकरण (Disclaimer)
                </h2>
              </div>
              <div className="text-gray-700 leading-relaxed space-y-4 text-lg">
                <p>
                  MFN (Missing Found Network) एक सूचना आधारित डिजिटल प्लेटफॉर्म
                  है, जिसका उद्देश्य गुमशुदा व्यक्तियों, मिले हुए व्यक्तियों,
                  अज्ञात शवों, चोरी हुई वस्तुओं/वाहनों तथा संबंधित सूचनाओं को एक
                  ही स्थान पर सार्वजनिक हित में प्रस्तुत करना है।
                </p>
                <p>
                  इस प्लेटफॉर्म पर प्रदर्शित जानकारी विभिन्न सार्वजनिक रूप से
                  उपलब्ध सरकारी पोर्टल्स, समाचार स्रोतों और उपयोगकर्ताओं द्वारा
                  साझा की गई सूचनाओं पर आधारित हो सकती है, जिनमें ZIPNET (Delhi
                  Police) जैसे आधिकारिक स्रोत भी शामिल हैं।
                </p>
                <p>
                  MFN अथवा Dishaayein Technology किसी भी जानकारी की पूर्ण
                  सटीकता, अद्यतनता या प्रामाणिकता की गारंटी नहीं देता। किसी भी
                  प्रकार की कानूनी, प्रशासनिक या औपचारिक कार्रवाई हेतु संबंधित
                  पुलिस विभाग या सरकारी प्राधिकरण से आधिकारिक पुष्टि अनिवार्य
                  है।
                </p>
                <p>
                  यह प्लेटफॉर्म किसी भी सरकारी एजेंसी से प्रत्यक्ष या अप्रत्यक्ष
                  रूप से संबद्ध, समर्थित या अधिकृत नहीं है, जब तक कि स्पष्ट रूप
                  से उल्लेख न किया गया हो।
                </p>
                <p>
                  MFN पर उपलब्ध जानकारी का दुरुपयोग, व्यावसायिक उपयोग, उत्पीड़न,
                  धोखाधड़ी या किसी भी गैर-कानूनी गतिविधि के लिए उपयोग करना सख्त
                  रूप से प्रतिबंधित है। ऐसे किसी भी दुरुपयोग के लिए MFN
                  उत्तरदायी नहीं होगा।
                </p>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* English Section */}
            <section className="space-y-6">
              <div className="border-b-2 border-blue-100 pb-2">
                <h2 className="text-2xl font-bold text-blue-800">Disclaimer</h2>
              </div>
              <div className="text-gray-700 leading-relaxed space-y-4 text-lg">
                <p>
                  MFN (Missing Found Network) is an information-based digital
                  platform intended to present details related to missing
                  persons, found persons, unidentified bodies, stolen
                  items/vehicles, and related information in the public
                  interest.
                </p>
                <p>
                  The information displayed on this platform may be sourced from
                  publicly available government portals, news sources, and
                  user-submitted data, including official sources such as ZIPNET
                  (Delhi Police).
                </p>
                <p>
                  MFN and Dishaayein Technology do not guarantee the accuracy,
                  completeness, or timeliness of the information presented. For
                  any legal, administrative, or official purpose, verification
                  from the concerned police department or government authority
                  is mandatory.
                </p>
                <p>
                  MFN is not affiliated with, endorsed by, or officially
                  connected to any government agency, unless explicitly stated.
                </p>
                <p>
                  Any misuse of the information available on MFN for commercial
                  purposes, harassment, fraud, or unlawful activities is
                  strictly prohibited. MFN shall not be held liable for any
                  consequences arising from such misuse.
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

export default Disclaimer;
