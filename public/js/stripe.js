/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51JhvHDCf9PKV8OHM9xizodafVfM279evRP01o541P5i5DWhqhlh1gzt2JWwTpuNMPXO0Ae7pKKpxnm2dAZAeGnAQ00coMFaEar'
);

export const bookTour = async (tourId) => {
  try {
    // 1. Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2. Create checkout form + charged credit card
    await stripe.redirectToCheckout({
        sessionId: session.data.session.id
    })
  } catch (error) {
    // console.log(error);
    showAlert('error', error);
  }
};
