/** Contact page and form. */
export const contact = {
  title: "Contact us",
  subtitle: "Send your inquiry and we'll reply as soon as we can.",
  crumb: "Contact us",
  form: {
    name: "Name",
    phone: "Mobile number",
    phonePlaceholder: "01xxxxxxxxx",
    email: "Email address",
    optional: "(optional)",
    subject: "Subject",
    message: "Message",
    submit: "Send message",
    sending: "Sending...",
    errors: {
      name: "Write your name (2+ characters)",
      phone: "Enter a valid Egyptian mobile number",
      email: "The email address is not valid",
      subject: "Write a subject for the message",
      message: "The message needs at least 10 characters",
    },
    toast: {
      successTitle: "We received your message",
      successText: "Thanks for reaching out, we'll get back to you as soon as possible.",
      invalid: "Please check the required fields",
    },
  },
  details: {
    title: "Contact details",
    pending:
      "Official contact details (phone and address) will be added soon. Until then, please use the form.",
    rows: { phone: "Phone", email: "Email", address: "Address", hours: "Working hours" },
  },
  whatsapp: {
    title: "WhatsApp",
    ready: "Message us directly on WhatsApp.",
    pending: "The official WhatsApp number hasn't been added yet.",
    message: "Hello, I have a question about El Geuishi products",
  },
};
