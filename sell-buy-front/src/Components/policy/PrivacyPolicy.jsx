import styles from "./privacyPolicy.module.css";

export default function PrivacyPolicy() {
  return (
    <div className={`mainContainer ${styles.privacyPolicyContainer}`}>
      <h1>Privacy Policy</h1>
      <p>Last updated: April 21, 2025</p>

      <p>
        This website is a demonstration project created to showcase the
        technical skills of its developers. It is not a functional online
        marketplace platform, and any purchases made are for demonstration
        purposes only.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We may collect personal data such as your name, email address, phone
        number, and shipping address. This data is used only for demo
        functionality and will not be shared or sold.
      </p>

      <h2>2. Use of Data</h2>
      <p>
        All data submitted is used solely to simulate the process of buying or
        selling items and will not be used for real-world transactions.
      </p>

      <h2>3. No Real Transactions</h2>
      <p>
        Any orders placed through this website are not real. Products will not
        be shipped, and payments will not be processed or refunded.
      </p>

      <h2>4. Cookies</h2>
      <p>
        We may use basic cookies to improve the demo experience. These cookies
        are not used for advertising or third-party tracking.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        Data submitted to this demo may be stored temporarily. You can request
        removal by contacting us.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        For any questions, please contact us at{" "}
        <strong>kinkriashvilirati@gmail.com</strong>.
      </p>
    </div>
  );
}
