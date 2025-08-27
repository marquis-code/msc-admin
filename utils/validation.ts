export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Basic phone validation - allows international format
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

export const validateContactForm = (form: {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!form.fullName.trim()) {
    errors.push({ field: "fullName", message: "Full name is required" });
  } else if (form.fullName.trim().length < 2) {
    errors.push({
      field: "fullName",
      message: "Full name must be at least 2 characters",
    });
  }

  if (!form.email.trim()) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!validateEmail(form.email)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address",
    });
  }

  if (form.phone.trim() && !validatePhone(form.phone)) {
    errors.push({
      field: "phone",
      message: "Please enter a valid phone number",
    });
  }

  if (!form.subject) {
    errors.push({ field: "subject", message: "Please select a subject" });
  }

  if (!form.message.trim()) {
    errors.push({ field: "message", message: "Message is required" });
  } else if (form.message.trim().length < 10) {
    errors.push({
      field: "message",
      message: "Message must be at least 10 characters",
    });
  }

  return errors;
};
