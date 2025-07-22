import './App.css';
import hero from './Assets/hero.jpg';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_...'); // Replace with your Stripe public key

function App() {
  return (
    <div className="App">
      <header>Freedom Flyers</header>
      <div className="Hero">
          <div className="HeroContainer">
            <img className="HeroImg" src={hero}/>
            <div className="HeroTitle">Honor Every Holiday Without the Hassle</div>
          </div>
        </div>
      <div className="Landing">
        <div className="LandingHeader">
          <div className="LandingTitle">Freedom Flyer Flag Service</div>
            $75 Year
          </div>
          <div>
            <p>
              Show your patriotism and sign up for the Talega Flag Service: Have an American flag displayed in your front yard for all 5 major patriotic holidays:
            </p>
            <ul>
              <li>Veterans Day</li>
              <li>Memorial Day</li>
              <li>4th of July</li>
              <li>Labor Day</li>
              <li>September 11th</li>
            </ul>
            <p>
              Prior to each holiday, your Texas neighbors, <strong>Kamrin, Holland, Blakely</strong>, will install one full-size 3'x5' American flag in your front yard.
            </p>
            <p>
              Service includes careful install, take-down, and storage in between each holiday.
            </p>
            <p>
              Flag will be installed up to 3 days before each holiday and uninstalled within 3 days after each holiday.
              <br />
              Labor Day flag will stay up until the 9/11 holiday.
            </p>
            <p>
              <strong>Flag service is a $75 annual subscription.</strong>
            </p>
            <p>
              Subscription begins immediately and you will have a flag up at the next holiday.
            </p>
            <p>
              Cancel at any time.
            </p>
            <p>
              Please share this info/link with your friends and neighbors — or gift the service!
            </p>
            <p>
              Let’s line our neighborhoods with American Flags. <br />
              <strong>We are proud to be American!! 🇺🇸</strong>
            </p>
            <p>
              Thank you for your support.
            </p>
          </div>
      </div>
      <div className="OrderHeader">Order The Service</div>
      <div className="Checkout">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}

export default App;
