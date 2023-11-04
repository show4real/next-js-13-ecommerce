import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faTimes } from "@fortawesome/free-solid-svg-icons";
const ReferralBadge = () => {
  const [showBadge, setShowBadge] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleCloseBadge = () => {
    setShowBadge(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showBadge && (
        <div className="fixed bottom-5 left-3 z-50 bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center">
          <div className="mr-2">
            <FontAwesomeIcon icon={faGift} />
          </div>
          <button className="mr-2" onClick={handleOpenModal}>
            Refer and Earn
          </button>
          <div className="cursor-pointer" onClick={handleCloseBadge}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-11/12 md:max-w-md">
            <div className="text-right">
              <button onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <p className="text-lg font-semibold my-4">
              INVITE &amp; GET 5% COMMISSION FROM FRIEND&apos;S ORDERS
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Send your friends a 2% discount off their purchase. Once they make
              a purchase, you will earn 5% commission for each order as well!
              This reward can be redeemed for coupons.
            </p>
            <input
              className="border-2 border-gray-300 rounded-md p-2 my-4 w-full"
              type="text"
              placeholder="Enter your email"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
              onClick={handleCloseModal}
            >
              Get Invite Link
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default ReferralBadge;
