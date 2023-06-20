export default function login_validate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = "REQUIRED";
    }
    else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Must be greater than 8 or less than 20";
    }
    else if (values.password.includes(" ")) {
        errors.password = "InvalidPassword"
    }
    return errors
}
export function registerValidate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    if (!values.username) {
        errors.username = "REQUIRED";
    }
    else if (values.username.includes(" ")) {

        errors.username = "INVALID USERNAME...!"
    }
    if (!values.password) {
        errors.password = "REQUIRED";
    }
    else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Must be greater than 8 or less than 20";
    }
    else if (values.password.includes(" ")) {
        errors.password = "InvalidPassword"
    }
    if(!values.cpassword){
        errors.cpassword="REQUIRED";
    }
    else if(values.cpassword!==values.password){
        errors.password="Password Not Matched";
    }
    else if(values.password.includes(" ")){
        errors.password="Invalid ConfirmPassword"
    }
    return errors;
}