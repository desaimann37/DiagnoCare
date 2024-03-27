import React, { useEffect } from 'react';

const StripeRedirect = ({ sessionId }) => {
  useEffect(() => {
    const loadStripe = async () => {
      // Load Stripe.js dynamically
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.onload = () => {
        // Initialize Stripe after the script is loaded
        const stripe = window.Stripe('pk_test_51OxtidSDwlSbyHjR0woHukSjogxPNd3DhN4l6HpVnCG2fHFKgZr8kGxUZpng53zUkWv8VIP5K4zagQbKco33NGVs00mpsY757L');
        redirectToCheckout(stripe);
      };
      document.body.appendChild(script);
    };

    const redirectToCheckout = async (stripe) => {
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });
      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    };

    loadStripe();
  }, [sessionId]);

  return (
    <div>
      Redirecting to Stripe...
    </div>
  );
};

export default StripeRedirect;
