const validation = (values) => {
    let errors={};

    //Throw error if...

    // Email field is empty
    if(!values.email){
        errors.email="Email is required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email="Email is invalid"
    }

    if(!values.username){
        errors.username="Username is required"
    }

    if(!values.firstName){
        errors.firstName="First name is required"
    }

    if(!values.lastName){
        errors.lastName="Last name is required"
    }

    if(!values.password){
        errors.password="Password is required"
    } else if(values.password.length < 8){
        errors.password="Password must be at least 8 characters"
    }

    if(!values.passwordConfirm){
        errors.passwordConfirm="Confirm your password"
    } else if(values.passwordConfirm !== values.password){
        errors.passwordConfirm="Password do not match"
    }
    return errors;
}

export default validation;
