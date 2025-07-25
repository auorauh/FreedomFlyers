'use client';
import Image from "next/image";
import styles from "./page.module.css";
import hero from '../../public/hero.jpg'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm'
import { FaFlagUsa } from "react-icons/fa";

const stripePromise = loadStripe('pk_test_51RoD0LRr4Dm6KIbQyNJJ71LRSKHEta0MjXCynNcyXH3acEXLj1dgqF1dE7fcwM1rek7zO2XMkt4s8wB2yY4LdqJZ00yiriq5pK');

export default function Home() {
  return (
        <div className={styles.App}>
      <div className={styles.Header}>Freedom Flyers</div>

      <div className={styles.Hero}>
        <div className={styles.HeroContainer}>
          <Image className={styles.HeroImg} src={hero} alt="American Flag" />
          <div className={styles.HeroTitle}>Honor Every Holiday Without the Hassle</div>
        </div>
      </div>

      <div className={styles.Landing}>
        <div className={styles.LandingHeader}>
          <div className={styles.LandingTitle}>Freedom Flyer Flag Service</div>
          $75 / Year
        </div>

        Your flag will be proudly displayed for these five major patriotic holidays.

        <div className={styles.CardContainer}>
          <div className={styles.LandingCard}><FaFlagUsa /> Memorial Day</div>
          <div className={styles.LandingCard}><FaFlagUsa /> 4th of July</div>
          <div className={styles.LandingCard}><FaFlagUsa /> Labor Day</div>
          <div className={styles.LandingCard}><FaFlagUsa /> September 11th</div>
          <div className={styles.LandingCard}><FaFlagUsa /> Veterans Day</div>
        </div>

        <div>
          <p>
            Prior to each holiday, your Texas neighbors, <strong>Kamrin, Holland, Blakely</strong>, will install one full-size 3x5 American flag in your front yard.
          </p>
          <p>Service includes careful install, take-down, and storage in between each holiday.</p>
          <p>
            Flag will be installed up to 3 days before each holiday and uninstalled within 3 days after each holiday. <br />
            Labor Day flag will stay up until the 9/11 holiday.
          </p>
          <p><strong>Flag service is a $75 annual subscription.</strong></p>
          <p>Subscription begins immediately and you will have a flag up at the next holiday.</p>
          <p>Cancel at any time.</p>
          <p>
            Please share this info/link with your friends and neighbors — or gift the service!
          </p>
          <p>
            Join us and line our neighborhoods with American Flags. <br />
            <strong>We are proud to be American!!</strong>
          </p>
          <p>Thank you for your support.</p>
          <p>To Update your payment method, or cancel Please Contact us at valdez@freedomflyers.co</p>
        </div>
      </div>

      <div className={styles.OrderHeader}>Order The Service</div>
      <div className={styles.Checkout}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
