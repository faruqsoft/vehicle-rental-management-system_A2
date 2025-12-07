export interface UpdateBookingParams {
  bookingId: string;
  status: "cancelled" | "returned";
  loggedInUser: { 
    id: number; 
    role: "admin" | "customer" 
  };
}