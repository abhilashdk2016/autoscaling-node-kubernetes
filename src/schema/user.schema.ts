import { object, string, TypeOf } from 'zod';
export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'Password is required'
        }).min(6, "Password too short- should be minimum 6 characters"),
        passwordConfirmation: string({
            required_error: "Password Confirmation is Required"
        }).min(6, "Confirm Password too short - should be minimum 6 characters"),
        email: string({
            required_error: "Email is required"
        }).email('No t a valid Email')
    }).refine(data => data.password === data.passwordConfirmation, {
        message: "Password do not match",
        path: ["passwordConfirmation"]
    })
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">;