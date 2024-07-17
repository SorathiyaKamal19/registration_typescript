import { Register } from "../model/Register";

export const validate = (user: Register) => {
  const errors: { [key: string]: string } = {};

  if (!user.firstName) {
    errors.firstName = "First Name is required";
  } else if (user.firstName.length >= 20) {
    errors.firstName = "First Name must not be more than 20 characters";
  } else if (user.firstName.trim() === "") {
    errors.firstName = "You must write a letter";
  } else if (!/^[a-zA-Z]+$/.test(user.firstName)) {
    errors.firstName = "Special characters are not allowed";
  }

  if (!user.lastName) {
    errors.lastName = "Last Name is required";
  }

  if (!user.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = "Email is invalid";
  }

  if (!user.number) {
    errors.number = "Phone Number is required";
  } else if (!/^\+?(?:\d[\s-]?){6,15}\d$/.test(user.number)) {
    errors.number = "Phone number is not valid";
  }

  if (!user.cpassword) {
    errors.cpassword = "Password is required";
  }

  if (!user.dob) {
    errors.dob = "Date of Birth is required";
  }

  if (!user.file) {
    errors.file = "File is required";
  } else {
    const allowedFileTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    const maxSizeInBytes = 2 * 1024 * 1024;

    if (!allowedFileTypes.includes(user.file.type)) {
      errors.file = "Only document files (pdf, doc, docx, txt) are allowed";
    } else if (user.file.size > maxSizeInBytes) {
      errors.file = "File size should be less than 2MB";
    }
  }

  return errors;
};
