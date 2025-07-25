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
          <Image className={styles.HeroImg} src='/hero.jpg' alt="American Flag"  width={1200} height={800} />
          <div className={styles.HeroTitle}>Honor Every Holiday Without the Hassle</div>
        </div>
      </div>

      <div className={styles.Landing}>
        <div className={styles.LandingHeader}>
          <div className={styles.LandingTitle}>Freedom Flyer Flag Service</div>
          <span>$75 / Year</span>
        </div>
        Your flag will be proudly displayed for these five major patriotic holidays.
        <div className={styles.CardContainer}>
          <div className={styles.LandingCard}><FaFlagUsa /> Memorial Day</div>
          <div className={styles.LandingCard}><FaFlagUsa /> 4th of July</div>
          <div className={styles.LandingCard}><FaFlagUsa /> Labor Day</div>
          <div className={styles.LandingCard}><FaFlagUsa /> September 11th</div>
          <div className={styles.LandingCard}><FaFlagUsa /> Veterans Day</div>
        </div>
          <div className={styles.InfoCard}>
          <h3>How It Works</h3>
          <p>Your Texas neighbors, <strong>Kamrin, Holland, Blakely</strong>, will install one full-size 3x5 American flag in your front yard before each major holiday.</p>
          <p>Includes careful install, take-down, and safe storage between holidays.</p>
          <p>
            Flag will be installed up to 3 days before each holiday and uninstalled within 3 days after each holiday. <br />
            Labor Day flag will stay up until the 9/11 holiday.
          </p>
        </div>
        <div className={styles.InfoCard}>
          <h3>Subscription</h3>
          <p><strong>$75 annually</strong> for full flag service.</p>
          <p>Service starts immediately — your flag will be up for the next holiday.</p>
          <p>Cancel anytime.</p>
        </div>
        <div className={styles.InfoCard}>
          <h3>Share the Pride</h3>
          <p>Tell your friends and neighbors — or gift the service to someone!</p>
          <p><strong>We are proud to be American!!</strong></p>
          <p><strong>Let’s line our neighborhoods with American flags!</strong></p>
        </div>
        <div className={styles.InfoCard}>
          <h3>Subscription</h3>
          <p><strong>$75 annually</strong> for full flag service.</p>
          <p>Service starts immediately — your flag will be up for the next holiday.</p>
          <p>Cancel anytime.</p>
        </div>
        <div className={styles.InfoCard}>
          <h3>Need Help?</h3>
          <p>To update your payment method or cancel, contact us at:</p>
          <p><strong>valdez@freedomflyers.co</strong></p>
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
