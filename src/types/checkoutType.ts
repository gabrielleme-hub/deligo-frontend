export type Checkout = {
  items: [
    {
      productId: string;
      quantity: number;
    }
  ];
  paymentMethod: string;
  CreditCard: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardHolderName: string;
  };
};
