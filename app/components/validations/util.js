"use client";

export const emailMsg = (property, t) => {
    return {
        message: t(
            "validations.email",
            {
                property: t(property),
            },
        ),
    };
};

export const minLengthMsg = (min, property, t) => {
    return {
        message: t(
            "validations.minLength",
            {
                property: t(property),
                min,
            },
        ),
    };
};

export const maxLengthMsg = (max, property, t) => {
    return {
        message: t(
            "validations.maxLength",
            {
                property: t(property),
                max,
            },
        ),
    };
};

export const passwordConfirmMsg = (property, t) => {
    return {
        message: t(
            "validations.sameAsPassword",
            {
                property: t(property),
            },
        ),
    };
};

export const hasError = (errors, key) => Object.hasOwn(errors, key);

export const getError = (errors, key) => {
    if (errors[key] && Array.isArray(errors[key])) {
        return errors[key][0]?.message ?? "";
    }
    
    return errors[key] && errors[key].message ? errors[key].message : "";
};

export const requiredMsg = (property, t) => {
    return {
        message: t(
            "validations.required",
            {
                property: t(property),
            },
        ),
    };
};

