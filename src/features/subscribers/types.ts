export type SubscriberProvider = "none" | "resend" | "convertkit" | "mailchimp" | "supabase";

export type SubscriberStatus = "active" | "pending" | "unsubscribed";

export type Subscriber = {
  id: string;
  email: string;
  source: "blog" | "product" | "service" | "manual";
  status: SubscriberStatus;
  createdAt: string;
};
