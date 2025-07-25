'use client';
import Image from "next/image";
import styles from "./page.module.css";
import hero from '../../public/hero.jpg'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm'
import { FaFlagUsa } from "react-icons/fa";

const stripePromise = loadStripe('pk_live_51RoD0C2Lh23AW9B4h6NU3gwwuTZiLKltfEKhurqCkafU7Tgwg9YO1hn2707b3WDnQ1XH5vaZINvDJUKqicK3Uom200nSIRctwt');
export default function Home() {
  return (
        <div className={styles.App}>
      {/* <div className={styles.Header}>Freedom Flyers</div> */}

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
          <div className={styles.LandingCard}><FaFlagUsa /> <span className={styles.icon}>Memorial Day</span></div>
          <div className={styles.LandingCard}><FaFlagUsa /> <span className={styles.icon}>4th of July</span></div>
          <div className={styles.LandingCard}><FaFlagUsa /> <span className={styles.icon}>Labor Day</span></div>
          <div className={styles.LandingCard}><FaFlagUsa /> <span className={styles.icon}>September 11th</span></div>
          <div className={styles.LandingCard}><FaFlagUsa /> <span className={styles.icon}>Veterans Day</span></div>
        </div>
          <div className={styles.InfoCard}>
          <h3>How It Works</h3>
          <p>Your Texas neighbors, <strong>Kamrin, Holland, and Blakely</strong>, will install one full-size 3x5 American flag in your front yard before each major holiday.</p>
          <p>Includes careful install, take-down, and safe storage between holidays.</p>
        </div>
        <div className={styles.InfoCard}>
          <h3>Holiday Schedule</h3>
          <p>Flags will be placed up to <strong>3 days before</strong> each holiday and removed within <strong>3 days after</strong>.</p>
          <p>Labor Day flags remain through <strong>September 11th</strong>.</p>
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
