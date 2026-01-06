import React, { useState } from "react";
import NavbarComp from "./Navbar";
import Footer from "./Footer";
import { Button } from "react-bootstrap";

const DataDeletion = () => {
  const [formData, setFormData] = useState({
    email: "",
    reason: "",
    verificationCode: "",
  });
  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.reason) {
      newErrors.reason = "Please select a reason for deletion";
    }
    return newErrors;
  };

  const handleRequestDeletion = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setTimeout(() => {
    alert("Data deletion request send succefully.");
    setLoading(false);
    },1000)
  };

  const handleConfirmDeletion = async (e) => {
    e.preventDefault();

    if (!formData.verificationCode) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: "Verification code is required",
      }));
      return;
    }

    setLoading(true);
   setTimeout(() => {
    alert("Data deletion request send succefully.");
    setLoading(false);
    },1000)

  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavbarComp />
      <div className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-red-600 px-8 py-6">
            <h1
              className="text-3xl font-extrabold text-white text-center tracking-tight"
              style={{ marginTop: "150px" }}
            >
              Request Data Deletion
            </h1>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-red-800">
                Data Deletion Request
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                We understand that you may want to delete your account and all
                associated data from our platform. This is a permanent action
                that cannot be undone. Please proceed with caution.
              </p>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <p className="text-red-800 font-semibold">Warning:</p>
                <p className="text-red-700 text-sm mt-2">
                  Once your data is deleted, it cannot be recovered. All your
                  submissions, profile information, and associated records will
                  be permanently removed from our system.
                </p>
              </div>
            </section>

            {!showVerification ? (
              <form onSubmit={handleRequestDeletion} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Reason for Deletion
                  </label>
                  <select
                //   style={{height:"70px"}}
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.reason ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a reason</option>
                    <option value="privacy_concerns">Privacy Concerns</option>
                    <option value="no_longer_using">No Longer Using</option>
                    <option value="duplicate_account">Duplicate Account</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.reason && (
                    <p className="text-red-500 text-sm mt-3">{errors.reason}</p>
                  )}
                </div>

                <div className="flex gap-8 w-100">
                  <Button
                    variant="danger"
                    type="submit"
                    disabled={loading}
                    className="flex-1 font-semibold me-2"
                  >
                    {loading ? "Processing..." : "Request Deletion"}
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    className="flex-1 font-semibold"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleConfirmDeletion} className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-blue-800">
                    A verification code has been sent to your email. Please
                    enter it below to confirm the deletion.
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    placeholder="Enter the 6-digit code"
                    maxLength="6"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-center tracking-widest text-lg ${
                      errors.verificationCode
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.verificationCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.verificationCode}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="danger"
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 font-semibold"
                  >
                    {loading ? "Confirming..." : "Confirm Deletion"}
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    className="flex-1 py-3 font-semibold"
                    onClick={() => {
                      setShowVerification(false);
                      setFormData({ ...formData, verificationCode: "" });
                    }}
                  >
                    Back
                  </Button>
                </div>
              </form>
            )}

            <section className="space-y-4 border-t pt-8">
              <h2 className="text-xl font-bold text-gray-800">
                What happens when you delete your data?
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Your account will be permanently deleted</li>
                <li>All personal information will be removed from our system</li>
                <li>
                  Your submissions (missing person reports, found person
                  reports) will be anonymized
                </li>
                <li>You will no longer be able to log in</li>
                <li>This action cannot be reversed</li>
              </ul>
            </section>

            <section className="space-y-4 border-t pt-8">
              <h2 className="text-xl font-bold text-gray-800">
                Need help?
              </h2>
              <p className="text-gray-700">
                If you have any questions before proceeding with data deletion,
                please contact our support team at{" "}
                <a href="mailto:support@mfn.in" className="text-red-600 hover:underline">
                  support@mfn.in
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DataDeletion;
