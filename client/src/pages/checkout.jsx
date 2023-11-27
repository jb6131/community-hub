import React, { useState, useEffect } from "react";

const ProductDisplay = () => (
  <section>
    <div className="product">
      {/* <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      /> */}
      <div className="description">
      <h3>Donate through CommunityHub!</h3>
      <h5>$50.00</h5>
      <h5>$25.00</h5>
      <h5>$10.00</h5>
      <h5>$5.00</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Donation placed! Thank you for supporting your community. You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Donation canceled -- please consider donating when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}